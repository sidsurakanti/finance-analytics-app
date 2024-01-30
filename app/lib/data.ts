import { sql } from "@vercel/postgres";
import { User } from "@/app/lib/definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchCashflows(user: User) {
    noStore();
    try {  
        const res = await sql`
            SELECT * FROM cashflows
            WHERE user_id=${user.id?.toString()};
        `;
        const cashflows = res.rows[0];
        return cashflows;
    } catch (error) {
        console.log("Database error", error);
        throw new Error("Failed to fetch cashflows")
    }
}

export async function fetchUser (email: string) {
    noStore();
    try {
        const data = await sql<User>`
            SELECT * FROM users
            WHERE email='johndoe@gmail.com';
        `;
        const user = data.rows[0];
        console.log(user)
        return user;
    } catch (error) {
        console.log("Database error", error);
        throw new Error("Failed to fetch user");
    }
}