import { Col, Row } from "antd";
import CareLibraryIcon from "./../../assets/Login/care-library-icon.png";
import LazyIcon from "./../../assets/Login/lazy-icon-care.png";
import { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SignIn.scss";
import { useResetPasswordRequestMutation, useSignInPostRequestMutation } from "../../store/Slices/Signin";
import Footer from "../../layout/Footer/Footer";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import AppSnackbar from "../../utils/AppSnackbar";

//comment for testing
const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  let navigate = useNavigate();

  const location = useLocation();
  const path = location.pathname;
  // console.log('path', path)

  const { state }: any = useLocation()

  console.log("state=>", state)

  const [signInPostRequest, { isLoading }] = useSignInPostRequestMutation();

  function renderDashboard(role: string): string {
    if (role === "carer") {
      return "/carer-dashboard";
    } else if (role === "carer_coordinator") {
      return "/coordinator-dashboard";
    } else if (role === "client") {
      return "/client-dashboard";
    } else if (role === "training_instructor") {
      return "/instructor-dashboard";
    } else if (role === "system_admin") {
      return "/super-admin-dashboard";
    } else {
      return "/";
    }
  }

  const [resetPasswordRequest] = useResetPasswordRequestMutation()
  

  const onFinish = async (values: any) => {
    // const payload = {
    //   email: values.username,
    //   password: values.password,
    // };

    // const { error, data }: any = await signInPostRequest({
    //   payload,
    // });

    // const role = data?.data?.user?.roleData?.name


    // console.log("test data", data?.data?.session)

    // if (data?.data?.session) {
    //   alert('session')
    // } else {
    //   if (!error) {
    //     const userData = {
    //       username: data?.data?.email,
    //       token: data?.data?.accessToken,
    //       refreshToken: data?.data?.refreshToken,
    //       cognitoId: data?.data?.user?.cognitoId,
    //       id: data?.data?.user?._id,
    //       roleId: data?.data?.user?.roleId,
    //       role,
    //       name: `${data?.data?.user?.firstName} ${data?.data?.user?.lastName}`
    //     };
    //     const stringifyData = JSON.stringify(userData);
    //     localStorage.setItem("careUserData", stringifyData);
    //     navigate(renderDashboard(role));
    //   } else {
    //     setErrorMessage(error?.data?.message)
    //   }
    // }

    const payload = {
      "email": state.email,
      "session": state.session,
      "password": values.password
    }

    console.log("payload check", payload)

    try {
      const { data, error }: any = await resetPasswordRequest({ payload })
      if (error) {
        AppSnackbar({
          type: "error",
          messageHeading: "Error",
          message: error?.data?.message ?? "Something went wrong!"
        });
        return;
      }
    }
    catch (error) {
      console.log("Unexpected error:", error);
    }
    AppSnackbar({ type: "success", messageHeading: "Success!", message: "Password reset successful" });


  };

  const validateEmail = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback();
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) {
        callback();
      } else {
        callback('Invalid format of email');
      }
    }
  };


  

  return (
    <Row className="care-signin">
      {/* Left Div */}
      <Col xs={0} sm={0} lg={12} xl={14}>
        <div className="left-outer-div">
          <div className="inner-left-div">
            <div>
              <h1 className="heading-1">
                <span className="pink-color">Reset Password</span>
                <span> to</span>
              </h1>
              <h3 className="heading-3">Solace Leather</h3>
            </div>
            <div className="demo-wrap">
              <div className="demo-content">
                <img src={LazyIcon} alt="care-library-icon" />
              </div>
            </div>
          </div>
        </div>
      </Col>
      {/* Right Div for form */}
      <Col xs={24} sm={24} lg={12} xl={10}>
        <div className="right-outer-div">
          <div className="img-div">
            <img src={CareLibraryIcon} alt="care-library-icon" width={199} height={91} />
          </div>
          <div>
            <h2 className="Sign-in-heading">Reset Password</h2>
            <Form name="email" onFinish={onFinish}>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Required field",
                  },
                  //  { validator: validateEmail }
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  className="input-style"
                  // iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Required field",
                  },
                ]}
              >
                {/* <Input.Password placeholder="Password" /> */}
                <Input.Password
                  placeholder="Confirm Password"
                  className="input-style"
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
              <p style={{ color: "red" }}>{errorMessage}</p>
              <div style={{ textAlign: "end", margin: "10px 0px 20px 0px" }}>
                <Link to="" className="forgot-password-style">
                  Forgot Password?
                </Link>
              </div>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  className=" btn-signin fw-600 "
                  block
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
            <Footer />
            {/* <p className="fs-15-n-gray">
              Resend <span className="pink-color">Log In</span> Details
            </p> */}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ResetPassword;
