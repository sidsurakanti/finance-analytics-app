"use client";

import { Reoccuring, User } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { fetchReoccuring } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QuickAddForm } from "@/components/cashflows/shortcuts/QuickAddForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateTransactionSheet } from "@/components/transactions/create/CreateTransaction";

export default function QuickAddList({ user }: { user: User }) {
  const [reoccuring, setReoccuring] = useState<Reoccuring[]>();

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchReoccuring(user);
      setReoccuring(res);
    };

    fetch();
  }, [user]);

  return (
    <section className="bg-gradient-to-b from-[#FAFAFA] to-[#f3f3f3] dark:from-[#171717] dark:to-[#121212] h-fit group space-y-6 rounded-xl p-4 bg-accent shadow-md border border-border">
      <span className="flex justify-between">
        <h1>Quick add</h1>
        {reoccuring && (
          <CreateTransactionSheet user={user} reoccuring={reoccuring} />
        )}
      </span>
      <ScrollArea className="h-96 w-full">
        <div className="grid grid-cols-2 gap-2">
          {reoccuring?.map((item, index) => (
            <Dialog key={index}>
              <DialogTrigger className="focus:outline-none">
                <div className="p-6 cursor-pointer rounded-xl flex justify-center items-center bg-neutral-200/60 dark:bg-neutral-950 shadow-sm">
                  {item.name}
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Quick add</DialogTitle>
                  <DialogDescription>
                    Quickly add a new reoccuring transaction!
                  </DialogDescription>
                </DialogHeader>

                <QuickAddForm reoccuring={item} />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
}
