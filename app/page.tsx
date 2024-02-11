import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex justify-center items-center">
      <section>
        <div>
          <Link href="/login">
            <Button size="lg">Get started</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
