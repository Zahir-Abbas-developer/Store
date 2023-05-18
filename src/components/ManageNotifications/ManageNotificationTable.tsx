import { Space, Dropdown, Select, Switch, Checkbox, Input, Spin } from "antd";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Dots from "../../assets/images/OnBoarding/dots.png";
import Edit from "../../assets/icons/edit-blue.svg";
import Delete from "../../assets/icons/delete-icon-outlined.svg";
import Arrow from "../../assets/images/OnBoarding/arrow.svg";
import { NotificationDetails, ICarerDetails } from "../../mock/ManageNoticationsMock";
import { useState } from "react";
import EditNotification from "./EditNotificationModal";
import DeleteModal from "../../shared/DeleteModal/DeleteModal";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import "./ManageNotification.scss";
import { useDeleteNotificationMutation, useEditNotificationMutation, useGetNoticationsListQuery } from "../../store/Slices/ManageNotification";
import { e } from "@fullcalendar/core/internal-common";
import InputWrapper from "../../shared/InputWrapper/InputWrapper";
import { setTimeout } from "timers";
import { LoadingOutlined } from "@ant-design/icons";

const ManageNotificationTable = ({ searchValue }: any) => {
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [checkboxId, setCheckboxId] = useState("");
  const [statusId, setStatusId] = useState("");
  const [singleNotificationData, setSingleNotificationData] = useState<any>();
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });


  const { data: notificationsList, isLoading } = useGetNoticationsListQuery({searchValue,pagination});
  const [deleteNotification] = useDeleteNotificationMutation({});
  const [editNotification, { isLoading: updateRequestLoading }] = useEditNotificationMutation({});

  const handleDelete = async () => {
    await deleteNotification(singleNotificationData?._id);
    setDeleteModal(false);
  };

  const handleNotificatioCheckbox = (e: any, record: any) => {
    setCheckboxId(record?._id);
    const payload = {
      notificationOnAction: e.target.checked,
    };
    editNotification({ id: record?._id, payload });
  };
  const handleNotificationNumberChange = (e: any, record: any) => {
    const payload = {
      advanceNotificationNo: +e.target.value,
    };
    editNotification({ id: record?._id, payload });
  };
  const handleFrequencyNumberChange = (e: any, record: any) => {
    const payload = {
      frequencyNo: +e.target.value,
    };
    editNotification({ id: record?._id, payload });
  };
  const handleAdvanceNotificationSelect = (e: any, record: any) => {
    const payload = {
      advanceNotification: e,
    };
    editNotification({ id: record?._id, payload });
  };
  const handleFrequencySelect = (e: any, record: any) => {
    const payload = {
      frequency: e,
    };
    editNotification({ id: record?._id, payload });
  };
  const handleStatusChange = (e: any, record: any) => {
    setStatusId(record?._id);
    const payload = {
      status: e,
    };
    editNotification({ id: record?._id, payload });
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 18 }} spin />;

  const items: any = [
    {
      label: (
        <div onClick={() => setIsShowEditModal(true)}>
          <Space>
            <img src={Edit} alt="Edit" className="d-flex align-center" width={14} height={16} />
            <span className="fs-14 fw-400 title-color">Edit</span>
          </Space>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <Space onClick={() => setDeleteModal(true)}>
          <img src={Delete} alt="Delete" className="d-flex align-center" width={14} height={16} />
          <span className="fs-14 fw-400 title-color">Delete</span>
        </Space>
      ),
      key: "2",
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: "Notification",
      dataIndex: "name",
      key: "notification",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action Type",
      dataIndex: "actionType",
      key: "actionType",
    },
    {
      title: "Selected User",
      dataIndex: "usersRole",
      key: "usersRole",
    },
    {
      title: "Aditional Mail",
      dataIndex: "additionMail",
      key: "additionMail",
    },
    {
      title: "Notify on Action",
      dataIndex: "notifyAction",
      key: "notifyAction",
      render: (_, record) => <>{(updateRequestLoading && record?._id === checkboxId) ? <Spin indicator={antIcon} /> : <Checkbox checked={record?.notificationOnAction} onChange={(e: any) => handleNotificatioCheckbox(e, record)} />}</>,
    },

    {
      title: "Advance Notification",
      dataIndex: "notification",
      key: "notification",
      render: (_, record) => (
        <Space>
          <Input disabled={record?.notificationOnAction} name="advanceNotificationNo" className="selection" defaultValue={record?.advanceNotificationNo} onChange={(e: any) => handleNotificationNumberChange(e, record)} />
          <Select
            defaultValue="Days(s)"
            className={`select-onboarding ${isChecked && "checked"}`}
            style={{ width: "140px" }}
            suffixIcon={<img src={Arrow} alt="arrowImg" />}
            value={record?.advanceNotification}
            disabled={record?.notificationOnAction}
            onChange={(e: any) => handleAdvanceNotificationSelect(e, record)}
            options={[
              { value: "days", label: "Day(s)" },
              { value: "hours", label: "Hour(s)" },
            ]}
          />
        </Space>
      ),
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      render: (_, record) => (
        <Space>
          <Input disabled={record?.notificationOnAction} name="frequencyNo" className="selection" defaultValue={record?.frequencyNo} onChange={(e: any) => handleFrequencyNumberChange(e, record)} />
          <Select
            defaultValue="Days(s)"
            className={`select-onboarding ${isChecked && "checked"}`}
            style={{ width: "140px" }}
            suffixIcon={<img src={Arrow} alt="arrowImg" />}
            value={record?.frequency}
            disabled={record?.notificationOnAction}
            onChange={(e: any) => handleFrequencySelect(e, record)}
            options={[
              { value: "days", label: "Day(s)" },
              { value: "hours", label: "Hour(s)" },
            ]}
          />
        </Space>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => <>{<Switch onChange={(e: any) => handleStatusChange(e, record)} checked={record?.status} loading={updateRequestLoading && record?._id === statusId} />}</>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]} rootClassName="actionDropDown">
          <div className="border-color cursor-pointer d-flex algin-center justify-center" onClick={() => setSingleNotificationData(record)}>
            <img src={Dots} alt="dotImg" />
          </div>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="main-notifications-wrapper">
      <div className="carer-main">
        <Table loading={isLoading} className="wrapper-table" columns={columns} dataSource={notificationsList?.data} scroll={{ x: "max-content" }} bordered={false} pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          total: notificationsList?.data?.length,
          onChange: (page, limit) => setPagination({ page, limit }),
        }} />
      </div>
      {isShowEditModal && <EditNotification isShowEditModal={isShowEditModal} setIsShowEditModal={setIsShowEditModal} setSingleNotificationData={setSingleNotificationData} notificationDetails={singleNotificationData} />}
      {deleteModal && <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} title="Are you sure you want to Delete" submitTitle="Delete" cancelTitle="Cancel" onCancel={() => setDeleteModal(false)} onSubmit={handleDelete} />}
    </div>
  );
};

export default ManageNotificationTable;
