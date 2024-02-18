import { inter } from "@/styles/fonts";
import { cn, cashFormatter } from "@lib/utils";
import { Badge } from "@components/ui/badge";
import { ProgressCircleWrapper } from "@components/cashflows/ProgressCircle";

type Props = {
  title: string;
  value: string;
  percentage?: number;
  badge?: string;
  insideText: boolean;
};

export function CashflowCard({
  title,
  value,
  percentage,
  badge,
  insideText,
}: Props) {
  return (
    <div className="w-full bg-accent rounded-lg p-4 flex justify-between shadow-md border border-border">
      <div className="flex flex-col justify-between gap-3 md:gap-5">
        <span className="flex gap-3 items-center">
          <p className="text-2xl text-secondary-foreground/70">{title}</p>
          {badge && <Badge className="bg-sky-700">{badge}</Badge>}
        </span>

        <span
          className={cn(
            inter.className,
            "text-3xl md:text-5xl 2xl:text-[55px] flex items-end gap-0.5 font-medium",
          )}
        >
          <p className="text-muted-foreground">
            {cashFormatter(Number(value)).split("$")[0]}$
          </p>
          {cashFormatter(Number(value)).split("$")[1]}
        </span>
      </div>

      <ProgressCircleWrapper
        value={percentage ? percentage : 0}
        insideText={insideText}
      />
    </div>
  );
}
