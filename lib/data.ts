"use server";

import { sql } from "@vercel/postgres";
import type {
  User,
  Cashflow,
  Transaction,
  Reoccuring,
  Balance,
  IncomeSources,
  Savings,
} from "@lib/definitions";
import { unstable_noStore as noStore } from "next/cache";
import { updateSavings } from "./actions";

export async function fetchCurrSavings(user_id: string) {
  try {
    const res = await sql<Savings>`
      SELECT * FROM savings
      WHERE user_id=${user_id}
      ORDER BY created_at DESC
      LIMIT 2
    `;
    if (res.rows.length < 1) {
      // no savings so set init savings
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

// fetch user
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

// fetching cashflows table
export async function fetchCashflows(user: User) {
  noStore();
  const id = user.id?.toString();

  try {
    const res = await sql<Cashflow>`
          SELECT * FROM cashflows
          WHERE user_id=${id};
        `;
    const cashflows = res.rows[0];
    console.log("FETCHED CASHFLOWS FOR ID:", id);
    // console.log(cashflows);
    // console.log(cashflows.last_updated)
    return cashflows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch cashflows.");
  }
}

// fetching reoccuring table
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

export async function fetchReoccuringWUserId(user_id: User["id"]) {
  noStore();

  try {
    const res = await sql<Reoccuring>`
      SELECT * FROM reoccuring
      WHERE user_id=${user_id}
      ORDER BY id DESC;
    `;
    const reoccuring = res.rows;
    console.log("FETCHED REOCCURING TRANSACTIONS FOR:", user_id);

    return reoccuring;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch reoccuring recoccuring transactions");
  }
}

// fetching transactions table
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
    console.log("FETCHED TRANSACTIONS FOR", id);

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
        WHERE (user_id=${id} AND EXTRACT(MONTH from created_at) = EXTRACT(MONTH from CURRENT_DATE) AND type in ('expense', 'reoccuring', 'withdrawl'));
      `;
    const transactions = res.rows;
    console.log("FETCHED TRANSACTIONS FOR THIS MONTH:", id);

    return transactions;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch this month's transactions");
  }
}

export type SortedData = {
  month: Date;
  total_amount: string;
};

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
    console.log("FETCHED ALL TRANSACTIONS FOR:", id);

    return data;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch all transactions.");
  }
}

// fetching balance table
export async function fetchBalance(user_id: string) {
  noStore();

  try {
    const res = await sql<Balance>`
        SELECT * FROM balance
        WHERE user_id=${user_id}
        ORDER BY id DESC
        LIMIT 1;
      `;
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

export async function setInitBalance(user_id: string) {
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

export async function fetchRecentBalances(user_id: string, limit: number = 5) {
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
