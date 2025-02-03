import { auth } from "@/auth";
import type { User, Balance, IncomeSources, Savings } from "@/lib/definitions";

import { fetchBalance, fetchIncomeSources, fetchUser } from "@/lib/data";
import { findNextPayDate } from "@/lib/utils";
import { getLastPaycheckSyncDate } from "@/lib/actions";

import { Suspense } from "react";
import { Skeleton } from "@components/ui/skeleton";

import CheckingBalanceCard from "@/components/cashflows/balance/CheckingBalance";
import Incomes from "@/components/cashflows/income/Incomes";
import SavingsCard from "@/components/cashflows/savings/Savings";
import ExpensesCard from "@/components/cashflows/spending/ExpensesCard";
import QuickAddList from "@/components/cashflows/shortcuts/QuickAddList";
import PaychecksSyncToaster from "@/components/cashflows/income/PaychecksSyncToaster";
import SankeyChart from "@/components/cashflows/spending/Sankey";
import ShowOnboarding from "@/components/cashflows/onboarding/ShowOnboarding";

export default async function CashflowCards() {
  const session = await auth();
  // console.log(session)
  const sessionUser = session?.user as User;
  const user = await fetchUser(sessionUser.email);

  const incomeSources: IncomeSources[] = await fetchIncomeSources(user);
  // console.log(incomeSources);

  // check for missed paychecks
  const lastPaycheckSync: Date = await getLastPaycheckSyncDate(user.id);
  // const isOutdated =
  //   new Date().getTime() - new Date(lastPaycheckSync).getTime() >
  //   24 * 60 * 60 * 1000;

  const isOutdatedF = (lastSyncDate: Date) => {
    return (
      new Date().getTime() - new Date(lastSyncDate).getTime() >
      24 * 60 * 60 * 1000
    );
  };

  const isOutdated = incomeSources.some((job) =>
    isOutdatedF(job.last_paycheck_sync),
  );
  // console.log(lastPaycheckSync);

  const balance: Balance = await fetchBalance(user.id);
  // console.log(balance);

  // we're gonna use this to calculate when the next paycheck is for the balance component
  const incomeSourcesWNextPay: nextPaycheckDetailsT[] = incomeSources.map(
    (job) => ({
      ...job,
      nextPayDate: findNextPayDate(job.pay_dates),
    }),
  );
  // calculate next paycheck for bal component
  const nextPaycheckDetails: nextPaycheckDetailsT = incomeSourcesWNextPay.sort(
    (a, b) => a.nextPayDate.getTime() - b.nextPayDate.getTime(),
  )[0];

  return (
    <>
      <ShowOnboarding user={user} />
      <section className="grid grid-cols-1 lg:grid-cols-10 gap-2 ">
        <div className="col-span-5 checkingbalance">
          <Suspense
            fallback={<Skeleton className="h-[200px] rounded-xl w-full" />}
          >
            <CheckingBalanceCard
              balance={balance}
              paycheckDetails={nextPaycheckDetails}
            />
          </Suspense>
        </div>

        <div className="col-span-5 savings">
          <Suspense
            fallback={<Skeleton className="h-[200px] rounded-xl w-full" />}
          >
            <SavingsCard user={user} />
          </Suspense>
        </div>

        <div className="col-span-6 space-y-2">
          <Suspense
            fallback={<Skeleton className="h-[300px] rounded-xl w-full" />}
          >
            <div className="incomes">
              <Incomes incomeSources={incomeSources} user={user} />
            </div>
            <div className="sankey">
              <SankeyChart user={user} />
            </div>
          </Suspense>
        </div>

        <div className="col-span-4 space-y-2">
          <Suspense
            fallback={<Skeleton className="h-[700px] rounded-xl w-full" />}
          >
            <div className="spending">
              <ExpensesCard user={user} />
            </div>
            <div className="quickadd">
              <QuickAddList user={user} />
            </div>
          </Suspense>
        </div>

        {/* send out a toaster if any paychecks have landed 
      or if we've added any missed paychecks since last paycheck sync  */}
        {isOutdated && (
          <PaychecksSyncToaster
            lastPaycheckSync={lastPaycheckSync}
            incomeSources={incomeSources}
            user={user}
          />
        )}
      </section>
    </>
  );
}

export type nextPaycheckDetailsT = {
  nextPayDate: Date;
} & IncomeSources;
