"use client";

import { logout } from "@lib/actions";

export function LogoutButton({ children }: { children: React.ReactNode }) {
  const handleClick = () => {
    logout();
  };

  return <span onClick={handleClick}>{children}</span>;
}
