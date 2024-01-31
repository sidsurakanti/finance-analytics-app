import SideBar from "@/app/ui/SideBar"
import { fetchCashflows, fetchUser, updateCashflows } from "@/app/lib/data"

export default async function Dashboard () {
    const user = await fetchUser('johndoe@gmail.com');
    const cashflows = await fetchCashflows(user);

    const newCashflow = {...cashflows, income: '7000', savings: '84000'};
    const res = await updateCashflows(newCashflow);

    return (
        <main className="min-h-screen w-4/5 mx-auto">
            <SideBar cashflow={cashflows}/>
        </main> 
    )
}