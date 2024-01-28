import { User, Cashflow, Transaction } from "@/app/lib/definitions"

const users: [User] = [
    {
        id: 1,
        name: "John Doe",
        email: "john@doe.com",
        password: "123456",
    },
];

const cashflows: [Cashflow] = [
    {
        id: null,
        savings: 93000,
        income: 7200,
        user_id: 1,
    },
];

const transactions: [Transaction] = [
    {
        id: null,
        name: "Apple",
        amount: 124.99,
        date: null,
        user_id: 1,
    },
];

export { users, cashflows, transactions };