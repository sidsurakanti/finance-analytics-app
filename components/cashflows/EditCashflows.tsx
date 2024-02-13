import { CardWrapper } from "@components/login/CardWrapper";
import { EditCashflowsForm } from "@components/cashflows/EditCashflowsForm";
import type { Cashflow, User } from "@/lib/definitions";
import { auth } from "@/auth";
import { fetchCashflows } from "@/lib/data";

export async function EditCashflows() {
  const session = await auth();
  const user = session?.user as User;
  const cashflows = await fetchCashflows(user);

  return (
    <CardWrapper
      headerLabel="Edit"
      description="Revise your recent cashflows here"
      backButtonHref="/cashflows"
      backButtonLabel="Go back"
      showBackIcon
    >
      <EditCashflowsForm initialCashflows={cashflows} />
    </CardWrapper>
  );
}
