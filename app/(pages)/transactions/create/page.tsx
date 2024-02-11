import { CreateTransactionForm } from "@components/transactions/CreateTransactionForm";
import { auth } from "@/auth";
import { User } from "@/lib/definitions";

export default async function CreateTransaction() {
  const session = await auth();
  const user = session?.user as User;

  return (
    <main className="w-[90%] h-[90%] md:w-5/6 mx-auto">
      <div className="h-full flex flex-col justify-center items-center">
        <CreateTransactionForm user={user} />
      </div>
    </main>
  );
}
