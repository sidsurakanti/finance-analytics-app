import { Input } from "@components/ui/input";
import { CheckIcon, CloseIcon } from "@components/ui/icons";
import { Button } from "@components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface Props {
  value: string;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  handleSubmit: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EditCashflowsInput({
  value,
  isEditing,
  setIsEditing,
  handleSubmit,
  handleChange,
}: Props) {
  return (
    <div className="flex gap-2">
      <div className="relative w-full rounded-md shadow-sm">
        {/* attach a dollar sign to input */}
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <p className="text-secondary-foreground/50 sm:text-md">$</p>
        </span>

        <Input
          type="number"
          id="savings"
          placeholder="0.00"
          value={value}
          onFocus={() => setIsEditing(true)}
          onChange={handleChange}
          className="p-5 pl-7 text-lg"
        />
      </div>

      {/* show submit and close buttons while editing input */}
      {isEditing && (
        <>
          <Button
            variant="secondary"
            className="hover:bg-emerald-500"
            onClick={() => {
              setIsEditing(false);
              handleSubmit();
            }}
          >
            <CheckIcon width={20} height={20} />
          </Button>

          <Button
            variant="secondary"
            className="hover:bg-rose-500"
            onClick={() => setIsEditing(false)}
          >
            <CloseIcon width={20} height={20} />
          </Button>
        </>
      )}
    </div>
  );
}
