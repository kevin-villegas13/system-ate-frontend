import { ErrorMessage, Field, useFormikContext } from "formik";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormFieldProps } from "./types/forms-generic.type";

export function FormField<T>({ field, setFieldValue }: FormFieldProps<T>) {
  const { values } = useFormikContext<T>();

  // Función que determina el ancho del campo según su tipo
  const getFieldSpan = () => {
    switch (field.type) {
      case "textarea":
        return "col-span-full"; // El campo de texto ocupará toda la columna
      case "checkbox":
        return "sm:col-span-2"; // El campo checkbox ocupará dos columnas en pantallas pequeñas
      default:
        return "sm:col-span-1"; // Para otros campos, solo una columna
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${getFieldSpan()}`}>
      {/* Etiqueta del campo */}
      <Label htmlFor={field.name as string} className="font-medium">
        {field.label}
      </Label>

      {/* Renderizado del campo según su tipo */}
      {field.type === "textarea" ? (
        // Campo tipo textarea
        <Field
          as={Textarea}
          id={field.name as string}
          name={field.name as string}
          placeholder={field.placeholder}
          className="w-full p-3 border rounded-lg"
        />
      ) : field.type === "select" ? (
        // Campo tipo select (dropdown)
        <Select
          onValueChange={(value) => setFieldValue(field.name, value)}
          value={values[field.name] as string}
        >
          <SelectTrigger className="w-full p-3 text-sm rounded-lg border">
            <SelectValue placeholder={field.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : field.type === "checkbox" ? (
        // Campo tipo checkbox
        <div className="flex items-center gap-2">
          <Checkbox
            id={field.name as string}
            checked={Boolean(values[field.name])}
            onCheckedChange={(checked) =>
              setFieldValue(field.name, checked === true)
            }
          />
        </div>
      ) : (
        // Otros campos tipo input
        <Field
          as={Input}
          id={field.name as string}
          type={field.type}
          name={field.name as string}
          placeholder={field.placeholder}
          className="w-full p-3 border rounded-lg"
        />
      )}

      <ErrorMessage
        name={field.name as string}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
}
