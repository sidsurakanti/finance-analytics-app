import type { Cashflow, Transaction, User} from '@lib/definitions';
import { fetchCashflows, fetchTransactionsThisMonth } from '@lib/data';
import { auth } from "@/auth";
import { Chart } from './Chart';


export async function CashflowChart() {
  const session = await auth();
  const user = session?.user as User;

  const cashflows: Cashflow = await fetchCashflows(user);

  const transactionsThisMonth: Transaction[] =
    await fetchTransactionsThisMonth(user);
  const thisMonthTotal: string = transactionsThisMonth
    .reduce((a, b) => a + Number(b.amount), 0)
    .toFixed(2);

  
  return (
    <section className="w-[400px] h-[400px]">
      <Chart cashflows={cashflows} thisMonthTotal={Number(thisMonthTotal)} />
    </section>
  )
} 