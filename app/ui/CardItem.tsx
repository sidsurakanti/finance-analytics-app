import { inter } from "@/app/ui/fonts";


type CardProps = {
    title: string,
    value: string,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function CardItem ({ title, value, handleChange, handleSubmit }: CardProps) {
    // TODO: add dollar sign before value
    return (
        <form 
            className="w-64 bg-[#1F1F1F] rounded-xl outline outline-[#2C3463] py-5 px-6 flex flex-col items-start space-y-10"
            onSubmit={handleSubmit}
        >
            <p className="text-xl">{title}</p>
            <input 
                type="text"
                className={`text-5xl ${inter.className} outline-none rounded-lg bg-transparent`}
                value={value}
                onChange={handleChange}
            >
            </input>
            <input type="submit"></input>
        </form>
    );
};