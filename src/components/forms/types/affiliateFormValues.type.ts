export interface AffiliateFormValues extends Record<string, unknown> {
  affiliateCode: string;
  affiliateName: string;
  dni: string;
  genderId: number | undefined;
  email: string;
  contact: string;
  sectorId: number | undefined;
  hasChildren: boolean;
  hasDisability: boolean;
  note: string;
}
