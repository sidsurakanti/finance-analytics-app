import { sql } from "@vercel/postgres";
import { User, Cashflow } from "@/app/lib/definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchCashflows(user: User) {
    noStore();
    try {  
        const res = await sql<Cashflow>`
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
        return user;
    } catch (error) {
        console.log("Database error", error);
        throw new Error("Failed to fetch user");
    }
}

type updaterProps = {
    user: User,
    newIncome: Number,
}

export async function updateCashflows ({user, newIncome}: updaterProps) {
    try {
        const res = await sql`
            UPDATE cashflows 
            SET income = ${newIncome.toString()}
            WHERE user_id = ${user.id?.toString()};
        `;
        return res.rows;
    } catch (error) {
        console.log("Database error", error);
        throw new Error("Failted to update cashflows");
    }
}