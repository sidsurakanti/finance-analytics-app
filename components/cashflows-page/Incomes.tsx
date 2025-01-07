import { IncomeSources } from "@/lib/definitions";
import {
  dateFormatter,
  cashFormatter,
  findNextPayDate,
  ordinalDateFormatter,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import EditIncomes from "@/components/cashflows-page/CreateIncomes";

export default function Incomes({
  incomeSources,
}: {
  incomeSources: IncomeSources[];
}) {
  return (
    <section className="h-fit bg-accent flex flex-col gap-5 border border-border rounded-xl p-6 shadow-md">
      <span className="w-full flex justify-between">
        <h1 className="text-lg">Income</h1>
        <EditIncomes user_id={incomeSources[0].user_id}/>
      </span>

      <table className="w-full table-auto">
        <thead className="h-10 px-2">
          <tr className="text-left bg-gray-100/90 dark:bg-gray-950 hover:bg-secondary border-b">
            <th scope="col"></th>
            <th className="text-center" scope="col">
              Amount
            </th>
            <th className="text-center" scope="col">
              Frequency
            </th>
            <th className="text-center" scope="col">
              Pay dates
            </th>
            <th className="text-right" scope="col">
              Next pay
            </th>
          </tr>
        </thead>
        <tbody>
          {incomeSources.map((job) => (
            <tr key={job.id.toString()}>
              <th className="h-12 text-left text-lg" scope="row">
                {job.name}
              </th>
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
    </section>
  );
}
