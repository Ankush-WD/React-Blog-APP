import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBell } from "@coreui/icons";
import { useSelector } from "react-redux";
import { DocsExample } from "../../components";

const userList = () => {
  const user = useSelector((state) => state.auth.user);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    loadUserList();
  }, []);

  async function loadUserList() {
    setStatus("pending");
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
          per_page: 15,
        },
      };

      const data = await axios.get(user_list_url, config);
      if (data.statusText == "OK") {
        setUserData(data.data);
        setStatus("success");
      }
    } catch (e) {
      setStatus("fail");
    }
  }

  console.log(userData.data);
  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Users</strong> <small></small>
        </CCardHeader>
        <CCardBody>
          <CTable bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Is Verfied</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {userData.data?.map((item, key) => {
                return (
                  <>
                    <CTableRow key={item.id}>
                      <CTableDataCell>{item.id}</CTableDataCell>
                      <CTableDataCell>{item.name}</CTableDataCell>
                      <CTableDataCell>{item.email}</CTableDataCell>
                      <CTableDataCell>
                        {item.is_verfied == 1 ? "Yes" : "No"}
                      </CTableDataCell>
                      <CTableDataCell>
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
                      </CTableDataCell>
                    </CTableRow>
                  </>
                );
              })}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default userList;
