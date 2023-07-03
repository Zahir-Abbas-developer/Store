import { Table } from "antd";
import dayjs from "dayjs";

const InvoiceTimeSheetTable = ({InvoiceTimeSheet}:any) => {
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
      render: ( _:any,record:any) => (
        <>     
              <span className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-span-style"
              >
             {dayjs(record?.shiftDate).format("YYYY-MM-DD")}
              </span>
        </>
      ),
    },
    {
      title: "Shift Day",
      dataIndex: "dayOfWeek",
      key: "dayOfWeek",
    },
    {
      title: "Staff Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      render: ( _:any,record:any) => (
        <>     
              <span className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-span-style"
              >
             {record?.careHomeData?.clientName}
              </span>
        </>
      ),
    },
    {
      title: "Shift Type",
      dataIndex: "shiftType",
      key: "shiftType",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      render: ( _:any,record:any) => (
        <>     
              <span className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-span-style"
              >
             {record?.designation?.shortForm}
              </span>
        </>
      ),
    },
    {
      title: "Hours",
      dataIndex: "duration",
      key: "duration",
      render: ( _:any,record:any) => (
        <>     
              <span className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-span-style"
              >
             {Math.round(record?.duration)}
              </span>
        </> 
      ),
    },
    {
      title: "Client Rate",
      dataIndex: "clientRateValue",
      key: "clientRateValue",
    },
    {
      title: "Total Receivable",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: ( _:any,record:any) => (
        <>     
              <span className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-span-style"
              >
             {Math.round(record?.totalAmount)}
              </span>
        </> 
      ),
    },
  ];
  return <Table scroll={{ x: "max-content" }} pagination={false} dataSource={InvoiceTimeSheet.result} columns={columns} />;
};

export default InvoiceTimeSheetTable;
