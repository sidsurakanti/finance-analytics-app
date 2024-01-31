'use client'

import CardItem from "@/app/ui/CardItem";
import { Cashflow } from "@/app/lib/definitions";
import { useReducer } from "react";

type SideBarProps = {
    cashflow: Cashflow,
};

export default function SideBar ({ cashflow }: SideBarProps) {
    const [cashflowState, dispatch] = useReducer(cashflowReducer, cashflow)

    return (
        <div className="flex flex-col space-y-6">
            <CardItem title="Savings" value={`$${cashflowState.savings}`}/>
            <CardItem title="Income" value={`$${cashflowState.income}`}/>
        </div>
    );
};