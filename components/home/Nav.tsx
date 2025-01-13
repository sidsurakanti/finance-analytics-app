import { Button } from "@components/ui/button";
import Logo from "@/components/logo";
import Link from "next/link";

export async function Nav() {
  return (
    <header className="flex min-h-16 w-[90%] md:w-[85%] 2xl:w-4/5 3xl:w-2/3 mx-auto justify-between items-center my-2">
      <Logo />

      <Link href="/login">
        <Button
          variant={"ghost"}
          className="font-normal text-sm hover:bg-sky-300 hover:text-sky-900 border hover:border-sky-400 rounded-full"
        >
          sign in
        </Button>
      </Link>
    </header>
  );
}
