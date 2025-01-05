import { fetchCashflows, fetchBalance, fetchIncomeSources, fetchCurrSavings } from "@/lib/data";
import { auth } from "@/auth";
import { User, Cashflow, Balance, IncomeSources, Savings } from "@/lib/definitions";
import { dateFormatter, cashFormatter, findNextPayDate } from "@/lib/utils";

import CheckingBalance from "@/components/cashflows-page/CheckingBalance";
import Incomes from "@/components/cashflows-page/Incomes";
import SavingsCard from "@/components/cashflows-page/Savings";

export default async function BalanceShow() {
  const session = await auth();
  const user = session?.user as User;

  const cashflows: Cashflow = await fetchCashflows(user);
  const balance: Balance = await fetchBalance(user.id);
  const incomeSources: IncomeSources[] = await fetchIncomeSources(user);
  const savings: Savings = await fetchCurrSavings(user);
  // console.log(savings)

  // console.log(cashflows);
  // console.log(balance);
  // console.log(incomeSources);

  // TODO: calculate next pay better
  // doesn't work when two paychecks are on the same day and doesn't use the new income_sources table
  // doesn't keep track of which job the next paycheck will be from
  const paycheckDates = incomeSources.map((job) => findNextPayDate(job.pay_dates).getTime());
  const nextPayCheckDate = dateFormatter(new Date(paycheckDates.sort((a, b) => a - b)[0]))

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <CheckingBalance
        balance={balance}
        nextPayCheck={nextPayCheckDate}
        paycheckAmt={cashflows.income}
      />
      <SavingsCard cashflows={cashflows} savings={savings} />
      <Incomes incomeSources={incomeSources}/>
    </section>
  );
}
