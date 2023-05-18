import { Table } from "antd";
import { workSummaryTableData } from "../../../../../mock/InvoiceData";
import "./WorkSummaryTable.scss";

const WorkSummaryTable = () => {
  const workSummaryTableColumns = [
    {
      title: "Sr #",
      dataIndex: "srno",
      key: "srno",
    },
    {
      title: "Shift Date",
      dataIndex: "shiftDate",
      key: "shiftDate",
    },
    {
      title: "Shift Day",
      dataIndex: "shiftDay",
      key: "shiftDay",
    },
    {
      title: "Staff Name",
      dataIndex: "staffName",
      key: "staffName",
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
    },
    {
      title: "Shift Type",
      dataIndex: "shiftType",
      key: "shiftType",
    },
    {
      title: "No of Hours",
      dataIndex: "noOfHours",
      key: "noOfHours",
    },
    {
      title: "Staff Rate",
      dataIndex: "staffRate",
      key: "staffRate",
    },
    {
      title: "Shift Total Pay",
      dataIndex: "shiftTotalPay",
      key: "shiftTotalPay",
    },
    {
      title: "Milage Allowance",
      dataIndex: "millageAllowance",
      key: "receiveable",
      render: (_: any, text: any) => {
        return (
          <p className="m-0" style={{ paddingLeft: "3rem" }}>
            {text.millageAllowance}
          </p>
        );
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];
  return (
    <Table
      className="work-summary-table"
      scroll={{ x: "max-content" }}
      pagination={false}
      dataSource={workSummaryTableData}
      columns={workSummaryTableColumns}
    />
  );
};

export default WorkSummaryTable;
