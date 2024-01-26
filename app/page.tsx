import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-evenly items-center">
      <section className="flex flex-col space-y-6">
        <h1 className="text-3xl">Welcome to your budgeting dashboard.</h1>
        <button className="bg-[#2076C6] p-4 rounded-lg font-bold text-md">
          Sign in
        </button>
      </section>

      <section>
        <Image 
          src="/hero.svg"
          alt="image"
          width={800}
          height={800}
        />
      </section>
    </main>
  );
}
