// prisma/seed.ts
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.agentRun.deleteMany();
  await prisma.investigation.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.customer.deleteMany();

  const acme = await prisma.customer.create({
    data: { name: 'Acme Inc.', email: 'billing@acme.com' },
  });

  await prisma.subscription.create({
    data: { customerId: acme.id, status: 'inactive', plan: 'pro-monthly' },
  });

  await prisma.payment.create({
    data: { customerId: acme.id, amount: 4900, status: 'succeeded' },
  });

  await prisma.supportTicket.create({
    data: {
      customerId: acme.id,
      zendeskTicketId: 'zd-48291',
      subject: 'I was charged but my subscription is still inactive.',
      status: 'open',
    },
  });

  console.log('Seeded Acme Inc. scenario:', acme.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });