import { inter } from "@/styles/fonts";
import { cn, cashFormatter } from "@lib/utils";
import { Badge } from "@components/ui/badge";
import { BalanceChart } from "@/components/dashboard/BalanceChart";

type Props = {
  title: string;
  value: string;
  badge?: string;
  user_id: string;
};

export function BalanceCard({ title, value, badge, user_id }: Props) {
  return (
    <div className="h-[120px] w-full bg-accent rounded-lg p-4 flex gap-5 justify-between shadow-md border border-border">
      <div className="flex flex-col justify-between gap-3 md:gap-5">
        <span className="flex gap-3 items-center">
          <p className="text-lg text-secondary-foreground/70">{title}</p>
          {badge && <Badge className="bg-indigo-800">{badge}</Badge>}
        </span>

        <span
          className={cn(
            inter.className,
            "text-3xl md:text-4xl xl:text-[42px] 2xl:text-[55px] flex flex-row items-end gap-[3px] font-medium",
          )}
        >
          <p className="text-muted-foreground tracking-tighter">
            {cashFormatter(Number(value)).split("$")[0]}$
          </p>
          {cashFormatter(Number(value)).split("$")[1]}
        </span>
      </div>

      {/* <BalanceChart user_id={user_id} color={"sky"}/> */}
    </div>
  );
}
