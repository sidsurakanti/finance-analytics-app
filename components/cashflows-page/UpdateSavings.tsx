"use client";

import { updateSavings } from "@/lib/actions";
import { Savings } from "@/lib/definitions";

export default function UpdateSavingsButton({
  savings,
}: {
  savings: Savings;
}) {
  return (
    <button onClick={() => updateSavings(Number(savings.amount) + 300, savings.user_id)}>add more</button>
  );
}
