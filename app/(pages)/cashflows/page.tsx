import { CashflowList } from "@/components/cashflows/CashflowList";
import { Suspense } from "react";

export default async function Cashflows() {
  return (
    <main>
      <Suspense fallback={"Loading..."}>
        <CashflowList />
      </Suspense>
    </main>
  );
}
