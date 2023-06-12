import { useState } from "react";
import personIcon from "../../assets/icons/StaffAllocation/person.svg";
import markIcon from "../../assets/icons/StaffAllocation/mark.svg";
import underPerformIcon from "../../assets/icons/StaffAllocation/underperform.svg";
import bookIcon from "../../assets/icons/StaffAllocation/book.svg";
import { Dropdown, Row, Space } from "antd";
import SingleCard from "./SingleCard";
import "./StaffAllocation.scss";
import StaffAllocationFilters from "./StaffAllocationFilters/StaffAllocationFilters";
import StaffAllocationTable from "./StaffAllocationTable/StaffAllocationTable";
import { ColumnsType } from "antd/es/table";

import viewCareHome from "../../assets/icons/StaffAllocation/view-care.svg";
import allocateCarePerson from "../../assets/icons/StaffAllocation/allocate-care-p.svg";
import deleteCare from "../../assets/icons/StaffAllocation/delete-care.svg";

import threeDots from "../../assets/icons/three-dots.svg";
import AllocateCarerModal from "./staffAllocationModals/AllocateCarerModal";
import ViewCarerHomeModal from "./staffAllocationModals/ViewCarerHomeModal";
import DeleteModal from "../../shared/DeleteModal/DeleteModal";
import ViewProfile from "../OnBoarding/Carer/ViewProfile/ViewProfile";
import {
  useGetStaffListQuery,
  useGetCarerWidgetsDataQuery,
  useGetStaffAllocationListQuery,
  useDeleteStaffMutation,
  useGetAllClientQuery,
} from "../../store/Slices/StaffAllocation";
import dayjs from "dayjs";
import { useGetUserTypesListQuery } from "../../store/Slices/BookingCalendar";
import AppSnackbar from "../../utils/AppSnackbar";
import BreadCrumb from "../../layout/BreadCrumb/BreadCrumb";

const StaffAllocation = () => {
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [rowStatus, setRowStatus] = useState("");
  const [pagination, setPagination] = useState({ limit: 5, page: 1 });
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");

  //Filter States
  const [filterValues, setFilterValues] = useState({
    careHome: "",
    allocationStatus: "",
    userType: "",
  });

  const [isAllocateCarerModal, setIsAllocateCarerModal] = useState(false);
  const [isViewCarerHomeModal, setIsViewCarerHomeModal] = useState(false);

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isProfileModal, setIsProfileModal] = useState(false);

  const handleCancelSubmit = () => {
    setIsDeleteModal(false);
  };

  //Get Carer Widgets Data
  const { data: widgetsData }: any = useGetCarerWidgetsDataQuery({});

  //Get all care Homes
  const { data: careHomes }: any = useGetStaffListQuery({});
  const defaultCareHome = careHomes?.data?.result[0]?._id;
  const defaultId = filterValues.careHome ? filterValues.careHome : defaultCareHome;

  //query parameters of search and filter
  const paramsObj: any = {};
  if (searchTerm) paramsObj["search"] = searchTerm;
  if (filterValues?.allocationStatus && filterValues?.allocationStatus !== "All")
    paramsObj["allocationStatus"] = filterValues?.allocationStatus;
  if (filterValues?.userType) paramsObj["userType"] = filterValues?.userType;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  //Get Staff List
  const { data: staffList, isLoading: staffLoad }: any = useGetStaffAllocationListQuery({
    id: defaultId,
    query,
    pagination,
  });

  //Delete Staff
  const [deleteStaff] = useDeleteStaffMutation();

  const handleDeleteSubmit = async () => {
    const payload: any = {
      staffId: [selectedRecord?._id],
    };
    const { data }: any = await deleteStaff({ id: defaultId, payload });
    if (data) setIsDeleteModal(false);
    AppSnackbar({ type: "success", message: data?.message });
  };

  //Get user types list
  const { data: userTypes }: any = useGetUserTypesListQuery({});

  const careHomeOptions = careHomes?.data?.result?.map((item: any) => {
    return {
      value: item?._id,
      label: item?.clientName,
    };
  });

  const { data: nonAllocateCareHomes }: any = useGetAllClientQuery({
    id: selectedRecord?._id,
  });

  const clientListOptions = nonAllocateCareHomes?.data?.result?.map((client: any) => {
    return {
      value: client?._id,
      label: client?.clientName,
    };
  });

  const userTypeOptions = userTypes?.data?.result?.map((item: any) => {
    return {
      value: item?._id,
      label: item?.name,
    };
  });

  const cardData = [
    {
      icon: personIcon,
      count: widgetsData?.data?.assignedCareHomes,
      text: "Total Products",
      background: "rgba(113, 59, 219, 0.05)",
    },
    {
      icon: markIcon,
      count: widgetsData?.data?.noOfCarers,
      text: "Total Categories",
      background: "rgba(51, 214, 159, 0.07)",
    },
    {
      icon: underPerformIcon,
      count: widgetsData?.data?.allocatedCarers,
      text: "Total Orders",
      background: "rgba(255, 76, 97, 0.05)",
    },
    {
      icon: bookIcon,
      count: widgetsData?.data?.newCarers,
      text: "New Products",
      background: "rgba(76, 184, 255, 0.07",
    },
  ];

  const items: any = [
    {
      label: (
        <div
          onClick={() => setIsViewCarerHomeModal(true)}
          style={{ display: "flex", gap: "10px", height: "fit-content" }}
          className={`set-restricted-styles 
                ${rowStatus === "new" ? "class-restricted" : ""}`}
        >
          <Space>
            <img
              src={viewCareHome}
              alt="Edit"
              className="d-flex align-center"
              width={24}
              height={24}
            />
            <span>View Care Home</span>
          </Space>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          onClick={() => setIsAllocateCarerModal(true)}
          style={{ display: "flex", gap: "10px", height: "fit-content" }}
        >
          <Space>
            <img
              src={allocateCarePerson}
              alt="Delete"
              className="d-flex align-center"
              width={24}
              height={24}
            />
            <span>Allocate Carer</span>
          </Space>
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <div
          style={{ display: "flex", gap: "10px", height: "fit-content" }}
          className={`set-restricted-styles 
                ${rowStatus === "non-allocated" || rowStatus === "new" ? "class-restricted" : ""}`}
          onClick={() => setIsDeleteModal(true)}
        >
          <Space>
            <img
              src={deleteCare}
              alt="Delete"
              className="d-flex align-center"
              width={24}
              height={24}
            />
            <span>Remove Carer</span>
          </Space>
        </div>
      ),
      key: "3",
    },
  ];

  const StaffAllocationTableHeader: ColumnsType<any> = [
    {
      title: "Sr #",
      dataIndex: "no",
      key: "no",
      render: (_: any, record: any, index: number) => (
        <span className="fs-14 fw-400 m-0 text-left line-height-22 title-color">
          {index < 10 ? `0${index + 1}` : index + 1}
        </span>
      ),
    },
    {
      title: "Carer Name",
      dataIndex: "careerName",
      key: "careerName",
      render: (carerName: any) => (
        <span
          className="fs-14 fw-400 m-0 text-left line-height-22 title-color"
          onClick={() => setIsProfileModal(true)}
          style={{ color: "#1890FF" }}
        >
          {carerName}
        </span>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender: any) => (
        <span className="fs-14 fw-400 m-0 text-left line-height-22 title-color">{gender}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: any) => (
        <span
          style={{ textTransform: "capitalize" }}
          className="fs-14 fw-400 m-0 text-left line-height-22 title-color"
        >
          {status}
        </span>
      ),
    },
    {
      title: "User Type",
      dataIndex: "userTypeshortForm",
      key: "userTypeshortForm",
      render: (userType: string) => (
        <span className="fs-14 fw-400 m-0 text-left line-height-22 title-color">{userType}</span>
      ),
    },
    {
      title: "Date of joining",
      dataIndex: "dateOfJoining",
      key: "dateOfJoining",
      render: (dateOfJoining: any) => (
        <span className="fs-14 fw-400 m-0 text-left line-height-22 title-color">
          {dayjs(dateOfJoining).format("DD-MM-YYYY")}
        </span>
      ),
    },
    {
      title: "Allocation Status",
      dataIndex: "allocationStatus",
      key: "allocationStatus",
      render: (allocationStatus: any) => (
        <span
          style={{ textTransform: "capitalize" }}
          className="fs-14 m-0 line-height-22 title-color"
        >
          {allocationStatus}
        </span>
      ),
    },
    {
      title: <div className="equal--width-tb">Actions</div>,
      dataIndex: "actions",
      key: "actions",
      width: 150,
      render: (_, text) => (
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          trigger={["click"]}
          className="actionDropDown"
        >
          <div className="equal--width-tb cursor-pointer d-flex align-items-center align-center">
            <img
              src={threeDots}
              alt="menu"
              onClick={() => {
                setSelectedRecord(text);
                setRowStatus(text?.allocationStatus);
              }}
            />
          </div>
        </Dropdown>
      ),
    },
  ];

  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Home",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="staff-allocation-main-wrapper">
        <div className="wrapper-top-cards">
          <Row className="top-cards">
            {cardData?.map(({ icon, count, text, background }) => (
              <SingleCard icon={icon} count={count} text={text} background={background} />
            ))}
          </Row>
        </div>
        
       
      </div>
      
    </>
  );
};

export default StaffAllocation;
