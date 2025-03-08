import { Formik, Form } from "formik";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { FormField } from "./form-field";
import { GenericModalFormsProps } from "./types/forms-generic.type";

export default function GenericModalForms<T extends Record<string, unknown>>({
  isOpen,
  onClose,
  title,
  description,
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  submitText = "Submit",
}: GenericModalFormsProps<T>) {
  return (
    // Modal con Formulario
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        {/* Encabezado del modal */}
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {/* Formulario con Formik */}
        <Formik<T>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Mapeo de campos dinámicamente */}
              {fields.map((field) => (
                <FormField<T>
                  key={String(field.name)}
                  field={field}
                  setFieldValue={(field: keyof T, value: unknown) => {
                    setFieldValue(String(field), value);
                  }}
                />
              ))}

              {/* Botón de envío */}
              <div className="col-span-full">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {submitText}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
