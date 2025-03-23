import { ChangeEvent, useState } from "react";
import { UserPlus } from "lucide-react";
import PageContainer from "../../../components/shared/PageContainer";
import PageHeader from "../../../components/shared/PageHeader";
import FiltersBar from "../../../components/shared/FiltersBar";
import SearchInput from "../../../components/shared/SearchInput";
import {
  ActionType,
  Column,
  CustomTable,
} from "../../../components/shared/CustomTable";
import { CustomPagination } from "../../../components/shared/CustomPagination";
import { usePagination } from "../../../hooks/use-Pagination";
import { useModal } from "../../../hooks/use-modal";
import CreateEventForm from "./create/CreateSectorForm";

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
      <PageHeader
        title="Sectores"
        buttonText="Nuevos Sectores"
        buttonIcon={UserPlus}
        onButtonClick={() => createModal.onChangeState()}
      />

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
