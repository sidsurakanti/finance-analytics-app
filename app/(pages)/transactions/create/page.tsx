import { CreateTransactionForm } from "@components/transactions/CreateTransactionForm";
import { auth } from "@/auth";
import { User } from "@/lib/definitions";

export default async function CreateTransaction() {
  const session = await auth();
  const user = session?.user as User;

  return (
    <main className="">
      <CreateTransactionForm user={user} />
    </main>
  );
}
