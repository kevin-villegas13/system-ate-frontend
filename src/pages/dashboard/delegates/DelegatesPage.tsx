import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, UserPlus } from "lucide-react";
import PageContainer from "../../../components/organisms/PageContainer";
import PageHeader from "../../../components/organisms/PageHeader";
import { useModal } from "../../../lib/hooks/use-modal";
import FiltersBar from "../../../components/molecules/FiltersBar";
import FilterSelect from "../../../components/molecules/FilterSelect";
import CreateDelegatesForm from "./create/CreateDelegatesForm";
import { ActionType, Column } from "../../../lib/types/tablet/table";
import AssignDelegates from "./assign/AssignDelegates";
import { usePagination } from "../../../lib/hooks/use-Pagination";
import CustomButton from "../../../components/atoms/CustomButton";
import SearchInput from "../../../components/molecules/SearchInput";
import { CustomTable } from "../../../components/molecules/CustomTable";
import { CustomPagination } from "../../../components/atoms/CustomPagination";

interface Delegate {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  sector: string;
  active: string;
}

export default function DelegatesPage() {
  const navigate = useNavigate();
  const createModal = useModal();
  const assingModal = useModal();

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
    if (action === "assign") {
      assingModal.onChangeState();
    }
  };

  return (
    <PageContainer>
      <PageHeader title="DELEGADOS">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
          <CustomButton
            buttonText="Gestionar Beneficios"
            icon={Settings}
            className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto"
            onClick={() => navigate("gestionar-beneficio")}
          />

          <CustomButton
            buttonText="Agregar Delegado"
            icon={UserPlus}
            className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto"
            onClick={createModal.onChangeState}
          />
        </div>
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
        actions={["view", "edit", "assign", "delete", "desactive"]}
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

      <AssignDelegates
        isOpen={assingModal.modalStatus}
        onClose={assingModal.onChangeState}
      />
    </PageContainer>
  );
}
