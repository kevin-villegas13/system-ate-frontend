import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Filter } from "lucide-react";
import { FilterSelectProps } from "../../lib/types/select/select.types";
import { useState } from "react";

export default function FilterSelect({
  placeholder,
  options,
  value,
  onChange,
}: FilterSelectProps) {
  const [selectedValue, setSelectedValue] = useState(value || "");

  const handleChange = (newValue: string) => {
    const newSelectedValue = newValue === selectedValue ? "" : newValue;
    setSelectedValue(newSelectedValue);
    onChange(newSelectedValue);
  };

  return (
    <Select value={selectedValue} onValueChange={handleChange}>
      <SelectTrigger
        aria-label={`Seleccionar ${placeholder}`}
        className="w-full max-w-[350px] flex items-center justify-between gap-2 rounded-lg border bg-white px-4 py-2 text-gray-700 shadow-sm transition-all focus:ring-2 focus:ring-primary sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px]"
      >
        <SelectValue
          placeholder={
            selectedValue
              ? options.find((o) => o.value === selectedValue)?.label
              : placeholder
          }
        />
        <Filter className="h-5 w-5 text-gray-500" />
      </SelectTrigger>

      <SelectContent className="w-full max-w-[350px] sm:max-w-[250px] md:max-w-[300px]">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
