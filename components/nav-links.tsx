"use client";

import {
  DashboardIcon,
  TransactionsIcon,
  ReoccuringSymbol,
  CashflowsNavIcon,
} from "@components/ui/icons";
import { Button } from "@components/ui/button";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { cn } from "@lib/utils";

import Link from "next/link";

const links = [
  // {
  //   href: "/dashboard",
  //   icon: DashboardIcon,
  //   text: "dashboard",
  // },
  {
    href: "/cashflows",
    icon: CashflowsNavIcon,
    text: "cashflows",
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
];

export function NavLinks() {
  const activeLink = usePathname();

  return (
    <>
      <motion.ul
        whileHover={{ scale: 1.02 }}
        className="bg-accent flex gap-1 rounded-full border border-gray-300/70 dark:border-border shadow-sm p-1"
      >
        {links.map((link, index) => {
          const isActive = activeLink === link.href;
          const Icon = link.icon;

          return (
            <li key={index}>
              <Link href={link.href}>
                <Button
                  className={cn(
                    isActive
                      ? "bg-violet-100 dark:bg-violet-200 text-violet-950 hover:bg-violet-300/70 border border-violet-300 shadow-sm"
                      : "hover:bg-neutral-200 hover:text-neutral-900 text-neutral-600 dark:text-neutral-200",
                    isActive && link.text == "transactions"
                      ? "bg-green-100 dark:bg-green-200 text-green-950 hover:bg-green-300/70 border border-green-300 shadow-sm"
                      : "",
                    isActive && link.text == "reoccuring"
                      ? "bg-rose-100 dark:bg-rose-200 text-rose-950 hover:bg-rose-300/70 border border-rose-300 shadow-sm"
                      : "",
                    "gap-1 transition-colors rounded-full font-normal",
                  )}
                  size={"default"}
                  variant={"ghost"}
                >
                  <p>
                    <Icon width={18} height={18} className="block lg:hidden" />
                  </p>
                  <p className="hidden lg:block">{link.text}</p>
                </Button>
              </Link>
            </li>
          );
        })}
      </motion.ul>
    </>
  );
}
