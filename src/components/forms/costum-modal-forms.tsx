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
import { GenericModalFormsProps } from "./types/forms-generic";

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <Formik<T>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-4">
              {fields.map((field) => (
                <FormField<T>
                  key={String(field.name)}
                  field={field}
                  setFieldValue={(field: keyof T, value: unknown) => {
                    setFieldValue(String(field), value);
                  }}
                />
              ))}

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {submitText}
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
