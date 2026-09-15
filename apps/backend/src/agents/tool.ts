import { getCustomer } from "../tools/customer.js";
import { getSubscription } from "../tools/subscriptions.js"
import { getPaymentHistory } from "../tools/payment.js"
import { getPreviousTickets } from "../tools/tickets.js"
import { Type, type FunctionDeclaration } from "@google/genai";


export const toolDeclarations: FunctionDeclaration[] = [
    {
        name: 'getCustomer',
        description: 'Fetch customer details by their ID, including subscriptions and payments',
        parameters: {
            type: Type.OBJECT,
            properties: { customerId: { type: Type.STRING } },
            required: ['customerId'],
        },
    },
    {
        name: 'getSubscription',
        description: 'Fetch the current subscription status for a customer',
        parameters: {
            type: Type.OBJECT,
            properties: { customerId: { type: Type.STRING } },
            required: ['customerId'],
        },
    },
    {
        name: 'getPaymentHistory',
        description: 'Fetch the payment history for a customer, ordered by most recent first',
        parameters: {
            type: Type.OBJECT,
            properties: { customerId: { type: Type.STRING } },
            required: ['customerId'],
        },
    },
    {
        name: 'getPreviousTickets',
        description: 'Fetch previous support tickets for a customer, ordered by most recent first',
        parameters: {
            type: Type.OBJECT,
            properties: { customerId: { type: Type.STRING } },
            required: ['customerId'],
        },
    },
];




export const toolMap = {
    getCustomer,
    getSubscription,
    getPaymentHistory,
    getPreviousTickets,

};