import dayjs from "dayjs";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Button, Form, Input, Table } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { ShiftBookingBtn } from "../../../mock/ShiftManageData";
import DirectShiftModal from "./ShiftsModals/DirectShiftModal/DirectShiftModal";
import PostShift from "./ShiftsModals/PostShiftModal/PostShiftModal";
import ActionIcon from "../../../assets/icons/ShiftManger/action-icon.svg";
import AllocateStaffIcon from "../../../assets/icons/ShiftManger/allocate-staff-icon.png";
import ModifyStaffIcon from "../../../assets/images/manageShift/modifyIcon.png";
import PostShiftIcon from "../../../assets/images/manageShift/postShift.png";
import CancelShiftIcon from "../../../assets/icons/ShiftManger/cancel-shift-icon.png";
import CancelShiftModal from "./ShiftsModals/CancelShiftModal/CancelShiftModal";
import ModifyStaffRequirement from "./ShiftsModals/ModifyStaffRequirement/ModifyStaffRequirement";
import AllocateShift from "./ShiftsModals/AllocateShift/AllocateShift";
import ShiftManageFilters from "./ShiftManageFilters/ShiftManageFilters";
import SearchIcon from "../../../assets/images/OnBoarding/Search.svg";
import DropdownNew from "./DropDown/DropDown";
import Publish from "../../../assets/icons/unpublishedShift/publish.png";
import {
  useAddNewShiftMutation,
  useCancelShiftMutation,
  useDirectBookStaffMutation,
  useGetShiftsQuery,
  useGetStaffListQuery,
  useGetUserTypesListQuery,
  usePublishShiftMutation,
} from "../../../store/Slices/ShiftManager";
import {
  useModifyShiftStaffMutation,
  useGetDepartmentsQuery,
} from "../../../store/Slices/ShiftManager";
import "./ShiftBooking.scss";
import AppSnackbar from "../../../utils/AppSnackbar";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";
import PublishModal from "./UnPublishedShift/Modals/PublishModal";

const ShiftBooking = () => {
  const [count, setCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [switchValue, setSwitchValue] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isDirectModalOpen, setIsDirectModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [shiftStatus, setShiftStatus] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [shiftId, setShiftId] = useState<string>("");
  const [staffId, setStaffId] = useState<string>("");
  const [postData, setPostData] = useState<any>();
  const [isPublishModal, setIsPublishModal] = useState(false);
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const columns: ColumnsType<any> = [
    {
      title: "Sr #",
      dataIndex: "",
      key: "",
      render: (_: any, data: any, index: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {index < 10 ? `0${index + 1}` : index + 1}
        </span>
      ),
    },
    {
      title: "Shift Date",
      dataIndex: "shiftDate",
      key: "shiftDate",
      render: (text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {dayjs(text).format("ddd, MMMM DD YYYY")}
        </span>
      ),
    },
    {
      title: "Shift Type",
      dataIndex: "shiftType",
      key: "shiftType",
      render: (text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">{text}</span>
      ),
    },
    {
      title: "Staff Type",
      dataIndex: "carerType",
      key: "carerType",
      render: (text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">{text.shortForm}</span>
      ),
    },
    {
      title: "Requested By",
      dataIndex: "addedBy",
      key: "addedBy",
      render: (text: any) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">{`${text.firstName} ${text.lastName}`}</span>
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
      title: "Shift Status",
      dataIndex: "shiftStatus",
      key: "shiftStatus",
      render: (text: any) => (
        <span
          className="fs-14 fw-700 m-0 line-height-22 title-color text-capitalize"
          style={{
            color:
              text === "PUBLISHED"
                ? "#F7B923"
                : text === "Partially Booked"
                  ? "#65CDF0"
                  : text === "BOOKED" || text === "COMPLETED"
                    ? "#52C41A"
                    : text === "UNPUBLISHED"
                      ? "rgb(255 92 0)"
                      : "",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (_: any, data: any) => (
        <DropdownNew
          items={[
            {
              label: (
                <div className="d-flex flex-column" style={{ gap: "15px", padding: "8px 8px" }}>
                  {(data.shiftStatus === "PUBLISHED" || data.shiftStatus === "PARTIALLY") && (
                    <div
                      className="d-flex align-center"
                      style={{ gap: "18px" }}
                      onClick={() => setIsAllocateModalOpen(true)}
                    >
                      <img src={AllocateStaffIcon} alt="CancelShift" />
                      <span className="fs-14 fw-400 line-height-22 title-color">
                        Allocate Staff
                      </span>
                    </div>
                  )}
                  {data.shiftStatus === "PARTIALLY" && (
                    <div
                      className="d-flex align-center"
                      style={{ gap: "18px" }}
                      onClick={() => setIsAllocateModalOpen(true)}
                    >
                      <img src={AllocateStaffIcon} alt="AllocateStaff" />
                      <span className="fs-14 fw-400 line-height-22 title-color">
                        Reallocate Staff
                      </span>
                    </div>
                  )}
                    {(data.shiftStatus !== "COMPLETED" && data.shiftStatus !== "CANCELED") && ( 

                        <div
                    className="d-flex align-center"
                    style={{ gap: "18px" }}
                    onClick={() => {
                      setIsModifyModalOpen(true);
                      setShiftId(data?._id);
                    }}
                  >
                    <img src={ModifyStaffIcon} alt="ModifyStaff" />
                    <span className="fs-14 fw-400 line-height-22 title-color">
                      Modify staff requirement
                    </span>
                  </div>
                 )}
                  {(data.shiftStatus === "UNPUBLISHED" || data.shiftStatus === "CANCELED") && (

        <div
         className="d-flex align-center"
         style={{ gap: "18px" }}
          onClick={() => {
            setIsPublishModal(true);
          }}
        >
          <img src={Publish} alt="Publish Shift" />
          <span className="fs-14 fw-400 line-height-22 title-color">Publish Shift</span>

        </div>
    
        )}

                  {(data.shiftStatus === "UNPUBLISHED" || data.shiftStatus === "CANCELED") && (
                    <div
                      className="d-flex align-center"
                      style={{ gap: "18px" }}
                      onClick={() => {
                        setIsPostModalOpen(true);
                      }}
                    >
                      <img src={PostShiftIcon} alt="PostShift" />
                      <span className="fs-14 fw-400 line-height-22 title-color">Post Shift</span>
                    </div>
                  )}
                  {data.shiftStatus !== "CANCELED" && (
                    <div
                      className="d-flex align-center"
                      style={{ gap: "18px" }}
                      onClick={() => {
                        setIsCancelModalOpen(true);
                        setShiftId(data?._id);
                      }}
                    >
                      <img src={CancelShiftIcon} alt="CancelShift" />
                      <span className="fs-14 fw-400 line-height-22 title-color">Cancel Shift</span>
                    </div>
                  )}
                </div>
              ),
              key: "key",
            },
          ]}
        >
          <img
            onClick={() => {
              setCount(data?.staffRequired);
              setPostData(data);
            }}
            src={ActionIcon}
            alt="icon"
            className="cursor-pointer"
          />
        </DropdownNew>
      ),
    },
  ];

  const handleBookingBtn = (item: any) => {
    if (item.id === "1") {
      setIsPostModalOpen(true);
    } else if (item.id === "2") {
      setIsDirectModalOpen(true);
    } else if (item.id === "3") {
      navigate(`/shift-manager/${id}/confirmed-shift`, {
        state: { careHome: state?.careHome },
      });
    } else if (item.id === "4") {
      navigate(`/shift-manager/${id}/unfilled-shift`, {
        state: { careHome: state?.careHome },
      });
    } else if (item.id === "5") {
      navigate(`/shift-manager/${id}/unpublished-shift`);
    }
  };

  //query parameters of search and filter
  const paramsObj: any = {};
  if (searchTerm) paramsObj["search"] = searchTerm;
  if (shiftStatus && shiftStatus !== "All") paramsObj["shiftStatus"] = shiftStatus;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  //get all shifts
  const { data: shifts, isLoading: shiftLoading }: any = useGetShiftsQuery({
    careHomeId: id,
    query,
    pagination,
  });

  const [publishShift] = usePublishShiftMutation();

  //Post New Shift
  const [addNewShift] = useAddNewShiftMutation();
  const [directBook] = useDirectBookStaffMutation();

  //get Departments and users
  const { data: departments }: any = useGetDepartmentsQuery({ id });
  const { data: userTypesList }: any = useGetUserTypesListQuery({});
  const { data: staffList }: any = useGetStaffListQuery({});

  //Cancel and Modify shift
  const [cancelShift] = useCancelShiftMutation();
  const [modifyShift, { isLoading: loading }] = useModifyShiftStaffMutation();


const postShiftApiCall = async (values: any) => {

  try {

    const {error}: any = await addNewShift(values)

    if (error) {
      AppSnackbar({ type: "error", messageHeading: "Error!", message: error.data.message });
      return;
    }
  }
  catch (error) {
    AppSnackbar({ type: "error", messageHeading: "Error!", message: "Error occured" });
    return
  }
  setIsPostModalOpen(false);  
  AppSnackbar({ type: "success", messageHeading: "Success!", message: "Shift Added Successfully" });
  form.resetFields()
  
}

  const postShift = (values: any) => {
    values.careHomeId = id;
    values.markUnPub = switchValue;
    values.staffRequired = +values.staffRequired;
    values.shiftDate = dayjs(values.shiftDate).toISOString();
    values.startTime = dayjs(values.startTime).toISOString();
    values.endTime = dayjs(values.endTime).toISOString();
    postShiftApiCall(values)
  };

  const bookstaff = async (values: any) => {
    values.careHomeId = id;
    values.staffId = staffId;
    values.shiftDate = dayjs(values.shiftDate).toISOString();
    values.startTime = dayjs(values.startTime).toISOString();
    values.endTime = dayjs(values.endTime).toISOString();
    values.confirmationReq = switchValue;

    const payload = { ...values, staffRequired: 1 };
    const { data, error }: any = await directBook(payload);
    if (data) {
      setIsDirectModalOpen(false);
      AppSnackbar({ type: "success", message: data?.message });
    }
    if (error) setErrorMsg(error?.data?.error?.message);
    setTimeout(() => {
      setErrorMsg("");
    }, 5000);
  };

  //Cancel Shift function
  const handleCancelShift = async (reason: any) => {
    const payload = reason;
    const { data }: any = await cancelShift({
      id: shiftId,
      payload,
    });
    if (data) {
      setIsCancelModalOpen(false);
      AppSnackbar({ type: "success", message: data?.message });
    }
  };

  //Modify shift staff function
  const handleModifyShift = async () => {
    const payload: any = {
      staffRequired: count,
    };
    const { data }: any = await modifyShift({
      id: shiftId,
      payload,
    });
    if (data) {
      setIsModifyModalOpen(loading);
      AppSnackbar({ type: "success", message: data?.message });
    }
  };

  const userTypesListOptions = userTypesList?.data?.result?.map((userTypeDetails: any) => {
    return {
      value: userTypeDetails?._id,
      label: `${userTypeDetails?.name} (${userTypeDetails?.shortForm})`,
    };
  });

  const staffListOptions = staffList?.data?.result?.map((staffDetails: any) => {
    return {
      value: staffDetails?._id,
      label: `${staffDetails?.firstName} ${staffDetails?.lastName}`,
    };
  });

  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Shift Details",
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
  ];

  const handlePublishShift = async () => {
    const payload = {shiftStatus: 'PUBLISHED'}
    const { data }: any = await publishShift({
      id: postData?._id,
      payload
    })
    if (data) {
      setIsPublishModal(false);
      AppSnackbar({ type: "success", message: data?.message });
    }
  };
  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="shift-booking-wrapper">
        <div className="shift-booking-filters bg-white border-radius-10 w-100">
          <div className="shift-manager-filter">
            <ShiftManageFilters careHome={state?.careHome} setShiftStatus={setShiftStatus} />
          </div>
          <div className="booking-btn-wrapper d-flex align-center">
            {ShiftBookingBtn.map((item: any) => (
              <div className="booking-btn-content" key={item.id}>
                <Button
                  type="primary"
                  style={{ backgroundColor: item.color }}
                  onClick={() => handleBookingBtn(item)}
                >
                  {item.btnText}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="shift-booking-table">
          <div className="d-flex justify-end align-center">
            <div className="input-search-wrapper d-flex w-100" style={{ maxWidth: "350px" }}>
              <Input
                className="w-100"
                placeholder="Search"
                onChange={(e: any) => setSearchTerm(e.target.value)}
                prefix={
                  <img src={SearchIcon} alt="search icon" className="icon" width={20} height={20} />
                }
                style={{ maxWidth: "450px", marginBottom: "5px" }}
              />
            </div>
          </div>
          <Table
            columns={columns}
            loading={shiftLoading}
            dataSource={shifts?.data?.shifts}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: shifts?.data?.total,
              onChange: (page, limit) => setPagination({ page, limit }),
            }}
            className="booking-table-content"
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
      <PostShift
        errorMsg={errorMsg}
        userTypesList={userTypesListOptions}
        departments={departments}
        switchValue={switchValue}
        setSwitchValue={setSwitchValue}
        onFinish={postShift}
        form={form}
        postData={postData}
        careHome={state.careHome}
        isPostShiftModalOpen={isPostModalOpen}
        setIsPostShiftModalOpen={setIsPostModalOpen}
        setPostData={setPostData}
      />
      <DirectShiftModal
        errorMsg={errorMsg}
        setStaffId={setStaffId}
        departments={departments}
        switchValue={switchValue}
        setSwitchValue={setSwitchValue}
        staffList={staffListOptions}
        userTypesList={userTypesList}
        onFinish={bookstaff}
        isDirectShiftModalOpen={isDirectModalOpen}
        setIsDirectShiftModalOpen={setIsDirectModalOpen}
        postData={state?.careHome}
      />
      <ModifyStaffRequirement
        onSave={handleModifyShift}
        open={isModifyModalOpen}
        onCancel={() => setIsModifyModalOpen(false)}
        counter={count}
        setCounter={setCount}
      />
      <AllocateShift
        selectedRow={postData}
        open={isAllocateModalOpen}
        staffList={staffListOptions}
        onCancel={() => setIsAllocateModalOpen(false)}
      />
      <CancelShiftModal
        onFinish={handleCancelShift}
        placeholder={"Staff are not Avaliable"}
        label={"Specify reason for Cancelling Shift"}
        open={isCancelModalOpen}
        onCancel={() => setIsCancelModalOpen(false)}
      />
         <PublishModal
        onSubmit={handlePublishShift}
        isPublishModal={isPublishModal}
        setIsPublishModal={setIsPublishModal}
      />
    </>
  );
};

export default ShiftBooking;