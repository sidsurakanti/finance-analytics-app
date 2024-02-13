import { CardWrapper } from "@components/login/CardWrapper";
import { EditCashflowsForm } from "@components/cashflows/EditCashflowsForm";
import type { Cashflow } from "@/lib/definitions";

type Props = {
  initialCashflows: Cashflow;
};

export function EditCashflows({ initialCashflows }: Props) {
  return (
    <CardWrapper
      headerLabel="Edit"
      description="Revise your recent cashflows here"
      backButtonHref="/cashflows"
      backButtonLabel="Go back"
      showBackIcon
    >
      <EditCashflowsForm initialCashflows={initialCashflows} />
    </CardWrapper>
  );
}
