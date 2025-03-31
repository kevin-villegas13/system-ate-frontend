import { MoreHorizontal, ChevronUp, ChevronDown } from "lucide-react";
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
import { useState, useMemo, useCallback } from "react";
import { useActionIcons } from "../../lib/hooks/use-action-icons";
import { CustomTableProps } from "../../lib/types/tablet/table";

export function CustomTable<T extends { id: number }>({
  data,
  columns,
  actions = ["view", "edit", "delete", "desactive"],
  onAction,
}: CustomTableProps<T>) {
  const actionIcons = useActionIcons();
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Función para manejar el ordenamiento
  const handleSort = useCallback(
    (column: keyof T) => {
      setSortColumn((prevColumn) => {
        const newOrder =
          prevColumn === column && sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newOrder);
        return column;
      });
    },
    [sortOrder]
  );

  // Ordenar los datos según la columna seleccionada con useMemo para mejorar rendimiento
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (!sortColumn) return 0;
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (typeof valueA === "number" && typeof valueB === "number")
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;

      if (typeof valueA === "string" && typeof valueB === "string")
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);

      return 0;
    });
  }, [data, sortColumn, sortOrder]);

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-md">
      <Table>
        {/* Encabezado */}
        <TableHeader>
          <TableRow className="bg-gray-100">
            {columns.map(({ key, label, sortable }) => (
              <TableHead
                key={String(key)}
                onClick={() => sortable && handleSort(key)}
                className={`p-4 text-gray-700 font-semibold uppercase text-sm text-center border-b cursor-pointer ${
                  sortable ? "hover:bg-gray-200" : ""
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {label}
                  {sortable &&
                    sortColumn === key &&
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
              {columns.map(({ key, render }) => (
                <TableCell
                  key={String(key)}
                  className="p-4 text-gray-800 text-center border-b"
                >
                  {render ? render(item) : String(item[key])}
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
