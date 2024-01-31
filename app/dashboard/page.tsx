import SideBar from "@/app/ui/SideBar"
import { fetchCashflows, fetchUser, updateCashflows } from "@/app/lib/data"

export default async function Dashboard () {
    const user = await fetchUser('johndoe@gmail.com');
    const cashflows = await fetchCashflows(user);
    const newIncome = 4000;
    const res = await updateCashflows({user, newIncome})

    console.log(user);
    console.log(cashflows);
    console.log(res)

    return (
        <main className="min-h-screen w-4/5 mx-auto">
            <SideBar cashflow={cashflows}/>
        </main>
    )
}