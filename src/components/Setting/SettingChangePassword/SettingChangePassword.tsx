import { Button, Input,
  Form,
  Row,
  Col,
} from "antd";
import "./SettingChangePassword.scss";
import "../../../sass/common.scss";
import { useNavigate } from "react-router-dom";
import { usePostChangePasswordMutation } from "../../../store/Slices/Setting/ChangePassword";
import AppSnackbar from "../../../utils/AppSnackbar";
import { useState } from "react";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";
import { renderDashboard } from "../../../utils/useRenderDashboard";
import path from "path";

const SettingChangePassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [apiError, setApiError] = useState<string[]>([]);
  const [postChangePassword] = usePostChangePasswordMutation();
  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");

  //Failed form fields
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  
  //On Finish used to reset form fields in form
  const onFinish = async (values: any) => {
    console.log("Passsword Change Values ====> ", values);
    const { currentPassword, newPassword } = values;

    const newPayload = {
      currentPassword,
      newPassword
    }
    try {
      await postChangePassword({newPayload}).unwrap();
      AppSnackbar({
        type: "success",
        messageHeading: "Success!",
        message: "Information updated successfully",
      });
      form.resetFields();
      setApiError([]);

    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!",
      });

      setApiError(error?.data?.message);
    }
  };

  const passwordValidator = (rule: any, value: any, callback: any) => {
    const { getFieldValue } = form;
    if (!value) {
      callback("Required field");
    }
    if (getFieldValue('newPassword') !== value) {
      callback('New and confirm passwords do not match');
    } else {
      callback();
    }
  };


  return (
    <>
      <BreadCrumb breadCrumbItems={[
        {
          title: "Change Password",
          path: "",
        },
        {
          title: "Dashboard",
          path: renderDashboard(role),
        },
        {
          title: "Settings",
          path: "/settings",
        }
      ]} />
    
    <Form className="setting-change-password border-radius-8" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <h1 className="fs-24 fw-500 m-0">Change Password </h1>
      <Row gutter={20} style={{ marginBottom: "15px" }}>
        <Col lg={8} xs={24}>
          <label className="fs-14 fw-600">Enter Current Password<span style={{ color: "#FF4D4F" }}>*</span></label>
          <Form.Item
            name="currentPassword"
            // label="Current Password"
            rules={[{ required: true, message: "Required field " }]}
            style={{ marginBottom: "8px" }}
          >
            <Input
              placeholder="Enter current password"
              id="currentPassword"
              style={{ marginTop: "2px" }}
            />
          </Form.Item>
        </Col>

      </Row>
      <Row gutter={20} style={{ marginBottom: "15px" }}>
        <Col lg={8} xs={24}>
          <label className="fs-14 fw-600">Enter New Password<span style={{ color: "#FF4D4F" }}>*</span></label>
          <Form.Item
            name="newPassword"
            rules={[{ required: true, message: "Required field " }]}
            style={{ marginBottom: "8px" }}
          >
            <Input
              placeholder="Enter new password"
              id="newPassword"
              style={{ marginTop: "2px" }}
            />
          </Form.Item>
        </Col>

      </Row>
      <Row gutter={20} style={{ marginBottom: "15px" }}>
        <Col lg={8} xs={24}>
          <label className="fs-14 fw-600">Confirm Password<span style={{ color: "#FF4D4F" }}>*</span></label>
          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, validator: passwordValidator }]}
            style={{ marginBottom: "8px" }}
          >
            <Input
              placeholder="Enter confirm password"
              id="confirmPassword"
              style={{ marginTop: "2px" }}
            />
          </Form.Item>
        </Col>

      </Row>
      
        {!!apiError?.length && apiError?.map((item:any)=> <div style={{ color: "red"}}>{item} <br /></div>)}
      
      <Form.Item style={{ marginTop: "10px" }}>
        <Button
          className="btn-cancel"
          onClick={() => {
            setApiError([]); form.resetFields(); navigate("/settings");
          }}
        >
          Cancel
        </Button>
        <Button
          style={{ marginLeft: "10px" }}
          className="btn-secondary"
          htmlType="submit"
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
    </>


  )
}

export default SettingChangePassword