import { sql } from "@vercel/postgres";
import { User, Cashflow } from "@/app/lib/definitions";
import { unstable_noStore as noStore } from "next/cache";


export async function fetchUser (email: string) {
    noStore();
    
    try {
        const data = await sql<User>`
        SELECT * FROM users
        WHERE email='johndoe@gmail.com';
        `;
        const user = data.rows[0];
        
        console.log("Fetched user.")
        return user;
    } catch (error) {
        console.log("Database error", error);
        throw new Error("Failed to fetch user");
    }
}

export async function fetchCashflows(user: User) {
    noStore();

    try {  
        const res = await sql<Cashflow>`
            SELECT * FROM cashflows
            WHERE user_id=${user.id?.toString()};
        `;
        const cashflows = res.rows[0];

        console.log("Fetched cashflows.")
        return cashflows;
    } catch (error) {
        console.log("Database error", error);
        throw new Error("Failed to fetch cashflows");
    };
};

export async function updateCashflows (newCashflow: Cashflow) {
    // TODO: find a more efficient way to make income and savings a string too much code
    try {
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