import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  dashbaordTableDataContent,
  DashboardTableData,
} from "../../../mock/ItHelpDesk/ItHelpDashboard";
import "./ItHelpDeskDasboard.scss";
import "../../../sass/common.scss";
import { ROLES } from "../../../constants/Roles";

const DashboardTable = () => {
  const { role }: any = JSON.parse(
    localStorage.getItem("careUserData") || "{}"
  );

  const columns: ColumnsType<DashboardTableData> = [
    {
      title: "Sr #",
      dataIndex: "srNo",
      width: "70px",
      align: "center",
    },
    {
      title: "Ticket",
      dataIndex: "ticket",
      width: "110px",
      align: "center",
    },
    {
      title: "Ticket Description",
      dataIndex: "ticketDescription",
      width: "130px",
      align: "center",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      width: "130px",
      align: "center",
    },
  ];

  if (role === ROLES.superAdmin || role === ROLES.coordinator) {
    columns.splice(3, 0, {
      title: "Initiated Date",
      dataIndex: "initiatedDate",
      width: "130px",
      align: "center",
    });
  }
  if (role === ROLES.client || role === ROLES.carer || role === ROLES.instructor || role === ROLES.admin || role === ROLES.superAdmin) {
    columns.splice(3, 0, {
       title: "Initiated By",
      dataIndex: "initiatedBy",
      width: "130px",
      align: "center",
    
    });
  }
  return (
    <div className="wrap-dashboard-table">
      <Table
        columns={columns}
        dataSource={dashbaordTableDataContent}
        size="middle"
        scroll={{ x: "max-content" }}
        pagination={false}
      />
    </div>
  );
};

export default DashboardTable;
