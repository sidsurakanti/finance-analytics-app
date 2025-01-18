"use client";

import { Button } from "@/components/ui/button";
import type { User } from "@/lib/definitions";
import { Steps } from "intro.js-react";
import { ReactElement, useState } from "react";

interface TSteps {
  element: string;
  intro: string | ReactElement;
  position?: string;
  tooltipClass?: string;
  highlightClass?: string;
}

export default function ShowOnboarding({ user }: { user: User }) {
  const isNewUser =
    new Date().getTime() - user.created_at.getTime() < 1000 * 60 * 60 * 24 * 3; // check if account was created less than 3 days ago

  const [showSteps, setShowSteps] = useState<boolean>(false);
  const steps: TSteps[] = [
    {
      element: ".checkingbalance",
      intro: (
        <div>
          This is where you&apos;ll be able to view and edit your checking
          balance. Hover over the card to edit your checking balance.
        </div>
      ),
    },
    {
      element: ".savings",
      intro: (
        <div>
          This is where you&apos;ll be able to view and manage your savings
          balance. Hover over the card to manage your savings.
        </div>
      ),
    },
  ];

  return (
    <>
      {isNewUser && (
        <>
          <Steps
            enabled={showSteps}
            steps={steps}
            initialStep={0}
            onExit={() => setShowSteps(false)}
          />
          <div className="w-full h-10 rounded-xl py-6 bg-teal-100 border border-teal-300 flex justify-center items-center gap-2 mb-2">
            Seems like you&apos;ve just created your account, let&apos;s get you
            started.
            <Button
              variant={"ghost"}
              onClick={() => {
                setShowSteps(true);
              }}
            >
              go
            </Button>
          </div>
        </>
      )}
    </>
  );
}
