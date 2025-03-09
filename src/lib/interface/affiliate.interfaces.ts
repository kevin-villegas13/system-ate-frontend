import { Gender } from "./genders.interfaces";
import { Sector } from "./sectors.interfaces";

export interface Affiliate {
  id: string;
  createdAt: string;
  updatedAt: string;
  affiliateCode: string;
  affiliateName: string;
  dni: string;
  gender: Gender;
  email: string;
  contact: string;
  sector: Sector;
  hasChildren: boolean;
  hasDisability: boolean;
  note: string;
}

