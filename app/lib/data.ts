import { sql } from "@vercel/postgres";
import { User, Cashflow } from "@/app/lib/definitions";
import { unstable_noStore as noStore } from "next/cache";
import { Transaction } from "firebase/firestore";

export async function fetchUser(email: string) {
  noStore();
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
    // TODO: only fetch 5 most recent transactions
    const res = await sql<Transaction>`
      SELECT * FROM transactions
      WHERE user_id=${id};
    `;
    const transactions = res.rows[0];

    console.log("Fetched transactions for user with id:", id);
    return transactions;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch transactions");
  }
}
