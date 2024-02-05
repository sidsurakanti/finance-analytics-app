import Image from "next/image";

export default function NavBar() {
  return (
    <header className="w-screen h-[10%] mx-auto p-4 grid grid-cols-3 justify-items-center items-center bg-black">
      <Image className="justify-self-center" src="/logo.svg" alt="logo" height={50} width={50} />
    </header>
  );
}
