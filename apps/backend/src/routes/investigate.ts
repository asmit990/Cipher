import { investigate } from "../agents/investigate.js";
import { Router } from "express"
import { type Response, type Request } from "express";
import { prisma } from "../lib/prisma.js";

const r = Router();


r.post('/:id/investigate', async (req: Request, res: Response) => {

    const investigateTix = req.params.id as string;


    if (!investigateTix) return res.status(401).json({ status: "not ok", message: "error there is no investigate" })

    const ticket = await prisma.supportTicket.findUnique({
        where: { id: investigateTix },
        include: { customer: true }
    })

    if (!ticket) return res.status(404).json({ status: "not ok", message: "error there is no investigate" })


    try {
        const result = await investigate(ticket, ticket.customer);
        res.status(200).json({ status: "ok", investigation: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "not ok", message: "investigation failed" });
    }

})