import { inter } from "@/styles/fonts";
import { cn, cashFormatter } from "@lib/utils";
import { Badge } from "@components/ui/badge";
import { BalanceChart } from "@components/cashflows/BalanceChart";

type Props = {
  title: string;
  value: string;
  badge?: string;
  user_id: string;
};

export function BalanceCard({ title, value, badge, user_id }: Props) {
  return (
    <div className="h-min-fit w-full bg-accent rounded-lg p-4 flex flex-row justify-between items-center shadow-md border border-border">
      <div className="flex flex-col gap-3 md:gap-6">
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
          <p className="tracking-medium">{cashFormatter(Number(value))}</p>
        </span>
      </div>
      
      <div>
        <BalanceChart user_id={user_id} />
      </div>
    </div>
  );
}
