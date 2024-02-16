"use client";

import { fetchReoccuring } from "@lib/data";
import { SelectItem } from "@components/ui/select";
import { User } from "@/lib/definitions";
import { auth } from "@/auth";

export async function SelectItems() {
  const session = await auth();
  const user = session?.user as User;
  // fetch reoccuring transactions from db
  const reoccuring = await fetchReoccuring(user);

  return (
    <>
      {reoccuring.map((item) => {
        return (
          <SelectItem value={item.name} key={item.name}>
            {item.name}
          </SelectItem>
        );
      })}
    </>
  );
}
