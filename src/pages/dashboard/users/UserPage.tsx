import { ChangeEvent, useState } from "react";
import { CheckCircle, UserPlus, XCircle } from "lucide-react";

// Componentes
import PageHeader from "../../../components/organisms/PageHeader";
import PageContainer from "../../../components/organisms/PageContainer";
import FiltersBar from "../../../components/molecules/FiltersBar";
import FilterSelect from "../../../components/molecules/FilterSelect";
import SearchInput from "../../../components/molecules/SearchInput";
import CustomButton from "../../../components/atoms/CustomButton";
import { CustomTable } from "../../../components/molecules/CustomTable";
import { CustomPagination } from "../../../components/atoms/CustomPagination";
import ConfirmDialog from "../../../components/organisms/dialogs/ConfirmDialog";

// Formularios de usuario
import CreateUserForm from "./create/CreateUserForm";
import EditUserForm from "./update/EditUserForm";

// Hooks y utilidades
import { useModal } from "../../../lib/hooks/use-modal";
import { showErrorToast, showSuccessToast } from "../../../lib/utils/toast";
import {
  useDeleteUser,
  usePaginationUser,
  useToggleUserStatus,
} from "../../../services/users/userService";
import { ActionType, Column } from "../../../lib/types/tablet/table";
import { User } from "../../../models/User";
import { useFetchRoles } from "../../../services/role/role.services";
import { Status } from "../../../models/enums/Status.enum";
import { Badge } from "../../../components/ui/badge";

export default function UserPage() {
  // Modales
  const createModal = useModal();
  const editModal = useModal();

  // Estados de filtros
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");

  // Estado de paginación
  const [currentPage, setCurrentPage] = useState(1);

  // Estado de confirmación de acción
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState<null | (() => void)>(null);

  // Usuario seleccionado para edición
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Hook de consultas
  const { data: rolesData } = useFetchRoles();
  const deleteUser = useDeleteUser();
  const toggleUserStatus = useToggleUserStatus();

  // Consulta de datos con filtros y paginación
  const data = usePaginationUser({
    page: currentPage,
    limit: 5,
    search: searchQuery,
    roleId: selectedRole !== "all" ? selectedRole : undefined,
    status: selectedStatus === Status.ALL ? undefined : selectedStatus,
  });

  // Configuración de columnas de la tabla
  const columns: Column<User>[] = [
    { key: "username", label: "Nombre", sortable: true },
    {
      key: "role",
      label: "Rol",
      sortable: true,
      render: (user) => user.role?.roleName || "Sin rol",
    },
    {
      key: "isActive",
      label: "Estado",
      sortable: true,
      render: ({ isActive }) => (
        <div className="flex justify-center items-center w-full h-full">
          <Badge
            className={`ml-2 flex items-center gap-1 px-3 py-1 text-white text-sm rounded-md ${
              isActive ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {isActive ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <span>{isActive ? "Activo" : "No Activo"}</span>
          </Badge>
        </div>
      ),
    },
  ];
  // Manejo de acciones en la tabla
  const handleAction = (action: ActionType, user: User) => {
    switch (action) {
      case "edit":
        setSelectedUser(user);
        editModal.onChangeState();
        break;
      case "delete":
        setConfirmMessage(`¿Estás seguro de eliminar a ${user.username}?`);
        setConfirmAction(() => async () => {
          try {
            await deleteUser.mutateAsync(user.id as string);
            showSuccessToast(
              `Usuario ${user.username} eliminado correctamente`
            );
          } catch (error) {
            showErrorToast("Ocurrió un error al eliminar el usuario");
          }
        });
        setIsConfirmOpen(true);
        break;
      case "desactive":
        const newStatus = user.isActive ? "desactivar" : "activar";
        setConfirmMessage(`¿Quieres ${newStatus} a ${user.username}?`);
        setConfirmAction(() => async () => {
          try {
            await toggleUserStatus.mutateAsync({
              id: `${user.id}/toggle-status`,
            });
            showSuccessToast(
              `Usuario ${user.username} ${newStatus} correctamente`
            );
          } catch (error) {
            showErrorToast(`Ocurrió un error al ${newStatus} el usuario`);
          }
        });
        setIsConfirmOpen(true);
        break;
    }
  };

  const handleConfirm = () => {
    if (confirmAction) confirmAction();
    setIsConfirmOpen(false);
  };

  // Opciones para el selector de roles
  const roleOptions = [
    { value: "all", label: "Todos" },
    ...(rolesData?.map((role) => ({
      value: role.id ? role.id.toString() : "",
      label: role.roleName || "Sin nombre",
    })) || []),
  ];

  // Opciones para el selector de estados
  const statusOptions = [
    { value: Status.ALL, label: "Todos" },
    { value: Status.ACTIVE, label: "Activo" },
    { value: Status.INACTIVE, label: "Inactivo" },
  ];

  const usersFormatted = data.users.map((user) => ({
    ...user,
    id: user.id ?? "",
  }));

  return (
    <PageContainer>
      {/* Encabezado con botón de agregar usuario */}
      <PageHeader title="USUARIOS">
        <CustomButton
          buttonText="Agregar Usuario"
          icon={UserPlus}
          onClick={createModal.onChangeState}
        />
      </PageHeader>

      {/* Barra de filtros */}
      <FiltersBar>
        <SearchInput
          placeholder="Buscar..."
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
        <FilterSelect
          placeholder="Seleccionar estados"
          value={selectedStatus}
          onChange={(value: string) => {
            setSelectedStatus(value);
            setCurrentPage(1);
          }}
          options={statusOptions}
        />
        <FilterSelect
          placeholder="Seleccionar Roles"
          value={selectedRole}
          onChange={(value: string) => {
            setSelectedRole(value);
            setCurrentPage(1);
          }}
          options={roleOptions}
        />
      </FiltersBar>

      {/* Tabla de usuarios */}
      <CustomTable
        data={usersFormatted}
        columns={columns}
        actions={["edit", "delete", "desactive"]}
        onAction={handleAction}
      />

      {/* Paginación */}
      <CustomPagination
        currentPage={currentPage}
        totalPages={data.totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal de creación de usuario */}
      <CreateUserForm
        isOpen={createModal.modalStatus}
        onClose={createModal.onChangeState}
      />

      {/* Modal de edición de usuario */}
      <EditUserForm
        isOpen={editModal.modalStatus}
        onClose={editModal.onChangeState}
        data={selectedUser}
      />

      {/* Diálogo de confirmación */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        title="Confirmación Requerida"
        description={confirmMessage}
      />
    </PageContainer>
  );
}
