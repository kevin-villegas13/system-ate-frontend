import { useState } from "react";
import { toast } from "sonner";
import { Award } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import DelegateDialog from "../../../../components/dialogs/DelegateDialog";
import ConfirmDialog from "../../../../components/dialogs/ConfirmDialog";
import { EditModalProps } from "../../../../components/dialogs/types/modal.types";

interface User {
  id: number;
  name: string;
  role: string;
}

export default function EditUserForm({
  isOpen,
  onClose,
  data,
}: EditModalProps<User>) {
  const [name, setName] = useState(data?.name);
  const [role, setRole] = useState(data?.role);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleOpenConfirm = () => {
    if (!name?.trim()) {
      toast.error("Debe ingresar un nombre de usuario.");
      return;
    }
    if (!role) {
      toast.error("Debe seleccionar un rol.");
      return;
    }
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    console.log("Usuario editado:", { name, role });
    toast.success(`Usuario ${name} actualizado exitosamente.`);
    setIsConfirmOpen(false);
    onClose();
  };

  return (
    <>
      <DelegateDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Editar Usuario"
        description="Modifique el nombre de usuario y seleccione un rol."
        footerButtons={
          <Button type="button" onClick={handleOpenConfirm}>
            <Award className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        }
      >
        <form id="editarUsuarioForm" className="grid gap-6">
          {/* Nombre de usuario */}
          <div className="grid gap-2">
            <Label htmlFor="nombre">Nombre de usuario</Label>
            <Input
              id="nombre"
              name="nombre"
              placeholder="Ingrese el nombre"
              required
              className="w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Selección de rol */}
          <div className="grid gap-2">
            <Label htmlFor="rol">Rol</Label>
            <Select name="rol" value={role} onValueChange={setRole}>
              <SelectTrigger id="rol" className="w-full">
                <SelectValue placeholder="Seleccione un rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Administrador">Administrador</SelectItem>
                <SelectItem value="Empleado">Empleado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </DelegateDialog>

      {/* Cuadro de Confirmación */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        title="Confirmar Edición"
        description={`¿Está seguro de que desea actualizar el usuario ${name} con rol ${role}?`}
      />
    </>
  );
}
