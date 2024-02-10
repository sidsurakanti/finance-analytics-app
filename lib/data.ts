import { sql } from "@vercel/postgres";
import { User, Cashflow, Transaction } from "@lib/definitions";
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
      LIMIT 5;
    `;
    const transactions = res.rows;

    console.log("Fetched transactions for user with id:", id);
    return transactions;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch transactions");
  }
}

export async function fetchTransactionsThisMonth(user: User) {
  const id = user.id?.toString();
  try {
    const res = await sql<Transaction>`
        SELECT * FROM transactions
        WHERE (user_id=${id} AND EXTRACT(MONTH from created_at) = EXTRACT(MONTH from CURRENT_DATE));
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
