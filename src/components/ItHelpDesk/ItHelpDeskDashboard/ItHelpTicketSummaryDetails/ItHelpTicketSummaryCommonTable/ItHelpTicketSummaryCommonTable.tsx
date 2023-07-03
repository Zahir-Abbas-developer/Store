import { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { Checkbox, Dropdown, Select, Space, Table } from "antd";
import { DownloadOutlined, EllipsisOutlined } from "@ant-design/icons";
import { ROLES } from "../../../../../constants/Roles";
import {
  useDeleteHelpDeskRequestMutation,
  usePatchChangeStatusRequestMutation,
  usePatchReopenTicketRequestMutation,
  usePatchTicketUpdateRequestMutation,
} from "../../../../../store/Slices/ItHelpDesk";
import viewTicketIcon from "../../../../../assets/icons/ItHelpDesk/viewTicketDetail.svg";
import editTicketIcon from "../../../../../assets/images/OnBoarding/edit.svg";
import delteTicketIcon from "../../../../../assets/icons/ItHelpDesk/viewDeleteTicket.svg";
import reOpenTicketIcon from "../../../../../assets/images/itHelpDesk/reopenTicket.svg";
import tableAttachmentIcon from "../../../../../assets/images/itHelpDesk/tableAttachmentIcon.svg";
import commentIcon from "../../../../../assets/icons/ItHelpDesk/commentIcon.svg";
import threeDots from "../../../../../assets/icons/three-dots.svg";
import DeleteModal from "../../../../../shared/DeleteModal/DeleteModal";
import AddTicketModal from "../AddTicketCommonModal/AddTicketModal";
import ReopenModal from "../AddTicketCommonModal/ReopenModal";
import "./ItHelpTicketSummaryCommonTable.scss";

const ItHelpTicketSummaryCommonTable = ({ stepperValue, helpDeskDetailsData, isLoading, selectedTableRows, setSelectedTableRows }: any) => {
  const [page, setPage] = useState(1);
  const [modalType, setModalType] = useState("Add");
  const [addTicketModal, setAddTicketModal] = useState({ isToggle: false, data: {} });
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isReopenModal, setIsReopenModal] = useState(false);
  const [ticketDetail, setTicketDetail] = useState<any>({});

  const [patchTicketUpdateRequest] = usePatchTicketUpdateRequestMutation();

  const handleCheckboxChange = (e: any, record: any) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedTableRows([...selectedTableRows, record]);
    } else {
      setSelectedTableRows(selectedTableRows?.filter((row: any) => row?.key !== record?.key));
    }
  };

  const navigate = useNavigate();
  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");

  const [deleteHelpDeskRequest] = useDeleteHelpDeskRequestMutation();
  const [patchChangeStatusRequest] = usePatchChangeStatusRequestMutation();
  const [patchReopenTicketRequest] = usePatchReopenTicketRequestMutation();

  const handleDeleteSubmit = () => {
    setIsDeleteModal(false);
    setTicketDetail({});
  };
  const handleCancelSubmit = () => {
    setIsDeleteModal(false);
    deleteHelpDeskRequest(ticketDetail?._id);
    setTicketDetail({});
  };
  const handleReopenSubmit = () => {
    setIsReopenModal(false);
    patchReopenTicketRequest(ticketDetail?._id);
    setTicketDetail({});
  };
  const handleCancelReopenSubmit = () => {
    setIsReopenModal(false);
    setTicketDetail({});
  };

  const handleChange = (value: string, rowId: string) => {
    const payload = {
      ticketId: rowId,
      status: value,
    };
    patchChangeStatusRequest({ payload });
  };

  const menuItems: any = [
    {
      label: (
        <div
          onClick={() => {
            setAddTicketModal({ isToggle: true, data: ticketDetail });
            setModalType("View Ticket");
          }}
        >
          <Space>
            <img src={viewTicketIcon} alt="View" className="d-flex align-center" width={24} height={24} />
            <span>View Ticket Details</span>
          </Space>
        </div>
      ),
      key: "1",
      status: role === ROLES.client || role === ROLES.carer ? ["pending", "resolved", "onhold"] : [],
    },
    {
      label: (
        <div
          onClick={() => {
            setAddTicketModal({ isToggle: true, data: ticketDetail });
            setModalType("Edit Ticket");
          }}
        >
          <Space>
            <img src={editTicketIcon} alt="Edit" className="d-flex align-center" width={24} height={24} />
            <span>Edit</span>
          </Space>
        </div>
      ),
      key: "2",
      status: role === ROLES.client || role === ROLES.carer ? ["pending"] : ["", "true", "pending"],
    },
    {
      label: (
        <div onClick={() => navigate(`/help/it-help-desk/support-dashbaord`, { state: ticketDetail })}>
          <Space>
            <img src={commentIcon} alt="commentIcon" className="d-flex align-center" width={24} height={24} />
            <span>View Comments</span>
          </Space>
        </div>
      ),
      key: "3",
      status: role === ROLES.client || role === ROLES.carer ? ["pending", "resolved", "onhold"] : [],
    },
    {
      label: (
        <div
          onClick={() => {
            setIsDeleteModal(true);
          }}
        >
          <Space>
            <img src={delteTicketIcon} alt="Delete" className="d-flex align-center" width={24} height={24} />
            <span>Delete</span>
          </Space>
        </div>
      ),
      key: "4",
      status: role === ROLES.client || role === ROLES.carer ? ["pending"] : ["", "true", "pending", "onhold"],
    },
    {
      label: (
        <div
          onClick={() => {
            setIsReopenModal(true);
          }}
        >
          <Space>
            <img src={reOpenTicketIcon} alt="Reopen" className="d-flex align-center" width={24} height={24} />
            <span>Reopen Ticket</span>
          </Space>
        </div>
      ),
      key: "5",
      status: ["resolved"],
    },
  ];

  const DropDownWrapper = (props: any) => {
    let { items } = props;
    return (
      <Dropdown menu={{ items }} trigger={["click"]}>
        <div className="equal--width-tb">
          <img src={threeDots} alt="menu" style={{ cursor: "pointer" }} />
        </div>
      </Dropdown>
    );
  };

  const getStatusColor: any = {
    resolved: "#52C41A",
    pending: "#FAAD14",
    onhold: "#FF4D4F",
    closed: "#65CDF0",
  };
  const columns: ColumnsType<any> = [
    {
      title: "Ticket #",
      dataIndex: "ticket",
      key: "ticket",
      width: "123px",
      align: "center",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      width: "170px",
      align: "center",
    },

    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: "130px",
      align: "center",
    },
  ];

  if (role === ROLES.superAdmin || role === ROLES.admin) {
    columns.splice(0, 0, {
      title: "Sr #",
      dataIndex: "srNo",
      key: "sr",
      width: "100px",
      align: "center",
      render: (_: any, item: any, index: number) => (page) * 5 + index - 4,
    });
    columns.splice(0, 0, {
      title: "",
      dataIndex: "",
      key: "checkbox",
      width: "100px",
      align: "center",
      render: (record) => <Checkbox onChange={(e: any) => handleCheckboxChange(e, record)} />,
    });

    columns.splice(3, 0, {
      title: "Ticket Description",
      dataIndex: "description",
      key: "description",
      width: "208px",
      align: "center",
    });
    columns.splice(4, 0, {
      title: "Ticket Status",
      dataIndex: "status",
      key: "status",
      width: "240px",
      align: "center",
      render: (_, item: any) => {
        return (
          <div className="equal--width-tb d-flex justify-center wrap--select">
            <Select
              defaultValue={item.status}
              style={{ width: 120 }}
              className="wrap-select-ticket-status"
              onChange={(value: string) => handleChange(value, item?._id)}
              options={[
                { value: "pending", label: "pending" },
                { value: "onhold", label: "onhold" },
                { value: "closed", label: "closed" },
                { value: "resolved", label: "resolved" },
              ]}
            />
          </div>
        );
      },
    });
    columns.splice(5, 0, {
      title: "Initiated By",
      dataIndex: "initiatedBy",
      key: "initiatedBy",
      width: "130px",
      align: "center",
      render: (_, item) => <p className="m-0">{item.initiatedBy ? item.initiatedBy : "-"}</p>,
    });
    columns.splice(6, 0, {
      title: "Initiated Date",
      width: "130px",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (_, item) => <p className="m-0">{dayjs(item.date).format("DD/MM/YYYY")}</p>,
    });
    columns.splice(7, 0, {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
      width: "130px",
      align: "center",
      render: (_, item) => <p className="m-0">{item.assignedTo ? item.assignedTo : "unassigned"}</p>,
    });
    columns.splice(8, 0, {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      width: "140px",
      align: "center",
      render: (_any, item: any) => (
        <div onClick={() => navigate(`/help/it-help-desk/support-dashbaord`, { state: item })} className="equal--width-tb d-flex justify-center">
          <div className="wrap-comment">
            <EllipsisOutlined />
          </div>
        </div>
      ),
    });
    columns.splice(9, 0, {
      title: "Attachment",
      dataIndex: "attachment",
      key: "attachment",
      width: "130px",
      align: "center",
      render: (_, item) => {  
        return <div className="d-flex align-center justify-center">
          <img src={tableAttachmentIcon} alt="tableAttachmentIcon" style={{ cursor: "pointer" }} />
          <a href={item?.attachment?.mediaId ? `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${item?.attachment?.mediaId}.${item?.attachment?.mediaMeta?.extension}` : ''}
            download >
            <DownloadOutlined className="table-download-icon" />
          </a>
        </div>
      },
    });
    {
      columns.splice(12, 0, {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: "130px",
        align: "center",
        render: (_, item) => (
          <div className="equal--width-tb d-flex justify-center" onClick={() => setTicketDetail(item)}>
            {item.status !== "closed" && item.status !== "onhold" && item.status !== "resolved" && (
              <DropDownWrapper items={menuItems.filter((ele: any) => ele.status.includes(stepperValue))} />
            )}
            {item.status === "resolved" && (
              <div>
                <div
                  onClick={() => {
                    setIsReopenModal(true);
                    setTicketDetail(item);
                  }}
                >
                  <Space>
                    <img src={reOpenTicketIcon} alt="Edit" className="d-flex align-center" width={24} height={24} style={{ cursor: "pointer" }} />
                  </Space>
                </div>
              </div>
            )}
          </div>
        ),
      });
    }
  }

  if (role === ROLES.instructor || role === ROLES.coordinator) {
    columns.splice(0, 0, {
      title: "Sr #",
      dataIndex: "srNo",
      key: "srNo",
      width: "100px",
      align: "center",
      render: (_: any, item: any, index: any) => (page - 1) * 10 + index,
    });
    columns.splice(3, 0, {
      title: "Ticket Description",
      dataIndex: "ticketDescription",
      key: "ticketDescription",
      width: "208px",
      align: "center",
    });
    columns.splice(4, 0, {
      title: "  Ticket Status ",
      dataIndex: "status",
      key: "status",
      width: "150px",
      align: "center",
      render: (_: any, item: any) => (
        <div
          className="equal--width-tb d-flex"
          style={{
            justifyContent: "space-around",
            color: getStatusColor[item?.status],
          }}
        >
          {item.status}
        </div>
      ),
    });
    columns.splice(5, 0, {
      title: "Initiated Date",
      width: "130px",
      dataIndex: "initiatedDate",
      key: "initiatedDate",
      align: "center",
    });

    columns.splice(6, 0, {
      title: "Comment",
      dataIndex: "comment",
      key: "comments",
      width: "140px",
      align: "center",
      render: () => (
        <div onClick={() => navigate(`/help/it-help-desk/support-dashbaord`)} className="equal--width-tb d-flex justify-center">
          <div className="wrap-comment">
            <EllipsisOutlined />
          </div>
        </div>
      ),
    });
    columns.splice(9, 0, {
      title: "Attachment",
      dataIndex: "attachment",
      key: "attachments",
      width: "130px",
      align: "center",
      render: (_,item) => (
        <div className="d-flex align-center justify-center">
          <img src={tableAttachmentIcon} alt="tableAttachmentIcon" style={{ cursor: "pointer" }} />
          <a href={item?.attachment?.mediaId ? `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${item?.attachment?.mediaId}.${item?.attachment?.mediaMeta?.extension}` : ''}
            download >
            <DownloadOutlined className="table-download-icon" />
          </a>
        </div>
      ),
    });
    {
      columns.splice(11, 0, {
        title: "Action",
        dataIndex: "action",
        key: "actions",
        width: "130px",
        align: "center",
        render: (_, item) => (
          <div className="equal--width-tb d-flex justify-center" onClick={() => setTicketDetail(item)}>
            {item.status !== "closed" && item.status !== "onhold" && item.status !== "resolved" && (
              <DropDownWrapper items={menuItems.filter((ele: any) => ele.status.includes(stepperValue))} />
            )}
            {item.status === "resolved" && (
              <div>
                <div
                  onClick={() => {
                    setIsReopenModal(true);
                  }}
                >
                  <Space>
                    <img src={reOpenTicketIcon} alt="Edit" className="d-flex align-center" width={24} height={24} style={{ cursor: "pointer" }} />
                  </Space>
                </div>
              </div>
            )}
          </div>
        ),
      });
    }
  }

  if (role === ROLES.client || role === ROLES.carer) {
    columns.splice(2, 0, {
      title: "Reported by",
      dataIndex: "reportedBy",
      key: "reportedBy",
      width: "130px",
      align: "center",
    });
    columns.splice(4, 0, {
      title: "Response Added",
      dataIndex: "responseAdded",
      key: "responseAdded",
      width: "130px",
      align: "center",
    });
    columns.splice(3, 0, {
      title: "Date ",
      dataIndex: "date",
      key: "date",
      width: "130px",
      align: "center",
      render: (_, item) => <p className="m-0">{dayjs(item.date).format("DD/MM/YYYY")}</p>,
    });
    columns.splice(6, 0, {
      title: "Status ",
      dataIndex: "status",
      key: "status",
      width: "150px",
      align: "center",
      render: (_, item) => (
        <div
          className="equal--width-tb "
          style={{
            color: getStatusColor[item.status],
          }}
        >
          {item.status}
        </div>
      ),
    });
    columns.splice(8, 0, {
      title: "Action ",
      dataIndex: "action",
      key: "action",
      width: "150px",
      align: "center",
      render: (_, item) => (
        <div className="equal--width-tb " onClick={() => setTicketDetail(item)}>
          {item.status !== "Closed" && <DropDownWrapper items={menuItems.filter((ele: any) => ele.status.includes(item.status))} />}
        </div>
      ),
    });
  } 

  return (
    <div className="wrap-common-table">
      <Table
        columns={columns}
        dataSource={helpDeskDetailsData?.data?.response?.result}
        loading={isLoading}
        size="middle"
        scroll={{ x: "max-content" }}
        pagination={{
          onChange(current) {
            setPage(current);
          },
          pageSize: 5,
        }}
      />
      {isDeleteModal && (
        <DeleteModal
          setDeleteModal={setIsDeleteModal}
          deleteModal={isDeleteModal}
          submitTitle="Cancel"
          cancelTitle="Yes, Delete"
          title="Are you sure you want to Delete this ?"
          onSubmit={handleDeleteSubmit}
          onCancel={handleCancelSubmit}
        />
      )}
      {isReopenModal && (
        <ReopenModal
          setIsReopenModal={setIsReopenModal}
          isReopenModal={isReopenModal}
          submitTitle="Yes"
          cancelTitle="No"
          title="Are you sure you want to re-open this Ticket?"
          onSubmit={handleReopenSubmit}
          onCancel={handleCancelReopenSubmit}
        />
      )}
      {addTicketModal.isToggle && (
        <AddTicketModal
          patchTicketUpdateRequest={patchTicketUpdateRequest}
          addTicketModal={addTicketModal}
          ticketId={ticketDetail?._id}
          setAddTicketModal={setAddTicketModal}
          type={modalType}
        />
      )}
    </div>
  );
};

export default ItHelpTicketSummaryCommonTable;
