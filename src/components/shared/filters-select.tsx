import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface FilterSelectProps {
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export default function FilterSelect({
  placeholder,
  options,
  value,
  onChange,
}: FilterSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={placeholder} />
        <Filter />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
