"use client";

import { type SortedData, fetchTransactionsSorted } from "@/lib/data";
import type { User } from "@/lib/definitions";
import { useState, useEffect } from "react";
import { ExpensesChart } from "@/components/cashflows/spending/ExpensesChart";

export default function ExpensesCard({ user }: { user: User }) {
  const [timespan, setTimespan] = useState<"3 months" | "6 months" | "1 year">(
    "3 months",
  );
  const [expenses, setExpenses] = useState<SortedData[] | undefined>();
  const [recurring, setRecurring] = useState<SortedData[] | undefined>();
  const [paychecks, setPaychecks] = useState<SortedData[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const expenses: SortedData[] = await fetchTransactionsSorted(
        user,
        "expense",
        timespan,
      );
      const recurring: SortedData[] = await fetchTransactionsSorted(
        user,
        "reoccuring",
        timespan,
      );
      const paychecks: SortedData[] = await fetchTransactionsSorted(
        user,
        "paycheck",
        timespan,
      );

      setExpenses(expenses);
      setRecurring(recurring);
      setPaychecks(paychecks);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timespan]);

  return (
    <div className="">
      <ExpensesChart
        expenses={expenses}
        recurring={recurring}
        paychecks={paychecks}
        handleTimespanChange={setTimespan}
      />
    </div>
  );
}
