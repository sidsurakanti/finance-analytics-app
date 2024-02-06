import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gray-400">
      <section>
        <h1 className="text-2xl">Step into your financial command center</h1>
        <div>
          <Link
            className="p-2 bg-white text-black outline outline-black"
            href="/login"
          >
            Get started
          </Link>
          <button className="p-2 bg-white text-black outline outline-black">
            Learn more
          </button>
        </div>
      </section>

      <section>
        <Image src="/hero.svg" alt="hero" width={500} height={500} />
      </section>
    </main>
  );
}
