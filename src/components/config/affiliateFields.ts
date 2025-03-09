import { FieldConfig } from "@/components/forms/types/forms-generic.type";
import { AffiliateFormValues } from "@/components/forms/types/affiliateFormValues.type";
import { useGetSectors } from "@/services/sector/useSectors";
import { useGetGenders } from "@/services/gender/useGenders";

export const initialValues: AffiliateFormValues = {
  affiliateCode: "",
  affiliateName: "",
  dni: "",
  genderId: undefined,
  email: "",
  contact: "",
  sectorId: undefined,
  hasChildren: false,
  hasDisability: false,
  note: "",
};

export const useAffiliateFields = (): FieldConfig<AffiliateFormValues>[] => {
  const { data: genders, isLoading: loadingGenders } = useGetGenders();
  const { data: sectors, isLoading: loadingSectors } = useGetSectors();

  return [
    {
      name: "affiliateCode",
      label: "Código de Afiliado",
      type: "text",
      placeholder: "Ingrese el código de afiliado",
    },
    {
      name: "affiliateName",
      label: "Nombre",
      type: "text",
      placeholder: "Ingrese el nombre",
    },
    {
      name: "dni",
      label: "DNI",
      type: "text",
      placeholder: "Ingrese el DNI",
    },
    {
      name: "genderId",
      label: "Género",
      type: "select",
      placeholder: "Ingrese el género",
      options: loadingGenders
        ? []
        : genders?.map((gender) => ({
            value: gender.id,
            label: gender.genderName,
          })) ?? [],
    },
    {
      name: "email",
      label: "Correo Electrónico",
      type: "text",
      placeholder: "Ingrese el correo electrónico",
    },
    {
      name: "contact",
      label: "Contacto",
      type: "text",
      placeholder: "Ingrese el contacto",
    },
    {
      name: "sectorId",
      label: "Sector",
      type: "select",
      placeholder: "Ingrese el sector",
      options: loadingSectors
        ? []
        : sectors?.map((sector) => ({
            value: sector.id,
            label: sector.name,
          })) || [],
    },
    {
      name: "hasChildren",
      label: "¿Tiene Hijos?",
      type: "checkbox",
    },
    {
      name: "hasDisability",
      label: "¿Tiene Discapacidad?",
      type: "checkbox",
    },
    {
      name: "note",
      label: "Nota",
      type: "textarea",
      placeholder: "Ingrese una nota",
    },
  ];
};
