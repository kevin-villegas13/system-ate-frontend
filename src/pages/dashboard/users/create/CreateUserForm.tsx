import { useState } from "react";
import { Award, Eye, EyeOff } from "lucide-react";
import { ErrorMessage, Field, FieldProps } from "formik";
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
import DelegateDialog from "../../../../components/organisms/dialogs/DelegateDialog";
import ConfirmDialog from "../../../../components/organisms/dialogs/ConfirmDialog";
import ReusableFormikForm from "../../../../components/molecules/ReusableFormikForm";
import { useCreateUser } from "../../../../services/users/userService";
import { showErrorToast, showSuccessToast } from "../../../../lib/utils/toast";
import { ModalProps } from "../../../../lib/types/modal/modal.types";
import { useFetchRoles } from "../../../../services/role/role.services";
import { userValidationSchema } from "../../../../lib/validators/user/registerSchema";

export default function CreateUserForm({ isOpen, onClose }: ModalProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    roleName: "",
    password: "",
  });

  const { data: roles } = useFetchRoles();
  const createUser = useCreateUser();

  // Función para abrir la confirmación
  const handleOpenConfirm = (values: {
    username: string;
    roleName: string;
    password: string;
  }) => {
    if (!values.roleName) {
      showErrorToast("Debe seleccionar un rol.");
      return;
    }
    setFormValues(values);
    setIsConfirmOpen(true);
  };

  // Función para manejar la confirmación y crear el usuario
  const handleConfirm = async (values: {
    username: string;
    roleName: string;
    password: string;
  }) => {
    try {
      await createUser.mutateAsync(values);
      showSuccessToast(`Usuario ${values.username} creado con éxito.`);
      setIsConfirmOpen(false);
      onClose();
    } catch (error) {
      showErrorToast((error as Error).message);
      console.log("❌ Error:", (error as Error).message);
    }
  };

  return (
    <>
      <DelegateDialog
        className=""
        isOpen={isOpen}
        onClose={onClose}
        title="Crear Usuario"
        description="Ingrese el nombre de usuario, contraseña y seleccione un rol."
        footerButtons={
          <Button type="submit" form="crearUsuarioForm">
            <Award className="mr-2 h-4 w-4" />
            Crear Usuario
          </Button>
        }
      >
        <ReusableFormikForm
          initialValues={{ username: "", roleName: "", password: "" }}
          validationSchema={userValidationSchema}
          onSubmit={(values) => handleOpenConfirm(values)}
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

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => handleConfirm(formValues)}
        title="Confirmar Creación"
        description="¿Está seguro de que desea crear el usuario con el rol seleccionado?"
      />
    </>
  );
}
