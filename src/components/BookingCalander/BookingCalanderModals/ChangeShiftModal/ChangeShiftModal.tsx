import { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "antd";
import { v4 as uuidv4 } from "uuid";
import MockUser from "../../../../assets/BookingCalander/images/mock-user.png";
import Close from "../../../../assets/images/OnBoarding/Close.svg";
import SelectWrapper from "../../../../shared/SelectWrapper/SelectWrapper";
import dayjs from "dayjs";
import TimePickerWrapper from "../../../../shared/TimePickerWrapper/TimePickerWrapper";
import { useUpdateShiftTimeMutation } from "../../../../store/Slices/BookingCalendar"; 
import { useForm } from "antd/es/form/Form";
import AppSnackbar from "../../../../utils/AppSnackbar";

function ChangeShiftModal(props: any) {
  const [errorMsg, setErrorMessage] = useState("");
  const { isChangeShiftTimeOpen, setIsChangeShiftTimeOpen, shiftDetails,startTimeNew } = props;

  const [updateShiftTime, { isLoading, isSuccess }] = useUpdateShiftTimeMutation();

  const shiftInfoMock = [
    { heading: "Staff Name", detail: shiftDetails?.careHome?.clientName },
    { heading: "Shift Date", detail: dayjs(shiftDetails?.shiftDate).format("DD/MM/YYYY") },
    { heading: "Shift Type", detail: shiftDetails?.shiftType },
  ];

  const onFinish = async (values: any) => {
    const payload = {
      startTime: `${dayjs(shiftDetails?.shiftDate).format('YYYY-MM-DD')}T${dayjs(values.startTime).format("hh:mm:ss")}`,
      endTime: `${dayjs(shiftDetails?.shiftDate).format('YYYY-MM-DD')}T${dayjs(values.endTime).format("hh:mm:ss")}`,
    };


    // const { error }: any = await updateShiftTime({ id: shiftDetails?._id, payload });
    // if (error) {
    //   setErrorMessage(error?.data?.message);
    // }


    try {
      const { data, error }: any = await updateShiftTime({ id: shiftDetails?._id, payload });
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
    AppSnackbar({ type: "success", messageHeading: "Success!", message: "Data Updated sucessfully" });


  };

  if (isSuccess) {
    setIsChangeShiftTimeOpen(false);
  }
  // const initialValues = {
  //   startTime: shiftDetails?.shiftStartTime ? dayjs(shiftDetails?.shiftStartTime) : undefined,
  //   endTime: shiftDetails?.shiftEndTime ? dayjs(shiftDetails?.shiftEndTime) : undefined
  // }
  // console.log(initialValues);


  console.log("shiftDetails", shiftDetails)


  const [form] = useForm()

  const initialValues = {
    startTime: dayjs(shiftDetails?.shiftStartTime ).utc(),
    endTime: dayjs(shiftDetails?.shiftEndTime ).utc(),
  }

  console.log("initialValues", initialValues)
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [shiftDetails])
  

  return (
    <Modal
      centered
      width={636}
      closeIcon={<img src={Close} alt="close" />}
      title={<span className="fs-20 fw-600">Change Shift Time</span>}
      footer={false}
      className="change-shift-modal"
      open={isChangeShiftTimeOpen}
      onOk={() => {
        setIsChangeShiftTimeOpen(false);
      }}
      onCancel={() => {
        setIsChangeShiftTimeOpen(false);
      }}
    >
      <Row className="d-flex align-items-center justify-between">
        <Col xs={24} sm={12} md={12} style={{ margin: "2rem 0 3rem 0" }}>
          <img src={MockUser} alt="mock_user" />
          <h3 className="fs-20 fw-500 m-0">{shiftDetails?.careHome?.clientName}</h3>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Row style={{ lineHeight: 2.5 }}>
            {shiftInfoMock.map((data) => {
              return (
                <Fragment key={uuidv4()}>
                  <Col xs={12} className="fs-14 fw-600">
                    {data.heading}:
                  </Col>
                  <Col xs={12}>{data.detail}</Col>
                </Fragment>
              );
            })}
          </Row>
        </Col>
        <Col xs={24} md={24}>
          <Form layout="vertical" onFinish={onFinish} form={form}>
            <Row gutter={[10, 0]}>
              <Col xs={24} md={12}>
                <TimePickerWrapper
                  label="Start Time"
                  name="startTime"
                  format="HH:mm"
                  required={false}
                  placeHolder="hh:mm:ss"
                // value={dayjs(shiftDetails?.shiftEndTime).format('HH:mm')}
                />
              </Col>
              <Col xs={24} md={12}>
                <TimePickerWrapper
                  label="End Time"
                  name="endTime"
                  format="HH:mm"
                  required={false}
                  placeHolder="hh:mm:ss"
                // value={dayjs(shiftDetails?.shiftEndTime).format('HH:mm')}
                />
              </Col>
              {errorMsg && <span style={{ color: "red" }}>{errorMsg}</span>}
              <Button loading={isLoading} style={{ marginLeft: "auto" }} htmlType="submit" type="primary">
                Change
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
}

export default ChangeShiftModal;
