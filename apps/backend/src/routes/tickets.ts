import { Router } from "express"
import { prisma } from "../lib/prisma.js"


const r: Router = Router();



r.get('/tickets', async (req, res, next) => {
    try {
        const tickets = await prisma.supportTicket.findMany({
            include: { customer: true },
            orderBy: { createdAt: 'desc' }
        });

        res.json(tickets);
    } catch (err) {
        next(err)
    }
})



r.get('/ticket/:id', async (req, res, next) => {
    try {
        const ticket = await prisma.supportTicket.findUnique({
            where: { id: req.params.id },
            include: {
                customer: {
                    include: { subscriptions: true, payments: true }
                },
                investigations: {
                    include: { agentRuns: true },
                },
            },
        });

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' })
        }

        res.json(ticket)
    } catch (err) {
        next(err);
    }
})



export default r;