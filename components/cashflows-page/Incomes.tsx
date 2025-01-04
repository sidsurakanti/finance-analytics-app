import { IncomeSources } from "@/lib/definitions";
import { dateFormatter, cashFormatter, findNextPayDate } from "@/lib/utils";
import { Badge } from "../ui/badge";

export default function Incomes({
  incomeSources,
}: {
  incomeSources: IncomeSources[];
}) {
  return (
    <section className="w-1/2 flex flex-col gap-5 border border-gray-200 rounded-xl p-6 shadow-md">
      <h1 className="text-lg">Income</h1>
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left">
            <th scope="col"></th>
            <th className="text-center" scope="col">Amount</th>
            <th className="text-center"scope="col">Frequency</th>
            <th className="text-right" scope="col">Next pay</th>
          </tr>
        </thead>
        <tbody>
          {incomeSources.map((job) => (
            <tr className="">
              <th className="text-left text-lg" scope="row">{job.name}</th>
              <td className="text-lg text-center">{cashFormatter(Number(job.income_amt))}</td>
              <td className="text-center"><Badge className="bg-sky-500">{job.frequency}</Badge></td>
              <td className="text-right">{dateFormatter(findNextPayDate(job.pay_dates))}</td>
            </tr>
          ))}
        </tbody>
        {/* <thead>
          <tr className="font-normal">
            <th scope="col"></th>
            <th scope="col">amount</th>
            <th scope="col">frequency</th>
            <th scope="col">next pay</th>
          </tr>
        </thead> */}
      </table>
    </section>
  );
}
