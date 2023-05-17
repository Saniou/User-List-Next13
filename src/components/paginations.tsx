import { useRouter } from 'next/router';
import {AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

export const Pagination = ({
  items,
  pageSize,
  currentPage,
  onPageChange,
  leftSiblingCount = 1,
  rightSiblingCount = 1
}) => {
  const router = useRouter();
  const pageCount = Math.ceil(items / pageSize);

  if (pageCount === 1) {
    return null;
  }

  let displayedPages = [];

  let leftSiblingPage = Math.max(currentPage - leftSiblingCount, 1);
  if (leftSiblingPage > 1) {
    displayedPages.push(1);
  }

  if (leftSiblingPage > 2) {
    displayedPages.push('...');
  }

  for (let i = leftSiblingPage; i < currentPage; i++) {
    displayedPages.push(i);
  }

  displayedPages.push(currentPage);

  let rightSiblingPage = Math.min(currentPage + rightSiblingCount, pageCount);

  for (let i = currentPage + 1; i <= rightSiblingPage; i++) {
    displayedPages.push(i);
  }

  if (rightSiblingPage < pageCount - 1) {
    displayedPages.push('...');
  }

  if (rightSiblingPage < pageCount) {
    displayedPages.push(pageCount);
  }

  const handlePageChange = (page) => {
    router.push(`/pagination/${page}`);
    onPageChange(page);
  };
  return (
    <div className="flex items-center justify-center px-4 py-3 sm:px-6">
      <div>
        <nav
          className="bg-indigo-600 isolate inline-flex -space-x-px shadow-sm mt-20"
          aria-label="Pagination"
        >
          <button
            key="previous"
            onClick={() => handlePageChange(currentPage - 1)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
              currentPage === 1 ? 'bg-gray-50 cursor-not-allowed' : ''
            }`}
          >
            <AiOutlineArrowLeft className="text-[20px]" />
          </button>
          {displayedPages.map((page, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                page === currentPage ? 'bg-gray-50' : ''
              } ${
                typeof page === 'string' ? 'cursor-not-allowed' : ''
              }`}
              disabled={typeof page === 'string'}
            >
              {page}
            </button>
          ))}
          <button
            key="next"
            onClick={() => handlePageChange(currentPage + 1)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
              currentPage === pageCount ? 'bg-gray-50 cursor-not-allowed' : ''
            }`}
          >
            <AiOutlineArrowRight className="text-[20px]" />
          </button>
        </nav>
      </div>
    </div>
  );
};