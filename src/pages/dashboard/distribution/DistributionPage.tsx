import { UserPlus } from "lucide-react";
import CustomButton from "../../../components/atoms/CustomButton";
import PageContainer from "../../../components/organisms/PageContainer";
import PageHeader from "../../../components/organisms/PageHeader";
import { useModal } from "../../../lib/hooks/use-modal";
import FiltersBar from "../../../components/molecules/FiltersBar";
import SearchInput from "../../../components/molecules/SearchInput";
import { ChangeEvent } from "react";
import FilterSelect from "../../../components/molecules/FilterSelect";
import { CustomTable } from "../../../components/molecules/CustomTable";
import { CustomPagination } from "../../../components/atoms/CustomPagination";
import { usePagination } from "../../../lib/hooks/use-Pagination";
import { ActionType, Column } from "../../../lib/types/tablet/table";
import CreateDistributionForm from "./create/CreateDistributionForm";

interface User {
  id: number;
  name: string;
  role: string;
  active: string;
}

export default function DistributionPage() {
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

  // Hook de paginación
  const { currentPage, totalPages, paginatedData, goToPage } = usePagination(
    affiliates,
    5
  );

  const handleAction = (action: ActionType) => {};

  return (
    <PageContainer>
      <PageHeader title="ENTREGAS DE BENEFICIOS">
        <CustomButton
          buttonText="Entregar beneficio"
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
          placeholder="Seleccionar afialdos o niños"
          value={""}
          onChange={() => console.log("Crear nuevo afiliado")}
          options={[
            { value: "all", label: "Activo" },
            { value: "male", label: "Inactivo" },
          ]}
        />

        <FilterSelect
          placeholder="Seleccionar estados"
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
        data={paginatedData}
        columns={columns}
        actions={["edit", "delete", "view"]}
        onAction={handleAction}
      />

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
      <CreateDistributionForm
        isOpen={createModal.modalStatus}
        onClose={createModal.onChangeState}
      />
    </PageContainer>
  );
}
