import CardItem from "@/app/ui/CardItem"
import { Cashflow } from "@/app/lib/definitions"

type SideBarProps = {
    cashflow: Cashflow,
}

export default function SideBar ({ cashflow }: SideBarProps) {
    return (
        <div className="flex flex-col space-y-6">
            <CardItem title="Savings" value={`$${cashflow.savings}`}/>
            <CardItem title="Income" value={`$${cashflow.income}`}/>
        </div>
    )
}