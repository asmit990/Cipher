import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { verifyZendeskSignature } from '../lib/verifyZendesk.js';
import { getZendeskUser } from '../lib/zenDesk.js';

export const r: Router = Router();


r.post('/webhooks/zendesk', async (req, res) => {
    const signature = req.header("X-Zendesk-WebHook-Signature");
    const timestamp = req.header("x-Zendesk-Webhook-Signature-Timestamp");

    const signingSecret = process.env.ZENDESK_WEBHOOK_SECRET!;


    if (!signature || !timestamp) {
        return res.status(401).json({ error: "missing signature header" })
    }


    const valid = verifyZendeskSignature(
        (req as any).rawBody,
        signature,
        timestamp,
        signingSecret

    )



    if (!valid) {
        return res.status(401).json({ error: 'invalid sig' });

    }

    const { ticket } = req.body;
    if (!ticket.email || !ticket.subject || !ticket?.requester_id) {
        return res.status(400).json({ error: "malformed timeout payload" })
    }



    const requester = await getZendeskUser(ticket.requester_id)
    const customer = await prisma.customer.upsert({
        where: { email: requester.email },
        update: {},
        create: { name: requester.name, email: requester.email },
    })


    const savedTicket = await prisma.supportTicket.upsert({
        where: { zendeskTicketId: String(ticket.id) },
        update: { subject: ticket.subject, status: ticket.status ?? 'open' },
        create: {
            customerId: customer.id,
            zendeskTicketId: String(ticket.id),
            subject: ticket.subject,
            status: ticket.status ?? 'open',
        },
    })
})
