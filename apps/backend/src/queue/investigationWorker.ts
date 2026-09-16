import { Worker } from "bullmq"
import { redisConnection } from "../lib/redis.js"
import { prisma } from "../lib/prisma.js"
import { investigate } from "../agents/investigate.js"



const worker = new Worker('investigate', async (job) => {
    const { ticketId } = job.data;

    const ticket = await prisma.supportTicket.findUnique({
        where: { id: ticketId },
        include: { customer: true },
    });



    if (!ticket) throw new Error(`Ticket ${ticketId} not found`);


    const existingInvestigation = await prisma.investigation.findFirst({
        where: { ticketId: ticket.id },
        orderBy: { createdAt: 'desc' },
    });

    if (existingInvestigation && existingInvestigation.status === "IN_PROGRESS") {
        console.log(`Already investigating ticket ${ticketId}, skipping`);
        return;
    }



    return investigate(ticket, ticket.customer);
})


worker.on('completed', (job) => console.log(`job ${job.id} completed`));
worker.on('failed', (job, err) => console.error(`job ${job?.id} failed:`, err));