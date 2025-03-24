import { UserPlus } from "lucide-react";
import PageContainer from "../../../../components/organisms/PageContainer";
import PageHeader from "../../../../components/organisms/PageHeader";
import { useModal } from "../../../../lib/hooks/use-modal";
import { useState } from "react";
import {
  ActionType,
  Column,
  CustomTable,
} from "../../../../components/shared/CustomTable";
import { CustomPagination } from "../../../../components/shared/CustomPagination";
import CreateChildForm from "./create/ChildrenAffiliateForm";

interface Children {
  id: number;
  name: string;
  dni: string;
  gender: string;
  birthDate: string;
  age: number;
  sector: string;
  isActive: boolean;
}

export default function AffiliateChildrenPage() {
  const createModal = useModal();

  // Lista de niños afiliados (ejemplo)
  const affiliateList: Children[] = [
    {
      id: 1,
      name: "Juan Pérez",
      dni: "12345678",
      gender: "Masculino",
      birthDate: "2015-06-12",
      age: 9,
      sector: "Norte",
      isActive: true,
    },
    {
      id: 2,
      name: "María Gómez",
      dni: "87654321",
      gender: "Femenino",
      birthDate: "2017-03-22",
      age: 7,
      sector: "Centro",
      isActive: false,
    },
    {
      id: 3,
      name: "Carlos Ramírez",
      dni: "11223344",
      gender: "Masculino",
      birthDate: "2016-09-10",
      age: 8,
      sector: "Sur",
      isActive: true,
    },
    {
      id: 4,
      name: "Sofía López",
      dni: "22334455",
      gender: "Femenino",
      birthDate: "2018-01-15",
      age: 6,
      sector: "Este",
      isActive: false,
    },
    {
      id: 5,
      name: "Diego Torres",
      dni: "33445566",
      gender: "Masculino",
      birthDate: "2014-12-05",
      age: 10,
      sector: "Oeste",
      isActive: true,
    },
  ];

  const columns: Column<Children>[] = [
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

  const handleAction = (action: ActionType) => {};

  return (
    <PageContainer>
      <PageHeader
        title="Niños del Afiliado"
        buttonText="Nuevo Niño"
        buttonIcon={UserPlus}
        onButtonClick={() => createModal.onChangeState()}
      />

      <CustomTable
        data={paginatedAffiliates}
        columns={columns}
        actions={["view", "edit", "delete"]}
        onAction={handleAction}
      />

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <CreateChildForm
        isOpen={createModal.modalStatus}
        onClose={createModal.onChangeState}
      />
    </PageContainer>
  );
}
