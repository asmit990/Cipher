import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    ...(process.env.DATABASE_URL && { url: process.env.DATABASE_URL }),
  },
});