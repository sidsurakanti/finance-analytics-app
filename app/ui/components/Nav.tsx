import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <header className="bg-blue-300 flex flex-row h-24">
      <Image 
        src="/logo.svg" 
        alt="logo" 
        height={50} 
        width={50} 
      />
      <ul>
        <Link
          href="/dashboard"
        >
          Home
        </Link>
        <Link
          href="/transactions"
        >
          Transactions
        </Link>
        <Link
          href="/cashflows"
        >
          Cashflows
        </Link>
      </ul>
    </header>
  );
}
