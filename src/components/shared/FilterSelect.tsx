import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
      <SelectTrigger className="w-full max-w-[350px] flex items-center justify-between gap-2 rounded-lg border bg-white px-4 py-2 text-gray-700 shadow-sm transition-all focus:ring-2 focus:ring-primary sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px]">
        <SelectValue placeholder={placeholder} />
        <Filter className="h-5 w-5 text-gray-500" />
      </SelectTrigger>
      <SelectContent className="w-full max-w-[350px]">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
