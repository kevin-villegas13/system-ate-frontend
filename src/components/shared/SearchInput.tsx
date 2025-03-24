import { useState, useEffect, ChangeEvent } from "react";
import { SearchInputProps } from "./types/input.types";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export default function SearchInput({
  placeholder,
  onChange,
}: SearchInputProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      onChange({ target: { value: query } } as ChangeEvent<HTMLInputElement>);
    }, 300); // Espera 300ms antes de llamar a onChange

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="relative flex-1 min-w-[200px]">
      <Input
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pr-10"
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    </div>
  );
}
