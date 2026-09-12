import 'dotenv/config';

const ZENDESK_SUBDOMAIN = process.env.ZENDESK_SUBDOMAIN!;
const ZENDESK_EMAIL = process.env.ZENDESK_EMAIL!;
const ZENDESK_API_TOKEN = process.env.ZENDESK_API_TOKEN!;

const authHeader = 'Basic ' + Buffer.from(
    `${ZENDESK_EMAIL}/token:${ZENDESK_API_TOKEN}`
).toString('base64');

export async function getZendeskUser(userId: number) {
    const res = await fetch(
        `https://${ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/users/${userId}.json`,
        { headers: { Authorization: authHeader } }
    );
    if (!res.ok) throw new Error(`Zendesk user lookup failed: ${res.status}`);
    const data = await res.json();
    return data.user as { name: string; email: string };
}