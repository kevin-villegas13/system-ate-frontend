import { useState } from "react";
import { Award } from "lucide-react";
import { toast } from "sonner";
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

export default function CreateDistributionForm({
  isOpen,
  onClose,
}: ModalProps) {
  const [formData, setFormData] = useState({
    benefitId: "",
    recipientId: "",
    recipientType: "",
    statusId: "",
    quantity: "",
    deliveryDate: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Distribución creada correctamente.");
    onClose();
  };

  return (
    <DelegateDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Crear Distribución de Beneficio"
      description="Ingrese los detalles para la entrega del beneficio."
      footerButtons={
        <Button type="submit" form="createDistributionForm">
          <Award className="mr-2 h-4 w-4" />
          Crear Distribución
        </Button>
      }
    >
      <form
        id="createDistributionForm"
        className="grid gap-6"
        onSubmit={handleSubmit}
      >
        {/* Selección del Beneficio */}
        <div className="grid gap-2">
          <Label htmlFor="benefitId">Beneficio</Label>
          <Input
            id="benefitId"
            name="benefitId"
            placeholder="Ingrese el ID del beneficio"
            required
            value={formData.benefitId}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Selección del Destinatario */}
        <div className="grid gap-2">
          <Label htmlFor="recipientType">Tipo de Destinatario</Label>
          <Select
            name="recipientType"
            onValueChange={(value) =>
              setFormData({ ...formData, recipientType: value })
            }
          >
            <SelectTrigger id="recipientType" className="w-full">
              <SelectValue placeholder="Seleccione un tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Afiliado</SelectItem>
              <SelectItem value="2">Hijo de Afiliado</SelectItem>
              <SelectItem value="3">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ID del Destinatario */}
        {(formData.recipientType === "1" || formData.recipientType === "2") && (
          <div className="grid gap-2">
            <Label htmlFor="recipientId">ID del Destinatario</Label>
            <Input
              id="recipientId"
              name="recipientId"
              placeholder="Ingrese el ID del destinatario"
              required
              value={formData.recipientId}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        )}

        {/* Selección del Estado */}
        <div className="grid gap-2">
          <Label htmlFor="statusId">Estado</Label>
          <Select
            name="statusId"
            onValueChange={(value) =>
              setFormData({ ...formData, statusId: value })
            }
          >
            <SelectTrigger id="statusId" className="w-full">
              <SelectValue placeholder="Seleccione un estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Pendiente</SelectItem>
              <SelectItem value="2">Entregado</SelectItem>
              <SelectItem value="3">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cantidad */}
        <div className="grid gap-2">
          <Label htmlFor="quantity">Cantidad</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            placeholder="Ingrese la cantidad"
            required
            min={1}
            value={formData.quantity}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Fecha de Entrega */}
        <div className="grid gap-2">
          <Label htmlFor="deliveryDate">Fecha de Entrega</Label>
          <Input
            id="deliveryDate"
            name="deliveryDate"
            type="date"
            required
            value={formData.deliveryDate}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Notas */}
        <div className="grid gap-2">
          <Label htmlFor="notes">Notas</Label>
          <Input
            id="notes"
            name="notes"
            placeholder="Ingrese notas adicionales (opcional)"
            value={formData.notes}
            onChange={handleChange}
            className="w-full"
          />
        </div>
      </form>
    </DelegateDialog>
  );
}
