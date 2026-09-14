import { prisma } from "../lib/prisma.js"



export async function getPaymentHistory(customerId: string) {
    try {
        const payments = await prisma.payment.findMany({
            where: { customerId },
            orderBy: { createdAt: 'desc' },
        });
        return payments;
    } catch (err) {
        console.error(err);
        return { error: 'Failed to fetch payment history' };
    }
}