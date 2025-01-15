import { auth } from "@/auth";
import type { User, Balance, IncomeSources, Savings } from "@/lib/definitions";

import fetchTranscationsByTypes, {
  fetchBalance,
  fetchIncomeSources,
  fetchCurrSavings,
  fetchTransactionByCategory,
  TransactionCategoryTotals,
  TransactionTypesTotals,
} from "@/lib/data";
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
import SankeyChart from "./spending/Sankey";

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
  // console.log(lastPaycheckSync);

  const balance: Balance = await fetchBalance(user.id);
  // console.log(balance);

  const transactionCategoryTotals: TransactionCategoryTotals[] =
    await fetchTransactionByCategory(user.id);
  const transactionTypesTotals: TransactionTypesTotals[] =
    await fetchTranscationsByTypes(user.id);

  // console.log(transactionTypesTotals);

  const oneTimeTotals = Math.abs(
    Number(
      transactionTypesTotals.find((item) => item.type == "expense")
        ?.total_amount,
    ),
  );
  const recurringTotals = Math.abs(
    Number(
      transactionTypesTotals.find((item) => item.type == "reoccuring")
        ?.total_amount,
    ),
  );
  const paycheckTotals = Math.abs(
    Number(
      transactionTypesTotals.find((item) => item.type == "paycheck")
        ?.total_amount,
    ),
  );
  // console.log(transactionCategoryTotals);
  const formattedDataLinks: {
    source: number;
    target: number;
    value: number;
  }[] = transactionCategoryTotals.map((item, index) => {
    return {
      source: 2,
      target: index + 4,
      value: Math.abs(Number(item.total_amount)),
    };
  });

  const nodes: { name: string }[] = [
    {
      name: "income", // 0
    },
    {
      name: "one time", // 1
    },
    {
      name: "recurring", // 2
    },
    {
      name: "remaining", // 3
    },
  ].concat(
    transactionCategoryTotals.map((item) => {
      return { name: item.category };
    }),
  );

  const links: { source: number; target: number; value: number }[] = [
    {
      source: 0,
      target: 1,
      value: Number.isNaN(oneTimeTotals) ? 0.001 : oneTimeTotals,
    },
    {
      source: 0,
      target: 2,
      value: Number.isNaN(recurringTotals) ? 0.001 : recurringTotals,
    },
    {
      source: 0,
      target: 3,
      value: Number.isNaN(paycheckTotals - oneTimeTotals - recurringTotals)
        ? 0.001
        : paycheckTotals - oneTimeTotals - recurringTotals,
    },
  ].concat(formattedDataLinks);

  console.log(nodes);
  console.log(links);

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
    <section className="grid grid-cols-1 lg:grid-cols-10 gap-2">
      <div className="col-span-5">
        <Suspense
          fallback={<Skeleton className="h-[200px] rounded-xl w-full" />}
        >
          <CheckingBalanceCard
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
      <div className="col-span-6 space-y-2">
        <Suspense
          fallback={<Skeleton className="h-[300px] rounded-xl w-full" />}
        >
          <Incomes incomeSources={incomeSources} user={user} />
          <QuickAddList user={user} />
        </Suspense>
      </div>
      <div className="col-span-4">
        <Suspense
          fallback={<Skeleton className="h-[700px] rounded-xl w-full" />}
        >
          <ExpensesCard user={user} />
        </Suspense>
      </div>

      <SankeyChart nodes={nodes} links={links} />

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
  );
}

export type nextPaycheckDetailsT = {
  nextPayDate: Date;
} & IncomeSources;
