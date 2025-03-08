import { FormikHelpers } from "formik";

// Definimos los tipos permitidos para los campos del formulario
export type FieldType = "text" | "textarea" | "select" | "date" | "number";

// Opciones estrictamente tipadas para los campos tipo "select"
export interface SelectOption<T = string | number> {
  value: T;
  label: string;
}

// Configuración estricta de cada campo
export interface FieldConfig<T = string | number> {
  name: keyof T;
  label: string;
  type: FieldType;
  options?: SelectOption[];
  placeholder?: string;
}

// Props del componente principal
export interface GenericModalFormsProps<T extends Record<string, unknown>> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  initialValues: T;
  validationSchema?: unknown;
  onSubmit: (
    values: T,
    formikHelpers: FormikHelpers<T>
  ) => void | Promise<void>;
  fields: FieldConfig<T>[];
  submitText?: string;
}

//  Props para el componente FormField
export interface FormFieldProps<T> {
  field: FieldConfig<T>;
  setFieldValue: (field: keyof T, value: unknown) => void;
}
