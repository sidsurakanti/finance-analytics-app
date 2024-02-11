import type { Transaction, User } from "@lib/definitions";
import { CashflowCard } from "@components/cashflows/CashflowCard";
import { fetchCashflows, fetchTransactionsThisMonth } from "@lib/data";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { Wrapper } from "@/components/cashflows/CashflowWrapper";

type Props = {
  user: User;
};

export async function CashflowPreview({ user }: Props) {
  const cashflows = await fetchCashflows(user);

  const transactionsThisMonth: Transaction[] =
    await fetchTransactionsThisMonth(user);
  const thisMonthTotal: string = transactionsThisMonth
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);

  return (
    <section className="flex flex-col md:flex-row xl:flex-col justify-between gap-2 xl:justify-end">
      {cashflows && (
        <Wrapper viewMore>
          <CashflowCard title="This month" value={thisMonthTotal} />
          <CashflowCard title="Savings" value={cashflows.savings} />
          <CashflowCard title="Income" value={cashflows.income} />
        </Wrapper>
      )}

      {!cashflows && (
        <div className="bg-accent p-4 rounded-lg text-lg flex flex-col gap-2">
          <p>
            You don&apos;t have any cashflows yet, get started by adding some.
          </p>
          <div>
            <Button size="lg">
              <Link href="/cashflows/edit">Let&apos;s go!</Link>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
