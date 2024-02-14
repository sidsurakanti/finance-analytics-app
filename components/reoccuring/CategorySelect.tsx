import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CategorySelect({ ...props }) {
  return (
    <>
      <Select {...props}>
        <SelectTrigger>
          <SelectValue placeholder="Select a category"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="housing">Housing</SelectItem>
          <SelectItem value="paycheck">Paycheck</SelectItem>
          <SelectItem value="bills">Bills</SelectItem>
          <SelectItem value="entertainment">Entertainment</SelectItem>
          <SelectItem value="food">Food</SelectItem>
          <SelectItem value="health">Health</SelectItem>
          <SelectItem value="insurance">Insurance</SelectItem>
          <SelectItem value="personal">Personal</SelectItem>
          <SelectItem value="invesments">Invesments</SelectItem>
          <SelectItem value="transportation">Transportation</SelectItem>
          <SelectItem value="subscriptions">Subscriptions</SelectItem>
          <SelectItem value="misc">Misc</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
