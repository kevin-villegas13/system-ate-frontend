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
import GenericModalForms from "@/components/forms/costum-modal-forms";
import { FieldConfig } from "@/components/forms/types/forms-generic";
import { useGetGenders } from "@/hooks/useGenders";
import { data } from "@/config/dashboard-sidebar";

interface Affiliate {
  id: number;
  name: string;
  gender: string;
  sector: string;
}
interface AffiliateFormValues extends Record<string, unknown> {
  name: string;
  gender: string;
  sector: string;
  birthdate: string;
}

export default function AffiliatePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: genders, isLoading: loadingGenders } = useGetGenders();
  console.log(genders);

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

  const initialValues: AffiliateFormValues = {
    name: "",
    gender: "",
    sector: "",
    birthdate: "",
  };

  const fields: FieldConfig<AffiliateFormValues>[] = [
    {
      name: "name",
      label: "Nombre",
      type: "text",
      placeholder: "Ingrese el nombre",
    },
    {
      name: "gender",
      label: "Género",
      type: "select",
      options: [
        { value: "Masculino", label: "Masculino" },
        { value: "Femenino", label: "Femenino" },
      ],
    },
    {
      name: "sector",
      label: "Sector",
      type: "text",
      placeholder: "Ingrese el sector",
    },
    { name: "birthdate", label: "Fecha de Nacimiento", type: "date" },
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
  const handleSubmit = (values: AffiliateFormValues) => {
    console.log("Nuevo Afiliado:", values);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      {/* Encabezado */}
      <PageHeader
        title="Afiliados"
        buttonText="Nuevo Afiliado"
        buttonIcon={UserPlus}
        onButtonClick={() => setIsModalOpen(true)}
      />

      <GenericModalForms
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear Nuevo Afiliado"
        initialValues={initialValues}
        onSubmit={handleSubmit}
        fields={fields}
        submitText="Crear Afiliado"
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
          options={
            loadingGenders
              ? []
              : genders?.map((gender) => ({
                  value: gender.genderName,
                  label: gender.genderName,
                })) ?? []
          }
        />
        <FilterSelect
          placeholder="Seleccionar sectores"
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
