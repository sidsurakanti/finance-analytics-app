"use server";

import { sql } from "@vercel/postgres";
import type {
  User,
  Cashflow,
  Transaction,
  Reoccuring,
  Balance,
  IncomeSources,
} from "@lib/definitions";
import { fetchBalance, setInitBalance } from "@lib/data";

import { z } from "zod";
import { formSchema } from "@/schemas/login";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";

// --------- cashflows actions
interface RequiredCashflows {
  income: string;
  savings: string;
  user_id: string;
}

// add new income source
export async function createIncomeSource(
  user_id: string,
  incomeSource: {
    name: string;
    income_amt: string;
    frequency: "semi-monthly" | "monthly";
    pay_dates: Date[] | number[];
  },
) {
  const { name, income_amt, frequency, pay_dates } = incomeSource;
  const formattedPayDates = `{${pay_dates!.map((date) => `${date}`).join(",")}}`;
  console.log(formattedPayDates);
  try {
    await sql`
      INSERT INTO income_sources
      (user_id, name, income_amt, frequency, pay_dates)
      VALUES (${user_id}, ${name}, ${income_amt}, ${frequency}, ${formattedPayDates})
    `;
    revalidatePath("/cashflows");
    console.log("CREATED NEW INCOME SOURCE: ", name);
  } catch (error) {
    console.log("ERROR CREATING NEW INCOME SOURCE: ", error);
    throw new Error("Database error");
  }
}

export async function deleteIncomeSource(incomeSource: IncomeSources) {
  const id = incomeSource.id.toString();
  try {
    await sql`
      DELETE FROM income_sources
      WHERE id = ${id};
    `;
    revalidatePath("/cashflows");
    console.log("DELETED INCOME SOURCE WITH ID: ", id);
    return;
  } catch (error) {
    console.log("ERROR DELETING INCOME SOURCE: ", error);
    throw new Error("Database error");
  }
}

export async function updateIncomeSource(incomeSource: IncomeSources) {
  const { id, user_id, name, income_amt, frequency, pay_dates } = incomeSource;
  const formattedPayDates = `{${pay_dates!.map((date) => `${date}`).join(",")}}`;

  try {
    await sql`
      UPDATE income_sources
      SET 
        user_id = ${user_id},
        name = ${name},
        income_amt = ${income_amt},
        frequency = ${frequency},
        pay_dates = ${formattedPayDates}
      WHERE id = ${id.toString()}
    `;
    console.log("UPDATED INCOME SOURCE WITH ID: ", id);
    revalidatePath("/cashflows");
  } catch (error) {
    console.log("ERROR EDITING INCOME SOURCE: ", error);
    throw new Error("Database error");
  }
}

// set cashflows during cashflows onboarding
export async function setCashflows(cashflows: RequiredCashflows) {
  let { income, savings, user_id } = cashflows;

  // make sure they're not just inputing large numbers
  if (Number(income) > 1000000) income = "1000000";
  if (Number(savings) > 1000000) savings = "1000000";

  try {
    await sql`
      INSERT INTO cashflows (income, savings, user_id) 
      VALUES (${income.toString()}, ${savings.toString()}, ${user_id.toString()})
    `;
    console.log("INITIALIZED CASHFLOWS:", cashflows);
    // refetch related data so the changes show up
    revalidatePath("/cashflows");
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Database error");
  }
}

// update cashflows table when user makes changes to their income or savings
// function called only when the change is made manually by the user
// not when the user adds a paycheck transaction
export async function updateCashflows(newCashflow: Cashflow) {
  let { income, savings, user_id } = newCashflow;
  if (Number(income) > 1000000) income = "1000000";
  if (Number(savings) > 1000000) savings = "1000000";

  try {
    await sql`
            UPDATE cashflows 
            SET income = ${income.toString()}, savings = ${savings.toString()}
            WHERE user_id = ${user_id.toString()};
        `;
    console.log("UPDATED CASHFLOWS:", newCashflow);
    revalidatePath("/cashflows");
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failted to update cashflows");
  }
}

// SAVINGS
export async function updateSavings(newSavings: number, user_id: number) {
  let savings = Number(newSavings);
  if (savings > 1000000) savings = 1000000;

  try {
    await sql`
    INSERT INTO savings
    (amount, user_id)
    VALUES (${savings}, ${user_id})
  `;
    console.log("UPDATED SAVINGS:", newSavings);
    revalidatePath("/cashflows");
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to add new savings");
  }
}

// --------- transactions actions

// update income cashflow also when user adds a new paycheck transaction
export async function paycheckUpdate(newIncome: string, user_id: string) {
  let income = newIncome;
  // be fr bruh youre not making over a mil a month
  if (Number(income) > 1000000) income = "1000000";

  try {
    await sql`
            UPDATE cashflows 
            SET income = ${income}
            WHERE user_id = ${user_id};
        `;
    console.log("UPDATED PAYCHECK:", newIncome);
    revalidatePath("/dashboard");
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failted to update paycheck");
  }
}

// add a new transaction to db
export async function createTransaction(transaction: Transaction) {
  // destructure data for cleaner code
  const { name, amount, type, user_id } = transaction;

  try {
    await sql`
      INSERT INTO transactions
      (name, amount, type, user_id)
      VALUES 
          (${name}, ${amount.toString()}, ${type}, ${user_id.toString()});
    `;
    console.log("CREATED TRANSACTION:", transaction);
    revalidatePath("/transactions");
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failted to create transaction");
  }
}

// update transaction
export async function updateTransaction(transaction: Transaction) {
  const { id, name, amount, type } = transaction;

  try {
    await sql`
      UPDATE transactions
      SET name = ${name}, amount = ${amount.toString()}, type = ${type}
      WHERE id = ${id?.toString()};
    `;
    revalidatePath("/transactions");
    console.log("UPDATED TRANSACTION:", transaction);
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to update  transaction");
  }
}

export async function deleteTransaction(transaction: Transaction) {
  const { id, amount, user_id } = transaction;

  try {
    await sql`
      DELETE FROM transactions
      WHERE id = ${id?.toString()};
    `;

    // counteract balance change from deleted transaction
    updateBalance(Number(amount) * -1, transaction.user_id);
    // delete older transactions to keep table from getting too large
    deleteOldTransactions(user_id);

    // TODO: update paycheck amount too once there's a way to track prev paychecks
    console.log("DELETED TRANSACTION", transaction);
    revalidatePath("/transactions");
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to delete reoccuring transaction");
  }
}

// ------------ reoccuring actions
export async function createReoccuring(reoccuring: Reoccuring) {
  const { name, timeperiod, category, user_id } = reoccuring;

  try {
    await sql`
      INSERT INTO reoccuring
      (name, timeperiod, category, user_id)
      VALUES 
          (${name}, ${timeperiod}, ${category}, ${user_id.toString()});
    `;
    revalidatePath("/reoccuring");
    console.log("Created reoccuring", reoccuring);
  } catch (error) {
    if ((error as any).code === "23505") {
      console.log("Error: duplicate reoccuring transaction");
      return "A reoccuring transaction with that name already exists";
    }

    console.log("Database error", error);
    throw new Error("Failed to create a reoccuring transaction");
  }
}

// update reoccuring transaction
export async function updateReoccuring(reoccuring: Reoccuring) {
  const { id, name, timeperiod, category } = reoccuring;

  try {
    await sql`
      UPDATE reoccuring
      SET name = ${name}, timeperiod = ${timeperiod}, category = ${category}
      WHERE id = ${id?.toString()};
    `;
    revalidatePath("/reoccuring");
    console.log("UPDATED REOCCURING:", reoccuring);
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to update reoccuring transaction");
  }
}

export async function deleteReoccuringById(reoccuringId: Number) {
  try {
    await sql`
      DELETE FROM reoccuring
      WHERE id = ${reoccuringId.toString()};
    `;
    revalidatePath("/reoccuring");
    console.log("DELETED REOCCURING", reoccuringId);
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to delete reoccuring transaction");
  }
}

// --------- balance actions
// update balance
export async function updateBalance(change: number, user_id: string) {
  // get the current balance so we can increment it
  const balance: Balance = await fetchBalance(user_id);

  // if there's no previous balance, set the balance to the change
  const updatedBalance = balance ? Number(balance.amount) + change : change;

  // update balance by adding the change to the current balance
  try {
    // here we're inserting instead of updating
    // because we want to keep a history of the user's balance
    await sql`
      INSERT INTO balance
      (amount, user_id) 
      VALUES (${updatedBalance}, ${user_id});
    `;

    // delete older balances to keep balance table from getting too large
    deleteOldBalances(user_id);

    console.log("UPDATED BALANCE:", updatedBalance);
    revalidatePath("/dashboard");
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to update balance");
  }
}

// delete balances older than 5 latest balances
// this is to keep the balance table from getting too large
export async function deleteOldBalances(user_id: string) {
  try {
    await sql`
      DELETE FROM balance
      WHERE id NOT IN (
        SELECT id
        FROM balance
        WHERE user_id = ${user_id}
        ORDER BY id DESC
        LIMIT 50
      )
      AND user_id = ${user_id};
    `;
    console.log("DELETED OLD BALANCES");
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to delete old balances");
  }
}

// delete old transactions
// keep transactions from getting too large and to also stop brute force db attacks
// might be resource intensive, try to find a better way
export async function deleteOldTransactions(user_id: string) {
  try {
    await sql`
      DELETE FROM transactions
      WHERE id NOT IN (
        SELECT id
        FROM transactions
        WHERE user_id = ${user_id}
        ORDER BY id DESC
        LIMIT 1000
      )
      AND created_at < NOW() -  INTERVAL '1 YEAR'
      AND user_id = ${user_id};
    `;
    console.log("DELETED OLD TRANSACTIONS");
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to delete old transactions");
  }
}

// ------------ auth actions
export async function login(data: z.infer<typeof formSchema>) {
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

export async function logout() {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
}

// when user first registers
export async function createUser(user: User) {
  // destructure data and replace password with a hashed version
  const { name, email, password } = {
    ...user,
    password: await bcrypt.hash(user.password, 10),
  };

  // no need to check for duplicate users here
  // since duplicate users are not allowed by db columns bc of unique email contrainsts
  try {
    const res = await sql`
      INSERT INTO users (name, email, password) 
      VALUES (${name}, ${email}, ${password})
    `;
    console.log("CREATED NEW USER", res);

    // add init values for db!
  } catch (error) {
    // handle non unique email error
    if ((error as any).code === "23505") {
      console.log("Error: user with that email already exists");
      return "User with that email already exists";
    }

    console.log("Database error", error);
    throw new Error("Database error");
  }

  redirect("/login");
}
