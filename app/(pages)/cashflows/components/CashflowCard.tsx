import { inter } from "@ui/styles/fonts";

type Props = {
  title: string;
  value: string;
};

export function CashflowCard({ title, value }: Props) {
  return (
    <div className="bg-teal-400">
      <p>{title}</p>
      <p className={inter.className}>
        ${value}
      </p>
    </div>
  );
}
