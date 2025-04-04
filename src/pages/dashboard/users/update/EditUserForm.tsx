// React y librerías externas
import { useState } from "react";
import { Award } from "lucide-react";

// Componentes UI reutilizables
import { Button } from "../../../../components/ui/button";

// Diálogos modales personalizados
import DelegateDialog from "../../../../components/organisms/dialogs/DelegateDialog";
import ConfirmDialog from "../../../../components/organisms/dialogs/ConfirmDialog";

// Formularios reutilizables
import ReusableFormikForm from "../../../../components/molecules/ReusableFormikForm";
import UserFormFields from "../../../../components/molecules/forms/user/UserFormFields";

// Tipos y modelos
import { EditModalProps } from "../../../../lib/types/modal/modal.types";
import { User } from "../../../../models/User";

// Validación
import { userValidationSchema } from "../../../../lib/validators/user/registerSchema";

// Servicios de API
import { useFetchRoles } from "../../../../services/role/role.services";
import { useUpdateUser } from "../../../../services/users/userService";

// Utilidades comunes
import { showErrorToast, showSuccessToast } from "../../../../lib/utils/toast";
import { UserFormValues } from "../../../../lib/types/forms/user/userForm.types";

export default function EditUserForm({
  isOpen,
  onClose,
  data,
}: EditModalProps<User>) {
  const [showPassword, setShowPassword] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [formValues, setFormValues] = useState<UserFormValues | null>(null);

  const { mutate: updateUser } = useUpdateUser(data?.id ?? "");
  const { data: roles } = useFetchRoles();

  // Valores iniciales del formulario
  const initialValues: UserFormValues = {
    username: data?.username ?? "",
    roleName: data?.role?.roleName ?? "",
    password: "",
  };

  // Abre el diálogo de confirmación tras validar campos
  const handleOpenConfirm = (values: UserFormValues) => {
    if (!values.username.trim()) {
      showErrorToast("Debe ingresar un nombre de usuario.");
      return;
    }

    if (!values.roleName) {
      showErrorToast("Debe seleccionar un rol.");
      return;
    }

    setFormValues(values);
    setIsConfirmOpen(true);
  };

  // Ejecuta la actualización del usuario al confirmar
  const handleConfirm = () => {
    if (!data?.id || !formValues) {
      showErrorToast("Datos inválidos para actualizar el usuario.");
      return;
    }

    try {
      updateUser(
        { ...formValues },
        {
          onSuccess: () => {
            showSuccessToast(
              `Usuario ${formValues.username} actualizado exitosamente.`
            );
            setIsConfirmOpen(false);
            onClose();
          },
          onError: (error) => {
            showErrorToast((error as Error).message);
            setIsConfirmOpen(false);
          },
        }
      );
    } catch (error) {
      showErrorToast((error as Error).message);
    }
  };

  return (
    <>
      {/* Diálogo para editar el usuario */}
      <DelegateDialog
        className="custom-class"
        isOpen={isOpen}
        onClose={onClose}
        title="Editar Usuario"
        description="Modifique el nombre de usuario, la contraseña y seleccione un rol."
        footerButtons={
          <Button type="submit" form="editarUsuarioForm">
            <Award className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        }
      >
        {/* Formulario reutilizable con validación */}
        <ReusableFormikForm
          initialValues={initialValues}
          validationSchema={userValidationSchema}
          onSubmit={handleOpenConfirm}
          formId="editarUsuarioForm"
          className="grid gap-6"
        >
          <UserFormFields
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            roles={roles ?? []}
          />
        </ReusableFormikForm>
      </DelegateDialog>

      {/* Diálogo de confirmación antes de actualizar */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        title="Confirmar Edición"
        description={`¿Está seguro de que desea actualizar el usuario ${formValues?.username} con rol ${formValues?.roleName}?`}
      />
    </>
  );
}
