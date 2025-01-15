"use server";

import { sql } from "@vercel/postgres";
import type {
  User,
  Transaction,
  Reoccuring,
  Balance,
  IncomeSources,
  Savings,
} from "@lib/definitions";
import { unstable_noStore as noStore } from "next/cache";

// FETCH SANKEY DATA AND FORMAT
export interface TransactionTypesTotals {
  type: string;
  total_amount: number;
}

export default async function fetchTranscationsByTypes(user_id: string) {
  try {
    const res = await sql<TransactionTypesTotals>`
      SELECT type, SUM(amount) as total_amount
      FROM transactions
      WHERE user_id = ${user_id}
      GROUP BY type;
    `;
    return res.rows;
  } catch (error) {
    console.log("ERROR WHILE FETCHING TRANSACTIONS BY TYPE", error);
    throw new Error("Failed to fetch transactions by type");
  }
}

export interface TransactionCategoryTotals {
  category: string;
  total_amount: number;
}

export async function fetchTransactionByCategory(user_id: string) {
  // get all the recurring transactions with their recurring type
  try {
    const res = await sql<TransactionCategoryTotals>`
      SELECT reoccuring.category, SUM(transactions.amount) as total_amount
      FROM reoccuring
      INNER JOIN transactions
      ON transactions.name = reoccuring.name AND transactions.user_id = reoccuring.user_id
      WHERE reoccuring.user_id = ${user_id}
      GROUP BY reoccuring.category;
    `;
    return res.rows;
  } catch (error) {
    console.log("ERROR WHILE FETCHING TRANSACTIONS BY TYPE", error);
    throw new Error("Failed to fetch transactions by type");
  }
}

// BALANCE FETCH
export async function fetchBalance(user_id: string): Promise<Balance> {
  noStore();

  try {
    const res = await sql<Balance>`
        SELECT * FROM balance
        WHERE user_id=${user_id}
        ORDER BY id DESC
        LIMIT 1;
      `;

    // if there's no init balance
    // we already handle this in onboarding but i just left it here for backup
    if (res.rows.length < 1) {
      const balance = await setInitBalance(user_id);
      console.log("FETCHED BALANCE FOR:", user_id);
      return balance;
    }

    const balance = res.rows[0];
    console.log("FETCHED BALANCE FOR:", user_id);
    return balance;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch balance.");
  }
}

export async function setInitBalance(user_id: string): Promise<Balance> {
  try {
    await sql`
      INSERT INTO balance
      (amount, user_id)
      VALUES (0, ${user_id})
    `;
    console.log("SET INIT BALANCE FOR USER:", user_id);
    return { amount: "0", user_id: user_id } as Balance;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to set balance.");
  }
}

export async function fetchRecentBalances(
  user_id: string,
  limit: number = 5,
): Promise<Balance[]> {
  noStore();

  try {
    const res = await sql<Balance>`
        SELECT * FROM balance
        WHERE user_id=${user_id}
        ORDER BY id DESC
        LIMIT ${limit};
      `;
    const balance = res.rows;
    console.log("FETCHED RECENT BALANCES FOR:", user_id, "WITH LIMIT:", limit);

    // flip the array so the most recent balance is last
    return balance.reverse();
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch balance.");
  }
}

// SAVINGS FETCH
export async function fetchCurrSavings(user_id: string): Promise<{
  savings: Savings;
  change: number;
}> {
  try {
    const res = await sql<Savings>`
      SELECT * FROM savings
      WHERE user_id=${user_id}
      ORDER BY created_at DESC
      LIMIT 2
    `;
    if (res.rows.length < 1) {
      // if no savings, set init savings
      const initSavings = await setInitSavings(user_id);
      return initSavings;
    } else if (res.rows.length < 2) {
      return { savings: res.rows[0], change: 0 };
    }

    const curr_savings = res.rows[0];
    const prev_savings = res.rows[1];
    const savings_change =
      Number(curr_savings.amount) - Number(prev_savings.amount);

    console.log("FETCHED SAVINGS FOR USER:", user_id);
    return { savings: curr_savings, change: savings_change };
  } catch (error) {
    console.log("DATABASE ERROR", error);
    throw new Error("Failed to fetch savings");
  }
}

export async function setInitSavings(user_id: string) {
  try {
    await sql`
      INSERT INTO savings
      (amount, user_id)
      VALUES (0, ${user_id})
    `;
    console.log("SET INIT SAVINGS FOR USER:", user_id);
    const savings: { savings: Savings; change: number } =
      await fetchCurrSavings(user_id);
    return savings;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to add new savings");
  }
}

export async function fetchRecentSavings(user_id: number) {
  try {
    const res = await sql<Savings>`
      SELECT * FROM savings
      WHERE user_id=${user_id}
      ORDER BY created_at
      LIMIT 15
    `;
    const savings = res.rows;
    console.log("FETCHED RECENT SAVINGS FOR USER: ", user_id);
    return savings;
  } catch (error) {
    console.log("ERROR FETCHING RECENT SAVINGS: ", error);
    throw new Error("Failed to fetch recent savings");
  }
}

// INCOME SOURCES FETCH
export async function fetchIncomeSources(user: User) {
  const { id } = user;
  try {
    const res = await sql<IncomeSources>`
      SELECT * FROM income_sources
      WHERE user_id=${id};
    `;
    const incomeSources = res.rows;
    // console.log(incomeSources);
    console.log("FETCHED INCOME SOURCES FOR:", id);
    return incomeSources;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch income sources");
  }
}

// USER FETCH
export async function fetchUser(email: string) {
  try {
    const data = await sql<User>`
        SELECT * FROM users
        WHERE email=${email};
        `;
    const user = data.rows[0];
    console.log("FETCHED USER:", email);

    return user;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch user");
  }
}

// RECURRING FETCH
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
    console.log("FETCHED REOCCURING TRANSACTIONS FOR:", id);

    return reoccuring;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch reoccuring recoccuring transactions");
  }
}

// TRANSACTIONS FETCH
export type SortedData = {
  month: Date;
  total_amount: string;
};

// sorted by monthly intervals for timespan
export async function fetchTransactionsSorted(
  user: User,
  type: Transaction["type"],
  timespan: string = "6 months",
) {
  let res;

  try {
    if (timespan === "1 year") {
      res = await sql<SortedData>`
        WITH date_series AS (
          SELECT
            generate_series(
              DATE_TRUNC('month', NOW() - INTERVAL '1 year'),
              DATE_TRUNC('month', NOW()),
              '1 month'::interval
            ) AS month
        )
        SELECT d.month,
          COALESCE(SUM(t.amount), 0) AS total_amount
        FROM date_series d
        LEFT JOIN transactions t
          ON DATE_TRUNC('month', t.created_at) = d.month
          AND t.user_id = ${user.id}
          AND type=${type}
        GROUP BY d.month
        ORDER BY d.month
      `;
    } else if (timespan === "3 months") {
      res = await sql<SortedData>`
          WITH date_series AS (
            SELECT
              generate_series(
                DATE_TRUNC('month', NOW() - INTERVAL '3 months'),
                DATE_TRUNC('month', NOW()),
                '1 month'::interval
              ) AS month
          )
          SELECT d.month,
            COALESCE(SUM(t.amount), 0) AS total_amount
          FROM date_series d
          LEFT JOIN transactions t
            ON DATE_TRUNC('month', t.created_at) = d.month
            AND t.user_id = ${user.id}
            AND type=${type}
          GROUP BY d.month
          ORDER BY d.month
        `;
    } else {
      res = await sql<SortedData>`
          WITH date_series AS (
            SELECT
              generate_series(
                DATE_TRUNC('month', NOW() - INTERVAL '6 months'),
                DATE_TRUNC('month', NOW()),
                '1 month'::interval
              ) AS month
          )
          SELECT d.month,
            COALESCE(SUM(t.amount), 0) AS total_amount
          FROM date_series d
          LEFT JOIN transactions t
            ON DATE_TRUNC('month', t.created_at) = d.month
            AND t.user_id = ${user.id}
            AND type=${type}
          GROUP BY d.month
          ORDER BY d.month
        `;
    }

    const transactions: SortedData[] = res.rows;
    console.log("FETCHED GROUPED TRANSACTIONS FOR USER", user.id);
    return transactions;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch this sorted transactions");
  }
}

export async function fetchAllTransactions(user: User): Promise<Transaction[]> {
  noStore();
  const id = user.id?.toString();
  try {
    const res = await sql<Transaction>`
        SELECT * FROM transactions
        WHERE user_id=${id}
        ORDER BY created_at DESC
      `;
    const data = res.rows;
    console.log("FETCHED ALL TRANSACTIONS FOR:", id);

    return data;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch all transactions.");
  }
}
