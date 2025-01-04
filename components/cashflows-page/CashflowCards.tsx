import { fetchCashflows, fetchBalance, fetchIncomeSources } from "@/lib/data";
import { auth } from "@/auth";
import { User, Cashflow, Balance, IncomeSources } from "@/lib/definitions";
import { dateFormatter, cashFormatter, findNextPayDate } from "@/lib/utils";

import CheckingBalance from "@/components/cashflows-page/CheckingBalance";
import Incomes from "@/components/cashflows-page/Incomes";

export default async function BalanceShow() {
  const session = await auth();
  const user = session?.user as User;
  const cashflows: Cashflow = await fetchCashflows(user);
  const balance: Balance = await fetchBalance(user.id);
  const incomeSources: IncomeSources[] = await fetchIncomeSources(user);

  // console.log(cashflows);
  // console.log(balance);
  console.log(incomeSources);

  // TODO: calculate next pay better
  // doesn't work when two paychecks are on the same day and doesn't use the new income_sources table
  // doesn't keep track of which job the next paycheck will be from
  const paycheckDates = incomeSources.map((job) => findNextPayDate(job.pay_dates).getTime());
  const nextPayCheckDate = dateFormatter(new Date(paycheckDates.sort((a, b) => a - b)[0]))

  return (
    <section className="flex flex-row gap-5">
      <CheckingBalance
        balance={balance}
        nextPayCheck={nextPayCheckDate}
        paycheckAmt={cashflows.income}
      />
      <Incomes incomeSources={incomeSources}/>
    </section>
  );
}
