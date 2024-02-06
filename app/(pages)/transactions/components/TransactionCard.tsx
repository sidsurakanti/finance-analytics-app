import type { Transaction } from "@lib/definitions";

type TransactionProps = {
  transaction: Transaction;
};

export default function TransactionCard({ transaction }: TransactionProps) {
  const { name, amount, created_at } = transaction;
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
    <div >
      {/* <p> {id?.toString()} </p> */}
      <p> {name} </p>
      <p> {date} </p>
      <p> ${amount.toString()} </p>
    </div>
  );
}
