import {
  fetchCashflows,
  fetchBalance,
  fetchIncomeSources,
  fetchCurrSavings,
} from "@/lib/data";
import { auth } from "@/auth";
import {
  User,
  Cashflow,
  Balance,
  IncomeSources,
  Savings,
} from "@/lib/definitions";
import { dateFormatter, cashFormatter, findNextPayDate } from "@/lib/utils";

import CheckingBalance from "@/components/cashflows-page/CheckingBalance";
import Incomes from "@/components/cashflows-page/Incomes";
import SavingsCard from "@/components/cashflows-page/Savings";

export default async function CashflowCards() {
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

  const incomeSourcesWNextPay: nextPaycheckDetailsT[] = incomeSources.map((job) => ({
    ...job,
    nextPayDate: findNextPayDate(job.pay_dates),
  }));

  const nextPaycheckDetails: nextPaycheckDetailsT = incomeSourcesWNextPay.sort((a, b) => a.nextPayDate.getTime() - b.nextPayDate.getTime())[0]

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <CheckingBalance
        balance={balance}
        paycheckDetails={nextPaycheckDetails}
      />
      <SavingsCard cashflows={cashflows} savings={savings} />
      <Incomes incomeSources={incomeSources} />
    </section>
  );
}

export type nextPaycheckDetailsT = {
  nextPayDate: Date;
} & IncomeSources;