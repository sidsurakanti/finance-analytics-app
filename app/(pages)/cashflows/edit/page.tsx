import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackArrow } from "@/components/ui/icons";

export default function EditCashflows() {
  return (
    <section className="w-[90%] md:w-5/6 mx-auto">
      {/* // TODO: add form for this */}
      <Link href="/cashflows">
        <Button size="lg">
          <BackArrow />
        </Button>
      </Link>
    </section>
  );
}
