import React, { useEffect} from "react";
import { Col,Modal,Form, Row } from "antd";
import SelectWrapper from "../../../../../shared/SelectWrapper/SelectWrapper";
import SwitchWrapper from "../../../../../shared/SwitchWrapper/SwitchWrapper";
import DatePickerWrapper from "../../../../../shared/DatePickerWrapper/DatePickerWrapper";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import CloseIcon from "../../../../../assets/icons/ShiftManger/close-icon.svg";
import "./PostShiftModal.scss";
import TimePickerWrapper from "../../../../../shared/TimePickerWrapper/TimePickerWrapper";
import InputWrapper from "../../../../../shared/InputWrapper/InputWrapper";
import utc from 'dayjs/plugin/utc';
import { isNullOrEmpty } from "../../../../../utils/utils";

const PostShiftModal = (props: any) => {
  const { isPostShiftModalOpen, setIsPostShiftModalOpen, onFinish, postData,setPostData ,departments, switchValue, setSwitchValue, userTypesList, errorMsg,careHome,form } = props;

  dayjs.extend(utc)
  const departmentListOptions = departments?.data?.map((userTypeDetails: any) => {
    return { value: userTypeDetails?._id, label: userTypeDetails?.name };
  });

  const handleFormSubmit = (values: any) => {
    values.startTime=`${dayjs(values.shiftDate).format('YYYY-MM-DD')}T${dayjs(values.startTime).format('HH:mm:ss')}`
    values.endTime=`${dayjs(values.shiftDate).format('YYYY-MM-DD')}T${dayjs(values.endTime).format('HH:mm:ss')}`
    values.careHomeId=postData?.careHomeId
    onFinish(values);
    setSwitchValue(false);
  };

  useEffect(()=>{
    if(!isNullOrEmpty(postData)){
      let temp : any = {
        shiftDate: postData?.shiftDate ? dayjs(postData?.shiftDate) : undefined,
        carerType: postData?.carerType._id,
        shiftType: postData?.shiftType,
        startTime: postData?.startTime ? dayjs(postData?.startTime).utc() : undefined,
        endTime: postData?.endTime ? dayjs(postData?.endTime).utc() : undefined,
        department: postData?.department._id,
        staffRequired: postData?.staffRequired,
        requestedBy: postData?.requestedBy,
        optionalInfo: "",
        markUnPub: true,
      };
      form.setFieldsValue(temp);
    }
  },[postData])

  console.log(postData)
  return (
    <>
      <Modal
        title={<span className="fw-500 fs-20 line-height-28 form-heading-color">Post Shift</span>}
        open={isPostShiftModalOpen}
        onOk={() => setIsPostShiftModalOpen(false)}
        onCancel={() => {setIsPostShiftModalOpen(false);setPostData({});form.resetFields()}}
        width={890}
        footer={false}
        centered
        wrapClassName="post-shift-modal-wrapper"
        closeIcon={<img src={CloseIcon} alt="close" />}
      >
        <div className="post-shift-inner">
          <Form
            layout="vertical"
            onFinish={handleFormSubmit}
            form={form}
            className="post-shift-wrapper"
          >
            <Row gutter={[30, 20]}>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields">
                <InputWrapper
                name="careHomeId"
                type="text"
                label="Care Home"
                disabled={true}
                defaultValue={isNullOrEmpty(postData)?careHome:postData?.careHome?.clientName}
              />
              </Col>
              <Col
                xl={12}
                lg={12}
                md={12}
                sm={24}
                xs={24}
                className="post-shift-fields date-picker-wrap"
              >
                <DatePickerWrapper
                  name="shiftDate"
                  label="When do you need? Shift Date"
                  required={true}
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields">
                <SelectWrapper
                  label="Choose user type"
                  name="carerType"
                  required={true}
                  placeHolder="User Type"
                  options={userTypesList}
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields">
                <SelectWrapper
                  label="Choose a shift"
                  name="shiftType"
                  required={true}
                  placeHolder="Shift Type"
                  options={[
                    { value: "MORNING", label: "Morning" },
                    { value: "AFTERNOON", label: "Afternoon" },
                    { value: "LONGDAY", label: "Long Day" },
                    { value: "NIGHT", label: "Night" },
                  ]}
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields">
                <TimePickerWrapper
                  label="Start Time"
                  name="startTime"
                  format="HH:mm"
                  required={true}
                  placeHolder="hh:mm:ss"
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields">
                <TimePickerWrapper
                  label="End Time"
                  name="endTime"
                  required={true}
                  placfeHolder="hh:mm:ss"
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields">
                <SelectWrapper
                  label="Department"
                  name="department"
                  required={true}
                  placeHolder="Departments"
                  options={departmentListOptions}
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields">
                <InputWrapper
                  name="staffRequired"
                  type="number"
                  placeHolder="Staff Required"
                  label="Number of Staff Requied"
                  required={true}
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields">
                <InputWrapper
                  name="requestedBy"
                  type="text"
                  placeHolder="Requested by"
                  label="Shift requested by"
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields ">
                <Form.Item
                  label={"Optional Information, if any."}
                  name="optionalInfo"
                  rules={[{ message: "Required Field", required: false }]}
                >
                  <TextArea rows={4} placeholder="Type here" maxLength={6} />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields">
                <SwitchWrapper
                  name="markUnPub"
                  label="Keep in Unpublished Shifts"
                  required={false}
                  checked={switchValue}
                  onChange={(checked: any) => setSwitchValue(checked)}
                />
              </Col>
            </Row>
            <p style={{ color: "#ff4d4f" }} className="fw-16 fw-400">
              {errorMsg && errorMsg}
            </p>
            <div className="post-shift-modal d-flex align-center">
              <button
                type="button"
                className="cancel-btn cursor-pointer fs-16 line-height-22 white-color fw-600"
                onClick={() => {
                  setIsPostShiftModalOpen(false);
                  form.resetFields();
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="save-btn cursor-pointer fs-16 line-height-22 white-color fw-600"
              >
                Save and Post Shifts
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default PostShiftModal;
