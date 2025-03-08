export const ENDPOINTS = {
  affiliates: {
    list: "affiliates",
    detail: (id: string) => `/affiliates/${id}`,
    create: "affiliates",
  },
  genders: {
    list: "genders",
  },
  sectors: {
    list: "sectors",
  },
};
