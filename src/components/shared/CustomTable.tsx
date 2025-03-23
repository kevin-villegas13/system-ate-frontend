import {
  Pencil,
  Trash2,
  Eye,
  Ban,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  Baby,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState } from "react";

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

export type ActionType =
  | "view"
  | "edit"
  | "delete"
  | "desactive"
  | "manageChildren";

interface CustomTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: ActionType[];
  onAction: (action: ActionType, item: T) => void;
}

export function CustomTable<T extends { id: number }>({
  data,
  columns,
  actions = ["view", "edit", "delete", "desactive"],
  onAction,
}: CustomTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const actionIcons = {
    view: { icon: Eye, label: "Ver", color: "text-blue-500" },
    edit: { icon: Pencil, label: "Editar", color: "text-green-500" },
    delete: { icon: Trash2, label: "Eliminar", color: "text-red-500" },
    desactive: { icon: Ban, label: "Desactivar", color: "text-yellow-500" },
    manageChildren: {
      icon: Baby,
      label: "Gestionar Hijos",
      color: "text-purple-500",
    },
  };

  // Función para ordenar los datos
  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    }
    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    return 0;
  });

  // Manejo de ordenamiento por columna
  const handleSort = (column: keyof T) => {
    sortColumn === column
      ? setSortOrder(sortOrder === "asc" ? "desc" : "asc")
      : setSortColumn(column),
      setSortOrder("asc");
  };

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-md">
      <Table>
        {/* Encabezado */}
        <TableHeader>
          <TableRow className="bg-gray-100">
            {columns.map((column) => (
              <TableHead
                key={String(column.key)}
                onClick={() => column.sortable && handleSort(column.key)}
                className={`p-4 text-gray-700 font-semibold uppercase text-sm text-center border-b cursor-pointer ${
                  column.sortable ? "hover:bg-gray-200" : ""
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {column.label}
                  {column.sortable &&
                    sortColumn === column.key &&
                    (sortOrder === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </div>
              </TableHead>
            ))}
            {actions.length > 0 && (
              <TableHead className="p-4 text-gray-700 font-semibold uppercase text-sm text-center border-b">
                Acciones
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        {/* Cuerpo */}
        <TableBody>
          {sortedData.map((item, index) => (
            <TableRow
              key={item.id}
              className={`transition-all duration-300 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100`}
            >
              {columns.map((column) => (
                <TableCell
                  key={String(column.key)}
                  className="p-4 text-gray-800 text-center border-b"
                >
                  {column.render
                    ? column.render(item)
                    : String(item[column.key])}
                </TableCell>
              ))}

              {/* Acciones */}
              {actions.length > 0 && (
                <TableCell className="p-4 text-center border-b">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-300 transition-all rounded-md"
                      >
                        <MoreHorizontal className="h-5 w-5 text-gray-600" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-36 bg-white shadow-lg rounded-md"
                    >
                      {actions.map((action) => {
                        const {
                          icon: Icon,
                          label,
                          color,
                        } = actionIcons[action];
                        return (
                          <DropdownMenuItem
                            key={action}
                            onClick={() => onAction(action, item)}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gradient-to-r from-gray-200 to-gray-100 cursor-pointer transition-all"
                          >
                            <Icon
                              size={18}
                              className={`${color} transition-transform transform hover:scale-110`}
                            />
                            <span className="font-medium">{label}</span>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
