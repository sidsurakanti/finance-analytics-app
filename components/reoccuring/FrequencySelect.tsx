import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

export function FrequencySelect({ ...props }) {
  return (
    <>
      <Select {...props}>
        <SelectTrigger>
          <SelectValue placeholder="Select a category"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
          <SelectItem value="yearly">Yearly</SelectItem>
          <SelectItem value="bi-annually">Bi-annually</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
