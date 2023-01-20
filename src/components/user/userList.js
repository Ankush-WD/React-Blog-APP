import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBell } from "@coreui/icons";
import { useSelector } from "react-redux";
import { usePagination, useSortBy, useTable } from "react-table";
import Pagination from "../Pagination";
import CustomeTable from "../CustomeTable";

const userList = () => {

  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [sizePerPage, setSizePerPage] = useState(2);
  const [userData, setUserData] = useState([]);

  async function loadUserList() {
    setIsLoading(true);
    const user_list_url = process.env.REACT_APP_API_URL + "/v1/user/list";
    const token = user.passport_token.access_token;

    try {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          type: "user",
          page: page,
          per_page: sizePerPage,
          sort_field_name: sortBy.length ? sortBy[0].id : "id",
          sort_field_order: sortBy.length
            ? sortBy[0].desc
              ? "desc"
              : "asc"
            : "desc",
          search_text: searchText,
        },
      };

      const result = await axios.get(user_list_url, config);
      if (result.statusText == "OK") {
        setUserData(result.data);
        setTotalPage(result.data.meta.last_page);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      setUserData([]);
      setIsLoading(false);
    }
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "User ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Is Verfied",
        accessor: "is_verfied",
        Cell: (props) => {
          return props.value ? (
            <CButton color="success">Verfied</CButton>
          ) : (
            <CButton color="danger">Not Verified</CButton>
          );
        },
        disableSortBy: true,
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <>
              <CButton color="primary" className="m-1">
                <CIcon icon={cilBell} className="me-2" />
                Edit
              </CButton>
              <CButton color="primary" className="m-1">
                <CIcon icon={cilBell} className="me-2" />
                View
              </CButton>
              <CButton color="primary" className="m-1">
                <CIcon icon={cilBell} className="me-2" />
                Delete
              </CButton>
            </>
          );
        },
        disableSortBy: true,
      },
    ],
    []
  );

  const tableData = React.useMemo(() => {
    if (userData.data?.length) {
      console.log(userData);
      return userData?.data?.map((element) => {
        return {
          id: element.id,
          name: element.name,
          email: element.email,
          is_verfied: element.is_verfied,
        };
      });
    } else {
      return [];
    }
  }, [userData]);

  const tableInstance = useTable(
    {
      columns,
      data: tableData,
      manualSortBy: true,
      manualPagination: true,
      pageCount: totalPage,
      initialState: {
        sortBy: [
          {
            id: "id",
            desc: true,
          },
        ],
        pageIndex: page,
        pageSize: sizePerPage,
      },
    },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    state: { sortBy },
  } = tableInstance;

  useEffect(() => {
    loadUserList();
  }, [sortBy, page, searchText]);

  // Invoke when user click to request another page.
  const changePageHandler = (event) => {
    const selected_pages = event.selected + 1;
    console.log(selected_pages);
    setPage(selected_pages);
  };

  const searchResult = (e) => {
    const searchedText = e.target.value;
    setSearchText(searchedText);
    setPage(1);
  };

  console.log(tableData);
  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Users</strong> <small></small>
        </CCardHeader>
        <CCardBody>
          <CustomeTable
            sizePerPage={sizePerPage}
            rows={rows}
            prepareRow={prepareRow}
            tableData={tableData}
            headerGroups={headerGroups}
            getTableBodyProps={getTableBodyProps}
            isLoading={isLoading}
            searchResult={searchResult}
          />
        </CCardBody>
        <Pagination sizePerPage={sizePerPage} totalPage={totalPage} changePageHandler={changePageHandler}  />
      </CCard>
    </CCol>
  );
};

export default userList;
