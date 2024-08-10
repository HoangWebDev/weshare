// src/components/DefaultPagination.tsx
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type PaginateProps = {
    currentPage: number;
    totalItems: number;
    itemsPerPages: number; // Số mục mỗi trang
    onPageChange: (pageNumber: number) => void; // Callback khi trang thay đổi
};

const DefaultPagination: React.FC<PaginateProps> = ({ currentPage, totalItems, itemsPerPages, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPages);

    const handlePageClick = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            onPageChange(pageNumber)
        }
    }

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }
    return (
        <div className="flex items-center justify-center mt-4">
            <button
                className={`px-4 py-2 border border-gray-300 rounded-l-md ${currentPage === 1 && "bg-gray-300 cursor-not-allowed"}`}
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            {
                pageNumbers.map(page => (
                    <button
                        key={page}
                        className={`px-4 py-2 border border-gray-300" ${page === currentPage ?
                            "bg-blue-500 text-white"
                            :
                            "bg-white text-gray-700"
                            }`}
                        onClick={() => handlePageClick(page)}
                    >
                        {page}
                    </button>
                ))
            }
            <button
                className={`px-4 py-2 border border-gray-300 rounded-r-md ${currentPage === totalPages && "bg-gray-300 cursor-not-allowed"}`}
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div >
    );
};

export default DefaultPagination;
