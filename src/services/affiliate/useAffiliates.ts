import { ENDPOINTS } from "@/lib/api/endpoints";
import { usePagination } from "../../hooks/use-pagination";
import { usePost } from "../../hooks/use-post";
import { useGet } from "../../hooks/use-get";
import { PaginationParamsAffiliate } from "./types/pagination-affiliate.type";
import { ResponsePagination } from "@/lib/interface/pagination-paramas.interfaces";
import { Affiliate } from "@/lib/interface/affiliate.interfaces";

// Obtener afiliados con paginación
export const useGetAffiliates = (params: PaginationParamsAffiliate) =>
  usePagination<ResponsePagination<Affiliate>>(
    "affiliates",
    ENDPOINTS.affiliates.list,
    params
  );

// Obtener un afiliado por ID
export const useGetAffiliateById = (id: string) =>
  useGet("affiliate", ENDPOINTS.affiliates.detail(id));

// Crear un nuevo afiliado
export const useCreateAffiliate = () => usePost(ENDPOINTS.affiliates.create);
