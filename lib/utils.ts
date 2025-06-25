import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { eachDayOfInterval } from "date-fns";

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

export function findUnprocessedPaycheckDates(
  lastSyncedDate: Date,
  paycheckDates: string[], // eg: ['22', '1']
): [number, Date[]] {
  const today = new Date();
  // edge case if curr day is a missed paycheck date
  // it'll keep adding missed paycheck on every page load
  if (today.getDate() == lastSyncedDate.getDate()) {
    return [0, []];
  }

  const datesSinceLastSync: Date[] = eachDayOfInterval({
    start: lastSyncedDate,
    end: today,
  });

  // check if paychecks dates are in datesSinceSync
  const missedPaycheckDates: Date[] = datesSinceLastSync.filter((date) =>
    paycheckDates.includes(date.getDate().toString()),
  );

  return [missedPaycheckDates.length, missedPaycheckDates];
}

export function findNextPayDate(paycheckDates: string[]): Date {
  let counter: number = 0;
  // loop through the next 31 days to find the next date where the user gets paid
  for (let d: Date = new Date(); counter < 32; d.setDate(d.getDate() + 1)) {
    if (paycheckDates.includes(d.getDate().toString())) {
      return d;
    }
    counter += 1;
  }
	
	// on no date found 
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
