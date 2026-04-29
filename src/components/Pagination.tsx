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

    //for edge cases where there are no results to not show showin 1-0 of 0 results
    const start = totalResults === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const end = totalResults === 0 ? 0 : Math.min(currentPage * pageSize, totalResults);
  
    return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

    {/* Left side */}
    <div className="text-center sm:text-left">
    Showing {start}–{end} of {totalResults}
    </div>

    {/* Right side */}
    <div className="flex justify-center sm:justify-end gap-4 items-center">
    <button
        onClick={onPrev}
        disabled={currentPage === 1 || totalResults === 0}
    >
        ← Previous
    </button>

    <span>
        Page {currentPage} of {totalPages}
    </span>

    <button
        onClick={onNext}
        disabled={currentPage === totalPages || totalResults === 0}
    >
        Next →
    </button>
    </div>

    </div>
    );
  };