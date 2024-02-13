import { fetchCashflows, fetchTransactionsThisMonth } from "@lib/data";
import type { User, Cashflow, Transaction } from "@lib/definitions";
import { CashflowCard } from "@components/cashflows/CashflowCard";
import { Wrapper } from "@components/cashflows/CashflowWrapper";
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
          <Wrapper editText>
            <div className="h-full flex flex-col md:flex-row xl:flex-col justify-between gap-3">
              <CashflowCard title="This month" value={thisMonthTotal} />
              <CashflowCard title="Income" value={cashflows.income} />
              <CashflowCard title="Savings" value={cashflows.savings} />
            </div>
          </Wrapper>
        </div>
      )}
      {cashflows == undefined && (
        <div className="bg-accent p-4 rounded-lg text-lg flex flex-col gap-4">
          <p>
            You don&apos;t have any cashflows yet, get started by adding some.
          </p>
          <p>
            <Button size="lg">
              <Link href="/cashflows/edit">Let&apos;s go!</Link>
            </Button>
          </p>
        </div>
      )}
    </section>
  );
}
