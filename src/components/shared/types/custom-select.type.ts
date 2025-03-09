export interface Option {
  value: string;
  label: string;
}

export interface FilterSelectProps {
  placeholder?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string | undefined) => void;
}
