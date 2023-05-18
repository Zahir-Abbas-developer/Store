import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Space, Table, Dropdown, MenuProps } from "antd";

import dots from "../../../assets/icons/dots.png";
import Publish from "../../../assets/icons/unpublishedShift/publish.png";
import BookStaff from "../../../assets/icons/unpublishedShift/online-booking.png";
import Delete from "../../../assets/icons/unpublishedShift/cancel.png";

import PublishModal from "../Modals/PublishModal";
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";
import {
  useDeleteShiftMutation,
  useGetUnpublishedShiftsQuery,
  usePublishShiftMutation,
} from "../../../store/Slices/ShiftManager";
import AppSnackbar from "../../../utils/AppSnackbar";

const UnpublishedTable = ({searchTerm}:any) => {
  const [isPublishModal, setIsPublishModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [pagination, setPagination] = useState({limit:10,page:1});
  const [selectedShift, setSelectedShift] = useState<any>({});

  const handleCancelSubmit = () => {
    setIsDeleteModal(false);
  };
  const navigate = useNavigate()

  const items: MenuProps["items"] = [
    {
      label: (
        <div
          className="dropdown-items"
          onClick={() => {
            setIsPublishModal(true);
          }}
        >
          <img src={Publish} alt="edit" width={18} height={18} /> <p className="title">Publish</p>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          className="dropdown-items"
          onClick={() => navigate('/unpublished-shift/book-staff',{state:{selectedShift}})}
        >
          <img src={BookStaff} alt="delete" width={16} height={18} />{" "}
          <p className="title">Book Staff</p>
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <div
          className="dropdown-items"
          onClick={() => {
            setIsDeleteModal(true);
          }}
        >
          <img src={Delete} alt="delete" width={16} height={18} /> <p className="title">cancel</p>
        </div>
      ),
      key: "3",
    },
  ];

  const columns: any = [
    {
      title: "Sr.No",
      dataIndex: "no",
      key: "no",
      render: (_: any, text: any, index: number) => (
        <span className="">{index < 10 ? `0${index + 1}` : index + 1}</span>
      ),
    },
    {
      title: "Job Date",
      dataIndex: "shiftDate",
      key: "shiftDate",
      render: (text: any) => <span>{dayjs(text).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      render: (_: any, text: any) => <span>{text?.careHome?.clientName}</span>,
    },
    {
      title: "Shift Name",
      dataIndex: "shiftType",
      key: "shiftType",
      render: (_: any, text: any) => <span>{text?.shiftType === "LONGDAY" ? "LONG DAY" : text?.shiftType}</span>,
    },
    {
      title: "Booked By",
      dataIndex: "bookedBy",
      key: "bookedBy",
      render: (_: any, text: any) => (
        <span>
          {text?.addedBy?.firstName} {text?.addedBy?.lastName}
        </span>
      ),
    },
    {
      title: "Staff Required",
      dataIndex: "staffRequired",
      key: "staffRequired",
    },
    {
      title: "Shift Booked At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any) => <span>{dayjs(text).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, item: any) => (
        <span className="fs-12 fw-400 line-height-18 title-color">
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
            overlayClassName="unpublished-dropdown"
            className="actionDropDown "
          >
            <Space>
              <div onClick={() => setSelectedShift(item)} className="border-color cursor-pointer">
                <img src={dots} alt="menu" />
              </div>
            </Space>
          </Dropdown>
        </span>
      ),
    },
  ];

  //query parameters of search and filter
  const paramsObj: any = {};
  if (searchTerm) paramsObj["clientName"] = searchTerm;
  const query = "&" + new URLSearchParams(paramsObj).toString()

  //Get Unpublished Shifts
  const { data: unpublishShifts, isLoading: unpublishShiftsLoading }: any =
    useGetUnpublishedShiftsQuery({pagination,query});

  //Delete Shift
  const [deleteShift] = useDeleteShiftMutation();
  const [publishShift] = usePublishShiftMutation();

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

  return (
    <>
      <Table
        loading={unpublishShiftsLoading}
        columns={columns}
        className="unpublished-table"
        scroll={{ x: "max-content" }}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          total: unpublishShifts?.data?.total,
          onChange: (page, limit) => setPagination({ page, limit }),
        }}
        dataSource={unpublishShifts?.data?.shifts}
      />
      <PublishModal
        onSubmit={handlePublishShift}
        setPublishModal={setIsPublishModal}
        publishModal={isPublishModal}
      />
      <DeleteModal
        setDeleteModal={setIsDeleteModal}
        deleteModal={isDeleteModal}
        submitTitle="Yes"
        cancelTitle="No"
        btnReverse="btn-reverse"
        title="Are you sure you want to cancel this shift?"
        onSubmit={handleDeleteSubmit}
        onCancel={handleCancelSubmit}
      />
    </>
  );
};

export default UnpublishedTable;
