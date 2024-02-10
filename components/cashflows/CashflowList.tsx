import { fetchCashflows, fetchTransactionsThisMonth } from "@lib/data";
import type { User, Cashflow, Transaction } from "@lib/definitions";
import { CashflowCard } from "@components/cashflows/CashflowCard";
import { Wrapper } from "@components/cashflows/EditButtonWrapper";
import { Button } from "@components/ui/button";
import { auth } from "@/auth";
import Link from "next/link";

export async function CashflowList() {
  const session = await auth();
  const user = session?.user as User;

  const cashflows: Cashflow = await fetchCashflows(user);

  const transactionsThisMonth: Transaction[] =
    await fetchTransactionsThisMonth(user);
  const thisMonthTotal: string = transactionsThisMonth
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);

  return (
    <section>
      {!(cashflows == undefined) && (
        <div>
          {/* // TODO: find a more efficient way to do this */}
          <Wrapper>
            <CashflowCard title="This month" value={thisMonthTotal} />
            <CashflowCard title="Savings" value={cashflows.savings} />
            <CashflowCard title="Income" value={cashflows.income} />
          </Wrapper>
        </div>
      )}
      {cashflows == undefined && (
        <div>
          <p>You don't have any cashflows yet, start by adding some</p>
          <Link href="/cashflows/edit">
            <Button>Go</Button>
          </Link>
        </div>
      )}
    </section>
  );
}
