import { inter } from "@ui/styles/fonts";

type Props = {
  title: string;
  value: string;
};

export function CashflowCard({ title, value }: Props) {
  return (
    <div className="bg-[#1F1F1F] rounded-xl outline outline-[#232323] p-5 flex flex-col gap-10 text-xl">
      <p>{title}</p>
      <p className={`text-5xl ${inter.className}`}>${value}</p>
    </div>
  );
}
