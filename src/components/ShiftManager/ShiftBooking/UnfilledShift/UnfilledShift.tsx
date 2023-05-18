import dayjs from "dayjs";
import { useState } from "react";
import { DatePicker, Input, Pagination, Select, Table } from "antd";

import { UnfilledShiftBookingTableData } from "../../../../mock/ShiftManageData";
import ActionIcon from "../../../../assets/images/manageShift/action-icon.png";
import AllocateStaffIcon from "../../../../assets/icons/ShiftManger/allocate-staff-icon.png";
import ModifyStaffIcon from "../../../../assets/images/manageShift/modifyIcon.png";
import CancelShiftIcon from "../../../../assets/icons/ShiftManger/cancel-shift-icon.png";
import datePicker from "../../../../assets/BookingCalander/images/date-picker.png";
import DatePickerWrapper from "../../../../shared/DatePickerWrapper/DatePickerWrapper";
import CancelShiftModal from "../ShiftsModals/CancelShiftModal/CancelShiftModal";
import AllocateShift from "../ShiftsModals/AllocateShift/AllocateShift";
import ModifyStaffRequirement from "../ShiftsModals/ModifyStaffRequirement/ModifyStaffRequirement";
import SearchIcon from "../../../../assets/images/OnBoarding/Search.svg";
import {
  useCancelUnfilledShiftMutation,
  useGetUnfilledShiftsQuery,
  useModifyUnfilledShiftStaffMutation,
} from "../../../../store/Slices/ShiftManager";
import DropdownNew from "../DropDown/DropDown";
import "./UnfilledShift.scss";
import { useGetStaffListQuery } from "../../../../store/Slices/BookingCalendar";
import AppSnackbar from "../../../../utils/AppSnackbar";
import { debouncedSearch } from "../../../../utils/utils";
import { useLocation, useParams } from "react-router-dom";
import BreadCrumb from "../../../../layout/BreadCrumb/BreadCrumb";
import { useGetPreferenceQuery } from "../../../../store/Slices/ClientPreference";

const UnfilledShift = (props: any) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState<boolean>(false);
  const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateValue, setDateValue] = useState('')
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [count, setCount] = useState<any>(0);
  const [shiftId, setShiftId] = useState("");

  const { id } = useParams();
  const {state} = useLocation()

  const columns = [
    {
      title: "Sr #",
      dataIndex: "no",
      key: "no",
      render: (_: any, text: any, index: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>
      ),
    },
    {
      title: "Job Date",
      dataIndex: "shiftDate",
      key: "shiftDate",
      render: (text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {dayjs(text).format("DD-MM-YYYY")}
        </span>
      ),
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      render: (_: any, text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {text?.careHome?.clientName}
        </span>
      ),
    },
    {
      title: "Shift Name",
      dataIndex: "shiftType",
      key: "shiftType",
      render: (text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">{text}</span>
      ),
    },
    {
      title: "Booked By",
      dataIndex: "bookedBy",
      key: "bookedBy",
      render: (_: any, text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {text?.addedBy?.firstName} {text?.addedBy?.lastName}
        </span>
      ),
    },
    {
      title: "Staff Required",
      dataIndex: "staffRequired",
      key: "staffRequired",
      render: (text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">{text}</span>
      ),
    },
    {
      title: "Staff Booked",
      dataIndex: "bookedStaff",
      key: "bookedStaff",
      render: (text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">{text}</span>
      ),
    },
    {
      title: "Staff Booked At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {dayjs(text).format("DD-MM-YYYY")}
        </span>
      ),
    },
    {
      title: "Time Diff.",
      dataIndex: "timeDiff",
      key: "timeDiff",
      render: (text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">{text}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div>
          <DropdownNew
            items={[
              {
                label: (
                  <div
                    className="d-flex align-center"
                    style={{
                      gap: "18px",
                      paddingBottom: "12px",
                      paddingTop: "12px",
                    }}
                    onClick={() => {
                      setIsAllocateModalOpen(true);
                      setSelectedRow(record);
                    }}
                  >
                    <img src={AllocateStaffIcon} alt="AllocateStaff" />
                    <span className="fs-14 fw-400 line-height-22 title-color">
                      Reallocate Staff
                    </span>
                  </div>
                ),
                key: "1",
              },
              {
                label: (
                  <div
                    className="d-flex align-center"
                    style={{ gap: "18px", paddingBottom: "12px" }}
                    onClick={() => {
                      setIsModifyModalOpen(true);
                      setShiftId(record?._id);
                    }}
                  >
                    <img src={ModifyStaffIcon} alt="ViewProfile" />
                    <span className="fs-14 fw-400 line-height-22 title-color">
                      Modify staff requirement
                    </span>
                  </div>
                ),
                key: "2",
              },
              {
                label: (
                  <div
                    className="d-flex align-center"
                    style={{ gap: "18px", paddingBottom: "12px" }}
                    onClick={() => {
                      setIsCancelModalOpen(true);
                      setShiftId(record?._id);
                    }}
                  >
                    <img src={CancelShiftIcon} alt="ViewProfile" />
                    <span className="fs-14 fw-400 line-height-22 title-color">Cancel Shift</span>
                  </div>
                ),
                key: "3",
              },
            ]}
          >
            <img onClick={() => setCount(record?.staffRequired)} src={ActionIcon} alt="icon" className="cursor-pointer" />
          </DropdownNew>
        </div>
      ),
    },
  ];

  const debouncedResults: any = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchTerm);
  };

  //query parameters of search and filter
  const paramsObj: any = {};
  if (dateValue) paramsObj['shiftDate'] = dateValue
  if (searchTerm) paramsObj["clientName"] = searchTerm;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  //Get Unfilled Shifts
  const { data: unfilledShifts, isLoading: unfilledShiftsLoading }: any = useGetUnfilledShiftsQuery(
    { pagination, query }
  );

  //Get Staff List
  const { data: staffList }: any = useGetStaffListQuery({});

  //Get Prefrences
  const { data: preferences }: any = useGetPreferenceQuery({});

  //Modify and Cancel Shift
  const [cancelShift, { isLoading: cancelShiftLoading }] = useCancelUnfilledShiftMutation();
  const [modifyShift, { isLoading: modifyShiftLoading }] = useModifyUnfilledShiftStaffMutation();

  //Cancel Shift function
  const handleCancelShift = async (reason: any) => {
    const payload = reason;
    const { data }: any = await cancelShift({
      id: shiftId,
      payload,
    });
    if (data) setIsCancelModalOpen(false);
    if (data) {
      setIsCancelModalOpen(cancelShiftLoading);
      AppSnackbar({ type: "success", message: data?.message });
    }
  };

  //Modify shift staff function
  const handleModifyShift = async () => {
    const payload: any = {
      staffRequired: count,
    };
    const { data, error }: any = await modifyShift({
      id: shiftId,
      payload,
    });
    if (data || error) setIsModifyModalOpen(false);
    if (data) {
      setIsModifyModalOpen(modifyShiftLoading);
      AppSnackbar({ type: "success", message: data?.message });
    }
  };

  const staffListOptions = staffList?.data?.result?.map((staffDetails: any) => {
    return {
      value: staffDetails?._id,
      label: `${staffDetails?.firstName} ${staffDetails?.lastName}`,
    };
  });

  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Unfilled Shifts",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Manage Shift",
      path: "/shift-manager",
    },
    {
      title: "Shift Details",
      path: `/shift-manager/${id}`,
    },
  ];

  console.log(dateValue)

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="manager-unfilled-shift-wrapper w-100">
        <div className="manager-unfilled-shift-filters bg-white border-radius-10">
          <div className="wrapper-fliters">
            <div className="flex-filters">
              <div className="inner-flex-filters">
                <div className="col-box">
                  <div className="area-fliters">
                    <div className="filters-label fw-600 fs-14 title-color">Care Home</div>
                    <Select
                      style={{ width: "100%" }}
                      disabled
                      defaultValue={state?.careHome}
                      suffixIcon={null}
                    />
                  </div>
                </div>
                <div className="col-box">
                  <div className="area-fliters">
                    <div className="filters-label fw-600 fs-14 title-color">Shift Date</div>
                    <DatePicker
                      suffixIcon={<img src={datePicker} alt="calander" />}
                      className="staff-filters-select"
                      style={{ width: "100%", border: "none", borderRadius: "0px" }}
                      onChange={(value:any) => setDateValue(dayjs(value).format())}
                      placeholder="YYYY-MM-DD"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="manager-unfilled-shift-table">
          <div className="d-flex justify-end align-center">
            <div className="input-search-wrapper d-flex w-100" style={{ maxWidth: "350px" }}>
              <Input
                className="w-100"
                placeholder="Search by client name"
                onChange={debouncedResults}
                prefix={
                  <img src={SearchIcon} alt="search icon" className="icon" width={20} height={20} />
                }
                style={{ marginBottom: "5px" }}
              />
            </div>
          </div>
          <Table
            columns={columns}
            loading={unfilledShiftsLoading}
            dataSource={unfilledShifts?.data?.shifts}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: unfilledShifts?.data?.total,
              onChange: (page, limit) => setPagination({ page, limit }),
            }}
            className="booking-table-content"
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
      <AllocateShift
        preferences={preferences?.data?.result}
        selectedRow={selectedRow}
        staffList={staffListOptions}
        open={isAllocateModalOpen}
        onCancel={() => setIsAllocateModalOpen(false)}
      />
      <ModifyStaffRequirement
        onSave={handleModifyShift}
        open={isModifyModalOpen}
        onCancel={() => setIsModifyModalOpen(false)}
        counter={count}
        setCounter={setCount}
      />
      <CancelShiftModal
        onFinish={handleCancelShift}
        placeholder={"Staff are not Avaliable"}
        label={"Specify reason for Cancelling Shift"}
        open={isCancelModalOpen}
        onCancel={() => setIsCancelModalOpen(false)}
      />
    </>
  );
};

export default UnfilledShift;
