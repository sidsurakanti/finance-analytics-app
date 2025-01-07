  import {
    fetchBalance,
    fetchIncomeSources,
    fetchCurrSavings,
    fetchTransactionsSorted,
    SortedData,
  } from "@/lib/data";
  import { auth } from "@/auth";
  import { User, Balance, IncomeSources, Savings } from "@/lib/definitions";
  import { findNextPayDate } from "@/lib/utils";
  import { Suspense } from "react";
  import { Skeleton } from "@components/ui/skeleton";

  import CheckingBalance from "@/components/cashflows-page/CheckingBalance";
  import Incomes from "@/components/cashflows-page/Incomes";
  import SavingsCard from "@/components/cashflows-page/Savings";
  import { ExpensesChart } from "@/components/cashflows-page/ExpensesChart";

  export default async function CashflowCards() {
    const session = await auth();
    const user = session?.user as User;

    const balance: Balance = await fetchBalance(user.id);
    const incomeSources: IncomeSources[] = await fetchIncomeSources(user);
    const expenses: SortedData[] = await fetchTransactionsSorted(user, "expense");
    const reoccuring: SortedData[] = await fetchTransactionsSorted(
      user,
      "reoccuring",
    );
    const savingsDetails: { savings: Savings; change: number } =
      await fetchCurrSavings(user);

    // console.log(savings)
    // console.log(cashflows);
    // console.log(balance);
    // console.log(incomeSources);
    // console.log(transactions)

    const incomeSourcesWNextPay: nextPaycheckDetailsT[] = incomeSources.map(
      (job) => ({
        ...job,
        nextPayDate: findNextPayDate(job.pay_dates),
      }),
    );

    const nextPaycheckDetails: nextPaycheckDetailsT = incomeSourcesWNextPay.sort(
      (a, b) => a.nextPayDate.getTime() - b.nextPayDate.getTime(),
    )[0];

    return (
      <section className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Suspense fallback={<Skeleton className="h-[700px] rounded-xl w-full" />}>
          <CheckingBalance
            balance={balance}
            paycheckDetails={nextPaycheckDetails}
          />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[700px] rounded-xl w-full" />}>
          <SavingsCard savingsDetails={savingsDetails} />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[700px] rounded-xl w-full" />}>
          <Incomes incomeSources={incomeSources} />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[700px] rounded-xl w-full" />}>
          <ExpensesChart expenses={expenses} reoccuring={reoccuring} />
        </Suspense>
      </section>
    );
  }

  export type nextPaycheckDetailsT = {
    nextPayDate: Date;
  } & IncomeSources;
