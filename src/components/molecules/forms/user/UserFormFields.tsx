import { Eye, EyeOff } from "lucide-react";
import { useFormikContext, ErrorMessage, Field, FieldProps } from "formik";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import {
  UserFormProps,
  UserFormValues,
} from "../../../../lib/types/forms/user/userForm.types";

export default function UserFormFields({
  showPassword,
  setShowPassword,
  roles,
}: UserFormProps) {
  const { setFieldValue } = useFormikContext<UserFormValues>();

  return (
    <>
      {/* Campo de Nombre de Usuario */}
      <div className="grid gap-2">
        <Label htmlFor="username">Nombre de usuario</Label>
        <Field
          as={Input}
          id="username"
          name="username"
          placeholder="Ingrese el nombre de usuario"
          className="w-full"
        />
        <ErrorMessage
          name="username"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Campo de Contraseña */}
      <div className="grid gap-2 relative">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative w-full">
          <Field
            as={Input}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Ingrese la contraseña"
            className="w-full pr-10"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        <ErrorMessage
          name="password"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Selección de rol */}
      <div className="grid gap-2">
        <Label htmlFor="roleName">Rol</Label>
        <Field name="roleName">
          {({ field }: FieldProps) => (
            <Select
              value={field.value}
              onValueChange={(value) => setFieldValue("roleName", value)}
            >
              <SelectTrigger className="w-full md:w-[550px]">
                <SelectValue>{field.value || "Seleccionar rol"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.roleName!}>
                    {role.roleName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </Field>
        <ErrorMessage
          name="roleName"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </>
  );
}
