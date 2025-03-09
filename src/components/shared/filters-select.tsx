import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { FilterSelectProps } from "./types/custom-select.type";

export default function FilterSelect({
  placeholder,
  options,
  value,
  onChange,
}: FilterSelectProps) {
  const handleChange = (val: string) => {
    onChange(val === "all" ? undefined : val);
  };

  return (
    <Select value={value ?? "all"} onValueChange={handleChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={placeholder} />
        <Filter />
      </SelectTrigger>
      <SelectContent>
        {/* Opción para limpiar el filtro */}
        <SelectItem value="all">{placeholder || "Todos"}</SelectItem>

        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
