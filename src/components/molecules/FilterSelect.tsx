import { Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { FilterSelectProps } from "../../lib/types/select/select.types";

export default function FilterSelect({
  placeholder,
  options,
  value,
  onChange,
}: FilterSelectProps) {
  return (
    <Select
      value={value || "none"}
      onValueChange={(newValue) =>
        onChange(newValue === "none" ? "" : newValue)
      }
    >
      <SelectTrigger
        aria-label={`Seleccionar ${placeholder}`}
        className="w-full max-w-[350px] flex items-center justify-between gap-2 rounded-lg border bg-white px-4 py-2 text-gray-700 shadow-sm transition-all focus:ring-2 focus:ring-primary sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px]"
      >
        <span>
          {value ? options.find((o) => o.value === value)?.label : placeholder}
        </span>
        <Filter className="h-5 w-5 text-gray-500" />
      </SelectTrigger>

      <SelectContent className="w-full max-w-[350px] sm:max-w-[250px] md:max-w-[300px]">
        {/* Opción por defecto (placeholder) */}
        <SelectItem value="none">{placeholder}</SelectItem>

        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
