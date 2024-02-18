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
    <header className="flex h-[10%] w-[90%] md:w-5/6 xl:w-4/5 mx-auto justify-between min-h-16 items-center">
      <NavLinks />

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
