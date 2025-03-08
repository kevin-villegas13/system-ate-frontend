import { ENDPOINTS } from "@/lib/api/endpoints";
import { PaginationParams, usePagination } from "../use-pagination";
import { usePost } from "../use-post";
import { useGet } from "../use-get";

// Obtener afiliados con paginación
export const useGetAffiliates = (params: PaginationParams) =>
  usePagination("affiliates", ENDPOINTS.affiliates.list, params);

// Obtener un afiliado por ID
export const useGetAffiliateById = (id: string) =>
  useGet("affiliate", ENDPOINTS.affiliates.detail(id));

// Crear un nuevo afiliado
export const useCreateAffiliate = () => usePost(ENDPOINTS.affiliates.create);
