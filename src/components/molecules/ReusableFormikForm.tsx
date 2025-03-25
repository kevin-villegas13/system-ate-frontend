import { Form, Formik } from "formik";
import { FormikValues } from "formik";
import { ReusableFormikFormProps } from "../../lib/types/forms/forms.type";

export default function ReusableFormikForm<T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  formId,
  className,
}: ReusableFormikFormProps<T>) {
  return (
    <Formik<T>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => <Form className={className} id={formId}>{children}</Form>}
    </Formik>
  );
}
