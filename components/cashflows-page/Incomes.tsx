import { IncomeSources } from "@/lib/definitions";
import {
  dateFormatter,
  cashFormatter,
  findNextPayDate,
  ordinalDateFormatter,
  cn,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import CreateIncomeSource from "@/components/cashflows-page/CreateIncomes";
import { inter } from "@/styles/fonts";

export default function Incomes({
  incomeSources,
}: {
  incomeSources: IncomeSources[];
}) {
  const matches = {
    monthly: 1,
    "semi-monthly": 2,
  };
  const totalIncome = incomeSources
    .map(
      (source) =>
        Number(source.income_amt) *
        matches[source.frequency as keyof typeof matches],
    )
    .reduce((acc, num) => acc + num, 0);

  return (
    <section className="h-fit bg-accent flex flex-col gap-5 border border-border rounded-xl p-6 shadow-md">
      <span className="w-full flex justify-between">
        <h1 className="text-lg">Income</h1>
        <CreateIncomeSource user_id={incomeSources[0].user_id} />
      </span>

      <span className="flex items-end gap-2.5">
        <p
          className={cn(
            inter.className,
            "text-3xl md:text-4xl xl:text-[42px] 2xl:text-[55px] flex items-end gap-0.5 font-medium",
          )}
        >
          {cashFormatter(Number(totalIncome))}
        </p>
        <Badge className="bg-black w-fit h-fit">per month</Badge>{" "}
      </span>

      <div className="bg-gradient-to-b from-[#f4f5f6] dark:from-emerald-950 dark:to-emerald-900 to-[#edf5ef] rounded-xl py-2 px-6 shadow-md">
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
              <th className="text-right font-medium" scope="col">
                next pay
              </th>
            </tr>
          </thead>

          <tbody>
            {incomeSources.map((job) => (
              <tr key={job.id.toString()} className="">
                <td className="h-12 text-left text-lg" scope="row">
                  {job.name}
                </td>
                <td className="h-12 text-lg text-center">
                  {cashFormatter(Number(job.income_amt))}
                </td>
                <td className="h-12 text-center">
                  <Badge className="bg-emerald-700">{job.frequency}</Badge>{" "}
                </td>
                <td className="h-12 text-center">
                  {job.pay_dates
                    .map((date) => ordinalDateFormatter(Number(date)))
                    .join(", ")}
                </td>
                <td className="h-12 text-right">
                  {dateFormatter(findNextPayDate(job.pay_dates))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
