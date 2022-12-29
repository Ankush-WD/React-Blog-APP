import React, { useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback,
  CAlert,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser, cilCloudUpload } from "@coreui/icons";
import registerSchema from "../../../validationSchema/registerSchema";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, clearStateValue } from "src/redux/slice/authSlice";

const Register = () => {
  const { message, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // setting initial value
  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    media: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: function (values) {
      const formData = new FormData();
      console.log(values.name);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("password_confirmation", values.password_confirmation);
      formData.append("media", values.media);
      dispatch(register(formData));
    },
  });

  useEffect(() => {
    if (status == "success") {
      setTimeout(function () {
        dispatch(clearStateValue());
        navigate("/login");
      }, 3000);
    }
  }, [status]);

  // destructuring formik object;
  const { handleSubmit, handleChange, handleBlur, touched, errors, values } =
    formik;

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        ,
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  onSubmit={handleSubmit}
                  validated={false}
                  encType="multipart/form-data"
                >
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  {status == "success" ? (
                    <CAlert color="success">{message}</CAlert>
                  ) : (
                    ""
                  )}
                  {status == "fail" ? (
                    <CAlert color="danger">{message}</CAlert>
                  ) : (
                    ""
                  )}
                  <CInputGroup className="mb-2 mt-2">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Name"
                      autoComplete="name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.name && errors.name && (
                      <CFormFeedback invalid style={{ display: "block" }}>
                        {errors.name}
                      </CFormFeedback>
                    )}
                  </CInputGroup>
                  <CInputGroup className="mb-2 mt-2">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="email"
                    />
                    {touched.email && errors.email && (
                      <CFormFeedback invalid style={{ display: "block" }}>
                        {errors.email}
                      </CFormFeedback>
                    )}
                  </CInputGroup>
                  <CInputGroup className="mb-2 mt-2">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="password"
                    />
                    {touched.password && errors.password && (
                      <CFormFeedback invalid style={{ display: "block" }}>
                        {errors.password}
                      </CFormFeedback>
                    )}
                  </CInputGroup>
                  <CInputGroup className="mb-2 mt-2">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="password_confirmation"
                    />
                    {touched.password_confirmation &&
                      errors.password_confirmation && (
                        <CFormFeedback invalid style={{ display: "block" }}>
                          {errors.password_confirmation}
                        </CFormFeedback>
                      )}
                  </CInputGroup>
                  <CInputGroup className="mb-2 mt-2">
                    <CInputGroupText>
                      <CIcon icon={cilCloudUpload} />
                    </CInputGroupText>
                    <CFormInput
                      type="file"
                      placeholder="Profile pic"
                      autoComplete="Profile pic"
                      onBlur={handleBlur}
                      name="media"
                      accept="image/*"
                      onChange={(e) =>
                        formik.setFieldValue("media", e.currentTarget.files[0])
                      }
                    />
                    {touched.media && errors.media && (
                      <CFormFeedback invalid style={{ display: "block" }}>
                        {errors.media}
                      </CFormFeedback>
                    )}
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      {status == "pending" ? (
                        <CSpinner color="light" size="sm" />
                      ) : (
                        ""
                      )}
                      &nbsp;&nbsp;Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
