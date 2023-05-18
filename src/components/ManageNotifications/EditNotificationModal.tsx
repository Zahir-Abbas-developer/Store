import { Button, Col, Form, Input, Modal, Row, Select, Space } from "antd";
import Arrow from "../../assets/images/OnBoarding/SelectArrow.svg";
import Close from "../../assets/images/OnBoarding/Close.svg";
import "./ManageNotification.scss";
import SelectWrapper from "../../shared/SelectWrapper/SelectWrapper";
import { useGetClientsListQuery, useGetUserTypesListQuery } from "../../store/Slices/BookingCalendar";
import { useEditNotificationMutation, useGetAllUsersRolesListQuery } from "../../store/Slices/ManageNotification";
import { useEffect, useState } from "react";

const EditNotification = (props: any) => {
  // const [initialValues, setInitialValues] = useState<any>({});
  const [errorMsg, setErrorMsg] = useState("");
  const { isShowEditModal, setIsShowEditModal, notificationDetails, setSingleNotificationData } = props;

  const { data: usersList } = useGetAllUsersRolesListQuery({});

  const [editNotification, { isLoading }] = useEditNotificationMutation({});

  let initialValues: any = {
    actionType: notificationDetails?.actionType,
    additionMail: notificationDetails?.additionMail,
    description: notificationDetails?.description,
    name: notificationDetails?.name,
    status: notificationDetails?.status,
    usersRoleId: notificationDetails?.usersRoleId,
  };

  const handleOk = () => {
    setIsShowEditModal(false);
    setSingleNotificationData({});
  };

  const handleCancel = () => {
    setIsShowEditModal(false);
    setSingleNotificationData({});
  };

  const onFinish = async (values: any) => {
    const { error }: any = await editNotification({ id: notificationDetails?._id, payload: values });
    if (error) {
      setErrorMsg(error?.data?.message);
    } else {
      setIsShowEditModal(false);
      setSingleNotificationData({});
    }
  };
  const usersListOptions = usersList?.data?.result?.map((userDetails: any) => {
    return {
      value: userDetails?._id,
      label: userDetails?.description,
    };
  });

  return (
    <div className="candidate-wrapper">
      <Modal
        title={<span className="fs-14 fw-600 label-color">Edit Notification</span>}
        centered
        open={isShowEditModal}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        className="add-modal"
        footer={false}
        closeIcon={<img src={Close} alt="" />}
      >
        <Form name="basic" layout="vertical" onFinish={onFinish} initialValues={initialValues}>
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
            <Col md={12} xs={24} className="onBoarding-input" style={{ marginBottom: "24px" }}>
              <SelectWrapper label="Select User" required={true} placeHolder="Select User" options={usersListOptions} name="usersRoleId" />
            </Col>
            <Col md={12} xs={24} style={{ marginBottom: "24px" }}>
              <SelectWrapper
                label="Action Type"
                required={true}
                placeHolder="Select Action Type"
                name="actionType"
                options={[
                  { value: "UserCreated", label: "When User is Created" },
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
              <Form.Item label={<span className="fs-14 fw-600 label-color">Additional Mail</span>} labelAlign="right" name="additionMail" rules={[{ required: true, message: "Required Field" }]}>
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
                  Update
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default EditNotification;
