import Image from "next/image"

export default function NavBar () {
    return (
        <header 
            className="w-4/5 mx-auto p-8"
        >
            <Image 
                src="/logo.svg"
                alt="logo"
                height={60}
                width={60}
            />
        </header>
    )
}