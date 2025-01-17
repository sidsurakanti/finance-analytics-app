"use server";

import type { User } from "@/lib/definitions";
import { fetchUser } from "@lib/data";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

import { z } from "zod";
import { formSchema } from "@/schemas/login";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";

export async function onSignIn(user: User): Promise<void> {
  const { id } = user;
  // const missedPaychecks = await checkForMissedPaychecks(user);
  // console.log(missedPaychecks);
  // addMissedPaychecks(missedPaychecks, id);
  updateLastLoginAndCount(id);
  return;
}

export async function updateLastLoginAndCount(user_id: string): Promise<void> {
  try {
    await sql`
      UPDATE users
      SET 
        last_logged_in = CURRENT_TIMESTAMP,
        login_count = login_count + 1
      WHERE id = ${user_id}
    `;
    console.log("UPDATED LAST LOGIN AND LOGIN COUNT FOR USER", user_id);
  } catch (error) {
    console.log("ERROR WHILE UPDATING DB ON LOGIN", error);
    throw error;
  }
}

export async function login(
  data: z.infer<typeof formSchema>,
): Promise<"Invalid credentials" | "Something went wrong" | undefined> {
  try {
    // call signIn from next-auth
    // @see auth.ts
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

export async function logout(): Promise<void> {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    throw error;
  }
}

export async function createUser(user: User): Promise<string> {
  const { name, email, password } = {
    ...user,
    password: await bcrypt.hash(user.password, 10),
  };

  // no need to check for duplicate users here
  // since duplicate users are not allowed by db columns bc of unique email contrainsts
  try {
    await sql`
      INSERT INTO users (name, email, password, created_at, last_paycheck_sync, provider) 
      VALUES (${name}, ${email}, ${password}, NOW(), NOW(), 'credentials')
    `;
    console.log("CREATED NEW USER", email);
    const { id } = await fetchUser(email);
    await onUserCreate(id);
    // add init values for db!
  } catch (error) {
    // handle duplicate user error (non-unique email)
    if ((error as any).code === "23505") {
      console.log("ERROR: USER WITH THAT EMAIL ALREADY EXISTS");
      return "User with that email already exists";
    }

    console.log("Database error", error);
    throw new Error("Database error");
  }

  redirect("/login");
}

// OAUTH SIGN IN AND CREATE ACC
export async function loginWithGithub() {
  try {
    // call signIn from next-auth
    // @see auth.ts
    await signIn("github");
  } catch (error) {
    throw error;
  }
}

export async function loginWithGoogle() {
  try {
    // call signIn from next-auth
    // @see auth.ts
    await signIn("google");
  } catch (error) {
    throw error;
  }
}

export async function createUserOauth(
  user: User,
): Promise<"User with that email already exists" | undefined> {
  const { name, email } = user;
  // no need to check for duplicate users here
  // since duplicate users are not allowed by db columns bc of unique email contrainsts
  try {
    await sql`
      INSERT INTO users (name, email, created_at, last_paycheck_sync, provider) 
      VALUES (${name}, ${email}, NOW(), NOW(), 'oauth')
    `;
    console.log("CREATED NEW USER", email);
    const { id } = await fetchUser(email);
    await onUserCreate(id);
    // add init values for db!
  } catch (error) {
    // handle duplicate user error (non-unique email)
    if ((error as any).code === "23505") {
      console.log("ERROR: USER WITH THAT EMAIL ALREADY EXISTS");
      return "User with that email already exists";
    }

    console.log("Database error", error);
    throw new Error("Database error");
  }
}

// add default sets for balance, savings, and recurring transactions
export async function onUserCreate(user_id: string) {
  try {
    await sql`
      INSERT INTO savings
      (amount, user_id)
      VALUES (0, ${user_id})
    `;
    console.log("SET INIT SAVINGS FOR USER");

    await sql`
      INSERT INTO balance
      (amount, user_id)
      VALUES (0, ${user_id})
    `;
    console.log("SET INIT BALANCE FOR USER");

    await addDefaultRecurringTransactions(user_id);
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to add new savings");
  }
}

export async function addDefaultRecurringTransactions(
  user_id: string,
): Promise<void> {
  const DEFAULT_RECURRING_SET = [
    {
      name: "Rent/Mortgage",
      timeperiod: "monthly",
      category: "housing",
      user_id: user_id,
    },
    {
      name: "Electricity Bill",
      timeperiod: "monthly",
      category: "bills",
      user_id: user_id,
    },
    {
      name: "Water Bill",
      timeperiod: "monthly",
      category: "bills",
      user_id: user_id,
    },
    {
      name: "Internet Bill",
      timeperiod: "monthly",
      category: "bills",
      user_id: user_id,
    },
    {
      name: "Gym Membership",
      timeperiod: "monthly",
      category: "health",
      user_id: user_id,
    },
    {
      name: "Groceries",
      timeperiod: "weekly",
      category: "food",
      user_id: user_id,
    },
    {
      name: "Gas",
      timeperiod: "weekly",
      category: "transportation",
      user_id: user_id,
    },
    {
      name: "Credit Card Bill",
      timeperiod: "monthly",
      category: "bills",
      user_id: user_id,
    },
    {
      name: "Phone Plan",
      timeperiod: "monthly",
      category: "bills",
      user_id: user_id,
    },
    {
      name: "Car Payment",
      timeperiod: "monthly",
      category: "transportation",
      user_id: user_id,
    },
  ];

  try {
    const insertQueries = DEFAULT_RECURRING_SET.map(
      (transaction) =>
        sql`
          INSERT INTO reoccuring (name, timeperiod, category, user_id)
          VALUES (${transaction.name}, ${transaction.timeperiod}, ${transaction.category}, ${transaction.user_id})
        `,
    );

    await Promise.all(insertQueries);
    console.log("SET INIT RECURRING SET FOR USER");
  } catch (error) {
    console.error("Error adding default recurring transactions:", error);
    throw new Error("FAILED TO SET INIT RECCURING TRANSACTIONS SET FOR USER");
  }
}
