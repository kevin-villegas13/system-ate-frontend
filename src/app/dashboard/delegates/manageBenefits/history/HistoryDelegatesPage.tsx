import { ModalProps } from "../../../../../lib/types/modal/modal.types";
import { usePagination } from "../../../../../lib/hooks/use-Pagination";
import { Column } from "../../../../../lib/types/tablet/table";
import DelegateDialog from "../../../../../components/organisms/dialogs/DelegateDialog";
import { CustomTable } from "../../../../../components/molecules/CustomTable";
import { CustomPagination } from "../../../../../components/atoms/CustomPagination";

interface Delegate {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  sector: string;
  active: string;
}

export default function HistoryDelegatesPage({ isOpen, onClose }: ModalProps) {
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

  const { currentPage, totalPages, paginatedData, goToPage } = usePagination(
    delegates,
    5
  );

  return (
    <DelegateDialog
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-lg w-full max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] h-[80vh] sm:h-auto max-h-[90vh] overflow-auto"
      title="Historial de Delegados"
      description="Aquí puedes ver la lista de delegados con su información."
    >
      {/* Contenedor de la tabla con scroll en móviles */}
      <div className="overflow-x-auto">
        <CustomTable
          data={paginatedData}
          columns={columns}
          actions={[]}
          onAction={() => {}}
        />
      </div>

      {/* Paginación siempre visible y centrada */}
      <div className="flex justify-center mt-4">
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </div>
    </DelegateDialog>
  );
}
