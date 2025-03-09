import { PaginationParams } from "@/lib/interface/pagination-paramas.interfaces";

export interface PaginationParamsAffiliate extends PaginationParams {
  genderId?: number;
  sectorId?: number;
}
