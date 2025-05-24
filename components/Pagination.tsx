import { FC } from "react";
import TWButton from "./ui/TWButton";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <TWButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="secondary"
      >
        Previous
      </TWButton>
      <span className="text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <TWButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="secondary"
      >
        Next
      </TWButton>
    </div>
  );
};

export default Pagination;
