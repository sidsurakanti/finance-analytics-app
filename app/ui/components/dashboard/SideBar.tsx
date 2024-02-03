"use client";

import {
  CardItem,
  ReadOnlyCard,
} from "@/app/ui/components/dashboard/SideBarCard";
import { Cashflow } from "@/app/lib/definitions";
import { useReducer } from "react";
import cashflowReducer from "@/app/lib/sidebar-reducer";

type SideBarProps = {
  cashflow: Cashflow;
  thisMonthTotal: string;
};

// Displays two cards containing Savings and Income
export default function SideBar({ cashflow, thisMonthTotal }: SideBarProps) {
  // create reducer to manage form state
  const [cashflowState, dispatch] = useReducer(cashflowReducer, cashflow);

  // handlers card input change
  function handleIncomeChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "income_change",
      income: event.target.value,
    });
  }

  function handleSavingsChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "savings_change",
      savings: event.target.value,
    });
  }

  // handle form submit
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch({
      type: "submit",
    });
  }

  // * impure prop
  // bc of the fact that we're redering and updating the same card using the same input element
  return (
    <section className="w-1/5 flex flex-col space-y-6 p-10">
      <CardItem
        title="Savings"
        value={cashflowState.savings}
        handleChange={handleSavingsChange}
        handleSubmit={handleSubmit}
      />
      <CardItem
        // TODO: find a more efficient way to make income and savings a string
        title="Income"
        value={cashflowState.income}
        handleChange={handleIncomeChange}
        handleSubmit={handleSubmit}
      />
      <ReadOnlyCard title="This month" value={thisMonthTotal} />
    </section>
  );
}
