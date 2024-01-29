import { inter } from "@/app/ui/fonts";


type CardProps = {
    title: string,
    value: string,
}


export default function CardItem ({ title, value }: CardProps) {
    return (
        <div className="w-64 bg-[#1F1F1F] rounded-xl outline outline-[#2C3463] py-5 px-6 flex flex-col items-start space-y-10">
            <p className="text-xl">{title}</p>
            <p className={`text-5xl ${inter.className}`}>
                {value}
            </p>
        </div>
    )
}