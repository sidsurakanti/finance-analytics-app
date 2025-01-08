"use client";

import {
  DashboardIcon,
  TransactionsIcon,
  ReoccuringSymbol,
  CashflowsNavIcon
} from "@components/ui/icons";
import { Button } from "@components/ui/button";

import { usePathname } from "next/navigation";
import { cn } from "@lib/utils";

import Link from "next/link";

const links = [
  {
    href: "/dashboard",
    icon: DashboardIcon,
    text: "dashboard",
  },
  {
    href: "/transactions",
    icon: TransactionsIcon,
    text: "transactions",
  },
  {
    href: "/reoccuring",
    icon: ReoccuringSymbol,
    text: "reoccuring",
  },
  {
    href: "/cashflows",
    icon: CashflowsNavIcon,
    text: "cashflows",
  }
];

export function NavLinks() {
  const activeLink = usePathname();

  return (
    <>
      <ul className="flex gap-2">
        {links.map((link, index) => {
          const isActive = activeLink === link.href;
          const Icon = link.icon;

          return (
            <li key={index}>
              <Link href={link.href}>
                <Button
                  className={cn("gap-2 hover:bg-primary/90 hover:text-secondary transition-colors" )}
                  size={"default"}
                  variant={isActive ? "default" : "secondary"}
                >
                  <p>
                    <Icon width={18} height={18} />
                  </p>
                  <p className="hidden lg:block">{link.text}</p>
                </Button>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
