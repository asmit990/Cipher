import { prisma } from "../lib/prisma.js"




export async function getSubscription(customerId: string) {
    const subscription = await prisma.subscription.findFirst({
        where: { customerId },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return subscription;
}