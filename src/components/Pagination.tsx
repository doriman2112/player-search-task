import React from 'react';

/**
 * TODO: Implement Pagination Component
 * 
 * Requirements:
 * - Previous and Next buttons
 * - Show current page and total pages
 * - Trigger parent callbacks on button clicks
 * 
 * Props interface:
 * interface PaginationProps {
 *   currentPage: number;
 *   totalPages: number;
 *   onNext: () => void;
 *   onPrev: () => void;
 * }
 * 
 * Bonus features (optional):
 * - Disable Previous on first page
 * - Disable Next on last page
 * - Show page numbers (1, 2, 3...)
 * - Jump to specific page
 * - Show "Showing X-Y of Z results"
 */

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onNext, 
  onPrev 
}) => {
  // TODO: Implement component logic here

  return (
    <div>
      <p>TODO: Implement Pagination component</p>
      <p>Page {currentPage} of {totalPages}</p>
      {/* Add your implementation here */}
    </div>
  );
};

export default Pagination;
