"use server";

import { sql } from "@vercel/postgres";
import type {
  User,
  Cashflow,
  Transaction,
  Reoccuring,
  Balance,
} from "@lib/definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchUser(email: string) {
  try {
    const data = await sql<User>`
        SELECT * FROM users
        WHERE email=${email};
        `;
    const user = data.rows[0];

    console.log("Fetched user with email:", email);
    return user;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch user");
  }
}

export async function fetchCashflows(user: User) {
  noStore();
  const id = user.id?.toString();
  try {
    const res = await sql<Cashflow>`
          SELECT * FROM cashflows
          WHERE user_id=${id};
        `;
    const cashflows = res.rows[0];

    console.log("Fetched cashflows for user with id:", id);
    return cashflows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch cashflows.");
  }
}

export async function fetchTransactions(user: User) {
  noStore();
  const id = user.id?.toString();
  try {
    const res = await sql<Transaction>`
      SELECT * FROM transactions
      WHERE user_id=${id}
      ORDER BY created_at DESC
      LIMIT 4;
    `;
    const transactions = res.rows;

    console.log("Fetched transactions for user with id:", id);
    return transactions;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch transactions");
  }
}

export async function fetchReoccuring(user: User) {
  noStore();
  const id = user.id?.toString();
  try {
    const res = await sql<Reoccuring>`
      SELECT * FROM reoccuring
      WHERE user_id=${id}
      ORDER BY id DESC;
    `;
    const reoccuring = res.rows;
    return reoccuring;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch reoccuring recoccuring transactions");
  }
}

// get reoccuring transaction by id
export async function fetchReoccuringById(reoccuringId: Number) {
  try {
    const res = await sql<Reoccuring>`
      SELECT * FROM reoccuring
      WHERE id = ${reoccuringId.toString()};
    `;
    const reoccuring = res.rows[0];
    console.log("FETCHED REOCCURING WITH ID:", reoccuringId);
    return reoccuring;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch reoccuring transaction");
  }
}

export async function fetchTransactionsThisMonth(user: User) {
  const id = user.id?.toString();
  try {
    const res = await sql<Transaction>`
        SELECT * FROM transactions
        WHERE (user_id=${id} AND EXTRACT(MONTH from created_at) = EXTRACT(MONTH from CURRENT_DATE) AND type in ('expense', 'reoccuring', 'withdrawl'));
      `;
    const transactions = res.rows;
    return transactions;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch this month's transactions");
  }
}

export async function fetchAllTransactions(user: User) {
  noStore();
  const id = user.id?.toString();
  try {
    const res = await sql<Transaction>`
        SELECT * FROM transactions
        WHERE user_id=${id}
        ORDER BY created_at DESC
      `;
    const data = res.rows;
    return data;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch all transactions.");
  }
}

export async function fetchBalance(user_id: string) {
  noStore();

  try {
    const res = await sql<Balance>`
        SELECT * FROM balance
        WHERE user_id=${user_id}
        ORDER BY id DESC
        LIMIT 1;
      `;
    const balance = res.rows[0];
    return balance;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch balance.");
  }
}

export async function fetchRecentBalances(user_id: string) {
  noStore();

  try {
    const res = await sql<Balance>`
        SELECT * FROM balance
        WHERE user_id=${user_id}
        ORDER BY id DESC
        LIMIT 5;
      `;
    const balance = res.rows;
    // flip the array so the most recent balance is last
    return balance.reverse();
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch balance.");
  }
}
