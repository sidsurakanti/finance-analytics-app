import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EditCashflows() {
  return (
    <section>
      {/* // TODO: add form for this */}
      <p>Edit cashflows</p>
      <Link href="/cashflows">
        <Button variant="link">Go back</Button>
      </Link>
    </section>
  );
}
