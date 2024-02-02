import { inter } from "@/app/ui/styles/fonts";

type CardProps = {
  title: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function CardItem({
  title,
  value,
  handleChange,
  handleSubmit,
}: CardProps) {
  // side-bar card (client component)
  return (
    <form
      className="w-full bg-[#1F1F1F] rounded-xl outline outline-[#47474b] py-5 px-6 flex flex-col items-start space-y-10"
      onSubmit={handleSubmit}
    >
      <p className="text-xl">{title}</p>
      {/* showcase value and handle value change */}
      <input
        type="text"
        className={`text-5xl ${inter.className} outline-none rounded-lg bg-transparent`}
        value={value}
        onChange={handleChange}
      ></input>
      {/* update value */}
      <input type="submit" hidden></input>
    </form>
  );
}
