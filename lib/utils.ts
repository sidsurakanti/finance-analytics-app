import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cashFormatter(
  number: number,
  dollarSign: boolean = true,
  minimumFractionDigits: number = 2,
) {
  const formatted = Intl.NumberFormat("en-US", {
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: 2,
  })
    .format(number)
    .toString();
  if (dollarSign) return addDollarSign(formatted);
  return formatted;
}

export function dateFormatter(date: Date, showfullYear: boolean = false) {
  if (showfullYear)
    return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
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
  let count: number = 0;
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
  let counter = 0;
  // end loop at 32 b/c next pay date has to be within 31 days anyway
  // prevents an inf loop
  for (let d: Date = new Date(); counter < 32; d.setDate(d.getDate() + 1)) {
    if (offset.includes(d.getDate().toString())) {
      return d;
    }
    counter += 1;
  }
  return new Date();
}

export function ordinalDateFormatter(day: number) {
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  return `${day}${suffix}`;
}

const MONTHS = [
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
