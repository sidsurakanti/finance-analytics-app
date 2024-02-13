import { EditCashflows } from "@/components/cashflows/EditCashflows";

export default async function EditCashflowsPage() {
  return (
    <section className="w-[90%] md:w-5/6 h-[90%] mx-auto flex justify-center items-center">
      <EditCashflows />
    </section>
  );
}
