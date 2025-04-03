import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Award, Eye, EyeOff } from "lucide-react";
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
import { EditModalProps } from "../../../../lib/types/modal/modal.types";
import DelegateDialog from "../../../../components/organisms/dialogs/DelegateDialog";
import ConfirmDialog from "../../../../components/organisms/dialogs/ConfirmDialog";
import { User } from "../../../../models/User";
import ReusableFormikForm from "../../../../components/molecules/ReusableFormikForm";
import { ErrorMessage, Field, FieldProps } from "formik";
import { userValidationSchema } from "../../../../lib/validators/user/registerSchema";
import { useFetchRoles } from "../../../../services/role/role.services";

export default function EditUserForm({
  isOpen,
  onClose,
  data,
}: EditModalProps<User>) {
  const [showPassword, setShowPassword] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Obtener roles desde el hook
  const { data: roles } = useFetchRoles();

  // Manejo de estado para los datos del usuario
  const [username, setUsername] = useState(data?.username ?? "");
  const [password, setPassword] = useState(""); // No mostramos la contraseña anterior por seguridad
  const [roleName, setRoleName] = useState(data?.role?.roleName ?? "");

  useEffect(() => {
    // Si los roles ya están cargados y se recibe `data`, actualizamos el rol
    if (data?.role?.roleName) {
      setRoleName(data?.role?.roleName);
    }
  }, [data, roles]);

  const handleOpenConfirm = () => {
    if (!username.trim()) {
      toast.error("Debe ingresar un nombre de usuario.");
      return;
    }
    if (!roleName) {
      toast.error("Debe seleccionar un rol.");
      return;
    }
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    console.log("Usuario editado:", { username, password, roleName });
    toast.success(`Usuario ${username} actualizado exitosamente.`);
    setIsConfirmOpen(false);
    onClose();
  };

  return (
    <>
      <DelegateDialog
        className=""
        isOpen={isOpen}
        onClose={onClose}
        title="Editar Usuario"
        description="Modifique el nombre de usuario, la contraseña y seleccione un rol."
        footerButtons={
          <Button type="button" onClick={handleOpenConfirm}>
            <Award className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        }
      >
        <ReusableFormikForm
          initialValues={{
            username: data?.username ?? "",
            roleName: roleName ?? "",
            password: "",
          }}
          validationSchema={userValidationSchema}
          onSubmit={(values) => {
            setUsername(values.username);
            setPassword(values.password);
            setRoleName(values.roleName);
            handleOpenConfirm();
          }}
          formId="crearUsuarioForm"
          className="grid gap-6"
        >
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
              {({ field, form }: FieldProps) => (
                <Select
                  value={field.value}
                  onValueChange={(value) =>
                    form.setFieldValue("roleName", value)
                  }
                >
                  <SelectTrigger className="w-full md:w-[550px]">
                    <SelectValue>
                      {field.value || "Seleccionar rol"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {roles?.map((role) => (
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
        </ReusableFormikForm>
      </DelegateDialog>

      {/* Cuadro de Confirmación */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        title="Confirmar Edición"
        description={`¿Está seguro de que desea actualizar el usuario ${username} con rol ${roleName}?`}
      />
    </>
  );
}
