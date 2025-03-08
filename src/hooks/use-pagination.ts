import { apiClient } from "@/lib/api/api-client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  order?: "ASC" | "DESC";
}

export const usePagination = <T>(
  key: string,
  endpoint: string,
  params: PaginationParams
): UseQueryResult<T, Error> => {
  return useQuery({
    queryKey: [key, params],
    queryFn: async () => {
      const queryString = new URLSearchParams(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      ).toString();

      return apiClient(`${endpoint}?${queryString}`) as Promise<T>;
    },
    placeholderData: (prev) => prev,
  });
};
