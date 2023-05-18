import {
  Col,
  DatePicker,
  Button,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
} from "antd";

import "./EditNewUserModal.scss";
import "../../../sass/common.scss";
import CrossIcon from "../../../assets/icons/ManageUser/cross-icon.svg";
import { useUpdateManageUserMutation } from "../../../store/Slices/ManageUser";
import { useEffect } from "react";

const EditNewUserModal = ({
  isEditModalOpen,
  selectedTableData,
  setIsEditModalOpen,
  roleType
}: any) => {
  const [form] = Form.useForm();
  const [UpdateManageUser] = useUpdateManageUserMutation();
  const handleOk = () => {
    setIsEditModalOpen(false);
  };

  const handleFinish = (values: any) => {
    const { email, ...remainingvalues } = values;
    UpdateManageUser({ payload: remainingvalues, id: selectedTableData._id });
    setIsEditModalOpen(false);
  };
  console.log(selectedTableData, "selectedTableData");

  const handleCancel = () => {
    form.resetFields();
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    form.setFieldsValue(selectedTableData)
  }, [selectedTableData])
  return (
    <div className="add-new-user-wrapper">
      <Modal
        title={
          <span style={{ fontWeight: "500px", fontSize: "20px" }}>
            Edit User
          </span>
        }
        centered
        open={isEditModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        className="add-new-user-modal"
        footer={false}
        closeIcon={
          <img src={CrossIcon} alt="CrossIcon" height={16} width={16} />
        }
      >
        <Form
          form={form}
          onFinish={handleFinish}
        // initialValues={selectedTableData}
        >
          <Row gutter={[20, 20]}>
            {roleType !== "client" &&
              <Col md={12} xs={24} className="onBoarding-input">
                <label className="fw-600 fs-14  color :#6E7191">First Name</label>
                <Form.Item
                  name="firstName"
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <Input placeholder="Type here" name="firstName" />
                </Form.Item>
              </Col>
            }

            {roleType !== "client" && <Col md={12} xs={24} className="onBoarding-input">
              <label className="fw-600 fs-14  color :#6E7191">Last Name</label>
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: "Required field" }]}
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>}
            {roleType === "client" && <Col md={12} xs={24} className="onBoarding-input">
              <label className="fw-600 fs-14  color :#6E7191">Client Name</label>
              <Form.Item
                name="clientName"
                rules={[{ required: true, message: "Required field" }]}
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            }
            <Col md={12} xs={24} className="onBoarding-input">
              <label className="fw-600 fs-14  color :#6E7191">Email</label>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Required field" },
                  { type: "email", message: "Invalid email format" },
                ]}
              >
                <Input placeholder="Type here" disabled />
              </Form.Item>
            </Col>
            <Col md={12} xs={24} className="onBoarding-input">
              <label className="fw-600 fs-14  color :#6E7191">
                Phone Number
              </label>
              <Form.Item
                name="phone"
                rules={[{ required: true, message: "Required field" }]}
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={roleType === "client" ? 12 : 24} >
              <label className="fw-600 fs-14  color :#6E7191">Status</label>
              {/* <label>Phone Number</label> */}
              <Form.Item
                name="status"
                rules={[{ required: true, message: "Required field" }]}
              >
                <Select
                  placeholder="Selected Option"
                  style={{ width: "100%", borderRadius: "3px", height: "45px" }}
                  // suffixIcon={<img src={Arrow} />}
                  className="onBoarding-select"
                  options={[
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                  ]}
                />
              </Form.Item>
            </Col>


            <Col span={24}>
              <Space size={12}>
                <Button type="primary" style={{ backgroundColor: "#FF4D4F" }}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  UpdateFG
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default EditNewUserModal;
