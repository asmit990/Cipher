import { Type, type Schema } from '@google/genai';

export const investigationResponseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        rootCause: { type: Type.STRING },
        evidence: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
        },
        recommendedAction: { type: Type.STRING },
        confidence: { type: Type.NUMBER },
    },
    required: ['rootCause', 'evidence', 'recommendedAction'],
};