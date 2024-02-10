import { CreateTransactionForm } from "@components/transactions/CreateTransactionForm";
import { fetchUser } from "@lib/data";

export default async function Page() {
  // * temporary solution until auth is added
  const user = await fetchUser("janedoe@gmail.com");

  return (
    <main className="">
      <CreateTransactionForm user={user} />
    </main>
  );
}
