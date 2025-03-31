import { ChangeEvent, useState } from "react";
import { UserPlus } from "lucide-react";
import FiltersBar from "../../../../components/molecules/FiltersBar";
import PageContainer from "../../../../components/organisms/PageContainer";
import PageHeader from "../../../../components/organisms/PageHeader";
import FilterSelect from "../../../../components/molecules/FilterSelect";
import { usePagination } from "../../../../lib/hooks/use-pagination";
import { ActionType, Column } from "../../../../lib/types/tablet/table";
import { useModal } from "../../../../lib/hooks/use-modal";
import HistoryDelegatesPage from "./history/HistoryDelegatesPage";
import CustomButton from "../../../../components/atoms/CustomButton";
import SearchInput from "../../../../components/molecules/SearchInput";
import { CustomTable } from "../../../../components/molecules/CustomTable";
import { CustomPagination } from "../../../../components/atoms/CustomPagination";

interface Delegate {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  sector: string;
  active: string;
}

export default function ManageBenefitsPage() {
  const historyModal = useModal();

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

  const handleAction = (action: ActionType) => {};

  return (
    <PageContainer>
      <PageHeader title="DELEGADOS ASIGANDOS">
        <CustomButton
          buttonText="Historial Delegado"
          icon={UserPlus}
          onClick={historyModal.onChangeState}
        />
      </PageHeader>

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
        actions={["edit", "delete"]}
        onAction={handleAction}
      />

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
      <HistoryDelegatesPage
        isOpen={historyModal.modalStatus}
        onClose={historyModal.onChangeState}
      />
    </PageContainer>
  );
}
