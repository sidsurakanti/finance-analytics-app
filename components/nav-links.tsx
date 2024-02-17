"use client";

import {
  DashboardIcon,
  TransactionsIcon,
  ReoccuringSymbol,
} from "@components/ui/icons";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@lib/utils";

const links = [
  {
    href: "/dashboard",
    icon: DashboardIcon,
    text: "Dashboard",
  },
  {
    href: "/transactions",
    icon: TransactionsIcon,
    text: "Transactions",
  },
  {
    href: "/reoccuring",
    icon: ReoccuringSymbol,
    text: "Reoccuring",
  },
];

export function NavLinks() {
  const activeLink = usePathname();

  return (
    <>
      <ul className="group flex gap-2 text-white">
        {links.map((link, index) => {
          const isActive = activeLink === link.href;
          const Icon = link.icon;
          return (
            <li key={index}>
              <Link href={link.href}>
                <Button
                  className={cn("gap-2")}
                  size="lg"
                  variant={isActive ? "default" : "secondary"}
                >
                  <p>{<Icon width={18} height={18} />}</p>
                  <p>{link.text}</p>
                </Button>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
