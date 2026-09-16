import { type Investigation, type Ticket, type Customer } from "../types/types.js";

export function formatInvestigationMessage(
    investigation: Investigation,
    ticket: Ticket,
    customer: Customer
) {
    const evidenceText = (investigation.evidence ?? [])
        .map((e) => `✓ ${e}`)
        .join('\n');

    return {
        blocks: [
            {
                type: 'header',
                text: { type: 'plain_text', text: '🚨 Support Investigation' },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*Customer:* ${customer.name}\n*Ticket:* #${ticket.zendeskTicketId}`,
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*Issue:*\n${ticket.subject}`,
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*Evidence:*\n${evidenceText || 'No evidence recorded.'}`,
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*Root cause:* ${investigation.rootCause ?? 'Unknown'}\n*Recommended action:* ${investigation.recommendedAction ?? 'None'}`,
                },
            },
            {
                type: 'actions',
                elements: [
                    {
                        type: 'button',
                        text: { type: 'plain_text', text: 'Approve' },
                        style: 'primary',
                        value: investigation.id,
                        action_id: 'approve_investigation',
                    },
                    {
                        type: 'button',
                        text: { type: 'plain_text', text: 'Reject' },
                        style: 'danger',
                        value: investigation.id,
                        action_id: 'reject_investigation',
                    },
                ],
            },
        ],
    };
}