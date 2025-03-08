import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  affiliateCode: Yup.string()
    .matches(
      /^[A-Za-z0-9]+$/,
      "El código de afiliado solo puede contener letras y números"
    )
    .required("El código de afiliado es obligatorio"),

  affiliateName: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede tener más de 100 caracteres")
    .required("El nombre es obligatorio"),

  dni: Yup.string()
    .matches(/^\d{10}$/, "El DNI debe tener 10 dígitos")
    .required("El DNI es obligatorio"),

  genderId: Yup.string()
    .oneOf(["1", "2"], "El género debe ser 1 o 2")
    .required("El género es obligatorio"),

  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo es obligatorio"),

  contact: Yup.string()
    .matches(/^\d{9}$/, "El contacto debe tener 9 dígitos")
    .required("El contacto es obligatorio"),

  sectorId: Yup.string().required("El sector es obligatorio"),

  hasChildren: Yup.boolean().nullable().required("Debe indicar si tiene hijos"),

  hasDisability: Yup.boolean()
    .nullable() // Permite que el campo sea null
    .required("Debe indicar si tiene discapacidad"),

  note: Yup.string()
    .max(250, "La nota no puede tener más de 250 caracteres")
    .nullable(),
});
