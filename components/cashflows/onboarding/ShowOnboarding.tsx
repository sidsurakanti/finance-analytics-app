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
    {
      element: ".incomes",
      intro: <div>View, add, and edit your income sources here!</div>,
    },
    {
      element: ".spending",
      intro: <div>This graph breaks down your total spending.</div>,
      position: "left",
    },
    {
      element: ".quickadd",
      intro: (
        <div>
          Quickly add your recurring transactions here! You can edit these
          recurring transactions in the recurring tab.
        </div>
      ),
      position: "left",
    },
    {
      element: ".sankey",
      intro: (
        <div>
          Once populated, this will become a graph to visualize where your money
          is
        </div>
      ),
      position: "right middle",
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
            options={{
              doneLabel: "finish",
              prevLabel: "back",
              nextLabel: "next",
            }}
          />
          <div className="w-fit mx-auto h-6 rounded-xl py-5 px-3 bg-teal-100 border text-teal-800 border-teal-300 flex justify-center items-center gap-2 mb-2">
            Seems like you&apos;ve just created your account, let&apos;s get you
            started.
            <Button
              variant={"link"}
              className="rounded-full underline underline-offset-4 hover:text-teal-900 hover:font-bold text-teal-900"
              size={"sm"}
              onClick={() => {
                setShowSteps(true);
              }}
            >
              start tour
            </Button>
          </div>
        </>
      )}
    </>
  );
}
