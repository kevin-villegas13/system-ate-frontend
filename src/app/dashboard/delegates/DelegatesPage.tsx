import { UserPlus } from "lucide-react";
import PageContainer from "../../../components/shared/PageContainer";
import PageHeader from "../../../components/shared/PageHeader";
import { useModal } from "../../../hooks/use-modal";
import FiltersBar from "../../../components/shared/FiltersBar";
import SearchInput from "../../../components/shared/SearchInput";
import { ChangeEvent, useState } from "react";
import FilterSelect from "../../../components/shared/FilterSelect";
import {
  ActionType,
  Column,
  CustomTable,
} from "../../../components/shared/CustomTable";
import { usePagination } from "../../../hooks/use-Pagination";
import { CustomPagination } from "../../../components/shared/CustomPagination";
import CreateDelegatesForm from "./create/CreateDelegatesForm";

interface Delegate {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  sector: string;
  active: string;
}

export default function DelegatesPage() {
  const createModal = useModal();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const delegates: Delegate[] = [
    {
      id: 1,
      firstName: "Carlos",
      lastName: "Pérez",
      dni: "12345678",
      sector: "Tecnología",
      active: "Activo",
    },
    {
      id: 2,
      firstName: "Ana",
      lastName: "López",
      dni: "87654321",
      sector: "Salud",
      active: "Activo",
    },
    {
      id: 3,
      firstName: "Miguel",
      lastName: "Hernández",
      dni: "56781234",
      sector: "Educación",
      active: "Inactivo",
    },
  ];

  const columns: Column<Delegate>[] = [
    { key: "firstName", label: "Nombre", sortable: true },
    { key: "lastName", label: "Apellido", sortable: true },
    { key: "dni", label: "DNI", sortable: true },
    { key: "sector", label: "Sector", sortable: true },
    { key: "active", label: "Estado", sortable: true },
  ];

  // Hook de paginación
  const { currentPage, totalPages, paginatedData, goToPage } = usePagination(
    delegates,
    5
  );

  const handleAction = (action: ActionType) => {
    console.log(`Acción ejecutada: ${action}`);
  };

  return (
    <PageContainer>
      <PageHeader
        title="DELEGADOS"
        buttonText="Nuevo Delegado"
        buttonIcon={UserPlus}
        onButtonClick={() => createModal.onChangeState()}
      />

      <FiltersBar>
        <SearchInput
          placeholder="Buscar delegados..."
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            console.log("Buscando:", e.target.value)
          }
        />

        <FilterSelect
          placeholder="Filtrar por estado"
          value={selectedStatus}
          onChange={(value) => setSelectedStatus(value as string)}
          options={[
            { value: "all", label: "Todos" },
            { value: "activo", label: "Activo" },
            { value: "inactivo", label: "Inactivo" },
          ]}
        />
      </FiltersBar>

      <CustomTable
        data={paginatedData}
        columns={columns}
        actions={["edit", "delete", "desactive", "view"]}
        onAction={handleAction}
      />

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />

      <CreateDelegatesForm
        isOpen={createModal.modalStatus}
        onClose={createModal.onChangeState}
      />
    </PageContainer>
  );
}
