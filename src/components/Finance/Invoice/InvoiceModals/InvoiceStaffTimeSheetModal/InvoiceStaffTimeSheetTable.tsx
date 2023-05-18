import { Table } from "antd";
import dayjs from "dayjs";

const InvoiceStaffTimeSheetTable = ({InvoiceTimeSheet,isOpenWorkSummaryModal}:any) => {
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
      title: `${isOpenWorkSummaryModal ?"Staff Name" : "Designation" }`,
      dataIndex: `${isOpenWorkSummaryModal ?"firstName" : "designation" }`,
      key: `${isOpenWorkSummaryModal ?"firstName" : "designation" }`,
      render: ( _:any,record:any) => (
        <>     
              <span className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-span-style"
              >
                {!isOpenWorkSummaryModal ? `${record?.userDetails?.personalInformation?.designation}`
             : `${record?.userDetails?.firstName} ${record?.userDetails?.lastName}`
                }
              </span>
        </>
      ),
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      render: ( _:any,record:any) => (
        <>     
              <span className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-span-style"
              >
             {record?.careHome?.clientName}
              </span>
        </>
      ),
    },
    {
      title: "Shift Type",
      dataIndex: "shiftType",
      key: "shiftType",
      render: ( _:any,record:any) => (
        <>     
              <span className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-span-style"
              >
             {record?.shiftDetail?.shiftType}
              </span>
        </>
      ),
    },
    {
      title: `${isOpenWorkSummaryModal ?"shift Total pay" : "start Time" }`,
      dataIndex: `${isOpenWorkSummaryModal ?"shiftTotalpay" : "startTime" }`,
      key: `${isOpenWorkSummaryModal ?"shiftTotalpay" : "startTime" }`,
      render: ( _:any,record:any) => (
        <>     
              <span className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-span-style"
              >
                {!isOpenWorkSummaryModal ? `${dayjs(record?.shiftDetail?.startTime).format('hh:mm a') }`
             : `-`
                }
              </span>
        </>
      ),
    },
    {
      title: `${isOpenWorkSummaryModal ?"Milage Allowance" : "End Time" }`,
      dataIndex: `${isOpenWorkSummaryModal ?"allowance" : "endTime" }`,
      key: `${isOpenWorkSummaryModal ?"allowance" : "endTime" }`,
      render: ( _:any,record:any) => (
        <>     
              <span className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-span-style"
              >
                {!isOpenWorkSummaryModal ? `${dayjs(record?.shiftDetail?.endTime).format('hh:mm a') }`
             : `-`
                }
              </span>
        </>
      ),
    },
    {
      title: `${isOpenWorkSummaryModal ?"Staff Rate" : "Rate" }`,
      dataIndex: "shiftRate",
      key: "shiftRate",
    },
   
    {
      title: `${isOpenWorkSummaryModal ?"Total Hours" : "Hours" }`,
      dataIndex: "perHour",
      key: "perHour",
      render: ( _:any,record:any) => (
        <>     
              <span className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-span-style"
              >
             {Math.round(record?.perHour)}
              </span>
        </> 
      ),
    },
    {
      title:`${isOpenWorkSummaryModal ?"Total" :"Total Amount" }` ,
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

export default InvoiceStaffTimeSheetTable;
