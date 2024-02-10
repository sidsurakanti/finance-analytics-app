import { CarbonWarning } from "@/components/ui/icons";

export function FormError({ message }: { message: string | undefined }) {
  if (!message) return null;

  return (
    <div className="w-full bg-destructive/15 text-destructive rounded-md shadow-sm p-1 flex justify-center items-center gap-2 text-sm">
      <CarbonWarning />
      {message}
    </div>
  );
}
