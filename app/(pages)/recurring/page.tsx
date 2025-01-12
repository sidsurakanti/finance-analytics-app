import { ReoccuringList } from "@components/reoccuring/ReoccuringList";

export default async function Reoccuring() {
  return (
    <main className="h-full w-[90%] md:w-[85%] 2xl:w-4/5 3xl:w-2/3 mx-auto flex flex-col gap-5">
      <ReoccuringList />
    </main>
  );
}
