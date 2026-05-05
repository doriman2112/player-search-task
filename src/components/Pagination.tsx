import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  pageSize: number;
  onNext: () => void;
  onPrev: () => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  totalResults,
  pageSize,
  onNext,
  onPrev,
}: PaginationProps) => {
  const start = totalResults === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = totalResults === 0 ? 0 : Math.min(currentPage * pageSize, totalResults);

  const prevDisabled = currentPage === 1 || totalResults === 0;
  const nextDisabled = currentPage === totalPages || totalResults === 0;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-center text-sm text-muted-foreground sm:text-left">
        Showing {start}–{end} of {totalResults}
      </div>

      <div className="flex items-center justify-center gap-2 sm:justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={prevDisabled}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" aria-hidden />
          Previous
        </Button>

        <span className="min-w-[7rem] text-center text-sm tabular-nums text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={nextDisabled}
          aria-label="Next page"
        >
          Next
          <ChevronRight className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
};
