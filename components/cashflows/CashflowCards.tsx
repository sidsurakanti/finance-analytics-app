import { fetchBalance, fetchIncomeSources, fetchCurrSavings } from "@/lib/data";
import { findNextPayDate } from "@/lib/utils";
import { auth } from "@/auth";
import type { User, Balance, IncomeSources, Savings } from "@/lib/definitions";
import { Suspense } from "react";
import { Skeleton } from "@components/ui/skeleton";

import CheckingBalance from "@/components/cashflows/balance/CheckingBalance";
import Incomes from "@/components/cashflows/income/Incomes";
import SavingsCard from "@/components/cashflows/savings/Savings";
import { Expenses } from "@/components/cashflows/spending/Expenses";
import QuickAdd from "@/components/cashflows/QuickAdd";

export default async function CashflowCards() {
  const session = await auth();
  const user = session?.user as User;

  const balance: Balance = await fetchBalance(user.id);
  const incomeSources: IncomeSources[] = await fetchIncomeSources(user);
  const savingsDetails: { savings: Savings; change: number } =
    await fetchCurrSavings(user.id);

  // console.log(savingsDetails);
  // console.log(balance);
  // console.log(incomeSources);

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
    <section className="grid grid-cols-1 lg:grid-cols-10 gap-2 mb-10">
      <div className="col-span-5">
        <Suspense
          fallback={<Skeleton className="h-[200px] rounded-xl w-full" />}
        >
          <CheckingBalance
            balance={balance}
            paycheckDetails={nextPaycheckDetails}
          />
        </Suspense>
      </div>
      <div className="col-span-5">
        <Suspense
          fallback={<Skeleton className="h-[200px] rounded-xl w-full" />}
        >
          <SavingsCard savingsDetails={savingsDetails} />
        </Suspense>
      </div>
      <div className="col-span-6 flex flex-col gap-2">
        <Suspense
          fallback={<Skeleton className="h-[300px] rounded-xl w-full" />}
        >
          <Incomes incomeSources={incomeSources} user={user} />
          <QuickAdd user={user} />
        </Suspense>
      </div>
      <div className="col-span-4">
        <Suspense
          fallback={<Skeleton className="h-[700px] rounded-xl w-full" />}
        >
          <Expenses user={user} />
        </Suspense>
      </div>
    </section>
  );
}

export type nextPaycheckDetailsT = {
  nextPayDate: Date;
} & IncomeSources;
