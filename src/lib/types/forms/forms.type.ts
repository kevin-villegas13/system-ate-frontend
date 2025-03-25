import { FormikHelpers } from "formik";
import { ReactNode } from "react";
import { Schema } from "yup";

export interface ReusableFormikFormProps<T> {
  initialValues: T;
  validationSchema?: Schema<T>;
  onSubmit: (values: T, actions: FormikHelpers<T>) => void;
  children: ReactNode;
  formId?: string;
  className: string;
}
