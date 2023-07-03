import { useState } from "react";
import dayjs from "dayjs";
import { Button, Col, DatePicker, Form, Input, Modal, Row, TimePicker } from "antd";
import { usePostCarerRequestDashboardMutation } from "../../../../store/Slices/CarerRequestDashboard";
import { useGetCarerDashboardCalanderRequestQuery } from "../../../../store/Slices/CarerDashboardCalander";
import { useGetClientsQuery } from "../../../../store/Slices/Setting/StaffSettings/RegisterationConfiguration";
import SelectWrapper from "../../../../shared/SelectWrapper/SelectWrapper";
import InputWrapper from "../../../../shared/InputWrapper/InputWrapper";
import DatePickerIcon from "../../../../assets/BookingCalander/images/date-picker.png";
import "./AddRequestModal.scss";

const AddRequestModal = ({ isModalOpen, setIsModalOpen }: any) => {
  const [requestType, setRequestType] = useState("");
  const [datePickerValue, setDatePickerValue] = useState<any>();
  const { id }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");
  //*****************************get staff details */ 
  let params: any = {
    staffId: id
  }
  if (datePickerValue) {
    params["startTime"] = dayjs(datePickerValue).toISOString()
    params["endTime"] = dayjs(datePickerValue).toISOString()
  }
  const query = "&" + new URLSearchParams(params).toString();
  const { data: shiftDetial, isSuccess: shiftIsSucess } = useGetCarerDashboardCalanderRequestQuery({
    refetchOnMountOrArgChange: true, query
  });

  let carerCalanderData: any;

  if (shiftIsSucess) {
    carerCalanderData = shiftDetial;
  }
  //*****************************get clients details */ 
  const { data: clientsDetial, isSuccess: clientsIsSucess } = useGetClientsQuery({
    refetchOnMountOrArgChange: true,
  });

  let carerClientsData: any;

  if (clientsIsSucess) {
    carerClientsData = clientsDetial;
  }

  const carerClientsOptions = carerClientsData?.data?.result?.map((item: any) => {
    return {
      label: item?.clientName,
      value: item?._id
    }
  })
  const carerShiftsOptions = carerCalanderData?.data?.shifts?.map((item: any) => {
    return {
      label: `${item?.shift?.shiftType} ${dayjs(item?.shift?.startTime).format('HH:mm a')}-${dayjs(item?.shift?.endTime).format('HH:mm a')}`,
      value: item?.shift?._id
    }
  })

  //*****************************post request to add new request */
  const [postCarerRequestDashboard, { isLoading }] = usePostCarerRequestDashboardMutation()

  const onFinish = (values: any) => {
    postCarerRequestDashboard({
      requestType: values?.requestType,
      reason: values?.reason,
      date: dayjs(values?.date).toISOString(),
      discription: values?.discription,
      careHomeId: values?.clientName,
      ShiftId: values?.shiftName,
      status: 'PENDING',
      checkIn: dayjs(values?.time[0]).toISOString(),
      checkOut: dayjs(values?.time[1]).toISOString(),
      otherRequestType: values?.otherRequestType
    })
  }
  return (
    <Modal
      className="add-request-modal"
      width={890}
      centered
      footer={null}
      onCancel={() => setIsModalOpen(false)}
      title="Add Request"
      open={isModalOpen}
    >
      <div className="modal-content">
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={[20, 20]}>
            <Col md={12} xs={24}>
              <SelectWrapper
                label="Request Type"
                onChange={(value: string) => {
                  setRequestType(value);
                }}
                required={true}
                placeHolder="Select"
                options={[
                  { value: "Time Range", label: "Out Of Office" },
                  { value: "Shift off Time", label: "Emergency Shift Off" },
                  { value: "Actual Check-In Time", label: "Change Check-In time" },
                  { value: "Actual Check-Out Time", label: "Change Check-Out time" },
                  { value: "other", label: "Other" },
                ]}
                name="requestType"
              />
            </Col>
            {requestType === "other" && (
              <Col md={12} xs={24}>
                <InputWrapper
                  label="Specify Other Request Type"
                  required={true}
                  name="otherRequestType"
                  placeHolder="Type here"
                />
              </Col>
            )}
            <Col md={12} xs={24}>
              <InputWrapper
                label="Reason"
                required={true}
                name="reason"
                placeHolder="Type here"

              />
            </Col>
            <Col md={12} xs={24}>
              <Form.Item
                required={true}
                label={<span className="label">Date</span>}
                name="date"
                rules={[{ required: true, message: "Required field" }]}
              >
                <DatePicker
                  size="large"
                  style={{
                    border: "1.5px solid #A0A3BD",
                    borderRadius: "3px",
                    width: "100%",
                    height: "45px",
                  }}
                  placeholder="Choose one or more dates"
                  onChange={(values: any) => setDatePickerValue(values)}
                  suffixIcon={<img src={DatePickerIcon} alt="calander-icon" />}
                />
              </Form.Item>
            </Col>
            {requestType !== "other" && requestType !== "" && requestType !== "Time Range" && (
              <Col md={12} xs={24}>
                <Form.Item
                  required={true}
                  label={<span className="label">{requestType}</span>}
                  name="time"
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <TimePicker
                    style={{
                      border: "1.5px solid #A0A3BD",
                      borderRadius: "3px",
                      width: "100%",
                      height: "45px",
                    }}
                    use12Hours
                    format="h:mm:ss A"
                  />
                </Form.Item>
              </Col>
            )}
            {requestType === "Time Range" && (
              <Col md={12} xs={24}>
                <Form.Item
                  required={true}
                  label={<span className="label">{requestType}</span>}
                  name="time"
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <TimePicker.RangePicker
                    style={{
                      border: "1.5px solid #A0A3BD",
                      borderRadius: "3px",
                      width: "100%",
                      height: "45px",
                    }}
                    use12Hours
                    format="h:mm:ss A"
                  />
                </Form.Item>
              </Col>
            )}
            <Col xs={24} md={12}>
              <SelectWrapper
                label="Client Name"
                required={true}
                placeHolder="Select Client Name"
                options={carerClientsOptions}
                name="clientName"
              />
            </Col>
            <Col xs={24} md={12}>
              <SelectWrapper
                label="Shift Name"
                required={true}
                placeHolder="Select Shift"
                options={carerShiftsOptions}
                name="shiftName"
              />
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="discription" label={<span className="label">Description</span>}>
                <Input.TextArea
                  rows={4}
                  placeholder="Type here"
                  style={{ border: "1.5px solid #A0A3BD", borderRadius: "3px" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24}>
              <Button className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button loading={isLoading} className="save-btn" htmlType="submit">
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};
export default AddRequestModal;
