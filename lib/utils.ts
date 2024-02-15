import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cashFormatter(number: number) {
  return Intl.NumberFormat("us").format(number).toString();
}

export function dateFormatter(date: Date, showfullYear: boolean = false) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (showfullYear)
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  return `${months[date.getMonth()]} ${date.getDate()}`;
}
