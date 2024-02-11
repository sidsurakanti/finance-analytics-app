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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "@components/ui/themes";

export default async function Nav() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="flex flex-row w-[95%] md:w-5/6 mx-auto justify-between h-24 items-center">
      <div className="flex items-center gap-8">
        <Image
          className="hidden md:block"
          src="/logo.svg"
          alt="logo"
          height={40}
          width={40}
        />
        <ul className="flex gap-2 text-white">
          <Link href="/dashboard">
            <Button className="gap-1" size="lg">
              <DashboardIcon width={20} height={20} />
              <p className="hidden lg:block">Dashboard</p>
            </Button>
          </Link>
          <Link href="/transactions">
            <Button className="gap-1" size="lg">
              <TransactionsIcon width={20} height={20} />
              <p className="hidden lg:block">Transactions</p>
            </Button>
          </Link>
          <Link href="/cashflows">
            <Button className="gap-1" size="lg">
              <CashflowsIcon width={18} height={18} />
              <p className="hidden lg:block">Cashflows</p>
            </Button>
          </Link>
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <ModeToggle/>
        <Popover>
          <PopoverTrigger>
            <p className="bg-blue-500 text-white py-2 px-4 rounded-full">
              {user?.name}
            </p>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <LogoutButton>
              <Button variant="ghost" size="lg">Logout</Button>
            </LogoutButton>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
