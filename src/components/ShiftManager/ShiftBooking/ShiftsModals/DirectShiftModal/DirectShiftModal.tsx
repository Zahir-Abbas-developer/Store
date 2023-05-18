import { useState } from "react";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import SelectWrapper from "../../../../../shared/SelectWrapper/SelectWrapper";
import SwitchWrapper from "../../../../../shared/SwitchWrapper/SwitchWrapper";
import "./DirectShiftModal.scss";
import DatePickerWrapper from "../../../../../shared/DatePickerWrapper/DatePickerWrapper";
import InputWrapper from "../../../../../shared/InputWrapper/InputWrapper";
import DownArrowIcon from "../../../../../assets/icons/ShiftManger/down-arrow-icon.png";
import FilterIcon from "../../../../../assets/images/manageShift/filterIcon.png";
import AdvanceStaffSearch from "../AdvanceStaffSearch/AdvanceStaffSearch";
import CloseIcon from "../../../../../assets/icons/ShiftManger/close-icon.svg";
import TimePickerWrapper from "../../../../../shared/TimePickerWrapper/TimePickerWrapper";

const DirectShiftModal = (props: any) => {
  const { isDirectShiftModalOpen, setIsDirectShiftModalOpen, departments, errorMsg,postData } = props;
  const { userTypesList, onFinish, staffList, setStaffId, switchValue, setSwitchValue, } = props;

  const [isAdvanceSearchModalOpen, setIsAdvanceSearchModalOpen] = useState<boolean>(false);

  const departmentListOptions = departments?.data?.map((userTypeDetails: any) => {
    return { value: userTypeDetails?._id, label: userTypeDetails?.name };
  });

  const userTypesListOptions = userTypesList?.data?.result?.map((userTypeDetails: any) => {
    return {
      value: userTypeDetails?._id,
      label: `${userTypeDetails?.name} (${userTypeDetails?.shortForm})`,
    };
  });

  const [form] = Form.useForm();

  const careHomeSelect = [{ value: "option", label: "option" }];

  const handleFormSubmit = (values: any) => {
    onFinish(values);
    form.resetFields();
  };

  return (
    <>
      <Modal
        title={<span className='fw-500 fs-20 line-height-28 form-heading-color'>Direct Book Staff</span>}
        open={isDirectShiftModalOpen}
        onOk={() => setIsDirectShiftModalOpen(false)}
        onCancel={() => setIsDirectShiftModalOpen(false)}
        width="900px"
        className="direct-shift-modal-wrapper"
        centered
        footer={false}
        closeIcon={<img src={CloseIcon} alt="close" />}
      >
        <div className="direct-paragraph">
          <p className="fs-14 fw-400 m-0">
            This feature should be used only for booking a particular staff member for a shift
          </p>
        </div>
        <div className="direct-shift-inner">
          <Form layout="vertical" onFinish={handleFormSubmit} form={form}>
            <Row gutter={[30, 20]}>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <SelectWrapper
                  label="Care Home"
                  name="careHome"
                  required={false}
                  placeHolder="Select"
                  disabled={true}
                  options={careHomeSelect}
                  defaultValue={postData}
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
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <SelectWrapper
                  label="Choose user type"
                  name="carerType"
                  required={true}
                  placeHolder="User Type"
                  options={userTypesListOptions}
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <SelectWrapper
                  label="Choose a shift"
                  name="shiftType"
                  required={true}
                  placeHolder="Shift Type"
                  options={[
                    { value: "MORNING", label: "Morining" },
                    { value: "AFTERNOON", label: "Afternoon" },
                    { value: "LONGDAY", label: "Long Day" },
                    { value: "NIGHT", label: "Night" },
                  ]}
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <TimePickerWrapper
                  label="Start Time"
                  name="startTime"
                  required={true}
                  placeHolder="hh:mm:ss"
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <TimePickerWrapper
                  label="End Time"
                  name="endTime"
                  required={true}
                  placfeHolder="hh:mm:ss"
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <SelectWrapper
                  label="Department"
                  name="department"
                  required={true}
                  placeHolder="Departments"
                  options={departmentListOptions}
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <InputWrapper
                  name="requestedBy"
                  type="text"
                  placeHolder="Requested by"
                  label="Shift requested by"
                  required={true}
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item label="Select a staff name" name="staffId" rules={[{ message: "Required Field", required: true }]}>
                  <div className="staff-wrapper">
                    <Select
                      bordered={false}
                      suffixIcon={<img src={DownArrowIcon} alt="down-arrow" />}
                      placeholder="Select a staff name"
                      size="large"
                      onChange={(value) => {
                        setStaffId(value);
                      }}
                      options={staffList}
                    />
                    <span className="filter-icon">
                      <img
                        src={FilterIcon}
                        alt="filter"
                        onClick={() => {
                          setIsAdvanceSearchModalOpen(true);
                        }}
                      />
                    </span>
                  </div>
                </Form.Item>
                {/* <SelectWrapper label="Select a staff name " name="staffName" required={true} placeHolder="Select" options={careHomeSelect} onChange={(e: any) => handleDirectShift(e, "staffName")} /> */}
              </Col>
              {/* <Col xl={12} lg={12} md={12} sm={24} xs={24} className="post-shift-fields ">
                <Form.Item label={"Optional Information, if any."} name={["information"]} rules={[{ message: "Required Field", required: false }]}>
                  <TextArea rows={4} placeholder="Type here" maxLength={6} />
                </Form.Item>
              </Col> */}
              <Col xl={24} lg={24} md={12} sm={24} xs={24}>
                <SwitchWrapper
                  name="confirmationReq"
                  label="Staff acceptance required (Optional)"
                  checked={switchValue}
                  onChange={(checked: any) => setSwitchValue(checked)}
                />
              </Col>
            </Row>
            <p style={{ color: "#ff4d4f" }} className="fw-16 fw-400">
              {errorMsg && errorMsg}
            </p>
            <div className="direct-shift-btn d-flex align-center">
              <button
                type="button"
                className="close-btn cursor-pointer fs-16 line-height-22 white-color fw-600"
                onClick={() => setIsDirectShiftModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="book-btn cursor-pointer fs-16 line-height-22 white-color fw-600"
              >
                Book Staff
              </button>
            </div>
          </Form>
        </div>
      </Modal>
      <AdvanceStaffSearch
        isAdvanceSearchModalOpen={isAdvanceSearchModalOpen}
        setIsAdvanceSearchModalOpen={setIsAdvanceSearchModalOpen}
      />
    </>
  );
};

export default DirectShiftModal;
