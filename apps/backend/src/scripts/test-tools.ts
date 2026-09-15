import { getCustomer, getCustomerByEmail } from "../tools/customer.js";
import { getSubscription } from "../tools/subscriptions.js";
import { getPaymentHistory } from "../tools/payment.js";
import { getPreviousTickets } from "../tools/tickets.js";
import { prisma } from "../lib/prisma.js";

async function main() {
    console.log("=== Testing Tools ===\n");


    const customerByEmail = await getCustomerByEmail("billing@acme.com");
    console.log("1. getCustomerByEmail('billing@acme.com'):");
    console.log(JSON.stringify(customerByEmail, null, 2));
    console.log("\n" + "-".repeat(50) + "\n");

    if (!customerByEmail) {
        console.error("Acme customer not found! Make sure database is seeded.");
        return;
    }

    const customerId = customerByEmail.id;
    console.log(`Testing remaining tools using customerId: ${customerId}\n`);


    const customer = await getCustomer(customerId);
    console.log("2. getCustomer(customerId):");
    console.log(JSON.stringify(customer, null, 2));
    console.log("\n" + "-".repeat(50) + "\n");


    const subscription = await getSubscription(customerId);
    console.log("3. getSubscription(customerId):");
    console.log(JSON.stringify(subscription, null, 2));
    console.log("\n" + "-".repeat(50) + "\n");

    // 4. Fetch payment history
    const payments = await getPaymentHistory(customerId);
    console.log("4. getPaymentHistory(customerId):");
    console.log(JSON.stringify(payments, null, 2));
    console.log("\n" + "-".repeat(50) + "\n");

    // 5. Fetch previous tickets
    const tickets = await getPreviousTickets(customerId);
    console.log("5. getPreviousTickets(customerId):");
    console.log(JSON.stringify(tickets, null, 2));
    console.log("\n" + "-".repeat(50) + "\n");

    console.log("=== Testing Completed ===");
}

main()
    .catch((err) => {
        console.error("Error running test-tools:", err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
