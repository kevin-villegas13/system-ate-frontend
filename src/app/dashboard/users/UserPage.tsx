import { ChangeEvent, useState } from "react";
import { UserPlus } from "lucide-react";
import PageHeader from "../../../components/organisms/PageHeader";
import FilterSelect from "../../../components/molecules/FilterSelect";
import FiltersBar from "../../../components/molecules/FiltersBar";
import PageContainer from "../../../components/organisms/PageContainer";
import { useModal } from "../../../lib/hooks/use-modal";
import CreateUserForm from "./create/CreateUserForm";
import EditUserForm from "./update/EditUserForm";
import { ActionType, Column } from "../../../lib/types/tablet/table";
import { showErrorToast, showSuccessToast } from "../../../lib/utils/toast";
import CustomButton from "../../../components/atoms/CustomButton";
import SearchInput from "../../../components/molecules/SearchInput";
import { CustomTable } from "../../../components/molecules/CustomTable";
import { CustomPagination } from "../../../components/atoms/CustomPagination";
import ConfirmDialog from "../../../components/organisms/dialogs/ConfirmDialog";

interface User {
  id: number;
  name: string;
  role: string;
  active: string;
}

export default function UserPage() {
  const createModal = useModal();
  const editModal = useModal();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<null | (() => void)>(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  const affiliates: User[] = [
    { id: 1, name: "Kevin", role: "Masculino", active: "Tecnología" },
    { id: 2, name: "Ana", role: "Femenino", active: "Salud" },
    { id: 3, name: "Carlos", role: "Masculino", active: "Educación" },
    { id: 4, name: "Laura", role: "Femenino", active: "Finanzas" },
    { id: 5, name: "Miguel", role: "Masculino", active: "Construcción" },
    { id: 6, name: "Sofía", role: "Femenino", active: "Marketing" },
    { id: 7, name: "Andrés", role: "Masculino", active: "Logística" },
    { id: 8, name: "Valentina", role: "Femenino", active: "Legal" },
    { id: 9, name: "Javier", role: "Masculino", active: "Turismo" },
    { id: 10, name: "Camila", role: "Femenino", active: "Arte" },
  ];

  const columns: Column<User>[] = [
    { key: "name", label: "Nombre", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "active", label: "Activo", sortable: true },
  ];

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(affiliates.length / itemsPerPage);

  // Datos paginados
  const paginatedAffiliates = affiliates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAction = (action: ActionType, item: User) => {
    if (action === "edit") {
      setSelectedUser(item);
      editModal.onChangeState();
    } else if (action === "delete") {
      setConfirmMessage(`¿Estás seguro de eliminar a ${item.name}?`);
      setConfirmAction(() => () => {
        showSuccessToast(`Usuario ${item.name} desactivado`);
      });
      setIsConfirmOpen(true);
    } else if (action === "desactive") {
      setConfirmMessage(`¿Quieres desactivar a ${item.name}?`);
      setConfirmAction(() => () => {
        showErrorToast("Ocurrió un error al desactivar el usuario");
      });
      setIsConfirmOpen(true);
    }
  };

  const handleConfirm = () => {
    if (confirmAction) confirmAction();

    setIsConfirmOpen(false);
  };

  return (
    <PageContainer>
      <PageHeader title="Usuarios">
        <CustomButton
          buttonText="Agregar Usuario"
          icon={UserPlus}
          onClick={createModal.onChangeState}
        />
      </PageHeader>

      <FiltersBar>
        <SearchInput
          placeholder={"Buscar Afiliados..."}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            console.log("Searching for:", e.target.value);
          }}
        />

        <FilterSelect
          placeholder="Seleccionar estados"
          value={""}
          onChange={() => console.log("Crear nuevo afiliado")}
          options={[
            { value: "all", label: "Activo" },
            { value: "male", label: "Inactivo" },
          ]}
        />

        <FilterSelect
          placeholder="Seleccionar Roles"
          value={""}
          onChange={() => console.log("Crear nuevo afiliado")}
          options={[
            { value: "all", label: "Todos" },
            { value: "male", label: "Admin" },
            { value: "female", label: "Empleado" },
          ]}
        />
      </FiltersBar>

      <CustomTable
        data={paginatedAffiliates}
        columns={columns}
        actions={["edit", "delete", "desactive"]}
        onAction={handleAction}
      />

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <CreateUserForm
        isOpen={createModal.modalStatus}
        onClose={createModal.onChangeState}
      />

      <EditUserForm
        isOpen={editModal.modalStatus}
        onClose={editModal.onChangeState}
        data={selectedUser}
      />

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
