"use client";

import { UserPlus } from "lucide-react";
import { useState } from "react";
import FilterSelect from "@/components/shared/filters-select";
import PageHeader from "@/components/shared/page-header";
import SearchInput from "@/components/shared/shared-input";
import { CustomTable } from "@/components/shared/custom-tablet";
import { CustomPagination } from "@/components/shared/custom-pagination";
import GenericModalForms from "@/components/forms/costum-modal-forms";
import { useGetGenders } from "@/services/gender/useGenders";
import { useGetSectors } from "@/services/sector/useSectors";
import { useGetAffiliates } from "@/services/affiliate/useAffiliates";
import {
  initialValues,
  useAffiliateFields,
} from "@/components/config/affiliateFields";
import { validationSchema } from "@/lib/validations/validation.schema.affiliate";
import { useCreateAffiliate } from "@/services/affiliate/useAffiliates";
import toast, { Toaster } from "react-hot-toast";

export default function AffiliatePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [genderId, setGenderId] = useState<number>();
  const [sectorId, setSectorId] = useState<number>();
  const itemsPerPage = 5;

  const { data: genders, isLoading: loadingGenders } = useGetGenders();
  const { data: sectors, isLoading: loadingSectors } = useGetSectors();

  const { data, isLoading } = useGetAffiliates({
    page: currentPage,
    limit: itemsPerPage,
    genderId,
    sectorId,
    search,
  });

  const { mutateAsync: createAffiliate } = useCreateAffiliate();

  const handleSubmit = async (values: any) => {
    try {
      await createAffiliate({
        ...values,
        genderId: Number(values.genderId),
        sectorId: Number(values.sectorId),
      });

      toast.success("Afiliado creado correctamente");
      setIsModalOpen(false);
    } catch (error: any) {
      const errorMessage = error?.data?.error || "Error al crear afiliado.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8">
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
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        fields={useAffiliateFields()}
        submitText="Crear Afiliado"
      />
      <div className="flex flex-wrap items-center gap-4 p-6 rounded-xl bg-white shadow-sm">
        <SearchInput
          placeholder="Buscar Afiliados..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <FilterSelect
          placeholder="Seleccionar género"
          value={genderId ? genderId.toString() : ""}
          onChange={(value) => setGenderId(value ? Number(value) : undefined)}
          options={
            loadingGenders
              ? []
              : genders?.map((gender) => ({
                  value: gender?.id ? gender.id.toString() : "0",
                  label: gender?.genderName || "Sin género",
                })) ?? []
          }
        />

        <FilterSelect
          placeholder="Seleccionar sector"
          value={sectorId ? sectorId.toString() : ""}
          onChange={(value) => setSectorId(value ? Number(value) : undefined)}
          options={
            loadingSectors
              ? []
              : sectors?.map((sector) => ({
                  value: sector?.id ? sector.id.toString() : "0",
                  label: sector?.name || "Sin sector",
                })) ?? []
          }
        />
      </div>

      <CustomTable
        data={(data?.data || []).map((affiliate, index) => ({
          ...affiliate,
          id: affiliate?.id ? Number(affiliate.id) : index,
        }))}
        columns={[
          { key: "dni", label: "DNI" },
          { key: "affiliateCode", label: "Código" },
          { key: "affiliateName", label: "Nombre" },
          {
            key: "gender",
            label: "Género",
            render: (item) => item.gender?.genderName || "Sin género",
          },
          {
            key: "sector",
            label: "Sector",
            render: (item) => item.sector?.name || "Sin sector",
          },
        ]}
        actions={["view", "edit", "delete"]}
        onAction={(action, item) => console.log(action, item)}
      />
      <CustomPagination
        currentPage={data?.page || 1}
        totalPages={data?.totalPages || 1}
        onPageChange={setCurrentPage}
      />
      <Toaster position="bottom-right" />
    </div>
  );
}
