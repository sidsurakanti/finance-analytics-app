import Image from "next/image";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { auth } from "@/auth";
import { LogoutButton } from "@/components/login/LogoutButton";

export default async function Nav() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="bg-blue-300 flex flex-row justify-between h-24 items-center">
      <div className="flex items-center">
        <Image src="/logo.svg" alt="logo" height={50} width={50} />
        <ul className="flex gap-4">
          <Link href="/dashboard">Home</Link>
          <Link href="/transactions">Transactions</Link>
          <Link href="/cashflows">Cashflows</Link>
        </ul>
      </div>

      <div className="flex items-center gap-4">
        {user?.name}
        <LogoutButton>
          <Button>Logout</Button>
        </LogoutButton>
      </div>
    </header>
  );
}
