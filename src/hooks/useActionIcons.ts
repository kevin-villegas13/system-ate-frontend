import { Eye, Pencil, Trash2, Ban, Baby } from "lucide-react";

export const useActionIcons = () => ({
  view: { icon: Eye, label: "Ver", color: "text-blue-500" },
  edit: { icon: Pencil, label: "Editar", color: "text-green-500" },
  delete: { icon: Trash2, label: "Eliminar", color: "text-red-500" },
  desactive: { icon: Ban, label: "Desactivar", color: "text-yellow-500" },
  manageChildren: {
    icon: Baby,
    label: "Gestionar Hijos",
    color: "text-purple-500",
  },
});
