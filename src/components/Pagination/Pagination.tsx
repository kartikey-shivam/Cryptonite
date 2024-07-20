import React, { FC } from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "../../customHooks/usePagination";
import "./pagination.css"
interface PaginationProps {
  onPageChange: (page: number) => void;
  totalCount?: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
  isStatic?: boolean;
}

const Pagination: FC<PaginationProps> = ({
  onPageChange,
  totalCount = 10,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
  isStatic,
}) => {
  let paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (isStatic) {
    paginationRange = [10, 20, 30];
  }

  console.log(paginationRange);

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1] as number;

  return (
    <div
      className={`pagination-container ${
        isStatic ? "pagination-container_static" : ""
      } shadow-paginationShadow items-center`}
    >
     
      <ul className={classnames("flex", { [className!]: className })}>
        {/* Left navigation arrow */}
        {!isStatic && (
          <li
            className={classnames("pagination-item", {
              disabled: currentPage === 1,
            })}
            onClick={onPrevious}
          >
            <div className="arrow left" />
          </li>
        )}
        {paginationRange.map((pageNumber, index) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <li key={index} className="pagination-item dots">
                &#8230;
              </li>
            );
          }

          // Render our Page Pills
          return (
            <li
              key={index}
              className={classnames("pagination-item", {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber as number)}
            >
              {pageNumber}
            </li>
          );
        })}
        {/* Right Navigation arrow */}
        {!isStatic && (
          <li
            className={classnames("pagination-item", {
              disabled: currentPage === lastPage,
            })}
            onClick={onNext}
          >
            <div className="arrow right" />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
