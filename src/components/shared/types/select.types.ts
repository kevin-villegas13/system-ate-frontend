export interface Option {
  value: string;
  label: string;
}

export interface FilterSelectProps {
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}
