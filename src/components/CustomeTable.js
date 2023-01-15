import {
    CCol,
    CContainer,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import React from "react";

const CustomeTable = (props) => {
  const {
    rows,
    prepareRow,
    tableData,
    headerGroups,
    getTableBodyProps,
    isLoading,
    searchResult
  } = props;
  console.log(headerGroups);
  return (
    <>
      <CContainer>
        <CRow>
          <CCol xs={4} className="ps-0">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Search
              </span>
              <input
                type="text"
                className="form-control"
                onKeyUp={searchResult}
              />
            </div>
          </CCol>
        </CRow>
      </CContainer>
      <CTable bordered>
        <CTableHead>
          {headerGroups.map((headerGroup) => (
            <CTableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <CTableHeaderCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                  </span>
                </CTableHeaderCell>
              ))}
            </CTableRow>
          ))}
        </CTableHead>

        <CTableBody {...getTableBodyProps()}>
          {!isLoading ? (
            tableData.length ? (
              rows.map((row) => {
                prepareRow(row);
                return (
                  <CTableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <CTableDataCell {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </CTableDataCell>
                      );
                    })}
                  </CTableRow>
                );
              })
            ) : (
              <CTableRow>
                <CTableDataCell colSpan={5}>
                  No Data available...
                </CTableDataCell>
              </CTableRow>
            )
          ) : (
            <CTableRow>
              <CTableDataCell colSpan={5}>Loading...</CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
    </>
  );
};

export default CustomeTable;
