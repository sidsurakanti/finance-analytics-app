import { ReoccuringList } from "@components/reoccuring/ReoccuringList";
import { ReoccuringSheet } from "@components/reoccuring/AddReoccuring";

export default async function Reoccuring() {
  return (
    <main className="w-[90%] md:w-5/6 mx-auto flex flex-col gap-3">
      <section className="flex justify-end">
        <ReoccuringSheet />
      </section>
        <ReoccuringList />
      
    </main>
  );
}
