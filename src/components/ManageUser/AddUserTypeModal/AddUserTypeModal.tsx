import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Space,
} from "antd";
import { useState } from "react";
import ExtraUserAdded from "../../../assets/icons/ManageUser/extra-user-added.svg";
import { v4 as uuidv4 } from "uuid";
import RolesandRightsArrow from "../../../assets/icons/ManageUser/roles-and-rights-arrow.svg";
import "../../../sass/common.scss";
import { checkboxes } from "../../../mock/ManageUserData";
import CrossIcon from "../../../assets/icons/ManageUser/cross-icon.svg";
import "../EditNewUserModal/EditNewUserModal.scss";

const AddUserTypeModal = ({
  isOpenUserTypeModal,
  setIsOpenuserTypeModal,
  handleSave,
}: any) => {
  //state
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const [form] = Form.useForm();
  //it will Add user as a true or false in table deponding upon which value is selected from status
  const handleCheckedValues = (value: string) => {
    if (checkedValues.includes(value)) {
      setCheckedValues(checkedValues.filter((val) => val !== value));
    } else {
      setCheckedValues([...checkedValues, value]);
    }
  };

  //when all the values we entered are valid then handleOk Funtion will Execute
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const userData = {
          ...values,
          icon: ExtraUserAdded,
          iconBackground: "#FFF2F8",
          cardBorder: "1px solid #E3E3E3",
        };
        handleSave(userData);
        form.resetFields();
        setIsOpenuserTypeModal(false);
        console.log(values); // submit form data here
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };
  //it will excute when we want to cancel the form or wants to exit without any successful execution
  const handleCancel = () => {
    form.resetFields();
    setIsOpenuserTypeModal(false);
  };

  //Main
  return (
    <div className="add-new-user-wrapper">
      <Modal
        open={isOpenUserTypeModal}
        title={<span style={{ fontWeight: "500px", fontSize: "20px" }}></span>}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        className="add-new-user-modal"
        footer={false}
        closeIcon={
          <img src={CrossIcon} alt="CrossIcon" height={16} width={16} />
        }
      >
        <Form form={form} onFinish={handleOk}>
          <Row gutter={[20, 20]}>
            <Col md={12} xs={24} className="onBoarding-input">
              <label className="fw-600 fs-14" style={{color:"#6E7191"}}>Name</label>
              <Form.Item
                name="title"
                rules={[{ required: true, message: "Required field" }]}
              >
                <Input
                  placeholder="Type here"
                  name="firstName"
                />
              </Form.Item>
            </Col>
            <Col md={12} xs={24} className="onBoarding-input">
              <label className="fw-600 fs-14" style={{color:"#6E7191"}}>Description</label>
              <Form.Item
                name="description"
                rules={[{ required: true, message: "Required field" }]}
              >
                <Input
                  placeholder="Type here"
                />
              </Form.Item>
            </Col>
          </Row>
          <Card>
            {checkboxes.map(({ label, value }) => (
              <Row style={{ marginTop: "13px" }} key={uuidv4()}>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Checkbox
                    key={value}
                    value={value}
                    checked={checkedValues.includes(value)}
                    onChange={() => handleCheckedValues(value)}
                  >
                    <span className="fw-400 fs-14" style={{ color: "#4E4B66" }}>
                      {label}
                    </span>
                  </Checkbox>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <img
                    src={RolesandRightsArrow}
                    alt="RolesandRightsArrow"
                    width={10}
                    height={16}
                  />
                </Col>
              </Row>
            ))}
            <Row>
              <Col
                span={24}
                style={{ paddingTop: "76px", paddingBottom: "15px" }}
              >
                <Space size={12}>
                  <Button  type="primary"
                    style={{ backgroundColor: "#FF4D4F"  }}
                    onClick={() => setIsOpenuserTypeModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit"
                  >
                    Save
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>
        </Form>
      </Modal>
    </div>
  );
};

export default AddUserTypeModal;
