import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-4/5 mx-auto flex flex-col items-center px-8 py-20 space-y-10">
      <section className="flex flex-col space-y-6">
        <h1 className="text-5xl font-bold">
          Step into your financial command center
        </h1>
        <div className="flex justify-center space-x-4">
          <Link 
            className="bg-white px-10 py-4 rounded-lg font-semibold text-black"
            href="/login"
          >
            Get started
          </Link>
          <button className="bg-transparent px-10 py-4 rounded-lg font-semibold text-white border-2 border-white">
            Learn more
          </button>
        </div>
      </section>

      <section className="py-20">
        <Image 
          src="/hero.svg"
          alt="hero"
          width={1300}
          height={1300}
        />
      </section>
    </main>
  );
}
