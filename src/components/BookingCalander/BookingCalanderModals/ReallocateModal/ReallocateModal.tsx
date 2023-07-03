import { Button, Col, Form, Input, Modal, Row } from "antd";
import SelectWrapper from "../../../../shared/SelectWrapper/SelectWrapper";
import Close from "../../../../assets/images/OnBoarding/Close.svg";
import "./ReallocateModal.scss";
import { useGetStaffListQuery, useReallocateShiftMutation } from "../../../../store/Slices/BookingCalendar";
import { useState } from "react";

function ReallocateModal(props: any) {
  const [errorMsg, setErrorMsg] = useState("")
  const [confirmationReq, setConfirmationReq] = useState("")
  const { isReallocateModalOpen, setIsReallocateModalOpen, shiftDetails } = props;

  const [form] = Form.useForm();

  const { data: staffList } = useGetStaffListQuery({});
  const [reallocateShift, { isLoading }] = useReallocateShiftMutation({});

  const onFinish = async (values: any) => {
    const tempId = values.preStaffId
    values.preStaffId = values.preStaffId.substr(0, 24);
    values.confirmationReq = confirmationReq === "true" ? true : false;
    const payload = { ...values, staffShiftId: tempId.substr(24, 48) };
    const { error }: any = await reallocateShift(payload);
    if (error) setErrorMsg(error?.data?.message)
    if (!error) setIsReallocateModalOpen(false)
  };
  const staffListOptions = shiftDetails?.shiftStaff?.map((staffDetails: any) => {
    return {
      value: staffDetails?.staffId.concat(staffDetails?._id),
      label: `${staffDetails?.staff?.firstName || "firstname"} ${staffDetails.staff?.lastName || "last name"}`,
    };
  });

  const availableStaffListOptions = staffList?.data?.result?.map((staffDetails: any) => {
    return {
      value: staffDetails?._id,
      label: `${staffDetails?.firstName} ${staffDetails?.lastName}`,
    };
  });

  return (
    <Modal
      centered
      width={890}
      closeIcon={<img src={Close} alt="close" />}
      title={<span className="fs-20 fw-600">Reallocate</span>}
      footer={false}
      className="Reallocate"
      open={isReallocateModalOpen}
      onOk={() => {
        setIsReallocateModalOpen(false);
      }}
      onCancel={() => {
        setIsReallocateModalOpen(false);
      }}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={20}>
          <Col xs={24} md={12}>
            <SelectWrapper label="Already Assigned Staff" required={true} placeHolder="Select already assigned member" options={staffListOptions} name="preStaffId" />
          </Col>

          <Col xs={24} md={12}>
            <SelectWrapper label="Available Staff Member" required={true} placeHolder="Selected avaliable staff member" options={availableStaffListOptions} name="staffId" />
          </Col>
          <Col xs={24} md={24}>
            <Row style={{ marginTop: "20px" }}>
              <Col xs={24}>
                <Form.Item name="updateReason" label="Please mention reason for reallocation.">
                  <Input.TextArea name="updateReason" rows={4} placeholder="Type here" style={{ border: "1.5px solid #A0A3BD", borderRadius: "3px" }} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          {errorMsg && <span style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</span>}
          <Col xs={24} className="btn-wrapper d-flex">
            <Button
              type="primary"
              className="cancel-btn fs-16 fw-600"
              onClick={() => { setIsReallocateModalOpen(false); }}
            >
              NO
            </Button>
            <Button
              type="primary"
              className="allocate-btn fs-16 fw-600"
              loading={isLoading && confirmationReq === "true"}
              onClick={() => { setConfirmationReq("true"); form.submit() }}
            >
              Allocate (acceptance required)
            </Button>
            <Button loading={isLoading && confirmationReq === "false"} type="primary" onClick={() => { setConfirmationReq("false"); form.submit() }} className="allocate-success-btn fs-16 fw-600">
              Allocate
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default ReallocateModal;
