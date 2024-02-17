"use client";

import { ProgressCircle } from "@tremor/react";
import { inter } from "@/styles/fonts";

export function ProgressCircleWrapper({
  value = 100,
  insideText,
}: {
  value?: number;
  insideText?: boolean;
}) {
  return (
    <ProgressCircle value={value} radius={40} color="sky-600">
      {insideText && (
        <span className={inter.className}>{value.toFixed()}%</span>
      )}
    </ProgressCircle>
  );
}
