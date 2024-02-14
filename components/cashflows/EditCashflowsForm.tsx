"use client";

import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";
import { useReducer, useState } from "react";
import { cashflowReducer } from "@lib/reducers";
import type { Cashflow } from "@/lib/definitions";
import { CheckIcon, CloseIcon } from "@components/ui/icons";
import Link from "next/link";

type Props = {
  initialCashflows: Cashflow;
};

export function EditCashflowsForm({ initialCashflows }: Props) {
  const [isEditingSavings, setIsEditingSavings] = useState(false);
  const [isEditingIncome, setIsEditingIncome] = useState(false);
  const [cashflows, dispatch] = useReducer(cashflowReducer, initialCashflows);

  const handleSavingsChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "update_savings", savings: e.target.value });
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: "update_income", income: e.target.value });
  const handleSubmit = () => {
    dispatch({ type: "submit" });
  };

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <Label htmlFor="income">Income</Label>
        <div className="flex gap-2">
          <div className="relative rounded-md w-full shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-secondary-foreground/50 sm:text-md">$</span>
            </div>
            <Input
              type="number"
              id="income"
              placeholder="0.00"
              // prevent user from submitting form with invalid data by setting value to 0.00
              value={cashflows.income ? cashflows.income : "0.00"}
              onFocus={() => setIsEditingIncome(true)}
              onChange={handleIncomeChange}
              className="p-5 pl-7 text-lg"
            />
          </div>
          {isEditingIncome && (
            <>
              <Button
                variant="secondary"
                className="hover:bg-green-400/70"
                onClick={() => {
                  setIsEditingIncome(false);
                  handleSubmit();
                }}
              >
                <CheckIcon width={20} height={20} />
              </Button>
              <Button
                variant="secondary"
                className="hover:bg-red-400/70"
                onClick={() => setIsEditingIncome(false)}
              >
                <CloseIcon width={20} height={20} />
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="savings">Savings</Label>
        <div className="flex gap-2">
          <div className="relative w-full rounded-md shadow-sm">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <p className="text-secondary-foreground/50 sm:text-md">$</p>
            </span>
            <Input
              type="number"
              id="savings"
              placeholder="0.00"
              // prevent user from submitting form with invalid data by setting value to 0.00
              value={cashflows.savings ? cashflows.savings : "0.00"}
              onClick={() => setIsEditingSavings(true)}
              onChange={handleSavingsChange}
              className="p-5 pl-7 text-lg"
            />
          </div>
          {isEditingSavings && (
            <>
              <Button
                variant="secondary"
                className="hover:bg-green-400/70"
                onClick={() => {
                  setIsEditingSavings(false);
                  handleSubmit();
                }}
              >
                <CheckIcon width={20} height={20} />
              </Button>
              <Button
                variant="secondary"
                className="hover:bg-red-400/70"
                onClick={() => setIsEditingSavings(false)}
              >
                <CloseIcon width={20} height={20} />
              </Button>
            </>
          )}
        </div>
      </div>
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
    </section>
  );
}
