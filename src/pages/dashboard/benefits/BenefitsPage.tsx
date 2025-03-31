import { ClipboardList, PlusCircle } from "lucide-react";
import { useModal } from "../../../lib/hooks/use-modal";
import CustomButton from "../../../components/atoms/CustomButton";
import PageContainer from "../../../components/organisms/PageContainer";
import PageHeader from "../../../components/organisms/PageHeader";
import FiltersBar from "../../../components/molecules/FiltersBar";
import SearchInput from "../../../components/molecules/SearchInput";
import { ChangeEvent } from "react";
import FilterSelect from "../../../components/molecules/FilterSelect";
import { CustomTable } from "../../../components/molecules/CustomTable";
import { CustomPagination } from "../../../components/atoms/CustomPagination";
import { usePagination } from "../../../lib/hooks/use-pagination";
import { ActionType, Column } from "../../../lib/types/tablet/table";
import CreateBenefitForm from "./create/CreateBenefitForm";
import CreateBenefitTypeForm from "./createBenefitType/CreateBenefitTypeForm";

interface User {
  id: number;
  name: string;
  role: string;
  active: string;
}

export default function BenefitsPage() {
  const createBenefitModal = useModal();
  const createBenefitTypeModal = useModal();

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
      <PageHeader title="BENEFICIOS">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
          <CustomButton
            buttonText="Crear Beneficio"
            icon={PlusCircle}
            className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto"
            onClick={createBenefitModal.onChangeState}
          />

          <CustomButton
            buttonText="Crear Tipo de Beneficio"
            icon={ClipboardList}
            className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto"
            onClick={createBenefitTypeModal.onChangeState}
          />
        </div>
      </PageHeader>

      <FiltersBar>
        <SearchInput
          placeholder={"Buscar Afiliados..."}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            console.log("Searching for:", e.target.value);
          }}
        />

        <FilterSelect
          placeholder="Seleccionar Tipo Beneficios"
          value={""}
          onChange={() => console.log("Crear nuevo afiliado")}
          options={[
            { value: "all", label: "Activo" },
            { value: "male", label: "Inactivo" },
          ]}
        />

        <FilterSelect
          placeholder="Seleccionar Disponibles"
          value={""}
          onChange={() => console.log("Crear nuevo afiliado")}
          options={[
            { value: "all", label: "Activo" },
            { value: "male", label: "Inactivo" },
          ]}
        />

        <FilterSelect
          placeholder="Seleccionar rango de edad"
          value={""}
          onChange={() => console.log("Crear nuevo afiliado")}
          options={[
            { value: "all", label: "Activo" },
            { value: "male", label: "Inactivo" },
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

      <CreateBenefitForm
        isOpen={createBenefitModal.modalStatus}
        onClose={createBenefitModal.onChangeState}
      />

      <CreateBenefitTypeForm
        isOpen={createBenefitTypeModal.modalStatus}
        onClose={createBenefitTypeModal.onChangeState}
      />
    </PageContainer>
  );
}
