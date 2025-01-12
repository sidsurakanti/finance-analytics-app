"use server";

import type { User } from "@/lib/definitions";
import { sql } from "@vercel/postgres";

export async function onSignIn(user: User) {
  const { id } = user;
  // const missedPaychecks = await checkForMissedPaychecks(user);
  // console.log(missedPaychecks);
  // addMissedPaychecks(missedPaychecks, id);
  updateLastLoginAndCount(id);
  return;
}

export async function updateLastLoginAndCount(user_id: string) {
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
