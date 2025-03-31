export const regexPatterns = {
  username: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü'’]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñÜü'’]+)*$/, // Permite letras, tildes, diéresis, apóstrofes y espacios entre palabras
  code: /^(?:[A-Za-z0-9.-]+|[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}[0-9]{7})$/, // Permite nombres con letras, números, puntos y formato especial de identificación
  passwordMinLength: /.{8,}/, // Mínimo 8 caracteres
  passwordLowercase: /[a-z]/, // Al menos una letra minúscula
  passwordUppercase: /[A-Z]/, // Al menos una letra mayúscula
  passwordNumber: /\d/, // Al menos un número
  passwordSymbol: /[@$!%*?&]/, // Al menos un símbolo especial
  noWhitespace: /^[^\s]+$/, // No debe contener espacios
};
