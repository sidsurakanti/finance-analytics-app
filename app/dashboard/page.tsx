import SideBar from "@/app/ui/SideBar"
import { fetchCashflows, fetchUser } from "@/app/lib/data"

export default async function Dashboard () {
    const user = await fetchUser('johndoe@gmail.com');
    const cashflows = await fetchCashflows(user);

    return (
        <main className="min-h-screen w-4/5 mx-auto">
            <SideBar cashflow={cashflows}/>
        </main> 
    )
}