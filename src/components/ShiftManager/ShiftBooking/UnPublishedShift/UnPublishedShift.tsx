import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown, Input, Space, Table } from "antd";

import ActionIcon from "../../../../assets/images/manageShift/action-icon.png";
import PublishedIcon from "../../../../assets/icons/ShiftManger/publish-icon.png";
import BookStaffIcon from "../../../../assets/icons/ShiftManger/book-staff-icon.png";
import CancelShiftIcon from "../../../../assets/icons/ShiftManger/cancel-shift-icon.png";
import SearchIcon from "../../../../assets/images/OnBoarding/Search.svg";
import PublishModal from "./Modals/PublishModal";
import DeleteModal from "../../../../shared/DeleteModal/DeleteModal";
import "./UnPublishedShift.scss";
import { useDeleteShiftMutation, useGetUnpublishedShiftsQuery, usePublishShiftMutation } from "../../../../store/Slices/ShiftManager";
import dayjs from "dayjs";
import { debouncedSearch } from "../../../../utils/utils";
import AppSnackbar from "../../../../utils/AppSnackbar";
import path from "path";
import BreadCrumb from "../../../../layout/BreadCrumb/BreadCrumb";

const UnPublishedShift = () => {
  const [isPublishModal, setIsPublishModal] = useState(false);
  const [selectedShift, setSelectedShift] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({limit:10,page:1});
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams()

  const columns = [
    {
      title: "Sr #",
      dataIndex: "no",
      key: "no",
      render: (_: any, text: any, index: number) => (
        <span className="fs-14 fw-400 m-0 line-height-22 title-color">
          {index < 10 ? `0${index + 1}` : index + 1}
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
      title: "Action",
      key: "action",
      render: (_: any, item: any) => (
        <div>
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
            overlayClassName="distraction-alerts-dropdown"
            className="actionDropDown "
          >
            <Space>
              <div onClick={() => setSelectedShift(item)} className="border-color cursor-pointer">
                <img src={ActionIcon} alt="" />
              </div>
            </Space>
          </Dropdown>
        </div>
      ),
    },
  ];

  const items = [
    {
      label: (
        <div
          className="d-flex align-center"
          style={{ gap: "18px", paddingBottom: "12px", paddingTop: "12px" }}
          onClick={() => setIsPublishModal(true)}
        >
          <img src={PublishedIcon} alt="AllocateStaff" />
          <span className="fs-14 fw-400 line-height-22 title-color">Publish</span>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          className="d-flex align-center"
          style={{ gap: "18px", paddingBottom: "12px" }}
          onClick={() => navigate("/unpublished-shift/book-staff")}
        >
          <img src={BookStaffIcon} alt="ViewProfile" />
          <span className="fs-14 fw-400 line-height-22 title-color">Book Staff </span>
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <div onClick={() => {
          setIsDeleteModal(true);
        }} className="d-flex align-center" style={{ gap: "18px", paddingBottom: "12px" }}>
          <img src={CancelShiftIcon} alt="ViewProfile" />
          <span className="fs-14 fw-400 line-height-22 title-color">Delete</span>
        </div>
      ),
      key: "3",
    },
  ];

  const debouncedResults: any = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchTerm);
  };

  //query parameters of search and filter
  const paramsObj: any = {};
  if (searchTerm) paramsObj["clientName"] = searchTerm;
  const query = "&" + new URLSearchParams(paramsObj).toString()

  //Get Unpublished Shifts
  const { data: unpublishShifts, isLoading: unpublishShiftsLoading }: any =
    useGetUnpublishedShiftsQuery({pagination,query});

  //Delete Shift
  const [deleteShift] = useDeleteShiftMutation();
  const [publishShift] = usePublishShiftMutation()

  const handleDeleteSubmit = async () => {
    const { data }: any = await deleteShift(selectedShift?._id);
    if (data) {
      setIsDeleteModal(false);
      AppSnackbar({ type: "success", message: data?.message });
    }
  };

  //Publish Shift
  const handlePublishShift = async () => {
    const payload = {shiftStatus: 'PUBLISHED'}
    const { data }: any = await publishShift({
      id: selectedShift?._id,
      payload
    })
    if (data) {
      setIsPublishModal(false);
      AppSnackbar({ type: "success", message: data?.message });
    }
  };

  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Unpublished Shifts",
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

  return (
    <>
    <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="manager-unpublished-shift-wrapper w-100">
        <div className="manager-unpublished-shift-table">
          <p className="fs-14 fw-400 m-0 bg-white">
            This Section captures and lists all the shift requests from your clients (shifts that
            are not yet posted to allocated staff) so you can decide to directly assign them to your
            preferred staff, or post to all allocated staff from this page
          </p>
          <div
            className="input-search-wrapper d-flex"
            style={{ justifyContent: "flex-end", marginBottom: "10px" }}
          >
            <Input
              className="w-100"
              placeholder="Search by client name"
              onChange={debouncedResults}
              prefix={
                <img src={SearchIcon} alt="search icon" className="icon" width={20} height={20} />
              }
              style={{ maxWidth: "350px" }}
            />
          </div>
          <Table
            columns={columns}
            loading={unpublishShiftsLoading}
            dataSource={unpublishShifts?.data?.shifts}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: unpublishShifts?.data?.total,
              onChange: (page, limit) => setPagination({ page, limit }),
            }}
            className="booking-table-content"
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
      <DeleteModal
        setDeleteModal={setIsDeleteModal}
        deleteModal={isDeleteModal}
        submitTitle="Delete"
        cancelTitle="Cancel"
        title="Do you want to delete this user"
        onSubmit={handleDeleteSubmit}
        onCancel={() => setIsDeleteModal(false)}
      />
      <PublishModal
        onSubmit={handlePublishShift}
        isPublishModal={isPublishModal}
        setIsPublishModal={setIsPublishModal}
      />
    </>
  );
};

export default UnPublishedShift;
