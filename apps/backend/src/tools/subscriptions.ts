import { prisma } from "../lib/prisma.js"




export async function getSubscription(customerId: string) {

    const subscription = await prisma.subscription.findMany({
        where: { customerId },
        include: {

        },
        orderBy: {
            createdAt: 'desc',
        },

    });

    return subscription;
}