import { Col, Row } from "antd";
import CareLibraryIcon from "../../assets/icons/logo.jpg";
import LazyIcon from "./../../assets/Login/lazy-icon-care.png";
import { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SignIn.scss";
import { useSignInPostRequestMutation } from "../../store/Slices/Signin";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useChangePasswordPostRequestMutation } from "../../store/Slices/ChangePassword";
import { useAuthSignUpMutation } from "../../store/Slices/Products";

//comment for testing
const Login = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const [changePasswordErrorMessage, setChangePasswordErrorMessage] =
    useState("");
  let navigate = useNavigate();
  const location = useLocation();
  const [signInPostRequest, { isLoading }] = useSignInPostRequestMutation();
  const [authSignUp]=useAuthSignUpMutation()
  const [changePasswordPostRequest, { isLoading: changePasswordLoading }] =
    useChangePasswordPostRequestMutation();

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
      return "/admin-dashboard";
    }
  }
  const onFinishSignUp=async (values:any)=>{
    delete values?.confirmpassWord
    if (values?.password === values?.confirmPassword) {
      const payload = {
        email: values.email,
        password: values.password,
        username:values?.username,
      };
      const { error, data }: any = await authSignUp({
        payload:{...payload ,role:"user"},

      });
      
      if (!error) {
        navigate("/login");
      } else {
        setChangePasswordErrorMessage(error?.data?.message);
      }
    } else {
      setChangePasswordErrorMessage(
        "New Password and Confirm New Password Should Be Equal"
      );
    }
    
  }

  const onFinish = async (values: any) => {
    const payload = {
      emailOrUsername:values?.emailOrUsername, // values.username,
      password: values?.password,//values.password,
     
    };
    
 
    const { error, data }: any = await signInPostRequest({
      payload,
    });
    
    console.log(data, "data+++++");

    const role = data?.data?.user?.roleData?.name;
  

    // console.log("test data", data?.data?.session)

    if (data?.data?.session) {
      navigate(`/reset-password`, {
        state: { session: data?.data?.session, email: values.username },
      });
    } else {
      if (!error) {
        const userData = {
          username: data?.user?.email,
          token: data?.accessToken,
          refreshToken: data?.data?.refreshToken,
          role: data?.user?.role,
        };
        const stringifyData = JSON.stringify(userData);
        localStorage.setItem("careUserData", stringifyData);
        // navigate("/dashboard");
        navigate(renderDashboard(role))
        
      } else {
        setErrorMessage(error?.data?.message);
      }
    }
  };
  const onFinishChangePassword = async (values: any) => {
    if (values?.newPassword === values?.confirmNewPassword) {
      const payload = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      };
      const { error, data }: any = await changePasswordPostRequest({
        payload,
      });
      if (!error) {
        navigate("/login");
      } else {
        setChangePasswordErrorMessage(error?.data?.message);
      }
    } else {
      setChangePasswordErrorMessage(
        "New Password and Confirm New Password Should Be Equal"
      );
    }
  };
  const validateEmail = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback();
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) {
        callback();
      } else {
        callback("Invalid format of email");
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
                <span className="pink-color" style={{color:"#8c430c"}}>
                  {location?.pathname === "/login"
                    ? "Sign In" 
                    : location?.pathname === "/sign-up"? "Sign Up": "Change Password"}
                </span>
                <span style={{color:"white"}}> to</span>
              </h1>
              <h3 className="heading-3" style={{color:"white"}}>Solace Leather</h3>
            </div>
            {/* <div>
              <p className="p-tag-description-1">If you don't have an account register</p>
              <p className="p-tag-description-2">
                You can
                <span className="pink-color fw-600"> Register</span>
                <span> here!</span>
              </p>
            </div> */}
            <div className="demo-wrap">
              <div className="demo-content">
                <img src={LazyIcon} alt="care-library-icon" />
              </div>
            </div>
          </div>
        </div>
      </Col>
      {/* Right Div for form */}
      {location?.pathname === "/login" && (
        <Col xs={24} sm={24} lg={12} xl={10}>
          <div className="right-outer-div">
            <div className="img-div" style={{textAlign:"center"}}>
              <img
                src={CareLibraryIcon}
                alt="care-library-icon"
                style={{width:"100px",height:"100px",borderRadius:"50%"}}
              />
            </div>
            <div>
              <h2 className="Sign-in-heading">Sign In</h2>
              <Form name="emailOrUsername" onFinish={onFinish}>
                <Form.Item
                  name="emailOrUsername"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                    { validator: validateEmail },
                  ]}
                >
                  <Input placeholder="Username" className="input-style" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  {/* <Input.Password placeholder="Password" /> */}
                  <Input.Password
                    placeholder="Password"
                    className="input-style"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <p style={{ color: "red" }}>{errorMessage}</p>

                <div style={{ textAlign: "end", margin: "10px 0px 20px 0px" }}>
                  <Link to="/change-password" className="forgot-password-style">
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
                    Sign In
                  </Button>
                  <div style={{ textAlign: "end", margin: "10px 0px 20px 0px" }}>
                  <Link to="/sign-up" className="forgot-password-style">
                  New to Solace Leather? Sign Up
                  </Link>
                </div>
                </Form.Item>
              </Form>
         
              {/* <p className="fs-15-n-gray">
              Resend <span className="pink-color">Log In</span> Details
            </p> */}
            </div>
          </div>
        </Col>
      )}
      {/* Change Password */}
      {location?.pathname === "/change-password" && (
        <Col xs={24} sm={24} lg={12} xl={10}>
          <div className="right-outer-div">
            <div className="img-div" style={{textAlign:"center"}}>
              <img
                src={CareLibraryIcon}
                alt="care-library-icon"
                width={90}
                height={90}
                style={{borderRadius:"50%"}}
              />
            </div>
            <div>
              <h2 className="Sign-in-heading">Change Passwod</h2>
              <Form name="currentPassword" onFinish={onFinishChangePassword}>
                <Form.Item
                  name="currentPassword"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Current Password"
                    className="input-style"
                  />
                </Form.Item>
                <Form.Item
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  {/* <Input.Password placeholder="Password" /> */}
                  <Input.Password
                    placeholder="New Password"
                    className="input-style"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="confirmNewPassword"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  {/* <Input.Password placeholder="Password" /> */}
                  <Input.Password
                    placeholder="Confirm New Password"
                    className="input-style"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <p style={{ color: "red" }}>{errorMessage}</p>
                <p style={{ color: "red" }}>{changePasswordErrorMessage}</p>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    className=" btn-signin fw-600 "
                    block
                  >
                    Save Password
                  </Button>
                </Form.Item>
              </Form>
            
              {/* <p className="fs-15-n-gray">
              Resend <span className="pink-color">Log In</span> Details
            </p> */}
            </div>
          </div>
        </Col>
      )}
       {location?.pathname === "/sign-up" && (
        <Col xs={24} sm={24} lg={12} xl={10}>
          <div className="right-outer-div">
            <div className="img-div" style={{textAlign:"center"}}>
              <img
                src={CareLibraryIcon}
                alt="care-library-icon"
                width={100}
                height={100}
                style={{borderRadius:"50%"}}
              />
            </div>
            <div>
              <h2 className="Sign-in-heading">Sign Up</h2>
              <Form name="currentPassword" onFinish={onFinishSignUp}>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  <Input
                  style={{color:"white"}}
                    placeholder="Username"
                    className="input-style"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                    { validator: validateEmail },
                  ]}
                >
                  <Input placeholder="Useremail" className="input-style" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  {/* <Input.Password placeholder="Password" /> */}
                  <Input.Password
                    placeholder="Password"
                    className="input-style"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
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
                    placeholder="Confirm  Password"
                    className="input-style"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <p style={{ color: "red" }}>{errorMessage}</p>
                <p style={{ color: "red" }}>{changePasswordErrorMessage}</p>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    className=" btn-signin fw-600 "
                    block
                  >
                    Save 
                  </Button>
                </Form.Item>
              </Form>
            
              {/* <p className="fs-15-n-gray">
              Resend <span className="pink-color">Log In</span> Details
            </p> */}
            </div>
          </div>
        </Col>
      )}
    </Row>
  );
};

export default Login;
