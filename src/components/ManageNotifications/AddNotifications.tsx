import { useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select, Space } from "antd";
import Arrow from "../../assets/images/OnBoarding/SelectArrow.svg";
import Close from "../../assets/images/OnBoarding/Close.svg";
import "./ManageNotification.scss";
import SelectWrapper from "../../shared/SelectWrapper/SelectWrapper";
import { useAddNotificationMutation, useGetAllUsersRolesListQuery } from "../../store/Slices/ManageNotification";
import { useGetUserTypesListQuery } from "../../store/Slices/BookingCalendar";

const AddNotifications = () => {
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { data: usersList } = useGetAllUsersRolesListQuery({});
  const [addNotification, { isLoading }] = useAddNotificationMutation({});

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const usersListOptions = usersList?.data?.result?.map((userDetails: any) => {
    return {
      value: userDetails?._id,
      label: userDetails?.description,
    };
  });

  const onFinish = async (values: any) => {
    const { error }: any = await addNotification(values);
    error ? setErrorMsg(error?.data?.message) : setIsModalOpen(false);
  };

  return (
    <div className="candidate-wrapper">
      <Button type="primary" onClick={showModal}>
        Add Notification
      </Button>
      <Modal
        title={<span className="fs-14 fw-600 label-color">Add Notification</span>}
        centered
        open={IsModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        className="add-modal"
        footer={false}
        closeIcon={<img src={Close} alt="" />}
      >
        <Form name="basic" layout="vertical" onFinish={onFinish}>
          <Row gutter={[20, 5]}>
            <Col md={12} xs={24} className="onBoarding-input">
              <Form.Item label={<span className="fs-14 fw-600 label-color">Notifications</span>} name="name" rules={[{ required: true, message: "Required Field" }]}>
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col md={12} xs={24} className="onBoarding-input">
              <Form.Item label={<span className="fs-14 fw-600 label-color">Description</span>} labelAlign="left" name="description" rules={[{ required: true, message: "Required Field" }]}>
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col md={12} xs={24} className="onBoarding-input">
              <SelectWrapper label="Select User" required={true} placeHolder="Select User" options={usersListOptions} name="usersRoleId" />
            </Col>
            <Col md={12} xs={24} style={{ marginBottom: "24px" }}>
              <SelectWrapper
                label="Action Type"
                required={true}
                placeHolder="Select Action Type"
                name="actionType"
                options={[
                  { value: "When User Created", label: "When User is Created" },
                  { value: "When Carer Register", label: "When Carer Register" },
                  { value: "When Carer is assigned", label: "When Carer is assigned" },
                  { value: "When Carer Resigned", label: "When Carer Resigned" },
                  { value: "When User is Created", label: "When User is Created" },
                ]}
              />
            </Col>
            <Col md={12} xs={24} className="onBoarding-input">
              <SelectWrapper
                label="Status"
                required={true}
                placeHolder="Select Status"
                options={[
                  { value: true, label: "Active" },
                  { value: false, label: "Inactive" },
                ]}
                name="status"
              />
            </Col>
            <Col md={12} xs={24} className="onBoarding-input">
              <Form.Item label={<span className="fs-14 fw-600 label-color">Aditional Mail</span>} labelAlign="right" name="additionMail" rules={[{ required: true, message: "Required Field" }]}>
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            {errorMsg && <span style={{ color: "red" }}>{errorMsg}</span>}
            <Col span={24}>
              <Space size={12}>
                <Button type="primary" onClick={handleCancel} className="btn-error">
                  Cancel
                </Button>
                <Button loading={isLoading} type="primary" htmlType="submit">
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

export default AddNotifications;
