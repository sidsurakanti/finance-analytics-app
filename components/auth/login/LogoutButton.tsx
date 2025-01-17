"use client";

import { logout } from "@lib/auth/actions";

export function LogoutButton({ children }: { children: React.ReactNode }) {
  const handleClick = () => {
    logout();
  };

  return <span onClick={handleClick}>{children}</span>;
}
