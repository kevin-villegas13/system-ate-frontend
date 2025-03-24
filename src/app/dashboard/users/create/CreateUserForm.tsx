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
import { ModalProps } from "../../../../lib/types/modal/modal.types";
import DelegateDialog from "../../../../components/organisms/dialogs/DelegateDialog";
import ConfirmDialog from "../../../../components/organisms/dialogs/ConfirmDialog";

export default function CreateUserForm({ isOpen, onClose }: ModalProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleOpenConfirm = () => {
    if (!name.trim()) {
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
    console.log("Usuario creado:", { name, role });
    toast.success(`Usuario ${name} creado exitosamente.`);
    setIsConfirmOpen(false);
    onClose();
  };

  return (
    <>
      <DelegateDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Crear Usuario"
        description="Ingrese el nombre de usuario y seleccione un rol."
        footerButtons={
          <Button type="button" onClick={handleOpenConfirm}>
            <Award className="mr-2 h-4 w-4" />
            Crear Usuario
          </Button>
        }
      >
        <form id="crearUsuarioForm" className="grid gap-6">
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
        title="Confirmar Creación"
        description={`¿Está seguro de que desea crear el usuario ${name} con rol ${role}?`}
      />
    </>
  );
}
