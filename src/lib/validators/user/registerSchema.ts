import * as Yup from "yup";
import { regexPatterns } from "../regexPatterns";

export const userValidationSchema = Yup.object({
  username: Yup.string()
    .matches(
      regexPatterns.username,
      "El nombre de usuario contiene caracteres no permitidos."
    )
    .required("El nombre de usuario es obligatorio."),

  roleName: Yup.string().required("El rol es obligatorio."),

  password: Yup.string()
    .matches(
      regexPatterns.passwordMinLength,
      "La contraseña debe tener al menos 8 caracteres."
    )
    .matches(
      regexPatterns.passwordLowercase,
      "Debe incluir al menos una letra minúscula."
    )
    .matches(
      regexPatterns.passwordUppercase,
      "Debe incluir al menos una letra mayúscula."
    )
    .matches(regexPatterns.passwordNumber, "Debe incluir al menos un número.")
    .matches(
      regexPatterns.passwordSymbol,
      "Debe incluir al menos un carácter especial (@$!%*?&)."
    )
    .matches(
      regexPatterns.noWhitespace,
      "No se permiten espacios en la contraseña."
    )
    .required("La contraseña es obligatoria."),
});
