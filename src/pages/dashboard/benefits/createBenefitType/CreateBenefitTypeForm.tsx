import { useState } from "react";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { ModalProps } from "../../../../lib/types/modal/modal.types";
import DelegateDialog from "../../../../components/organisms/dialogs/DelegateDialog";

export default function CreateBenefitTypeForm({ isOpen, onClose }: ModalProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("El nombre del tipo de beneficio es obligatorio.");
      return;
    }
    toast.success("Tipo de beneficio creado correctamente.");
    onClose();
  };

  return (
    <DelegateDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Crear Tipo de Beneficio"
      description="Ingrese el nombre del nuevo tipo de beneficio."
      footerButtons={
        <Button type="submit" form="createBenefitTypeForm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Tipo
        </Button>
      }
    >
      <form
        id="createBenefitTypeForm"
        className="grid gap-6"
        onSubmit={handleSubmit}
      >
        {/* Nombre del tipo de beneficio */}
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre del Tipo de Beneficio</Label>
          <Input
            id="name"
            name="name"
            placeholder="Ingrese el nombre"
            required
            maxLength={100}
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </form>
    </DelegateDialog>
  );
}
