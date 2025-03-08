import { useGet } from "@/hooks/use-get";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { Sector } from "@/lib/interface/sectors.interfaces";

export const useGetSectors = () =>
  useGet<Sector[]>("sectors", ENDPOINTS.sectors.list);
