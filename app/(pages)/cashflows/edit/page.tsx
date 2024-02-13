import { EditCashflows } from "@/components/cashflows/EditCashflows";
import { auth } from "@/auth";
import { User } from "@/lib/definitions";
import { fetchCashflows } from "@/lib/data";

export default async function EditCashflowsPage() {
  const session = await auth();
  const user = session?.user as User;
  const cashflows = await fetchCashflows(user);

  return (
    <section className="w-[90%] md:w-5/6 h-[90%] mx-auto flex justify-center items-center">
      <EditCashflows initialCashflows={cashflows} />
    </section>
  );
}
