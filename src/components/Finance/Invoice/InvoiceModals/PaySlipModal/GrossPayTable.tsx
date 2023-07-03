import { Table } from "antd";
import { paySlipTableData } from "../../../../../mock/InvoiceData";
import './DeductionTable.scss'

const GrossPayTable = () => {
  const columns = [
    {
      title: () => {
        return <p className="fs-20 fw-500 m-0">Description</p>
      },
      dataIndex: "description",
      key: "description",
      render: (_: any, text: any) =>
        <div>
          <p className="m-0">Hourly pay</p>
          <p className="m-0">{text.description}</p>
        </div>
    },
    {
      title: () => {
        return <p className="fs-20 fw-500 m-0">Units</p>
      },
      dataIndex: "units",
      key: "units",
    },
    {
      title: () => {
        return <p className="fs-20 fw-500 m-0">Rate (£)</p>
      },
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: () => {
        return <p className="fs-20 fw-500 m-0">Amount (£)</p>
      },
      dataIndex: "amount",
      key: "amount",
    },
  ];
  return <Table className='payslip-table-main' scroll={{ x: "max-content" }} pagination={false} dataSource={paySlipTableData} columns={columns} />;
};

export default GrossPayTable;
