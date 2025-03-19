import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

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
            onClick={() =>
              currentPage > 1 ? onPageChange(currentPage - 1) : undefined
            }
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {[...Array(totalPages).keys()].map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => onPageChange(page + 1)}
              isActive={page + 1 === currentPage}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
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
