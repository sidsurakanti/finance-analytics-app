import CreateTransactionForm from "@/(pages)/transactions/components/CreateTransactionForm"
import { fetchUser } from "@/lib/data";

export default async function Page() {
  // * temporary solution until auth is added 
  const user = await fetchUser("janedoe@gmail.com");

  return (
    <main className="flex flex-row justify-center w-4/5 h-full items-center mx-auto">  
      <CreateTransactionForm user={user} />
    </main>
  )
}