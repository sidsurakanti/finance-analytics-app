import { inter } from "@/styles/fonts";

type Props = {
  title: string;
  value: string;
};

export function CashflowCard({ title, value }: Props) {
  return (
    <div className="h-full w-full bg-accent rounded-lg p-2 flex flex-col justify-between">
      <p>{title}</p>
      <p className={`${inter.className} text-3xl`}>${value}</p>
    </div>
  );
}
