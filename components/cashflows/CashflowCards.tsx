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
import {
  getLastPaycheckSyncDate,
  checkForMissedPaychecks,
  addMissedPaychecks,
} from "@/lib/actions";
import { DispatchToaster } from "./income/MissedPaychecks";

export default async function CashflowCards() {
  const session = await auth();
  const user = session?.user as User;

  const incomeSources: IncomeSources[] = await fetchIncomeSources(user);
  const savingsDetails: { savings: Savings; change: number } =
    await fetchCurrSavings(user.id);
  // console.log(savingsDetails);
  // console.log(incomeSources);

  // check for missed paychecks
  const lastPaycheckSync = await getLastPaycheckSyncDate(user.id);
  const isOutdated =
    new Date().getTime() - new Date(lastPaycheckSync).getTime() >
    24 * 60 * 60 * 1000;

  // if (
  //   new Date().getTime() - new Date(lastPaycheckSync).getTime() >
  //   24 * 60 * 60 * 1000
  // ) {
  //   const missedPaychecks: number[][] = await checkForMissedPaychecks(
  //     incomeSources,
  //     lastPaycheckSync,
  //   );
  //   missedPaychecksDispatch = missedPaychecks;
  //   // console.log(missedPaychecks);
  //   addMissedPaychecks(missedPaychecks, user.id);
  // }
  // console.log(lastPaycheckSync);

  const balance: Balance = await fetchBalance(user.id);
  // console.log(balance);

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
      {isOutdated && (
        <DispatchToaster
          lastPaycheckSync={lastPaycheckSync}
          incomeSources={incomeSources}
          user={user}
        />
      )}
    </section>
  );
}

export type nextPaycheckDetailsT = {
  nextPayDate: Date;
} & IncomeSources;
