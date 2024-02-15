"use server";

import { sql } from "@vercel/postgres";
import type { User, Cashflow, Transaction, Reoccuring } from "@lib/definitions";

import { z } from "zod";
import { formSchema } from "@/schemas/login";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";

// cashflow actions
export async function setCashflows(cashflows: Cashflow) {
  try {
    const res = await sql`
      INSERT INTO cashflows (income, savings, user_id) 
      VALUES (${cashflows.income.toString()}, ${cashflows.savings.toString()}, ${cashflows.user_id.toString()})
    `;
    console.log("Created new cashflows", cashflows, res);
    revalidatePath("/cashflows");

    return res.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Database error");
  }
}

export async function updateCashflows(newCashflow: Cashflow) {
  try {
    const res = await sql`
            UPDATE cashflows 
            SET income = ${newCashflow.income.toString()}, savings = ${newCashflow.savings.toString()}
            WHERE user_id = ${newCashflow.user_id.toString()};
        `;
    console.log("Updated cashflow:", newCashflow);
    revalidatePath("/cashflows");

    return res.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failted to update cashflows");
  }
}

// update savings when user adds a new paycheck
export async function paycheckUpdate(newIncome: string, user_id: string) {
  try {
    const res = await sql`
            UPDATE cashflows 
            SET income = ${newIncome}
            WHERE user_id = ${user_id};
        `;
    console.log("Updated paycheck:", newIncome);
    revalidatePath("/cashflows");

    return res.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failted to update paycheck");
  }
}

// update savings
export async function savingsUpdate(newSavings: string, user_id: string) {
  try {
    const res = await sql`
            UPDATE cashflows 
            SET savings = savings + ${newSavings}
            WHERE user_id = ${user_id};
        `;
    console.log("Updated savings:", newSavings);
    revalidatePath("/cashflows");

    return res.rows;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failted to update paycheck");
  }
}

// add a new transaction to db
export async function createTransaction(transaction: Transaction) {
  const { name, amount, type, user_id } = transaction;
  try {
    await sql`
      INSERT INTO transactions
      (name, amount, type, user_id)
      VALUES 
          (${name}, ${amount.toString()}, ${type}, ${user_id.toString()});
    `;

    console.log("Created transaction", transaction);
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failted to create transaction");
  }

  revalidatePath("/transactions");
}

// reoccuring actions
export async function createReoccuring(reoccuring: Reoccuring) {
  const { name, amount, timeperiod, category, user_id } = reoccuring;

  try {
    await sql`
      INSERT INTO reoccuring
      (name, amount, timeperiod, category, user_id)
      VALUES 
          (${name}, ${amount.toString()}, ${timeperiod}, ${category}, ${user_id.toString()});
    `;

    // if reoccuring monthly, add the reoccuring transaction to the transactions table
    // don't add bi-annual or annual reoccuring transactions to the transactions table
    // this is to not add on to this month's expenses
    // TODO: find a more efficent way to do this
    if (timeperiod === "monthly") {
      createTransaction({
        name,
        amount,
        type: "reoccuring",
        created_at: new Date(),
        user_id,
      });
    }

    revalidatePath("/reoccuring");
    console.log("Created reoccuring", reoccuring);
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to create a reoccuring transaction");
  }
}

// auth actions
export async function login(data: z.infer<typeof formSchema>) {
  try {
    await signIn("credentials", data);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong";
      }
    }
    throw error;
  }
}

export async function logout() {
  try {
    // call sign out method
    await signOut();
  } catch (error) {
    throw error;
  }
}

// create a new user
export async function createUser(user: User) {
  // destructure data and encrypt password
  const { name, email, password } = {
    ...user,
    password: await bcrypt.hash(user.password, 10),
  };

  // * duplicate users are not allowed by db columns bc of unique email contrainsts
  try {
    const res = await sql`
      INSERT INTO users (name, email, password) 
      VALUES (${name}, ${email}, ${password})
    `;
    console.log("Created new user", res);
  } catch (error) {
    // handle non unique column email error
    if ((error as any).code === "23505") {
      console.log("Error: user with that email already exists");
      return "User with that email already exists";
    }

    console.log("Database error", error);
    throw new Error("Database error");
  }

  redirect("/login");
}
