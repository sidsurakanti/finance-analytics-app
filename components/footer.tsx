import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border h-24 mt-15 text-sm py-2">
      <div className="h-full w-[90%] md:w-[85%] 2xl:w-4/5 mx-auto flex justify-end items-center">
        <span className="flex flex-col items-end gap-0.5">
          <p className="font-mono">
            <Link
              href="https://instagram.com/sidsurakanti"
              target="_blank"
              className="font-bold font-mono tracking-tight hover:underline underline-offset-4"
            >
              @sidsurakanti
            </Link>, 2025
          </p>
          <Link
            href={"https://github.com/sidsurakanti/finance-analytics-app"}
            target="_blank"
            className="underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-500"
          >
            source code
          </Link>
        </span>
      </div>
    </footer>
  );
}
