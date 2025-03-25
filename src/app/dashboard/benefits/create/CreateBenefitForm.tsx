import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Input } from "../../../../components/ui/input";
import { ModalProps } from "../../../../lib/types/modal/modal.types";
import DelegateDialog from "../../../../components/organisms/dialogs/DelegateDialog";

interface BenefitFormValues {
  name: string;
  typeId: string;
  ageMin: string;
  ageMax: string;
  stock: string;
  isAvailable: string;
  description: string;
}

// Esquema de validación con Yup
const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  typeId: Yup.string().required("Seleccione un tipo de beneficio"),
  ageMin: Yup.string().required("Seleccione la edad mínima"),
  ageMax: Yup.string().required("Seleccione la edad máxima"),
  stock: Yup.number()
    .required("Ingrese el stock disponible")
    .min(1, "Debe ser al menos 1"),
  isAvailable: Yup.string().required("Seleccione la disponibilidad"),
  description: Yup.string().max(200, "Máximo 200 caracteres"),
});

export default function CreateBenefitForm({ isOpen, onClose }: ModalProps) {
  const initialValues: BenefitFormValues = {
    name: "",
    typeId: "",
    ageMin: "",
    ageMax: "",
    stock: "",
    isAvailable: "",
    description: "",
  };

  const handleSubmit = (values: BenefitFormValues) => {
    console.log("Formulario enviado:", values);
    toast.success("Beneficio creado correctamente.");
    onClose();
  };

  return (
    <DelegateDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Crear Beneficio"
      description="Ingrese los detalles del beneficio."
      footerButtons={
        <Button type="submit" form="createBenefitForm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Beneficio
        </Button>
      }
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form id="createBenefitForm" className="grid gap-6">
            {/* Nombre y Tipo de Beneficio */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre del Beneficio</Label>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  placeholder="Ingrese el nombre"
                />
                {errors.name && touched.name && (
                  <p className="text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="typeId">Tipo de Beneficio</Label>
                <Field as={Select} name="typeId">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Tipo 1</SelectItem>
                    <SelectItem value="2">Tipo 2</SelectItem>
                  </SelectContent>
                </Field>
                {errors.typeId && touched.typeId && (
                  <p className="text-red-500">{errors.typeId}</p>
                )}
              </div>
            </div>

            {/* Rango de Edad */}
            <div className="grid gap-2">
              <Label>Rango de Edad</Label>
              <div className="grid grid-cols-2 gap-4">
                <Field as={Select} name="ageMin">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Edad mínima" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 100 }, (_, i) => (
                      <SelectItem key={i} value={String(i)}>
                        {i} años
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Field>
                <Field as={Select} name="ageMax">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Edad máxima" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 100 }, (_, i) => (
                      <SelectItem key={i} value={String(i)}>
                        {i} años
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Field>
              </div>
              {(errors.ageMin || errors.ageMax) &&
                touched.ageMin &&
                touched.ageMax && (
                  <p className="text-red-500">
                    {errors.ageMin || errors.ageMax}
                  </p>
                )}
            </div>

            {/* Stock y Disponibilidad */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Field
                  as={Input}
                  type="number"
                  name="stock"
                  placeholder="Cantidad disponible"
                />
                {errors.stock && touched.stock && (
                  <p className="text-red-500">{errors.stock}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="isAvailable">Disponibilidad</Label>
                <Field as={Select} name="isAvailable">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione disponibilidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Disponible</SelectItem>
                    <SelectItem value="false">No disponible</SelectItem>
                  </SelectContent>
                </Field>
                {errors.isAvailable && touched.isAvailable && (
                  <p className="text-red-500">{errors.isAvailable}</p>
                )}
              </div>
            </div>

            {/* Descripción */}
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Field
                as={Textarea}
                name="description"
                placeholder="Ingrese una breve descripción"
              />
              {errors.description && touched.description && (
                <p className="text-red-500">{errors.description}</p>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </DelegateDialog>
  );
}
