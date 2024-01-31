'use client'

import CardItem from "@/app/ui/CardItem";
import { Cashflow } from "@/app/lib/definitions";
import { useReducer } from "react";
import cashflowReducer from "@/app/lib/sidebar-reducer";

type SideBarProps = {
    cashflow: Cashflow,
};

export default function SideBar ({ cashflow }: SideBarProps) {
    const [cashflowState, dispatch] = useReducer(cashflowReducer, cashflow)

    function handleIncomeChange (event: React.ChangeEvent<HTMLInputElement>) {
        dispatch ({
            type: 'income_change',
            income: event.target.value,
        })
    };

    function handleSavingsChange (event: React.ChangeEvent<HTMLInputElement>) {
        dispatch ({
            type: 'savings_change',
            savings: event.target.value,
        })
    };

    function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        dispatch ({
            type: "submit"
        });
    }

    return (
        <div className="flex flex-col space-y-6">
            <CardItem 
                title="Savings" 
                value={cashflowState.savings} 
                handleChange={handleSavingsChange}
                handleSubmit={handleSubmit}
            />
                
            <CardItem 
                title="Income" 
                value={cashflowState.income}
                handleChange={handleIncomeChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};