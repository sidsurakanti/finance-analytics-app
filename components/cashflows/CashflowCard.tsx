import { inter } from "@/styles/fonts";
import { cn, cashFormatter } from "@lib/utils";
import { Badge } from "@components/ui/badge";
import { ProgressCircleWrapper } from "@components/dashboard/ProgressCircle";

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
    <div className="h-min-fit w-full bg-accent rounded-lg p-4 flex flex-row justify-between shadow-md border border-border">
      <div className="flex flex-col justify-between gap-3 md:gap-6">
        <span className="flex gap-2 items-center">
          <p className="text-2xl text-secondary-foreground/70">{title}</p>
          {badge && <Badge className="bg-indigo-800">{badge}</Badge>}
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

      <ProgressCircleWrapper
        value={percentage ? percentage : 0}
        insideText={insideText}
      />
    </div>
  );
}
