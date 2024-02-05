import type { Transaction } from "@lib/definitions";

type TransactionProps = {
  transaction: Transaction;
};

export default function TransactionCard({ transaction }: TransactionProps) {
  const { id, name, amount, created_at } = transaction;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = `${months[created_at.getMonth()]} ${created_at.getDate()}, ${created_at.getFullYear()}`;

  return (
      <div className="w-full rounded-lg flex flex-row space-x-10 justify-evenly text-lg bg-[#1E1E1E] p-10">
        <p> {id?.toString()} </p>
        <p className="text-2xl"> {name} </p>
        <p> {date} </p>
        <p className="text-2xl"> ${amount.toString()} </p>
      </div>
  );
}
