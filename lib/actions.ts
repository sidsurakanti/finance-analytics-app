"use server";

import { sql } from "@vercel/postgres";
import type {
  User,
  Transaction,
  Reoccuring,
  Balance,
  IncomeSources,
} from "@lib/definitions";
import { fetchBalance } from "@lib/data";

import { revalidatePath } from "next/cache";

import { calculateLastPaidDiff } from "@/lib/utils";

// PAYCHECK SYNC HANDLING
export async function getLastPaycheckSyncDate(user_id: string) {
  try {
    const { rows } = await sql`
      SELECT (last_paycheck_sync) FROM users
      WHERE id=${user_id};
    `;
    const { last_paycheck_sync } = rows[0];
    return last_paycheck_sync;
  } catch (error) {
    console.log("FAILED TO FETCH LAST PAYCHECK SYNC DATE", error);
    throw new Error("Error while fetching last paycheck sync date");
  }
}

export type MissedPaycheckT = {
  incomeSource: IncomeSources;
  missedPaychecksCount: number;
  missedIncome: number;
  paycheckDatesMissed: Date[];
};

export async function checkForMissedPaychecks(
  incomeSources: IncomeSources[],
  // lastSyncedDate: Date,
): Promise<MissedPaycheckT[]> {
  // for each income source
  const ret = incomeSources.map((job) => {
    // check how many times they've missed their paycheck
    const [missedPaychecksCount, dates] = calculateLastPaidDiff(
      // lastSyncedDate, // new Date("2024-12-05"),
      job.last_paycheck_sync,
      job.pay_dates, // ex: [1, 15]
    );

    // get total income missed throughout missed paychecks
    const missedIncome = missedPaychecksCount * Number(job.income_amt);

    return {
      incomeSource: job,
      missedPaychecksCount: missedPaychecksCount,
      missedIncome: missedIncome,
      paycheckDatesMissed: dates,
    };
  });

  return ret;
}

export async function addMissedPaychecks(
  missedPaychecksDetails: MissedPaycheckT,
  user_id: string,
) {
  missedPaychecksDetails.paycheckDatesMissed.forEach((date) => {
    const newPaycheckTransaction: Transaction = {
      name: `Missed paycheck (${missedPaychecksDetails.incomeSource.name})`,
      amount:
        missedPaychecksDetails.missedIncome /
        missedPaychecksDetails.missedPaychecksCount,
      user_id: user_id,
      type: "paycheck",
      created_at: date,
    };
    console.log(newPaycheckTransaction);
    createTransaction(newPaycheckTransaction, false);
  });
  // console.log(missedPaycheck.paycheckDatesMissed);

  updateBalance(missedPaychecksDetails.missedIncome, user_id, false);
  // create a new transaction for paycheck
  // set lastPaycheckSyncDate to now
  setPaycheckSyncDate(missedPaychecksDetails.incomeSource);
  revalidatePath("/cashflows");
  console.log(
    "ADD MISSED PAYCHECKS INTO CHECKING BALANCE, TOTALING:",
    missedPaychecksDetails.missedIncome,
  );
  return;
}

export async function setPaycheckSyncDate(job: IncomeSources) {
  const { id, user_id } = job;
  const now = new Date();
  const formattedDate = now.toISOString().split("T")[0]; // get date in YYYY-MM-DD

  try {
    await sql`
      UPDATE income_sources
      SET 
        last_paycheck_sync = ${formattedDate}
      WHERE id = ${id.toString()};
    `;
    await sql`
      UPDATE users
      SET 
        last_paycheck_sync = ${formattedDate}
      WHERE id = ${user_id};
    `;
  } catch (error) {
    console.log("ERROR WHILE SETTING PAYCHECK SYNC DATE", error);
    throw new Error("Failed to set paycheck sync date");
  }
}

// INCOME SOURCES
export async function createIncomeSource(
  user_id: string,
  incomeSource: {
    name: string;
    income_amt: string;
    frequency: "semi-monthly" | "monthly";
    pay_dates: string[];
  },
) {
  const { name, income_amt, frequency, pay_dates } = incomeSource;
  const formattedPayDates = `{${pay_dates!.map((date) => `${date}`).join(",")}}`;
  // console.log(formattedPayDates);

  try {
    await sql`
      INSERT INTO income_sources
      (user_id, name, income_amt, frequency, pay_dates, created_at, last_paycheck_sync)
      VALUES (${user_id}, ${name}, ${income_amt}, ${frequency}, ${formattedPayDates}, NOW(), NOW())
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

// SAVINGS
export async function updateSavings(newSavings: number, user_id: number) {
  let savings = Number(newSavings);
  if (savings > 1000000) savings = 1000000;
  if (savings < -1000000) savings = 0;
  console.log(savings);
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
    throw new Error("Failed to update savings");
  }
}

// BALANCE ACTIONS
export async function updateBalance(
  change: number,
  user_id: string,
  refreshPath: boolean = true,
) {
  const balance: Balance = await fetchBalance(user_id);
  // if there's no previous balance, set the balance to the change
  // backup if there was no init balance during onboarding
  let updatedBalance = balance ? Number(balance.amount) + change : change;

  // deal with absurd entries
  if (updatedBalance > 1000000) updatedBalance = 1000000;
  if (updatedBalance < -1000000) updatedBalance = -1000000;

  try {
    // insert instead of updating to keep history of balance
    await sql`
      INSERT INTO balance
      (amount, user_id) 
      VALUES (${updatedBalance}, ${user_id});
    `;

    // delete older balances to keep balance table from getting too large
    deleteOldBalances(user_id);
    console.log("UPDATED BALANCE:", updatedBalance);
    if (refreshPath) revalidatePath("/cashflows");
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to update balance");
  }
}

// keep old balances from cluttering up the db
// we won't be using all those extra balances anyway
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

// TRANSACTION ACTIONS

export async function createTransaction(
  transaction: Transaction,
  refreshPath: boolean = true,
) {
  // destructure data for cleaner code
  const { name, amount, type, user_id, created_at } = transaction;
  const formattedDate = created_at.toISOString().split("T")[0] + " 00:00:00";

  try {
    await sql`
      INSERT INTO transactions
      (name, amount, type, user_id, created_at)
      VALUES 
          (${name}, ${amount.toString()}, ${type}, ${user_id.toString()}, ${formattedDate});
    `;
    console.log("CREATED TRANSACTION:", transaction);
    if (refreshPath) revalidatePath("/transactions");
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

    // reflect deleted trasaction in balance
    updateBalance(Number(amount) * -1, transaction.user_id, false);
    // delete older transactions to keep table from getting too large
    deleteOldTransactions(user_id);

    console.log("DELETED TRANSACTION", transaction);
    revalidatePath("/transactions");
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to delete reoccuring transaction");
  }
}

// RECURRING ACTIONS
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
    console.log("CREATED RECURRING", reoccuring);
  } catch (error) {
    if ((error as any).code === "23505") {
      console.log("Error: duplicate reoccuring transaction");
      return "A reoccuring transaction with that name already exists";
    }

    console.log("Database error", error);
    throw new Error("Failed to create a reoccuring transaction");
  }
}

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
