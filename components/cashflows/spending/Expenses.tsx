"use client";

import { type SortedData, fetchTransactionsSorted } from "@/lib/data";
import type { User } from "@/lib/definitions";
import { useState, useEffect } from "react";
import { ExpensesChart } from "@/components/cashflows/spending/ExpensesChart";

export function Expenses({ user }: { user: User }) {
  const [timespan, setTimespan] = useState<"3 months" | "6 months" | "1 year">(
    "3 months",
  );
  const [expenses, setExpenses] = useState<SortedData[] | undefined>();
  const [reoccuring, setReoccuring] = useState<SortedData[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const expenses: SortedData[] = await fetchTransactionsSorted(
        user,
        "expense",
        timespan,
      );
      const reoccuring: SortedData[] = await fetchTransactionsSorted(
        user,
        "reoccuring",
        timespan,
      );

      setExpenses(expenses);
      setReoccuring(reoccuring);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timespan]);

  return (
    <div>
      <ExpensesChart
        expenses={expenses}
        reoccuring={reoccuring}
        handleTimespanChange={setTimespan}
      />
    </div>
  );
}
