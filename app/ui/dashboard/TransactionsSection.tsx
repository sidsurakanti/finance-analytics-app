import { type Transaction } from "@/app/lib/definitions";
import TransactionCard from "@/app/ui/dashboard/TransactionCard";

type TransactionSectionProps = {
  transactions: Transaction[];
};

export default function TransactionSection({
  transactions,
}: TransactionSectionProps) {
  return <section></section>;
}
