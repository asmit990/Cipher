
export interface Investigation {
    id: string;
    rootCause: string | null;
    evidence: string[] | null;
    recommendedAction: string | null;
}

export interface Ticket {
    id: string;
    subject: string;
    zendeskTicketId: string;
}
export interface Customer {
    id: string;
    name: string;
}
