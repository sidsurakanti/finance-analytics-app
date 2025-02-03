"use client";

import { useToast } from "@/components/ui/hooks/use-toast";
import {
  type MissedPaycheckT,
  addMissedPaychecks,
  checkForMissedPaychecks,
} from "@/lib/actions";
import { IncomeSources, User } from "@/lib/definitions";
import { cashFormatter } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { ToastAction } from "@/components/ui/toast";

export default function PaychecksSyncToaster({
  incomeSources,
  user,
}: {
  incomeSources: IncomeSources[];
  user: User;
}) {
  const { toast } = useToast();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return; // don't run this effect if it's already ran once

    const func = async () => {
      // check for missed paycheck and get missed paycheck data for each income source
      const missedPaychecks: MissedPaycheckT[] =
        await checkForMissedPaychecks(incomeSources);

      // cancel if user hasn't missed any paychecks for all incomeSources
      if (missedPaychecks.every((arr) => arr.missedPaychecksCount < 1)) {
        hasChecked.current = true;
        return;
      }

      for (const missed of missedPaychecks) {
        const { incomeSource, missedPaychecksCount, missedIncome } = missed;
        if (missedPaychecksCount === 0) continue; // no missed paychecks for this job

        await addMissedPaychecks(missed, user.id);

        // construct and dispatch toast to UI
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
