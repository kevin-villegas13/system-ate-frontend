import { ChangeEvent } from "react";
import { UserPlus } from "lucide-react";
import PageContainer from "../../../components/organisms/PageContainer";
import PageHeader from "../../../components/organisms/PageHeader";
import FiltersBar from "../../../components/molecules/FiltersBar";
import { usePagination } from "../../../lib/hooks/use-Pagination";
import { useModal } from "../../../lib/hooks/use-modal";
import CreateEventForm from "./create/CreateSectorForm";
import CustomButton from "../../../components/atoms/CustomButton";
import { ActionType, Column } from "../../../lib/types/tablet/table";
import SearchInput from "../../../components/molecules/SearchInput";
import { CustomTable } from "../../../components/molecules/CustomTable";
import { CustomPagination } from "../../../components/atoms/CustomPagination";

interface Sector {
  id: number;
  name: string;
  sectorCode: string;
  active: string;
}

export default function SectorPage() {
  const createModal = useModal();

  const sectors: Sector[] = [
    { id: 1, name: "Tecnología", sectorCode: "TEC001", active: "Activo" },
    { id: 2, name: "Salud", sectorCode: "SAL002", active: "Activo" },
    { id: 3, name: "Educación", sectorCode: "EDU003", active: "Activo" },
    { id: 4, name: "Finanzas", sectorCode: "FIN004", active: "Inactivo" },
    { id: 5, name: "Construcción", sectorCode: "CON005", active: "Activo" },
    { id: 6, name: "Marketing", sectorCode: "MAR006", active: "Activo" },
    { id: 7, name: "Logística", sectorCode: "LOG007", active: "Inactivo" },
    { id: 8, name: "Legal", sectorCode: "LEG008", active: "Activo" },
    { id: 9, name: "Turismo", sectorCode: "TUR009", active: "Activo" },
    { id: 10, name: "Arte", sectorCode: "ART010", active: "Inactivo" },
  ];

  const columns: Column<Sector>[] = [
    { key: "name", label: "Sector", sortable: true },
    { key: "sectorCode", label: "Código de Sector", sortable: true },
    { key: "active", label: "Estado", sortable: true },
  ];

  // Usamos el hook de paginación
  const { currentPage, totalPages, paginatedData, goToPage } = usePagination(
    sectors,
    5
  );

  const handleAction = (action: ActionType) => {};

  return (
    <PageContainer>
      <PageHeader title="Sectores">
        <CustomButton
          buttonText="Agregar Usuario"
          icon={UserPlus}
          onClick={createModal.onChangeState}
        />
      </PageHeader>

      <FiltersBar>
        <SearchInput
          placeholder={"Buscar Sectores..."}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            console.log("Searching for:", e.target.value);
          }}
        />
      </FiltersBar>

      <CustomTable
        data={paginatedData}
        columns={columns}
        actions={["edit", "delete", "desactive"]}
        onAction={handleAction}
      />

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />

      <CreateEventForm
        isOpen={createModal.modalStatus}
        onClose={createModal.onChangeState}
      />
    </PageContainer>
  );
}
