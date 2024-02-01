"use server";

import { Cashflow } from "@/app/lib/definitions";
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
