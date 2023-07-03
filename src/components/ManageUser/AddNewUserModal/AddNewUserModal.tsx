import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import "./AddNewModal.scss";
import "../../../sass/common.scss";
import CrossIcon from "../../../assets/icons/ManageUser/cross-icon.svg";
import Arrow from "../../../assets/images/OnBoarding/SelectArrow.svg";
import {
  usePostAuthOnBoardingRequestMutation,
  usePostAuthSignupAdminRequestMutation,
  usePostAuthSignupClientRequestMutation,
} from "../../../store/Slices/ManageUser";
import { useGetJobRequestQuery } from "../../../store/Slices/Setting/JobRole";
import { Option } from "../../OnBoarding/CareCordinator/ClientDetails/AllocateNewCareHomeModal";

const AddNewUser = ({
  isAddNewUserModalOpen,
  setIsAddNewUserModalOpen,

  roleType,
}: any) => {
  const [form] = Form.useForm();
  const [postAuthSignupAdminRequest] = usePostAuthSignupAdminRequestMutation();
  const [postAuthOnBoardingRequest] = usePostAuthOnBoardingRequestMutation();
  const [postAuthSignupClientRequest] =
    usePostAuthSignupClientRequestMutation();
  const { data, isSuccess } = useGetJobRequestQuery({
    refetchOnMountOrArgChange: true,
  });

  let jobTypes: any;
  if (isSuccess) {
    jobTypes = data;
  }

  //when all the values we entered are valid then handleOk Funtion will Execute
  const handleOk = (values: any) => {
    const payload = { ...values, roleType };
    roleType === "admin" && postAuthSignupAdminRequest({ payload: values });
    roleType === "client" && postAuthSignupClientRequest({ payload: values });
    (roleType === "training_instructor" ||
      roleType === "carer_coordinator" ||
      roleType === "carer") &&
      postAuthOnBoardingRequest({ payload: payload });
      form.resetFields();
      setIsAddNewUserModalOpen(false);
      
  };

  //it will excute when we want to cancel the form or wants to exit without any successful execution
  const handleCancel = () => {
    form.resetFields();
    setIsAddNewUserModalOpen(false);
  };
  //Main
  return (
    <div className="add-new-user-wrapper">
      <Modal
        title={
          <span style={{ fontWeight: "500px", fontSize: "20px" }}>
            Add User
          </span>
        }
        centered
        visible={isAddNewUserModalOpen}
        open={isAddNewUserModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        className="add-new-user-modal"
        footer={false}
        closeIcon={
          <img src={CrossIcon} alt="CrossIcon" height={16} width={16} />
        }
      >
        <Form layout="vertical" form={form} onFinish={handleOk}>
          <Row gutter={20}>
            {roleType !== "client" && (
              <Col md={12} xs={24} className="add-user-input">
                <Form.Item
                  className="add-user-modal-label"
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <Input placeholder="Type here" name="firstName" />
                </Form.Item>
              </Col>
            )}
            {roleType !== "client" && (
              <Col md={12} xs={24} className="add-user-input">
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <Input placeholder="Type here" />
                </Form.Item>
              </Col>
            )}

            {roleType === "client" && (
              <Col md={12} xs={24} className="add-user-input">
                <Form.Item
                  className="add-user-modal-label"
                  label="Client Name"
                  name="clientName"
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <Input placeholder="Type here" name="firstName" />
                </Form.Item>
              </Col>
            )}
            <Col md={12} xs={24} className="add-user-input">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Required field" },
                  { type: "email", message: "Invalid email format" },
                ]}
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col md={12} xs={24} className="add-user-input">
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true, message: "Required field" }]}
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>

            {roleType === "admin" && (
              <Col xs={24} sm={24} md={12} lg={12} className="onBoarding-input">
                <Form.Item
                  label="Status"
                  name="status"
                  className="onBoarding-select"
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <Select
                    placeholder="Selected Option"
                    suffixIcon={<img src={Arrow} />}
                    options={[
                      { value: "active", label: "Active" },
                      { value: "inactive", label: "Inactive" },
                    ]}
                    size="large"
                  />
                </Form.Item>
              </Col>
            )}

            {(roleType !== "admin" && roleType !== "client") && (
              <Col xs={24} sm={24} md={12} lg={12} className="onBoarding-input">
                <Form.Item
                  label="User Type"
                  name="userType"
                  className="onBoarding-select"
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <Select
                    placeholder="User Type"
                    suffixIcon={<img src={Arrow} />}
                  >
                    {jobTypes?.data?.result &&
                      jobTypes?.data?.result.map((item: any) => {
                        return (
                          <Option value={item._id}>{item?.shortForm}</Option>
                        );
                      })}
                  </Select>
                </Form.Item>
              </Col>
            )}

            {(roleType !== "admin" && roleType !== "client") && (
              <Col xs={24} sm={24} md={12} lg={12} className="onBoarding-input">
                <Form.Item
                  label="Gender"
                  name="gender"
                  className="onBoarding-select"
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <Select
                    placeholder="Selected Option"
                    suffixIcon={<img src={Arrow} />}
                    options={[
                      { value: "Male", label: "Male" },
                      { value: "Female", label: "Female" },
                    ]}
                    size="large"
                  />
                </Form.Item>
              </Col>
            )}
            <Col span={24}>
              <Space size={12}>
                <Button
                  type="primary"
                  onClick={handleCancel}
                  style={{ backgroundColor: "#FF4D4F" }}
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" >
                  Add
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewUser;
