import { useState } from "react";
import { Button, Col, Form, Input, Row, Select, Switch, message } from "antd";
import Upload from "../../../../assets/BookingCalander/images/upload-icon.png";
import SelectWrapper from "../../../../shared/SelectWrapper/SelectWrapper";
import InputWrapper from "../../../../shared/InputWrapper/InputWrapper";
import DatePickerWrapper from "../../../../shared/DatePickerWrapper/DatePickerWrapper";
import { useAddNewShiftMutation, useDirectBookStaffMutation, useGetClientsListQuery, useGetDepartmentsListQuery, useGetStaffListQuery, useGetUserTypesListQuery } from "../../../../store/Slices/BookingCalendar";
import TimePickerWrapper from "../../../../shared/TimePickerWrapper/TimePickerWrapper";
import DownArrowIcon from "../../../../assets/icons/ShiftManger/down-arrow-icon.png";
import FilterIcon from "../../../../assets/images/manageShift/filterIcon.png";
import dayjs from "dayjs";
import "./AddModal.scss";
import AdvanceStaffSearch from "../../../ShiftManager/ShiftBooking/ShiftsModals/AdvanceStaffSearch/AdvanceStaffSearch";
import { useForm } from "antd/es/form/Form";
import AppSnackbar from "../../../../utils/AppSnackbar";

const BookShift = (props: any) => {
  const [clientId, setClientId] = useState("");
  const [errorMsg, setErrorMsg] = useState<any>();
  const [directBookErrorMsg, setdirectBookErrorMsg] = useState<any>();
  const [staffValidation, setStaffValidation] = useState<any>({ message: "", status: false });
  const [selectedStaffList, setSelectedStaffList] = useState<any>();
  const [isAdvanceSearchModalOpen, setIsAdvanceSearchModalOpen] = useState<boolean>(false);
  const { data: clientsList } = useGetClientsListQuery({});
  const { data: userTypesList } = useGetUserTypesListQuery({});
  const { data: userDepartmentsList } = useGetDepartmentsListQuery({ id: clientId });
  const { data: staffList } = useGetStaffListQuery({});
  const [addNewShift, { isLoading: bookShiftLoading }] = useAddNewShiftMutation();
  const [directBookStaff, { isLoading: directBookLoading }] = useDirectBookStaffMutation();

  const staffNames: any = selectedStaffList && selectedStaffList?.map((staff: any) => `${staff?.firstName} ${staff?.lastName}`)
  const staffIds: any = selectedStaffList && selectedStaffList?.map((staff: any) => staff?._id)

  const onFinish = async (values: any) => {
    values.shiftDate = dayjs(values.shiftDate).format("YYYY-MM-DD");
    values.startTime = `${values.shiftDate}T${dayjs(values.startTime).format("HH:mm:ss")}`;
    values.endTime = `${values.shiftDate}T${dayjs(values.endTime).format("HH:mm:ss")}`;
    values.staffId = staffIds?.toString();
    values.staffRequired = props.name === "bookShift" ? Number(values.staffRequired) : selectedStaffList?.length;

    if (props.name === "bookShift") {
      const { error }: any = await addNewShift(values);
      console.log(error,"erorrr")
      if (!error) {
        props.setIsAddModalOpen(false); AppSnackbar({ type: "success", message: "Shift Added Successfully" })
      } else setErrorMsg(error?.data?.message)
    }
    if (props.name === "directBook") {
      const { error }: any = await directBookStaff(values);
      if (!error) {
        console.log(error,"erorrr")
        props.setIsAddModalOpen(false); AppSnackbar({ type: "success", message: "Staff Booked Successfully" })
      } else setdirectBookErrorMsg(error?.data?.message)
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    setStaffValidation({ status: true, message: "Required Field" })
  };

  function generateOptions(data: any[], labelFunction: (item: any) => string) {
    return data?.map((item: any) => {
      return {
        value: item["_id"],
        label: labelFunction(item),
      };
    });
  }



  return (
    <>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical" className="bookShift">
        <Row gutter={[30, 20]}>
          <Col xs={24} md={12}>
            <SelectWrapper
              label="Client Name"
              required={true}
              placeHolder="Select Client Name"
              options={generateOptions(clientsList?.data?.result, (item: any) => item.clientName)}
              name="careHomeId"
              onChange={(id: string) => setClientId(id)}
            />
          </Col>
          <Col xs={24} md={12}>
            <DatePickerWrapper disabledDate={(current: any) => current.isBefore(dayjs().subtract(1, "day"))} label="When do you need? Shift Date" placeholder="Choose Date" name="shiftDate" required />
          </Col>
          <Col xs={24} md={12}>
            <SelectWrapper
              label="Choose user type"
              required={true}
              placeHolder="Choose user type"
              options={generateOptions(userTypesList?.data?.result, (item: any) => `${item?.name} (${item?.shortForm})`)}
              name="carerType"
            />
          </Col>
          <Col xs={24} md={12}>
            <SelectWrapper
              label="Choose a shift"
              required={true}
              placeHolder="Choose a shift"
              options={[
                { value: "MORNING", label: "Morning" },
                { value: "AFTERNOON", label: "Afternoon" },
                { value: "LONGDAY", label: "Long Day" },
                { value: "NIGHT", label: "Night" },
              ]}
              name="shiftType"
            />
          </Col>
          <Col xs={24} md={12}>
            <TimePickerWrapper label="Start Time" name="startTime" required={true} placeHolder="hh:mm:ss" />
          </Col>
          <Col xs={24} md={12}>
            <TimePickerWrapper label="End Time" name="endTime" required={true} placeHolder="hh:mm:ss" />
          </Col>
          <Col xs={24} md={12}>
            <SelectWrapper label="Department" required={true} placeHolder="Select Shift Department" options={generateOptions(userDepartmentsList?.data, (item: any) => item.name)} name="department" />
          </Col>
          {props.name === "bookShift" && (
            <Col xs={24} md={12}>
              <InputWrapper label="No of Staff Required" required={true} type="number" name="staffRequired" placeHolder="Enter number" />
            </Col>
          )}
          {props.name === "directBook" && (
            <Col xs={24} md={12}>
              <Form.Item label="Select a staff name" name="staffId">
                <div className="staff-wrapper" style={{ border: (staffValidation.status === true && (staffIds?.length === 0 || staffIds === undefined)) ? "1.5px solid red" : "1.5px solid #a0a3bd" }}>
                  <Select
                    bordered={false}
                    suffixIcon={<img src={DownArrowIcon} alt="down-arrow" />}
                    placeholder="Select a staff name"
                    disabled
                    value={staffNames?.toString()}
                    style={{ width: '90%', textTransform: 'capitalize' }}
                  />
                  <span className="filter-icon" onClick={() => setIsAdvanceSearchModalOpen(true)} style={{ width: '10%' }}>
                    <img
                      src={FilterIcon}
                      alt="filter"
                    />
                  </span>
                </div>
              </Form.Item>
              {(staffValidation.status === true && (staffIds?.length === 0 || staffIds === undefined)) && <div style={{ display: "flex" }}><div style={{ color: "red" }}>Required Field</div></div>}
            </Col>
          )}
          <Col xs={24} md={12}>
            <InputWrapper label="Shift requested by" required={true} name="requestedBy" placeHolder="Type here" />
          </Col>
          {props.name === "directBook" && (
            <Col xs={24} md={12}>
              <div className="switch-wrapper d-flex align-items-center">
                <Form.Item name="confirmationReq" valuePropName="checked">
                  <Switch />
                </Form.Item>
                <span style={{ fontWeight: 600 }}>Staff acceptance required [Optional]</span>
              </div>
            </Col>
          )}
          <Col xs={24} md={24}>
            <Form.Item name="optionalInfo" label={<span className="label">Optional Information, if any.</span>}>
              <Input.TextArea rows={3} placeholder="Type here" style={{ border: "1.5px solid #A0A3BD", borderRadius: "3px" }} />
            </Form.Item>
          </Col>
          {props.name === "directBook" && (
            <Col xs={24} md={24}>
              <span></span>
              <Form.Item>
                <Input
                  className="custom-file-input cursor-pointer"
                  style={{ border: "1.5px solid #A0A3BD", borderRadius: "3px" }}
                  size="large"
                  type="file"
                  suffix={<img src={Upload} alt="upload-icon" width={16} height={18} className="cursor-pointer" />}
                />
              </Form.Item>
            </Col>
          )}
          {errorMsg && <span style={{ color: "red" }}>{errorMsg}</span>}
          {directBookErrorMsg && <span style={{ color: "red" }}>{directBookErrorMsg}</span>}
          <Col xs={24} md={24} className="btn-wrapper d-flex">
            <Button type="primary" className="cancel-btn" onClick={() => props.setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button loading={bookShiftLoading || directBookLoading} type="primary" className="save-btn" htmlType="submit">
              {props.name === "directBook" ? "Direct Book Staff" : "Save and Post Shifts"}
            </Button>
          </Col>
        </Row>
      </Form>
      {isAdvanceSearchModalOpen && <AdvanceStaffSearch
        setSelectedStaffList={setSelectedStaffList}
        isAdvanceSearchModalOpen={isAdvanceSearchModalOpen}
        setIsAdvanceSearchModalOpen={setIsAdvanceSearchModalOpen}
      />}
    </>
  );
};

export default BookShift;
