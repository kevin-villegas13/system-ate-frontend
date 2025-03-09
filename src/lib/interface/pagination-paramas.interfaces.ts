export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  order?: "ASC" | "DESC";
}


export interface ResponsePagination<T> {
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  page: number;
  limit: number;
  totalDocs: number;
  search: string;
  sort: string;
  data: T[] | [];
}
