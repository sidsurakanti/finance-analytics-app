"use client";

import { SheetClose } from "@components/ui/sheet";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";
import { EditCashflowsInput } from "@components/cashflows/EditCashflowsInput";

import { useReducer, useState } from "react";
import { cashflowReducer } from "@lib/reducers";
import { type Cashflow } from "@lib/definitions";

import Link from "next/link";

type Props = {
  initialCashflows: Cashflow;
};

export function EditCashflowsForm({ initialCashflows }: Props) {
  // local state to handle editing state
  const [isEditingSavings, setIsEditingSavings] = useState(false);
  const [isEditingIncome, setIsEditingIncome] = useState(false);
  // create a reducer to handle input states and submit actions
  const [cashflows, dispatch] = useReducer(cashflowReducer, initialCashflows);

  // handlers for reducer
  const handleSavingsChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "update_savings", savings: e.target.value });
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "update_income", income: e.target.value });
  const handleSubmit = () => {
    dispatch({ type: "submit" });
  };

  return (
    <section className="flex flex-col gap-3 pt-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="income">Income</Label>
        <EditCashflowsInput
          value={cashflows.income}
          isEditing={isEditingIncome}
          setIsEditing={setIsEditingIncome}
          handleSubmit={handleSubmit}
          handleChange={handleIncomeChange}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="savings">Savings</Label>
        <EditCashflowsInput
          value={cashflows.savings}
          isEditing={isEditingSavings}
          setIsEditing={setIsEditingSavings}
          handleSubmit={handleSubmit}
          handleChange={handleSavingsChange}
        />
      </div>

      {/* save all button (only show when editing input fields) */}
      {(isEditingIncome || isEditingSavings) && (
        <Link href="/cashflows">
          <Button
            variant="secondary"
            className="hover:bg-blue-500 w-full"
            onClick={() => {
              setIsEditingSavings(false);
              setIsEditingIncome(false);
              handleSubmit();
            }}
          >
            Save all
          </Button>
        </Link>
      )}

      <SheetClose>
        <Button className="w-full hover:bg-rose-500" variant="secondary">
          Close
        </Button>
      </SheetClose>
    </section>
  );
}
