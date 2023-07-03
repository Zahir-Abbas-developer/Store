import { Space, Table } from "antd";
import dayjs from "dayjs";



const InvoiceTimeSheetTable = ({financeCarerTimeSheetReports}:any) => {
  const columns = [
    {
      title: "Sr #",
      dataIndex: "srno",
      key: "srno",
     
    },
    {
      title: "Shift Date",
      dataIndex: "shiftDate",
      key: "shiftDate",
      render: (_:any, text:any) => (
        <Space>
          <span className="fs-14 fw-400 title-color">{dayjs(text?.shiftDetail?.shiftDate).format("DD-MM-YYYY")}</span>
        </Space>
      ),
    },
    {
      title: "Shift Day",
      dataIndex: "shiftDay",
      key: "shiftDay",
      render: (_:any, text:any) => (
        <Space>
          <span className="fs-14 fw-400 title-color">{dayjs(text?.shiftDetail?.shiftDate).format("DD-MM-YYYY")}</span>
        </Space>
      ),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      render: (_:any, text:any) => (
        <Space>
          <span className="fs-14 fw-400 title-color">{text?.shiftDetail?.department}</span>
        </Space>
      ),
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      render: (_:any, text:any) => (
        <Space>
          <span className="fs-14 fw-400 title-color">{text?.careHome?.clientName}</span>
        </Space>
      ),
    },
    {
      title: "Shift Type",
      dataIndex: "shiftType",
      key: "shiftType",
      render: (_:any, text:any) => (
        <Space>
          <span className="fs-14 fw-400 title-color">{text?.careHome?.shiftType}</span>
        </Space>
      ),
    },
    {
      title: "Start time",
      dataIndex: "startTime",
      key: "startTime",
      render: (_:any, text:any) => (
        <Space>
          <span className="fs-14 fw-400 title-color">{dayjs(text?.shiftDetail?.startTime).format("DD-MM-YYYY")}</span>
        </Space>
      ),
    },
    {
      title: "End time",
      dataIndex: "endTime",
      key: "endTime",
      render: (_:any, text:any) => (
        <Space>
          <span className="fs-14 fw-400 title-color">{dayjs(text?.shiftDetail?.endTime).format("DD-MM-YYYY")}</span>
        </Space>
      ),
    },
   

   
    {
      title: "Rate",
      dataIndex: "clientRateValue",
      key: "clientRateValue",
      render: (_:any, text:any) => (
        <Space>
          <span className="fs-14 fw-400 title-color">{text?.clientRateValue}</span>
        </Space>
      ),
    },
    {
      title: "Hours",
      dataIndex: "perHour",
      key: "perHour",
      render: (_:any, text:any) => (
        <Space>
          <span className="fs-14 fw-400 title-color">{text?.perHour}</span>
        </Space>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (_:any, text:any) => (
        <Space>
          <span className="fs-14 fw-400 title-color">{text?.totalAmount}</span>
        </Space>
      ),
    },
  ];
  return <Table scroll={{ x: "max-content" }} pagination={false} dataSource={financeCarerTimeSheetReports} columns={columns} />;
};

export default InvoiceTimeSheetTable;
