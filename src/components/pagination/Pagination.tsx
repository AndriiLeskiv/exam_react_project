import {FC} from "react";
import "./Pagination.css";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({totalPages, currentPage, onPageChange}) => {
    if (totalPages <= 1) return null;

    return (
        <div className="pagination-container">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {Array.from({length: totalPages}, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => onPageChange(index + 1)}
                    disabled={currentPage === index + 1}
                    className={currentPage === index + 1 ? 'active' : ''}
                >
                    {index + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};