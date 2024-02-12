import { inter } from "@/styles/fonts";

type Props = {
  title: string;
  value: string;
};

export function CashflowCard({ title, value }: Props) {
  return (
    <div className="h-min-fit w-full bg-accent rounded-lg p-4 flex flex-col justify-between gap-3 md:gap-14 border border-border">
      <p className="text-2xl text-secondary-foreground/70">{title}</p>
      <span
        className={`${inter.className} text-4xl md:text-5xl 2xl:text-[55px] flex flex-row items-end gap-[3px] font-medium`}
      >
        <p className="text-muted-foreground">$</p>
        <p>{value}</p>
      </span>
    </div>
  );
}
