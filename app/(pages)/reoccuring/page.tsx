import { ReoccuringList } from "@components/reoccuring/ReoccuringList";
import { ReoccuringSheet } from "@components/reoccuring/AddReoccuring";
import { auth } from "@/auth";
import type { User } from "@lib/definitions";

export default async function Reoccuring() {
  const session = await auth();
  const user = session?.user as User;
  return (
    <main className="h-full w-[90%] md:w-[85%] 2xl:w-4/5 mx-auto flex flex-col gap-5">
      <section>
        <ReoccuringSheet user={user} />
      </section>
      <ReoccuringList />
    </main>
  );
}
