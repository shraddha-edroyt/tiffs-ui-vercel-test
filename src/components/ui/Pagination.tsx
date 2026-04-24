"use client";

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    rowsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rows: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    rowsPerPage,
    totalItems,
    onPageChange,
    onRowsPerPageChange
}) => {
    const rowsPerPageOptions = [5, 10, 20, 50, 100];

    // Helper to generate page numbers array (1, 2, 3 ... 6)
    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                pages.push(i);
            }
        }
        return pages;
    };

    const displayedPages = getPageNumbers();

    // Common classes for Circle Buttons (Nav buttons & Page Numbers)
    const baseButtonClass = "w-8 h-8 rounded-full flex items-center justify-center transition-colors border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:border-gray-400";

    return (
        <div lang="en" className="flex items-center justify-end px-4 py-3 bg-white border-t border-gray-200 w-full gap-4">

            {/* LEFT SIDE: Navigation Buttons & Page Numbers */}
            <div className="flex items-center gap-2">

                {/* First Page Button (<<) */}
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className={`${baseButtonClass} disabled:opacity-100 disabled:cursor-not-allowed disabled:hover:bg-gray-100`}
                    aria-label="First page"
                >
                    <ChevronsLeft className="w-4 h-4" />
                </button>

                {/* Previous Button (<) */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`${baseButtonClass} disabled:opacity-100 disabled:cursor-not-allowed disabled:hover:bg-gray-100`}
                    aria-label="Previous page"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page Numbers */}
                {displayedPages.map((page, index) => {
                    const prevPage = displayedPages[index - 1];

                    if (prevPage && page !== prevPage + 1) {
                        return (
                            <React.Fragment key={`sep-${page}`}>
                                <span className="px-1 text-gray-400">...</span>
                                <button
                                    onClick={() => onPageChange(page)}
                                    className={`${baseButtonClass} ${currentPage === page ? 'bg-blue-300 text-white border-blue-300 hover:bg-blue-400' : ''}`}
                                >
                                    {page}
                                </button>
                            </React.Fragment>
                        );
                    }

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            // Updated active state to bg-blue-300
                            className={`${baseButtonClass} ${currentPage === page ? 'bg-blue-300 text-white border-blue-300 hover:bg-blue-400' : ''}`}
                        >
                            {page}
                        </button>
                    );
                })}

                {/* Next Button (>) */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`${baseButtonClass} disabled:opacity-100 disabled:cursor-not-allowed disabled:hover:bg-gray-100`}
                    aria-label="Next page"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>

                {/* Last Page Button (>>) */}
                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`${baseButtonClass} disabled:opacity-100 disabled:cursor-not-allowed disabled:hover:bg-gray-100`}
                    aria-label="Last page"
                >
                    <ChevronsRight className="w-4 h-4" />
                </button>
            </div>

            {/* RIGHT SIDE: Rows per page */}
            <div className="flex items-center gap-2 text-sm text-gray-700 shrink-0">
                <span className="hidden sm:inline">Rows per page:</span>
                <select
                    className="py-1 text-sm cursor-pointer"
                    value={rowsPerPage}
                    onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
                >
                    {rowsPerPageOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>

        </div>
    );
};

export default Pagination;