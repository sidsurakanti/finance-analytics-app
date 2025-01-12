"use client";

import { useToast } from "@/components/hooks/use-toast";
import { addMissedPaychecks, checkForMissedPaychecks } from "@/lib/actions";
import { IncomeSources, User } from "@/lib/definitions";
import { cashFormatter } from "@/lib/utils";
import { useState, useEffect } from "react";

export function DispatchToaster({
  lastPaycheckSync,
  incomeSources,
  user,
}: {
  lastPaycheckSync: Date;
  incomeSources: IncomeSources[];
  user: User;
}) {
  const { toast } = useToast();
  const [hasChecked, setHasChecked] = useState<boolean>();

  useEffect(() => {
    if (!hasChecked) {
      const func = async () => {
        const missedPaychecks: number[][] = await checkForMissedPaychecks(
          incomeSources,
          lastPaycheckSync,
        );
        // console.log(missedPaychecks);
        if (
          missedPaychecks.length === 2 &&
          missedPaychecks.every(
            (arr) => arr.length === 2 && arr[0] === 0 && arr[1] === 0,
          )
        ) {
          setHasChecked(true);
          return;
        }
        await addMissedPaychecks(missedPaychecks, user.id);

        missedPaychecks.forEach(([missedPaychecks, missedIncome]) => {
          const description =
            missedPaychecks > 1
              ? `We've noticed you missed ${missedPaychecks} paycheck(s), totaling ${cashFormatter(missedIncome)}. We've added this amount to your checking balance!`
              : `Your latest paycheck of ${cashFormatter(missedIncome)} has been added to your balance.`;

          toast({
            title: "You've been paid!",
            description: description,
          });
        });

        setHasChecked(true);
      };

      func();
    }
  });

  return null;
}
