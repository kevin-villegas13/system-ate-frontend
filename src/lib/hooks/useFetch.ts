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
      if (!body || (typeof body === "object" && Object.keys(body).length === 0))
        throw new Error("El cuerpo de la solicitud está vacío");

      const isDelete = method === "delete";
      const url =
        typeof body === "string" && isDelete
          ? `${endpoint}/${body}`
          : typeof body === "object" && "id" in body
          ? `${endpoint}/${body.id}`
          : endpoint;

      const response = await api[method]<TResponse>(url, body, {
        withCredentials: true,
      });

      queryClient.invalidateQueries({ queryKey: [endpoint] });
      return response.data;
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
