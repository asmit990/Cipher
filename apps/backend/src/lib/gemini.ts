import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
    throw new Error('GOOGLE_AI_API_KEY');
}

export const genai = new GoogleGenAI({ apiKey });