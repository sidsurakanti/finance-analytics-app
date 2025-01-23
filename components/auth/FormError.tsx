import { CircleAlert } from "lucide-react";

export function FormError({ message }: { message: string | undefined }) {
  if (!message) return null;

  return (
    <span className="w-full bg-red-200 text-red-900 rounded-md shadow-sm p-1.5 flex justify-center items-center gap-2 text-sm">
      <CircleAlert size={18}/>
      {message}
    </span>
  );
}
