"use client";

import { useToast } from "@/components/ui/hooks/use-toast";
import {
  type MissedPaycheckT,
  addMissedPaychecks,
  checkForMissedPaychecks,
} from "@/lib/actions";
import { IncomeSources, User } from "@/lib/definitions";
import { cashFormatter } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { ToastAction } from "@/components/ui/toast";

export default function PaychecksSyncToaster({
  lastPaycheckSync,
  incomeSources,
  user,
}: {
  lastPaycheckSync: Date;
  incomeSources: IncomeSources[];
  user: User;
}) {
  const { toast } = useToast();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;

    const func = async () => {
      // get missed paycheck data for each income source a user has
      const missedPaychecks: MissedPaycheckT[] = await checkForMissedPaychecks(
        incomeSources,
        lastPaycheckSync,
      );
      // console.log(missedPaychecks);

      // if user hasn't missed any paychecks for all incomeSources
      if (missedPaychecks.every((arr) => arr.missedPaychecksCount < 1)) {
        hasChecked.current = true;
        return;
      }

      // missed paychecks details per income source
      // len of missedPaychecks = incomeSources.length
      for (const missed of missedPaychecks) {
        const { incomeSource, missedPaychecksCount, missedIncome } = missed;

        if (missedPaychecksCount === 0) continue;

        await addMissedPaychecks(missed, user.id);

        const description =
          missedPaychecksCount > 1
            ? `Missed ${missedPaychecksCount} paycheck(s) from ${incomeSource.name}, totaling ${cashFormatter(missedIncome)}. Added to your balance!`
            : `Your latest paycheck of ${cashFormatter(missedIncome)} from ${incomeSource.name} has been added to your balance.`;

        toast({
          title: "You've been paid!",
          description,
          action: <ToastAction altText="dismiss">dismiss</ToastAction>,
        });
      }

      hasChecked.current = true;
    };

    func();
  });

  return null;
}
