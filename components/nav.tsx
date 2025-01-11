import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { ModeToggle, ModeSwitch } from "@components/ui/themes";
import { LogoutButton } from "@components/login/LogoutButton";
import { NavLinks } from "@components/nav-links";
import { ChevronLeft } from "lucide-react";
import { Button } from "@components/ui/button";
import Logo from "@/components/logo";

import { auth } from "@/auth";

export async function Nav() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="flex min-h-16 w-[90%] md:w-[85%] 2xl:w-4/5 3xl:w-2/3 mx-auto justify-between items-center my-2">
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
            {/* logo */}
            <Logo />

            {/* <Image src="/logo.svg" alt="logo" height={26} width={26} className="dark:fill-white"/> */}
          </PopoverTrigger>

          <PopoverContent className="p-3 flex flex-col justify-start gap-3 w-fit divide-slate-400">
            <span>
              <p>{user?.name}</p>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </span>

            <ModeSwitch />

            <LogoutButton>
              <Button
                variant="outline"
                className="w-full flex items-center gap-0.5"
              >
                <ChevronLeft size={17} strokeWidth={1.5} />
                sign out
              </Button>
            </LogoutButton>
          </PopoverContent>
        </Popover>
      </section>
    </header>
  );
}
