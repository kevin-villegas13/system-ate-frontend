import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Cambia esto por tu API
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, la retorna normal
  (error) => {
    if (error.response) {
      const { data } = error.response;

      // Usa el mensaje del backend si existe, de lo contrario, un mensaje genérico
      const message = data.error || "Ocurrió un error inesperado";

      // Retorna el error con el mensaje adecuado
      return Promise.reject({ ...error, message });
    }

    // Error sin respuesta (problemas de red, servidor caído, etc.)
    return Promise.reject({ ...error, message: "Error de conexión 🌐" });
  }
);
