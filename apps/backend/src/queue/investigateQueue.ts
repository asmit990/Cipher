import { Queue } from "bullmq"
import { redisConnection } from "../lib/redis.js"



export const investigationQueue = new Queue('investigation', {
    connection: redisConnection,
});


