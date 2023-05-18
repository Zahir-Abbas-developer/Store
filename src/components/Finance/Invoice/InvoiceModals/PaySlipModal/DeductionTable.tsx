import { Table } from 'antd';
import { deductionTableData } from '../../../../../mock/InvoiceData';
import './DeductionTable.scss'

const DeductionTable=()=> {
    const columns = [
        {
          title: ()=>{
            return <p className="fs-20 fw-500 m-0">Description</p>
          },
          dataIndex: "description",
          key: "description",
          width:700,
          render:(_:any,text:any)=>
          <div>
            <p className="m-0">Hourly pay</p> 
            <p className="m-0">{text.description}</p>
          </div>
        },
        {
          title: ()=>{
            return <p className="fs-20 fw-500 m-0">Amount(£)</p>
          },
          dataIndex: "amount",
          key: "amount",
          width:300,
        },
        {
          title: ()=>{
            return <p className="fs-20 fw-500 m-0">Year to Date</p>
          },
          dataIndex: "yearToDate",
          key: "yearToDate",
        },
      ];
      return <Table className='payslip-table-main' scroll={{ x: "max-content" }} pagination={false} dataSource={deductionTableData} columns={columns} />;
}

export default DeductionTable
