import React from "react";
import ReactPaginate from "react-paginate";

type TPaginationControlProps = {
  handlePageClick: (e: { selected: number }) => void;
  pageCount: number;
};

const PaginationControl: React.FC<TPaginationControlProps> = ({
  handlePageClick,
  pageCount,
}) => {
  return (
    <>
      <ReactPaginate
        containerClassName="flex w-full justify-around"
        activeClassName="rounded-full bg-gray-600"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default PaginationControl;
