import { prisma } from "../lib/prisma.js";





export async function getPreviousTickets(customerId: string) {

    try {
        const ticket = await prisma.supportTicket.findMany({
            where: { customerId },
            orderBy: {
                createdAt: 'desc'
            },
        });
        if (!ticket) return null;
        return ticket;

    } catch (err) {
        console.error(err);
        return { error: 'Failed to fetch previous tickets' };
    }


}