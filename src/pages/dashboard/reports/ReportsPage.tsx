import { ChangeEvent } from "react";
import { CustomPagination } from "../../../components/atoms/CustomPagination";
import { CustomTable } from "../../../components/molecules/CustomTable";
import FiltersBar from "../../../components/molecules/FiltersBar";
import SearchInput from "../../../components/molecules/SearchInput";
import PageContainer from "../../../components/organisms/PageContainer";
import PageHeader from "../../../components/organisms/PageHeader";
import { usePagination } from "../../../lib/hooks/use-Pagination";
import { Column } from "../../../lib/types/tablet/table";
import { Button } from "../../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import CustomButton from "../../../components/atoms/CustomButton";
import { UserPlus } from "lucide-react";

interface User {
  id: number;
  name: string;
  role: string;
  active: string;
}

export default function ReportsPage() {
  const affiliates: User[] = [
    { id: 1, name: "Kevin", role: "Masculino", active: "Tecnología" },
    { id: 2, name: "Ana", role: "Femenino", active: "Salud" },
    { id: 3, name: "Carlos", role: "Masculino", active: "Educación" },
    { id: 4, name: "Laura", role: "Femenino", active: "Finanzas" },
  ];

  const beneficiaries: User[] = [
    { id: 5, name: "Luis", role: "Masculino", active: "Deportes" },
    { id: 6, name: "Elena", role: "Femenino", active: "Música" },
    { id: 7, name: "Pedro", role: "Masculino", active: "Ciencias" },
    { id: 8, name: "Lucía", role: "Femenino", active: "Historia" },
  ];

  const columns: Column<User>[] = [
    { key: "name", label: "Nombre", sortable: true },
    { key: "role", label: "Rol", sortable: true },
    { key: "active", label: "Área", sortable: true },
  ];

  // Hook de paginación
  const { currentPage, totalPages, paginatedData, goToPage } = usePagination(
    affiliates,
    5
  );

  const generateReport = () => {
    console.log("Generando reporte...");
    // Aquí podríamos exportar los datos en CSV o PDF.
  };

  return (
    <PageContainer>
      <PageHeader title="REPORTES">
        <CustomButton
          buttonText="Generar reorte"
          icon={UserPlus}
          onClick={generateReport}
        />
      </PageHeader>

      <FiltersBar>
        <SearchInput
          placeholder="Buscar..."
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            console.log("Buscando:", e.target.value);
          }}
        />
      </FiltersBar>

      <Tabs defaultValue="afiliados">
        <TabsList>
          <TabsTrigger value="afiliados">Afiliados</TabsTrigger>
          <TabsTrigger value="beneficiarios">Beneficiarios</TabsTrigger>
        </TabsList>

        <TabsContent value="afiliados">
          <CustomTable
            data={paginatedData}
            columns={columns}
            actions={[]}
            onAction={() => {}}
          />
        </TabsContent>

        <TabsContent value="beneficiarios">
          <CustomTable
            data={beneficiaries}
            columns={columns}
            actions={[]}
            onAction={() => {}}
          />
        </TabsContent>
      </Tabs>

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </PageContainer>
  );
}
