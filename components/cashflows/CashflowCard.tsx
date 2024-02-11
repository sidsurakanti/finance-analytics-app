import { inter } from "@/styles/fonts";

type Props = {
  title: string;
  value: string;
};

export function CashflowCard({ title, value }: Props) {
  return (
    <div className="bg-accent rounded-lg">
      <p>{title}</p>
      <p className={`${inter.className}`}>
        ${value}
      </p>
    </div>
  );
}
