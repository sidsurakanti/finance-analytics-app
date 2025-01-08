import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

export function TypeSelect({ ...props }) {
  return (
    <>
      <Select {...props}>
        <SelectTrigger>
          <SelectValue placeholder="Select transaction type"></SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="paycheck">Paycheck</SelectItem>
          <SelectItem value="expense">Expense</SelectItem>
          <SelectItem value="deposit">Deposit</SelectItem>
          <SelectItem value="withdrawl">Withdrawl</SelectItem>
          <SelectItem value="reoccuring">Reoccuring</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
