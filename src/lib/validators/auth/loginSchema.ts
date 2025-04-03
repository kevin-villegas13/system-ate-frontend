import * as Yup from "yup";
import { regexPatterns } from "../regexPatterns";

export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .matches(regexPatterns.username, "El nombre de usuario no es válido.")
    .required("El nombre de usuario es obligatorio."),

  password: Yup.string()
    .matches(
      regexPatterns.passwordMinLength,
      "Debe tener al menos 8 caracteres."
    )
    .matches(
      regexPatterns.passwordLowercase,
      "Debe contener al menos una letra minúscula."
    )
    .matches(
      regexPatterns.passwordUppercase,
      "Debe contener al menos una letra mayúscula."
    )
    .matches(regexPatterns.passwordNumber, "Debe contener al menos un número.")
    .matches(
      regexPatterns.passwordSymbol,
      "Debe incluir al menos un símbolo (ej. @, #, $, !, %)."
    )
    .matches(
      regexPatterns.noWhitespace,
      "No puede contener espacios en blanco."
    )
    .required("La contraseña es obligatoria."),
});
