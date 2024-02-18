export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center items-center h-screen">
      {children}
    </main>
  );
}
