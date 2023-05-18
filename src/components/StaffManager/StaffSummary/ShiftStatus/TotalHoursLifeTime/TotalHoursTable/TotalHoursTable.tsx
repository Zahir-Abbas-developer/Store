import React from "react";
import Table, { ColumnsType } from "antd/es/table";
import { totalHoursTableData } from "../../../../../../mock/StaffManagerMock";
import "./TotalHoursTable.scss";
import dayjs from "dayjs";

const TotalHoursTable = (props: any) => {
  const { data, isLoading,pagination,setPagination } = props;

  const columns: ColumnsType<any> = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      render: (_: any, __: any, index: any) => { return <span>{(index + pagination?.limit * pagination?.page) - pagination?.limit + 1}</span>; },
    },
    {
      title: "Shift Name",
      dataIndex: "shiftName",
      key: "shiftName",
      render: (_, text) => <span className="fs-14 fw-400 title-color">{text.shift?.shiftType}</span>,
    },
    {
      title: "Client Name ",
      dataIndex: "clientName",
      key: "clientName",
      render: (_, text) => <span className="fs-14 fw-400 title-color">{text.careHome?.clientName}</span>,
    },
    {
      title: "Shift Date",
      dataIndex: "shiftDate",
      key: "shiftDate",
      render: (_, text) => <span className="fs-14 fw-400 title-color">{dayjs(text.shift?.shiftDate).format("MM/DD/YYYY")}</span>,
    },
    {
      title: "Shift Hours ",
      dataIndex: "perHour",
      key: "perHour",
    },
    {
      title: "Shift Rate ( £ ) ",
      dataIndex: "shiftRate",
      key: "shiftRate",
      render: (_, text) => <span className="fs-14 fw-400 title-color">{text?.shiftRate}</span>,
    },
    {
      title: "Shift Amount ",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Invoice Number ",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      render: (_, text = "") => <span>inv-{text?._id?.substring((text?._id?.length - 6), text?._id?.length)}</span>
    },
    {
      title: "Shift Status ",
      dataIndex: "shiftStatus",
      key: "shiftStatus",
      render: (_, text) => <span className="fs-14 fw-400 title-color">{text?.shiftStatus}</span>,
    },
    {
      title: "Payment Status ",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Payment Date ",
      dataIndex: "paymentDate",
      key: "paymentDate",
    },
  ];

  return (
    <div className="total-hours-table">
      <Table columns={columns} dataSource={data?.shifts} className="total-table-content" scroll={{ x: "max-content" }} loading={isLoading} pagination={{
        current: pagination?.page,
        pageSize: pagination?.limit,
        total:data?.total ,
        onChange: (page, limit) => setPagination({ page, limit }),
      }}/>
    </div>
  );
};
export default TotalHoursTable;