import { ChangeEvent, useState } from "react";
import PageHeader from "../../../components/shared/page-header";
import { UserPlus } from "lucide-react";
import SearchInput from "../../../components/shared/shared-input";
import FilterSelect from "../../../components/shared/filters-select";
import {
  ActionType,
  Column,
  CustomTable,
} from "../../../components/shared/custom-tablet";
import { CustomPagination } from "../../../components/shared/custom-pagination";
import CreateUsers from "./create/page";
import EditUser from "./update/page";

interface User {
  id: number;
  name: string;
  role: string;
  active: string;
}

export default function PageUser() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
      setIsEditModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <PageHeader
        title="Usuario"
        buttonText="Nuevo Usuario"
        buttonIcon={UserPlus}
        onButtonClick={() => setIsCreateModalOpen(true)}
      />

      <div className="flex flex-wrap items-center gap-4 p-6 rounded-xl bg-white shadow-sm">
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
      </div>

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

      <CreateUsers
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <EditUser
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={selectedUser}
      />
    </div>
  );
}
