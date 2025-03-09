import { Pencil, Trash2, Eye } from "lucide-react";
import { CustomTableProps } from "./types/custom-tablet.type";

export function CustomTable<T extends { id: number }>({
  data,
  columns,
  actions = ["view", "edit", "delete"],
  onAction,
}: CustomTableProps<T>) {
  const actionIcons = {
    view: { icon: Eye, label: "Ver", color: "text-blue-500" },
    edit: { icon: Pencil, label: "Editar", color: "text-green-500" },
    delete: { icon: Trash2, label: "Eliminar", color: "text-red-500" },
  };

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-lg">
      <table className="w-full text-left border-collapse">
        {/* Encabezado */}
        <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="p-4 text-gray-700 font-semibold uppercase text-sm text-center"
              >
                {column.label}
              </th>
            ))}
            {actions.length > 0 && (
              <th className="p-4 text-gray-700 font-semibold uppercase text-sm text-center">
                Acciones
              </th>
            )}
          </tr>
        </thead>

        {/* Cuerpo */}
        <tbody>
          {data.map((item, index) => {
            // Validar item.id, si es NaN o undefined, usamos el index como fallback
            const uniqueKey =
              Number.isNaN(item.id) || item.id === undefined ? index : item.id;

            return (
              <tr
                key={uniqueKey}
                className={`transition-colors duration-300 p-4 text-center ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                {columns.map((column) => (
                  <td key={String(column.key)} className="p-4 text-gray-800">
                    {column.render
                      ? column.render(item)
                      : String(item[column.key])}
                  </td>
                ))}

                {/* Acciones */}
                {actions.length > 0 && (
                  <td className="p-4 text-center">
                    <div className="flex justify-center items-center gap-4">
                      {actions.map((action) => {
                        const {
                          icon: Icon,
                          label,
                          color,
                        } = actionIcons[action];
                        return (
                          <button
                            key={action}
                            onClick={() => onAction(action, item)}
                            className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-transform duration-300 hover:scale-105 ${color} hover:brightness-125`}
                          >
                            <Icon size={18} />
                            <span>{label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
