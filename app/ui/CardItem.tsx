import { inter } from "@/app/ui/fonts";


type CardProps = {
    title: string,
    value: string,
    handleChange: (a: any) => any
}


export default function CardItem ({ title, value, handleChange }: CardProps) {
    return (
        <div className="w-64 bg-[#1F1F1F] rounded-xl outline outline-[#2C3463] py-5 px-6 flex flex-col items-start space-y-10">
            <p className="text-xl">{title}</p>
            <input 
                type="text"
                className={`text-5xl ${inter.className} outline-none rounded-lg bg-transparent`}
                value={value}
                onChange={handleChange}
            >
            </input>
        </div>
    )
}