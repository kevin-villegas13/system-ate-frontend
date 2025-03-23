import { UserPlus } from "lucide-react";
import PageContainer from "../../../components/shared/PageContainer";
import PageHeader from "../../../components/shared/PageHeader";
import FiltersBar from "../../../components/shared/FiltersBar";
import SearchInput from "../../../components/shared/SearchInput";
import FilterSelect from "../../../components/shared/FilterSelect";
import { ChangeEvent, useState } from "react";
import { CustomPagination } from "../../../components/shared/CustomPagination";
import {
  ActionType,
  Column,
  CustomTable,
} from "../../../components/shared/CustomTable";
import { useModal } from "../../../hooks/use-modal";
import CreateEventForm from "./create/CreateEventForm";

interface User {
  id: number;
  name: string;
  role: string;
  active: string;
}

export default function EventPage() {
  const createModal = useModal();

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

  const handleAction = (action: ActionType, item: User) => {};

  return (
    <PageContainer>
      <PageHeader
        title="Eventos"
        buttonText="Evento Usuario"
        buttonIcon={UserPlus}
        onButtonClick={() => createModal.onChangeState()}
      />

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
      </FiltersBar>

      <CustomTable
        data={paginatedAffiliates}
        columns={columns}
        actions={["edit", "delete", "view"]}
        onAction={handleAction}
      />

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <CreateEventForm
        isOpen={createModal.modalStatus}
        onClose={createModal.onChangeState}
      />
    </PageContainer>
  );
}
