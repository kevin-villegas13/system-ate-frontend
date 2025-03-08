import * as Yup from "yup";

export const affiliateValidationSchema = Yup.object().shape({
  affiliateCode: Yup.string().required("El código de afiliado es obligatorio"),
  affiliateName: Yup.string().required("El nombre es obligatorio"),
  dni: Yup.string().required("El DNI es obligatorio"),
  genderId: Yup.number().required("El género es obligatorio"),
  email: Yup.string()
    .email("Correo inválido")
    .required("El correo electrónico es obligatorio"),
  contact: Yup.string().required("El contacto es obligatorio"),
  sectorId: Yup.number().required("El sector es obligatorio"),
  hasChildren: Yup.boolean().required(
    "El campo '¿Tiene hijos?' es obligatorio"
  ),
  hasDisability: Yup.boolean().required(
    "El campo '¿Tiene discapacidad?' es obligatorio"
  ),
  note: Yup.string(),
});
