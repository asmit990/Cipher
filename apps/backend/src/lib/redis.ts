import 'dotenv/config';

const redisUrl = process.env.REDIS_URL
    ? new URL(process.env.REDIS_URL)
    : null;

export const redisConnection = {
    host: redisUrl?.hostname ?? "127.0.0.1",
    port: Number(redisUrl?.port ?? 6379),
    ...(redisUrl?.password && { password: decodeURIComponent(redisUrl.password) }),
    ...(redisUrl?.username && { username: decodeURIComponent(redisUrl.username) }),
};