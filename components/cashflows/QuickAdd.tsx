"use client";

import { Reoccuring, User } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { fetchReoccuring } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function QuickAdd({ user }: { user: User }) {
  const [reoccuring, setReoccuring] = useState<Reoccuring[]>();

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchReoccuring(user);
      setReoccuring(res);
    };

    fetch();
  }, [user]);

  return (
    <section className="h-fit group flex flex-col gap-5 rounded-xl p-4 bg-accent shadow-md border border-border">
      <h1>Quick add</h1>

      <ScrollArea className="h-72 w-full">
        <div className="grid grid-cols-2 gap-2 ">
          {reoccuring?.map((item, index) => (
            <div
              key={index}
              className="p-6 cursor-pointer rounded-xl flex justify-center items-center bg-[#f1f1f1] dark:bg-neutral-950 shadow-sm"
            >
              {item.name}
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
}
