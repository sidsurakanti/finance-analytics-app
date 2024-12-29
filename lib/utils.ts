import { type ClassValue, clsx } from "clsx";
import { count } from "console";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const months = [
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

export function cashFormatter(number: number, dollarSign: boolean = true) {
  const formatted = Intl.NumberFormat("us").format(number).toString();
  if (dollarSign) return addDollarSign(formatted);
  return formatted;
}

export function dateFormatter(date: Date, showfullYear: boolean = false) {
  if (showfullYear)
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

export function addDollarSign(value: string) {
  if (value.charAt(0) === "-") {
    return `-$${value.substring(1)}`;
  } else {
    return `$${value}`;
  }
}

export function calculateLastPaidDiff(date: Date, offset: string[]) {
  const today = new Date();
  // const lastPaid = new Date(date);
  // const diff = today.getTime() - lastPaid.getTime();
  // const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let count: number = 0;
  // console.log(offset);
  for (let d = new Date(date); d <= today; d.setDate(d.getDate() + 1)) {
    // console.log(d.getDate().toString());
    if (offset.includes(d.getDate().toString())) {
      // console.log(d);
      count++;
    }
  }
  return count;
}

export function findNextPayDate(offset: string[]): Date {
  let count = 0;
  for (let d: Date = new Date(); count < 1; d.setDate(d.getDate() + 1)) {
    if (offset.includes(d.getDate().toString())) {
      return d;
    }
  }
  return new Date();
}