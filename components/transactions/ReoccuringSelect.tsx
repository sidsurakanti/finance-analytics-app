import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { SelectItems } from "@components/transactions/ReoccuringSelectItems";

export function ReoccuingSelect({ ...props }) {
  return (
    <>
      <Select {...props}>
        <SelectTrigger>
          <SelectValue placeholder="Select reoccuring transaction"></SelectValue>
        </SelectTrigger>

        <SelectContent>{/* <SelectItems /> */}</SelectContent>
      </Select>
    </>
  );
}
