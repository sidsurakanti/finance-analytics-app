import { fetchCashflows, fetchBalance } from "@/lib/data";
import { auth } from "@/auth";
import { User, Cashflow, Balance } from "@/lib/definitions";
import { dateFormatter, cashFormatter, findNextPayDate } from "@/lib/utils";

export default async function BalanceShow() {
  const session = await auth();
  const user = session?.user as User;
  const cashflows: Cashflow = await fetchCashflows(user);
  const balance: Balance = await fetchBalance(user.id);

  console.log(cashflows);
  console.log(balance);

  const nextPayCheckDate = dateFormatter(findNextPayDate(cashflows.pay_dates));

  return (
    <>
      Income souces:{" "}
      {cashflows.income_sources.map((source) => (
        <span key={source}>{source}</span>
      ))}
      Frequency: {cashflows.frequency}
      Pay Dates:{" "}
      {cashflows.pay_dates.map((date) => (
        <span key={date}>{date}</span>
      ))}
      Next pay: {nextPayCheckDate}
      {/* Last updated: {dateFormatter(cashflows.last_updated)} */}
      <div>Checking Balance: {cashFormatter(Number(balance.amount))}
        <span>New paycheck landing on {nextPayCheckDate}</span>
      </div>
    </>
  );
}
