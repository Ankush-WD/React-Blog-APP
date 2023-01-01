import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
  CSpinner,
} from "@coreui/react";
import { useFormik } from "formik";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import loginSchema from "../../../validationSchema/loginSchema";
import { useDispatch, useSelector } from "react-redux";
import { logIn,clearStateValue } from "../../../redux/slice/authSlice";

const Login = () => {
  const { isLoggedIn, message, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // setting initial value
  const initialValues = {
    email: "",
    password: "",
  };

  // initialize form
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: function (values) {
      dispatch(logIn(values));
    },
  });

  // destructuring formik object;
  const { handleChange, handleBlur, touched, errors, values } = formik;
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(clearStateValue());
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <h1>Login</h1>
                  <p className="text-medium-emphasis">
                    Sign In to your account
                  </p>
                  {status == "fail" ? (
                    <CAlert color="danger">{message}</CAlert>
                  ) : (
                    ""
                  )}
                  <CForm
                    className="row g-3 needs-validation"
                    noValidate
                    onSubmit={formik.handleSubmit}
                    validated={false}
                  >
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="email"
                        placeholder="Email"
                        autoComplete="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      {touched.email && errors.email && (
                        <CFormFeedback invalid style={{ display: "block" }}>
                          {errors.email}
                        </CFormFeedback>
                      )}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      {touched.password && errors.password && (
                        <CFormFeedback invalid style={{ display: "block" }}>
                          {errors.password}
                        </CFormFeedback>
                      )}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          {status == "pending" ? (
                            <CSpinner color="light" size="sm" />
                          ) : (
                            ""
                          )}
                          &nbsp;&nbsp;Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
