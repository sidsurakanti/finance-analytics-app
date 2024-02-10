import Image from "next/image";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { auth } from "@/auth";
import { LogoutButton } from "@/components/login/LogoutButton";
import {
  DashboardIcon,
  TransactionsIcon,
  CashflowsIcon,
} from "@components/ui/icons";
import Cashflows from "@/app/(pages)/cashflows/page";

export default async function Nav() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="bg-blue-300 flex flex-row justify-between h-24 items-center">
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" alt="logo" height={50} width={50} />
        <ul className="flex gap-4 text-white">
          <Link href="/dashboard">
            <Button className="gap-1">
              <DashboardIcon width={20} height={20} />
              <p className="hidden lg:block">Dashboard</p>
            </Button>
          </Link>
          <Link href="/transactions">
            <Button className="gap-1">
              <TransactionsIcon width={20} height={20} />
              <p className="hidden lg:block">Transactions</p>
            </Button>
          </Link>
          <Link href="/cashflows">
            <Button className="gap-1">
              <CashflowsIcon width={18} height={18} />
              <p className="hidden lg:block">Cashflows</p>
            </Button>
          </Link>
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
