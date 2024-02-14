"use server";

import type { User, Cashflow, Transaction, Reoccuring } from "@lib/definitions";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { formSchema } from "@/schemas/login";
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

// transaction actions
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
    createTransaction({
      name,
      amount,
      type: "reoccuring",
      created_at: new Date(),
      user_id,
    });
    revalidatePath("/reoccuring");
    console.log("Created reoccuring", reoccuring);
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to create a reoccuring transaction");
  }
}

// auth actions
export async function authenticate(data: z.infer<typeof formSchema>) {
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
    await signOut({});
  } catch (error) {
    throw error;
  }
}

export async function createUser(user: User) {
  // encrypt password and destructure data
  const { name, email, password } = {
    ...user,
    password: await bcrypt.hash(user.password, 10),
  };

  try {
    // * duplicate users are not allowed by db columns bc of unique email contrainsts
    const res = await sql`
      INSERT INTO users (name, email, password) 
      VALUES (${name}, ${email}, ${password})
    `;
    console.log("Created new user", res);
  } catch (error) {
    if ((error as any).code === "23505") {
      console.log("Error: user with that email already exists");
      return "User with that email already exists";
    }
    console.log("Database error", error);
    throw new Error("Database error");
  }
  redirect("/login");
}
