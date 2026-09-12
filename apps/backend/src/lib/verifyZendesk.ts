import crypto from "crypto";

export function verifyZendeskSignature(
    rawBody: string,
    signature: string,
    timestamp: string,
    signingSecret: string
): boolean {
    const hmac = crypto.createHmac("sha256", signingSecret);
    hmac.update(timestamp + rawBody);
    const computed = hmac.digest('base64');

    const computedBuf = Buffer.from(computed);
    const signatureBuf = Buffer.from(signature);

    if (computedBuf.length !== signatureBuf.length) {
        return false;
    }

    return crypto.timingSafeEqual(computedBuf, signatureBuf);
}

export const verifyZendeskSignture = verifyZendeskSignature;