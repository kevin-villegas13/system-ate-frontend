import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { ChangeEvent } from "react";

interface SearchInputProps {
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
  placeholder,
  onChange,
}: SearchInputProps) {
  return (
    <div className="relative flex-1 min-w-[200px]">
      <Input placeholder={placeholder} onChange={onChange} className="pr-10" />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    </div>
  );
}
