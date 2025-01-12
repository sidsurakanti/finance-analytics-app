import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ReoccuringList } from "@/components/reoccuring/ReoccuringList";

export default async function Reoccuring() {
  return (
    <main className="w-[90%] md:w-[85%] 2xl:w-4/5 3xl:w-2/3 mx-auto">
      <section>
        <Suspense
          fallback={<Skeleton className="h-[700px] rounded-xl w-full" />}
        >
          <ReoccuringList />
        </Suspense>
      </section>
    </main>
  );
}
