import { CustomPaginationProps } from "../../lib/types/pagination/pagination.types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
}: CustomPaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            size="default"
            onClick={() =>
              currentPage > 1 ? onPageChange(currentPage - 1) : undefined
            }
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {[...Array(totalPages).keys()].map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              size="default"
              onClick={() => onPageChange(page + 1)}
              isActive={page + 1 === currentPage}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            size="default"
            onClick={() =>
              currentPage < totalPages
                ? onPageChange(currentPage + 1)
                : undefined
            }
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
