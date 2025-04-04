import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { api } from "../api";

type RequestBody = Record<string, unknown> | string;

const useMutationWithCache = <TRequest extends RequestBody, TResponse>(
  method: "post" | "put" | "patch" | "delete",
  endpoint: string
) => {
  const queryClient = useQueryClient();

  return useMutation<TResponse, Error, TRequest>({
    mutationFn: async (body) => {
      console.log("📤 Enviando payload:", body);

      if (
        method !== "delete" &&
        (!body || (typeof body === "object" && Object.keys(body).length === 0))
      ) {
        console.warn("⛔ El cuerpo de la solicitud está vacío");
        throw new Error("El cuerpo de la solicitud está vacío");
      }

      const isDelete = method === "delete";
      const url =
        typeof body === "string" && isDelete
          ? `${endpoint}/${body}`
          : typeof body === "object" && "id" in body
          ? `${endpoint}/${(body as { id: string }).id}`
          : endpoint;

      console.log("🌍 URL generada:", url);
      console.log("🔧 Método:", method.toUpperCase());

      try {
        const response = await api[method]<TResponse>(url, body, {
          withCredentials: true,
        });

        console.log("✅ Respuesta del servidor:", response);
        queryClient.invalidateQueries({ queryKey: [endpoint] });

        return response.data;
      } catch (error: any) {
        console.error("❌ Error en la solicitud:", error);
        throw error;
      }
    },
  });
};

export const useFetch = <T>(endpoint: string) =>
  useQuery<T, Error>({
    queryKey: [endpoint],
    queryFn: async () =>
      (await api.get<T>(endpoint, { withCredentials: true })).data,
    enabled: Boolean(endpoint),
    staleTime: 5000,
  });

export const usePost = <TRequest extends Record<string, unknown>, TResponse>(
  endpoint: string
) => useMutationWithCache<TRequest, TResponse>("post", endpoint);

export const usePut = <TRequest extends Record<string, unknown>, TResponse>(
  endpoint: string
) => useMutationWithCache<TRequest, TResponse>("put", endpoint);

export const usePatch = <TRequest extends Record<string, unknown>, TResponse>(
  endpoint: string
) => useMutationWithCache<TRequest, TResponse>("patch", endpoint);

export const useDelete = (endpoint: string) =>
  useMutationWithCache<string, void>("delete", endpoint);
