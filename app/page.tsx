import { Button } from "@components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex justify-center items-center">
      <Link href="/login">
        <Button
          size="lg"
          className="hover:bg-sky-300 hover:text-sky-900 border hover:border-sky-400"
        >
          Let&apos;s go!
        </Button>
      </Link>
    </main>
  );
}
