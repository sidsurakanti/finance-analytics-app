import { IncomeSources } from "@/lib/definitions";
import {
  dateFormatter,
  cashFormatter,
  findNextPayDate,
  ordinalDateFormatter,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import CreateIncomeSource from "@/components/cashflows/income/CreateIncomes";
import IncomeTotals from "@/components/cashflows/income/IncomeTotals";
import IncomeSourceActions from "@/components/cashflows/income/IncomeSourceActions";

export default function Incomes({
  incomeSources,
}: {
  incomeSources: IncomeSources[];
}) {
  const matches = {
    monthly: 1,
    "semi-monthly": 2,
  };
  const totalIncome: number = incomeSources
    .map(
      (source) =>
        Number(source.income_amt) *
        matches[source.frequency as keyof typeof matches],
    )
    .reduce((acc, num) => acc + num, 0);

  return (
    <section className="h-fit bg-accent flex flex-col gap-5 border border-border rounded-xl p-4 shadow-md">
      <span className="w-full flex justify-between">
        <h1 className="">Income</h1>
        <CreateIncomeSource user_id={incomeSources[0].user_id} />
      </span>

      <IncomeTotals totalIncome={totalIncome} />

      <div className="bg-gradient-to-b from-[#f2f2f2] to-[#efefef] dark:from-emerald-950 dark:to-emerald-900  rounded-xl py-2 px-6 shadow-md">
        <table className="w-full table-auto rounded-xl p-2">
          <thead className="h-10 px-2">
            <tr className="text-left rounded-xl">
              <th scope="col"></th>
              <th className="text-center font-medium" scope="col">
                amount
              </th>
              <th className="text-center font-medium" scope="col">
                frequency
              </th>
              <th className="text-center font-medium" scope="col">
                pay dates
              </th>
              <th className="text-center font-medium" scope="col">
                next pay
              </th>
              <th className="text-right"></th>
            </tr>
          </thead>

          <tbody>
            {incomeSources.map((job) => (
              <tr key={job.id.toString()} className="">
                <td className="h-12 text-left" scope="row">
                  {job.name}
                </td>
                <td className="h-12 text-[17px] text-center">
                  {cashFormatter(Number(job.income_amt))}
                </td>
                <td className="h-12 text-center">
                  <Badge className="bg-emerald-700">{job.frequency}</Badge>{" "}
                </td>
                <td className="h-12 text-center">
                  {job.pay_dates
                    .sort((a, b) => Number(a) - Number(b))
                    .map((date) => ordinalDateFormatter(Number(date)))
                    .join(", ")}
                </td>
                <td className="h-12 text-center">
                  {dateFormatter(findNextPayDate(job.pay_dates))}
                </td>
                <td className="text-right">
                  <IncomeSourceActions incomeSource={job} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
