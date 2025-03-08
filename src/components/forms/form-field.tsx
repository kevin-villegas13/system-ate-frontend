import { Field } from "formik";
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
import { FormFieldProps } from "./types/forms-generic";

export function FormField<T>({ field, setFieldValue }: FormFieldProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={field.name as string}>{field.label}</Label>

      {field.type === "textarea" ? (
        <Field
          as={Textarea}
          id={field.name as string}
          name={field.name as string}
          placeholder={field.placeholder}
        />
      ) : field.type === "select" ? (
        <Select onValueChange={(value) => setFieldValue(field.name, value)}>
          <SelectTrigger className="w-full p-3 text-sm">
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
      ) : (
        <Field
          as={Input}
          id={field.name as string}
          type={field.type}
          name={field.name as string}
          placeholder={field.placeholder}
        />
      )}
    </div>
  );
}
