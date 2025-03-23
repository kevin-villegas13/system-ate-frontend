import { UserPlus } from "lucide-react";
import { ChangeEvent, useState } from "react";
import PageHeader from "../../../components/shared/PageHeader";
import FilterSelect from "../../../components/shared/FilterSelect";
import SearchInput from "../../../components/shared/SearchInput";
import FiltersBar from "../../../components/shared/FiltersBar";
import PageContainer from "../../../components/shared/PageContainer";
import {
  ActionType,
  Column,
  CustomTable,
} from "../../../components/shared/CustomTable";
import { CustomPagination } from "../../../components/shared/CustomPagination";
import { useModal } from "../../../hooks/use-modal";
import CreateAffiliateForm from "./create/CreateAffiliateForm";
import DetailAffiliate from "./detail/DetailAffiliate";
import { useNavigate } from "react-router-dom";

interface Affiliate {
  id: number;
  name: string;
  gender: string;
  sector: string;
  isActive: boolean;
  joinDate: string;
  dni: string;
  sectorId: number;
  hasChildren: boolean;
  hasDisability: boolean;
  phone: string;
  email: string;
  address: string;
}

export default function AffiliatePage() {
  const navigate = useNavigate();
  const createModal = useModal();
  const detailsModal = useModal();

  const affiliateList: Affiliate[] = [
    {
      id: 1,
      name: "Kevin",
      gender: "Masculino",
      sector: "Tecnología",
      isActive: true,
      joinDate: "",
      dni: "",
      sectorId: 0,
      hasChildren: false,
      hasDisability: false,
      phone: "",
      email: "",
      address: "",
    },
  ];

  const columns: Column<Affiliate>[] = [
    { key: "name", label: "Nombre", sortable: true },
    { key: "gender", label: "Género", sortable: true },
    { key: "sector", label: "Sector", sortable: true },
    { key: "isActive", label: "Activo", sortable: true },
  ];

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(affiliateList.length / itemsPerPage);

  // Datos paginados
  const paginatedAffiliates = affiliateList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(
    null
  );

  const handleAction = (action: ActionType, item: Affiliate) => {
    if (action === "view") {
      setSelectedAffiliate(item);
      detailsModal.onChangeState();
    } else if (action === "manageChildren") {
      navigate(`/dashboard/afiliados/${item.id}/hijos`);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Afiliados"
        buttonText="Nuevo Afiliado"
        buttonIcon={UserPlus}
        onButtonClick={() => createModal.onChangeState()}
      />

      <FiltersBar>
        <SearchInput
          placeholder="Buscar Afiliados..."
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            console.log("Searching for:", e.target.value);
          }}
        />

        <FilterSelect
          placeholder="Seleccionar Género"
          value={""}
          onChange={() => console.log("Filtrando por género")}
          options={[
            { value: "all", label: "Todos" },
            { value: "masculino", label: "Masculino" },
            { value: "femenino", label: "Femenino" },
          ]}
        />

        <FilterSelect
          placeholder="Seleccionar Sector"
          value={""}
          onChange={() => console.log("Filtrando por sector")}
          options={[
            { value: "all", label: "Todos" },
            { value: "Tecnología", label: "Tecnología" },
            { value: "Salud", label: "Salud" },
            { value: "Educación", label: "Educación" },
            { value: "Finanzas", label: "Finanzas" },
            { value: "Construcción", label: "Construcción" },
            { value: "Marketing", label: "Marketing" },
            { value: "Logística", label: "Logística" },
            { value: "Legal", label: "Legal" },
            { value: "Turismo", label: "Turismo" },
            { value: "Arte", label: "Arte" },
          ]}
        />
      </FiltersBar>

      <CustomTable
        data={paginatedAffiliates}
        columns={columns}
        actions={["view", "edit", "delete", "manageChildren"]}
        onAction={handleAction}
      />

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <CreateAffiliateForm
        isOpen={createModal.modalStatus}
        onClose={createModal.onChangeState}
      />

      <DetailAffiliate
        isOpen={detailsModal.modalStatus}
        onClose={detailsModal.onChangeState}
        affiliate={selectedAffiliate}
      />
    </PageContainer>
  );
}
