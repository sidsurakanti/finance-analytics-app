import { type Transaction } from "@/app/lib/definitions";

export default function Transaction(transaction: Transaction) {
  const { id, name, amount, created_at } = transaction;

  return (
    <div>
      <p> {id?.toString()} </p>
      <p> {name} </p>
      <p> {amount.toString()} </p>
      <p> {created_at?.toDateString()} </p>
    </div>
  );
}
