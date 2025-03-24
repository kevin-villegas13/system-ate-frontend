export type ActionType =
  | "view"
  | "edit"
  | "delete"
  | "desactive"
  | "manageChildren";

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

export interface CustomTableProps<T> {
  data: ReadonlyArray<T>;
  columns: ReadonlyArray<Column<T>>;
  actions?: ReadonlyArray<ActionType>;
  onAction: (action: ActionType, item: T) => void;
}
