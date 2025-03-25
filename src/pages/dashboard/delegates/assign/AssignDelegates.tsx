import { useState, useEffect } from "react";
import { Award } from "lucide-react";
import { ModalProps } from "../../../../lib/types/modal/modal.types";
import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../../../components/ui/select";
import DelegateDialog from "../../../../components/organisms/dialogs/DelegateDialog";

export default function AssignDelegates({ isOpen, onClose }: ModalProps) {
  const [delegates, setDelegates] = useState<{ id: string; name: string }[]>(
    []
  );
  const [, setSelectedDelegate] = useState("");

  useEffect(() => {
    setDelegates([
      { id: "1", name: "Juan Pérez" },
      { id: "2", name: "María López" },
      { id: "3", name: "Carlos Ramírez" },
    ]);
  }, []);

  return (
    <DelegateDialog
      className="max-w-lg"
      isOpen={isOpen}
      onClose={onClose}
      title="Asignar Beneficio a Delegado"
      description="Seleccione un delegado y especifique la cantidad de beneficio a asignar."
      footerButtons={
        <Button type="submit" form="crearUsuarioForm">
          <Award className="mr-2 h-4 w-4" />
          Asignar Beneficio
        </Button>
      }
    >
      <form id="crearUsuarioForm" className="grid gap-6">
        {/* Selección del Delegado */}
        <div className="grid gap-2">
          <Label>Seleccionar Delegado</Label>
          <Select onValueChange={setSelectedDelegate}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione un delegado" />
            </SelectTrigger>
            <SelectContent>
              {delegates.map((delegate) => (
                <SelectItem key={delegate.id} value={delegate.id}>
                  {delegate.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Cantidad */}
        <div className="grid gap-2">
          <Label>Cantidad</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            required
            className="w-full"
          />
        </div>
      </form>
    </DelegateDialog>
  );
}
