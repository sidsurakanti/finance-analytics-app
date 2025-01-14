import { Nav } from "@/components/home/Nav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
      <Nav />
      {children}
    </main>
  );
}
