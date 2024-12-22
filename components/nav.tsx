import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { ModeToggle, ModeSwitch } from "@components/ui/themes";
import { LogoutButton } from "@components/login/LogoutButton";
import { NavLinks } from "@components/nav-links";
import { BackArrow } from "@components/ui/icons";
import { Button } from "@components/ui/button";

import { auth } from "@/auth";
import Image from "next/image";

export async function Nav() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="flex min-h-16 w-[90%] md:w-[85%] 2xl:w-4/5 mx-auto justify-between items-center my-6">
      <NavLinks />

      {/* profile section + dark mode toggle (desktop only) */}
      <section className="flex gap-4">
        {/* dark mode toggle */}
        <span className="hidden md:flex items-center">
          <ModeToggle />
        </span>

        {/* profile */}
        <Popover>
          <PopoverTrigger>
            <Image src="/logo.svg" alt="logo" height={40} width={40} />
          </PopoverTrigger>

          <PopoverContent className="p-3 flex flex-col justify-start gap-3 w-fit divide-slate-400">
            <span>
              <p>{user?.name}</p>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </span>

            <ModeSwitch />

            <LogoutButton>
              <Button variant="outline" className="w-full">
                <BackArrow />
                Sign out
              </Button>
            </LogoutButton>
          </PopoverContent>
        </Popover>
      </section>
    </header>
  );
}
