import { prisma } from "../lib/prisma.js";


const CUSTOMER_INCLUDE = { subscriptions: true, payments: true };


export async function getCustomer(customerId: string) {

    const customer = await prisma.customer.findUnique({
        where: { id: customerId },
        include: CUSTOMER_INCLUDE,
    });


    if (!customer) return null;

    return customer;
}


export async function getCustomerByEmail(email: string) {

    const customeerById = await prisma.customer.findUnique({
        where: { email },
        include: CUSTOMER_INCLUDE,

    })

    if (!customeerById) return null;

    return customeerById;


}