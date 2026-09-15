import { type Content, type Part } from '@google/genai';
import { genai } from '../lib/gemini.js';
import { prisma } from '../lib/prisma.js';
import { toolDeclarations, toolMap } from './tool.js';
import { investigationResponseSchema } from './schema.js';

const SYSTEM_PROMPT = `You are a support investigation agent. Given a support ticket, use the available tools to gather all relevant information about the customer — their account details, subscription status, payment history, and previous tickets. Then provide a clear, concise summary of your findings to help the support team resolve the issue.`;

interface Ticket {
    id: string;
    subject: string;
}

interface Customer {
    email: string;
    id: string;
}

export async function investigate(ticket: Ticket, customer: Customer) {
    const contents: Content[] = [
        { role: 'user', parts: [{ text: `Investigate this ticket: "${ticket.subject}" from customer ${customer.email} (id: ${customer.id})` }] }
    ];

    let response = await genai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
            tools: [{ functionDeclarations: toolDeclarations }],
            systemInstruction: SYSTEM_PROMPT,
        },
    });

    while (response.functionCalls && response.functionCalls.length > 0) {
        const call = response.functionCalls[0]!;
        const fnName = call.name as keyof typeof toolMap;
        const fn = toolMap[fnName];
        const args = Object.values(call.args ?? {}) as [string];
        const result = await fn(...args);

        contents.push({ role: 'model', parts: [{ functionCall: call } as Part] });
        contents.push({
            role: 'user',
            parts: [{ functionResponse: { name: call.name!, response: { result } } } as Part],
        });

        response = await genai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents,
            config: { tools: [{ functionDeclarations: toolDeclarations }], systemInstruction: SYSTEM_PROMPT },
        });
    }


    const finalResponse = await genai.models.generateContent({
        model: 'gemini-2.5-flash',
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


    await prisma.investigation.create({
        data: {
            ticketId: ticket.id,
            status: 'completed',
            rootCause: result.rootCause,
            evidence: result.evidence,
            recommendedAction: result.recommendedAction,
        },
    });

    return result;
}