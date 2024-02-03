import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// cn helper to conditionally add tailwind css classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
