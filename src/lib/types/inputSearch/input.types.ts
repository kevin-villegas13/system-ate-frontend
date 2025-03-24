import { ChangeEvent } from "react";

export interface SearchInputProps {
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
