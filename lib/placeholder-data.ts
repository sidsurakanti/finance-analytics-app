import type { User, Cashflow, Transaction } from "@lib/definitions";

const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "abc123",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    password: "abc456",
  },
];

const cashflows: Cashflow[] = [
  {
    savings: "93000",
    income: "7200",
    user_id: "1",
  },
  {
    savings: "73000",
    income: "6200",
    user_id: "2",
  },
];

const transactions: Transaction[] = [
  {
    name: "Apple",
    amount: 124.99,
    type: "expense",
    created_at: new Date(),
    user_id: "1",
  },
  {
    name: "Steam",
    amount: 24.49,
    type: "expense",
    created_at: new Date(),
    user_id: "2",
  },
  {
    name: "Tesla",
    amount: 11.99,
    type: "expense",
    created_at: new Date(),
    user_id: "2",
  },
  {
    name: "Spotify",
    amount: 16.99,
    type: "expense",
    created_at: new Date(),
    user_id: "2",
  },
  {
    name: "T-Mobile",
    amount: 400.24,
    type: "expense",
    created_at: new Date(),
    user_id: "2",
  },
];
