import { inter } from "@/styles/fonts";

type Props = {
  title: string;
  value: string;
};

export function CashflowCard({ title, value }: Props) {
  return (
    <div className="h-min-fit w-full bg-accent rounded-lg p-4 flex flex-col justify-between md:gap-20 outline outline-inside outline-1 outline-slate-700/90">
      <p className="text-lg">{title}</p>
      <p className={`${inter.className} text-4xl xl:text-5xl`}>${value}</p>
    </div>
  );
}
