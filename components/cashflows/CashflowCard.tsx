import { inter } from "@/styles/fonts";
import { cn, cashFormatter } from "@lib/utils";
import { Badge } from "@components/ui/badge";

type Props = {
  title: string;
  value: string;
  badge?: string;
};

export function CashflowCard({ title, value, badge }: Props) {
  return (
    <div className="h-min-fit w-full bg-accent rounded-lg p-5 flex flex-col justify-between gap-3 md:gap-14 border border-border">
      <span className="flex gap-2 items-center">
        <p className="text-2xl text-secondary-foreground/70">{title}</p>
        {badge && <Badge className="bg-violet-900">{badge}</Badge>}
      </span>

      <span
        className={cn(
          inter.className,
          "text-4xl md:text-5xl 2xl:text-[55px] flex flex-row items-end gap-[3px] font-medium",
        )}
      >
        <p className="text-muted-foreground">$</p>
        <p>{cashFormatter(Number(value))}</p>
      </span>
    </div>
  );
}
