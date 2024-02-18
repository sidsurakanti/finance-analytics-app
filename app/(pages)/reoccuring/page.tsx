import { ReoccuringList } from "@components/reoccuring/ReoccuringList";
import { ReoccuringSheet } from "@components/reoccuring/AddReoccuring";
import { auth } from "@/auth";
import type { User } from "@lib/definitions";

export default async function Reoccuring() {
  const session = await auth();
  const user = session?.user as User;
  return (
    <main className="h-[90%] w-[90%] md:w-5/6 xl:w-4/5 mx-auto flex flex-col gap-3">
      <section>
        <ReoccuringSheet user={user} />
      </section>
      <ReoccuringList />
    </main>
  );
}
