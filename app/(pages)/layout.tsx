import { Nav } from "@components/nav";
import { Toaster } from "@/components/ui/toaster";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      {children}
      <Toaster />
    </>
  );
}
