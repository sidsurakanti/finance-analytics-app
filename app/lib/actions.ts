"use server";

import { Cashflow, Transaction } from "@lib/definitions";
import { sql } from "@vercel/postgres";

export async function updateCashflows(newCashflow: Cashflow) {
  try {
    // TODO: find a more efficient way to make income and savings a string
    const res = await sql`
            UPDATE cashflows 
            SET income = ${newCashflow.income.toString()}, savings = ${newCashflow.savings.toString()}
            WHERE user_id = ${newCashflow.user_id.toString()};
        `;
    console.log("Updated cashflow:", newCashflow);
    return res.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failted to update cashflows");
  }
}

export async function createTransaction(transaction: Transaction) {
  const { name, amount, user_id } = transaction;

  try {
    const res = await sql`
      INSERT INTO transactions
      (name, amount, user_id)
      VALUES 
          (${name}, ${amount.toString()}, ${user_id.toString()}),
    `;

    console.log("Created transaction", transaction);
    return res.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failted to create transaction");
  }
}
