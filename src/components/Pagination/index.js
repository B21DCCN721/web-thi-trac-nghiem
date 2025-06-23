import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [searchParams] = useState(new URLSearchParams(window.location.search));
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') ? parseInt(searchParams.get('page'), 10) : 1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Default visible pages
  
    if (totalPages <= maxVisiblePages + 2) {
      // Nếu tổng số trang ít hơn hoặc bằng số trang hiển thị tối đa, hiển thị tất cả các trang
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`px-3 py-1 rounded-full ${currentPage === i ? 'bg-gray-300' : 'bg-transparent'} hover:bg-gray-200`}
            onClick={() => handleClick(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Nếu tổng số trang nhiều hơn số trang hiển thị tối đa
      if (currentPage <= 4) {
        // Hiển thị các trang đầu tiên và thêm ellipsis
        for (let i = 1; i <= 5; i++) {
          pages.push(
            <button
              key={i}
              className={`px-3 py-1 rounded-full ${currentPage === i ? 'bg-gray-300' : 'bg-transparent'} hover:bg-gray-200`}
              onClick={() => handleClick(i)}
            >
              {i}
            </button>
          );
        }
        pages.push(<span key="start-ellipsis" className="px-3 py-1">...</span>);
        pages.push(
          <button
            key={totalPages}
            className={`px-3 py-1 rounded-full ${currentPage === totalPages ? 'bg-gray-300' : 'bg-transparent'} hover:bg-gray-200`}
            onClick={() => handleClick(totalPages)}
          >
            {totalPages}
          </button>
        );
      } else if (currentPage >= totalPages - 3) {
        // Hiển thị các trang cuối cùng và thêm ellipsis
        pages.push(
          <button
            key={1}
            className={`px-3 py-1 rounded-full ${currentPage === 1 ? 'bg-gray-300' : 'bg-transparent'} hover:bg-gray-200`}
            onClick={() => handleClick(1)}
          >
            1
          </button>
        );
        pages.push(<span key="start-ellipsis" className="px-3 py-1">...</span>);
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(
            <button
              key={i}
              className={`px-3 py-1 rounded-full ${currentPage === i ? 'bg-gray-300' : 'bg-transparent'} hover:bg-gray-200`}
              onClick={() => handleClick(i)}
            >
              {i}
            </button>
          );
        }
      } else {
        // Hiển thị các trang xung quanh trang hiện tại
        pages.push(
          <button
            key={1}
            className={`px-3 py-1 rounded-full ${currentPage === 1 ? 'bg-gray-300' : 'bg-transparent'} hover:bg-gray-200`}
            onClick={() => handleClick(1)}
          >
            1
          </button>
        );
        pages.push(<span key="start-ellipsis" className="px-3 py-1">...</span>);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(
            <button
              key={i}
              className={`px-3 py-1 rounded-full ${currentPage === i ? 'bg-gray-300' : 'bg-transparent'} hover:bg-gray-200`}
              onClick={() => handleClick(i)}
            >
              {i}
            </button>
          );
        }
        pages.push(<span key="end-ellipsis" className="px-3 py-1">...</span>);
        pages.push(
          <button
            key={totalPages}
            className={`px-3 py-1 rounded-full ${currentPage === totalPages ? 'bg-gray-300' : 'bg-transparent'} hover:bg-gray-200`}
            onClick={() => handleClick(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }
  
    return pages;
  };
  return (
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-full mx-1 bg-white text-gray-700 disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded-full mx-1 bg-white text-gray-700 disabled:opacity-50"
      >
       <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Pagination; 

// Example usage:
// <Pagination totalItems={50} itemsPerPage={5} onPageChange={(page) => console.log('Current page:', page)} />
