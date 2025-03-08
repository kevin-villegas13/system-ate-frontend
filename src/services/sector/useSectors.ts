import { useGet } from "@/hooks/use-get";
import { ENDPOINTS } from "@/lib/api/endpoints";

interface Sector {
  id: string;
  name: string;
}

export const useGetSectors = () =>
  useGet<Sector[]>("sectors", ENDPOINTS.sectors.list);
