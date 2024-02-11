import { CreateTransactionForm } from "@components/transactions/CreateTransactionForm";
import { auth } from "@/auth";
import { User } from "@/lib/definitions";

export default async function CreateTransaction() {
  const session = await auth();
  const user = session?.user as User;

  return (
    <main className="w-[90%] md:w-5/6 mx-auto flex justify-center">
      <div>
        <CreateTransactionForm user={user} />
      </div>
    </main>
  );
}
