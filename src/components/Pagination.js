import { CContainer } from "@coreui/react";
import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = (props) => {
    const { sizePerPage,totalPage,changePageHandler } = props;
    return (
        <>
        <CContainer className="ps-3 pe-3 d-flex justify-content-end">
            <nav aria-label="Page navigation example">
            <ReactPaginate
                breakLabel="..."
                nextLabel="&raquo;"
                onPageChange={changePageHandler}
                pageRangeDisplayed={sizePerPage}
                pageCount={totalPage}
                previousLabel="&laquo;"
                renderOnZeroPageCount={null}
                className="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                activeClassName="active"
            />
            </nav>
        </CContainer>
        </>
    );
};

export default Pagination;
