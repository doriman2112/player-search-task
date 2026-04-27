interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  pageSize: number;
  onNext: () => void;
  onPrev: () => void;
}

// TODO: Implement the Pagination component
//
// Requirements:
// - "Previous" and "Next" buttons
// - Disable Previous on page 1, disable Next on the last page
// - Show result count: "Showing X–Y of Z results"
//   (calculate X and Y from currentPage and pageSize)
// - Show current position: "Page N of M"
//
// ShadCN components — add what you need:
//   npx shadcn@latest add button
//
// Icons (lucide-react is already installed):
//   import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalResults,
  pageSize,
  onNext,
  onPrev,
}) => {
  // TODO: implement

  return (
    <div className="text-muted-foreground text-sm p-4 border border-dashed border-border rounded">
      <p>TODO: Implement Pagination</p>
      <p>Page {currentPage} of {totalPages} — {totalResults} total results</p>
    </div>
  );
};

export default Pagination;
