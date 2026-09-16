import { type Content, type Part } from '@google/genai';
import { genai } from '../lib/gemini.js';
import { prisma } from '../lib/prisma.js';
import { toolDeclarations, toolMap } from './tool.js';
import { investigationResponseSchema } from './schema.js';
import { sendSlackMessage } from '../lib/slack.js';
import { formatInvestigationMessage } from '../notifications/postInvestigation.js';

const SYSTEM_PROMPT = `You are a support investigation agent. Given a support ticket, use the available tools to gather all relevant information about the customer — their account details, subscription status, payment history, and previous tickets. Then provide a clear, concise summary of your findings to help the support team resolve the issue.`;

const MAX_RETRIES = 3;

async function generateWithRetry(...args: Parameters<typeof genai.models.generateContent>) {
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            return await genai.models.generateContent(...args);
        } catch (err: any) {
            if (err.status === 503 && attempt < MAX_RETRIES - 1) {
                const delay = Math.pow(2, attempt) * 2000; // 2s, 4s, 8s
                console.log(`Gemini 503 — retrying in ${delay / 1000}s (attempt ${attempt + 1}/${MAX_RETRIES})`);
                await new Promise(r => setTimeout(r, delay));
                continue;
            }
            throw err;
        }
    }
    throw new Error('Unreachable');
}


const MAX_TURNS = 6;

import { type Customer, type Ticket } from '../types/types.js';


export async function investigate(ticket: Ticket, customer: Customer) {
    let turns = 0;

    const contents: Content[] = [
        { role: 'user', parts: [{ text: `Investigate this ticket: "${ticket.subject}" from customer ${customer.email} (id: ${customer.id})` }] }
    ];

    let response = await generateWithRetry({
        model: 'gemini-3.6-flash',
        contents,
        config: {
            tools: [{ functionDeclarations: toolDeclarations }],
            systemInstruction: SYSTEM_PROMPT,
        },
    });

    while (response.functionCalls && response.functionCalls.length > 0 && turns < MAX_TURNS) {
        turns++;
        const call = response.functionCalls[0]!;
        console.log('Calling tool:', call.name, call.args);
        const fnName = call.name as keyof typeof toolMap;
        const fn = toolMap[fnName];
        const args = Object.values(call.args ?? {}) as [string];
        const result = await fn(...args);

        const modelParts = response.candidates?.[0]?.content?.parts ?? [{ functionCall: call } as Part];
        contents.push({ role: 'model', parts: modelParts });
        contents.push({
            role: 'user',
            parts: [{ functionResponse: { name: call.name!, response: { result } } } as Part],
        });

        response = await generateWithRetry({
            model: 'gemini-3.6-flash',
            contents,
            config: { tools: [{ functionDeclarations: toolDeclarations }], systemInstruction: SYSTEM_PROMPT },
        });
    }


    const finalResponse = await generateWithRetry({
        model: 'gemini-3.6-flash',
        contents: [
            ...contents,
            { role: 'user', parts: [{ text: 'Summarize your investigation into the required JSON format.' }] },
        ],
        config: {
            responseMimeType: 'application/json',
            responseSchema: investigationResponseSchema,
            systemInstruction: SYSTEM_PROMPT,
        },
    });

    const result = JSON.parse(finalResponse.text ?? '{}');


    const investigation = await prisma.investigation.create({
        data: {
            ticketId: ticket.id,
            status: 'completed',
            rootCause: result.rootCause,
            evidence: result.evidence,
            recommendedAction: result.recommendedAction,
        },
    });

    try {
        const message = formatInvestigationMessage({
            ...investigation,
            evidence: investigation.evidence as string[] | null,
        }, ticket, customer);
        await sendSlackMessage(process.env.SLACK_CHANNEL_ID!, message.blocks);
    } catch (err) {
        console.error('Slack post failed:', err);
    }

    return result;
}