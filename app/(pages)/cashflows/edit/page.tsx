import Link from "next/link";

export default function EditCashflows() {
  return (
    <>
      Edit cashflows
      <Link className="bg-slate-500" href="/cashflows">
        Go back
      </Link>
    </>
  );
}
