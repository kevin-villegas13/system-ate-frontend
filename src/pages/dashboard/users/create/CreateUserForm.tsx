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

// Tipos y validación
import { ModalProps } from "../../../../lib/types/modal/modal.types";
import { userValidationSchema } from "../../../../lib/validators/user/registerSchema";

// Servicios de API
import { useFetchRoles } from "../../../../services/role/role.services";
import { useCreateUser } from "../../../../services/users/userService";

// Utilidades comunes
import { showErrorToast, showSuccessToast } from "../../../../lib/utils/toast";
import { UserFormValues } from "../../../../lib/types/forms/user/userForm.types";

export default function CreateUserForm({ isOpen, onClose }: ModalProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState<UserFormValues | null>(null);

  const { data: roles } = useFetchRoles();
  const createUser = useCreateUser();

  // Abre el diálogo de confirmación tras validar los campos
  const handleOpenConfirm = (values: UserFormValues) => {
    if (!values.roleName) {
      showErrorToast("Debe seleccionar un rol.");
      return;
    }

    setFormValues(values);
    setIsConfirmOpen(true);
  };

  // Ejecuta la creación del usuario al confirmar
  const handleConfirm = async () => {
    if (!formValues) {
      showErrorToast("Los datos del formulario son inválidos.");
      return;
    }

    try {
      await createUser.mutateAsync(formValues);
      showSuccessToast(`Usuario ${formValues.username} creado con éxito.`);
      setIsConfirmOpen(false);
      onClose();
    } catch (error) {
      showErrorToast((error as Error).message);
    }
  };

  return (
    <>
      {/* Diálogo para crear el usuario */}
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
        {/* Formulario reutilizable con validación */}
        <ReusableFormikForm
          initialValues={{
            username: "",
            roleName: "",
            password: "",
          }}
          validationSchema={userValidationSchema}
          onSubmit={handleOpenConfirm}
          formId="crearUsuarioForm"
          className="grid gap-6"
        >
          <UserFormFields
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            roles={roles ?? []}
          />
        </ReusableFormikForm>
      </DelegateDialog>

      {/* Diálogo de confirmación antes de crear */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        title="Confirmar Creación"
        description="¿Está seguro de que desea crear el usuario con el rol seleccionado?"
      />
    </>
  );
}
