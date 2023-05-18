import { useState } from "react";
import { Avatar, Dropdown, Space, Table } from "antd";
import { staffBookingData } from "../../../mock/StaffBookingMockData";
import ActionImg from "../../../assets/images/staffManager/actionImg.png";
import { ColumnsType } from "antd/es/table";
import viewIcon from "../../../assets/icons/StaffBooking/View.svg";
import UpcomingShift from "../../../assets/icons/StaffBooking/Upcoming.svg";
import CompletedShift from "../../../assets/icons/StaffBooking/Completed icon.svg";
import WorkHistoryIcon from "../../../assets/icons/StaffBooking/workHistoryIcon.svg";
import { useNavigate } from "react-router-dom";
import "./StaffBookingTable.scss";

const StaffBookingTable = (props: any) => {
  const { data, pagination, setPagination, total, isLoading } = props;
  const [staffDetails, setStaffDetails] = useState<any>({});
  const navigate = useNavigate();

  const items: any = [
    {
      label: (
        <div>
          <Space
            onClick={() =>
              navigate(`/staff-booking/available-shift/${staffDetails?._id}`, {
                state: staffDetails,
              })
            }
          >
            <img src={viewIcon} alt="Edit" className="d-flex align-center" width={24} height={24} />
            <span>Available Shift</span>
          </Space>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <Space
          onClick={() =>
            navigate(`/staff-booking/UpComing-shift/${staffDetails?._id}`, {
              state: staffDetails,
            })
          }
        >
          <img src={UpcomingShift} alt="Delete" className="d-flex align-center" width={24} height={24} />
          <span>Upcoming Shift</span>
        </Space>
      ),
      key: "2",
    },
    {
      label: (
        <Space
          onClick={() =>
            navigate(`/staff-booking/completed-shift/${staffDetails?._id}`, {
              state: staffDetails,
            })
          }
        >
          <img src={CompletedShift} alt="Delete" className="d-flex align-center" width={24} height={24} />
          <span>Completed Shift</span>
        </Space>
      ),
      key: "3",
    },
    {
      label: (
        <Space
          onClick={() =>
            navigate(`/staff-booking/work-history/${staffDetails?._id}`, {
              state: staffDetails,
            })
          }
        >
          <img src={WorkHistoryIcon} alt="Delete" className="d-flex align-center" width={24} height={24} />
          <span>Work History</span>
        </Space>
      ),
      key: "4",
    },
  ];
  const columns: ColumnsType<any> = [
    {
      title: <span style={{ paddingLeft: "75px" }}>User Name</span>,
      dataIndex: "",
      key: "",
      ellipsis: true,
      width: 270,
      render: (_, text) => (
        <div className="cursor-pointer d-flex align-center ">
          <Avatar
            src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${text?.profilePhoto?.mediaId}.${text?.profilePhoto?.mediaMeta?.extension}`}
            // icon = {`${text?.firstName?.charAt(0)}${text.lastName?.charAt(0)}`}
            className="user-img"
            style={{
              height: 45,
              width: 45,
            }}
          />
          <span className="fs-14 fw-400 title-color" style={{ marginLeft: "30px" }}>
            {`${text.firstName} ${text.lastName}`}
          </span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (_, text) => <span className="fs-14 fw-400 title-color">{text.personalInformation?.gender}</span>,
    },
    {
      title: "User Type",
      dataIndex: "userType",
      key: "userType",
      render: (_, text) => <span className="fs-14 fw-400 title-color">{text.userType?.shortForm}</span>,
    },
    {
      title: "Time To Call",
      dataIndex: "timeToCall",
      key: "timeToCall",
      render: (_, text) => <span className="fs-14 fw-400 title-color">{text.contactTime}</span>,
    },
    {
      title: <div className="equal--width-tb">Actions</div>,
      dataIndex: "actions",
      key: "actions",
      width: 150,
      render: (_, text) => (
        <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]} className="actionDropDown cursor-pointer">
          <div
            className="equal--width-tb"
            onClick={() => {
              setStaffDetails(text);
            }}
          >
            <img src={ActionImg} alt="menu" />
          </div>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="">
      <Table columns={columns} dataSource={data} className="staff-booking-table" scroll={{ x: "max-content" }} loading={isLoading} pagination={{
        current: pagination?.page,
        pageSize: pagination?.limit,
        total:total,
        onChange: (page, limit) => setPagination({ page, limit }),
      }} />
    </div>
  );
};
export default StaffBookingTable;