export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode;
}

export type ActionType = "view" | "edit" | "delete";

export interface CustomTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: ActionType[];
  onAction: (action: ActionType, item: T) => void;
}
