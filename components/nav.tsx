import Image from "next/image";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { auth } from "@/auth";
import { LogoutButton } from "@/components/login/LogoutButton";
import {
  DashboardIcon,
  TransactionsIcon,
  CashflowsIcon,
  BackArrow,
  ReoccuringSymbol,
} from "@components/ui/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle, ModeSwitch } from "@components/ui/themes";

export default async function Nav() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="flex flex-row w-[90%] md:w-5/6 mx-auto justify-between h-[10%] min-h-16 items-center">
      <div className="flex items-center gap-8">
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
          <Link href="/reoccuring">
            <Button className="gap-1" size="lg">
              <ReoccuringSymbol width={18} height={18} />
              <p className="hidden lg:block">Reoccuring</p>
            </Button>
          </Link>
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <ModeToggle />
        </div>
        <Popover>
          <PopoverTrigger>
            <Image src="/logo.svg" alt="logo" height={40} width={40} />
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <div className="p-2">
              <p>{user?.name}</p>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
            <hr></hr>
            <div className="pt-2 flex flex-col gap-2">
              <ModeSwitch />
              <LogoutButton>
                <Button variant="ghost" className="w-full">
                  <BackArrow />
                  Logout
                </Button>
              </LogoutButton>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
