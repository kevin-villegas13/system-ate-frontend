"use client";

import { UserPlus } from "lucide-react";
import FilterSelect from "@/components/shared/filters-select";
import PageHeader from "@/components/shared/page-header";
import SearchInput from "@/components/shared/shared-input";
import { ChangeEvent, useState } from "react";
import {
  ActionType,
  Column,
  CustomTable,
} from "@/components/shared/custom-tablet";
import { CustomPagination } from "@/components/shared/custom-pagination";

interface Affiliate {
  id: number;
  name: string;
  gender: string;
  sector: string;
}

export default function AffiliatePage() {
  const affiliates: Affiliate[] = [
    { id: 1, name: "Kevin", gender: "Masculino", sector: "Tecnología" },
    { id: 2, name: "Ana", gender: "Femenino", sector: "Salud" },
    { id: 3, name: "Carlos", gender: "Masculino", sector: "Educación" },
    { id: 4, name: "Laura", gender: "Femenino", sector: "Finanzas" },
    { id: 5, name: "Miguel", gender: "Masculino", sector: "Construcción" },
    { id: 6, name: "Sofía", gender: "Femenino", sector: "Marketing" },
    { id: 7, name: "Andrés", gender: "Masculino", sector: "Logística" },
    { id: 8, name: "Valentina", gender: "Femenino", sector: "Legal" },
    { id: 9, name: "Javier", gender: "Masculino", sector: "Turismo" },
    { id: 10, name: "Camila", gender: "Femenino", sector: "Arte" },
  ];

  const columns: Column<Affiliate>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nombre" },
    { key: "gender", label: "Género" },
    { key: "sector", label: "Sector" },
  ];

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(affiliates.length / itemsPerPage);

  // Datos paginados
  const paginatedAffiliates = affiliates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAction = (action: ActionType, item: Affiliate) => {
    console.log(`Acción: ${action}`, item);
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      {/* Encabezado */}
      <PageHeader
        title="Afiliados"
        buttonText="Nuevo Afiliado"
        buttonIcon={UserPlus}
        onButtonClick={() => console.log("Crear nuevo afiliado")}
      />
      {/* Filtros y Buscador */}
      <div className="flex flex-wrap items-center gap-4 p-6 rounded-xl bg-white shadow-sm">
        <SearchInput
          placeholder={"Buscar Afiliados..."}
          onChange={function (e: ChangeEvent<HTMLInputElement>): void {
            throw new Error("Function not implemented.");
          }}
        />

        <FilterSelect
          placeholder="Seleccionar género"
          value={""}
          onChange={() => console.log("Crear nuevo afiliado")}
          options={[
            { value: "all", label: "Todos" },
            { value: "male", label: "Masculino" },
            { value: "female", label: "Femenino" },
          ]}
        />
        <FilterSelect
          placeholder="Seleccionar género"
          value={""}
          onChange={() => console.log("Crear nuevo afiliado")}
          options={[
            { value: "all", label: "Todos" },
            { value: "male", label: "Masculino" },
            { value: "female", label: "Femenino" },
          ]}
        />
      </div>
      {/* Tabla de Afiliados */}
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
    </div>
  );
}
