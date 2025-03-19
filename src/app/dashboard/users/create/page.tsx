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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../../components/ui/dialog";

interface CrearUsuarioProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CrearUsuario({ isOpen, onClose }: CrearUsuarioProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle>Crear Usuario</DialogTitle>
          <DialogDescription>
            Ingrese el nombre de usuario y seleccione un rol.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-6">
          {/* Nombre de usuario */}
          <div className="grid gap-2">
            <Label htmlFor="nombre">Nombre de usuario</Label>
            <Input
              id="nombre"
              name="nombre"
              placeholder="Ingrese el nombre"
              required
              className="w-full"
            />
          </div>

          {/* Selección de rol */}
          <div className="grid gap-2">
            <Label htmlFor="rol">Rol</Label>
            <Select name="rol">
              <SelectTrigger id="rol" className="w-full">
                <SelectValue placeholder="Seleccione un rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Administrador">Administrador</SelectItem>
                <SelectItem value="Empleado">Empleado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Botones de acción */}
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              <Award className="mr-2 h-4 w-4" />
              Crear Usuario
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
