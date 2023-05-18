import { Card, Table,Layout} from 'antd';
import '../AmountReceivableTable/AmountReceivableTable.scss'
import type { ColumnsType } from 'antd/es/table';
import '../../.../../../sass/common.scss'
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import React from 'react'
import {weekWiseProfitTabledata} from "../../../mock/FinanceDashboard"
// Colors sMock Data
// import { APPColors } from '../ReportColors';

// interface IAmountData {
//   key: string;
//   weeks:string;
//   january: string;
//   february?: string;
//   march?: string;
//   april?: string;
//   may?: string;
//   june:string;
//   july:string;
//   august:string;
//   september:string;
//   october:string;
//   november:string;
//   december:string;
// }
const ClientProfitTable = () => {
  // const randomColor = key.weekWiseProfitTabledata;
  const columns: ColumnsType<any> = [
    {
      title: <span className='fw-600 fs-14 title-color'>Weeks</span>,
      dataIndex: 'weeks',
      key: 'weeks',
      fixed: 'left',
    },
    {
      title: <span className='fw-600 fs-14 title-color'>January</span>,
      dataIndex: 'january',
      key: 'january',
      render: (_,item) => (
        <>     
              <span className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-span-style"
              >
             {item.january}
              </span>
        </>
      ),
    },
    {
      title: <span className='fw-600 fs-14 title-color'>February</span>,
      dataIndex: 'february',
      key: 'february',
      render: (_,item) => (
        <>
              <span className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-span-style">
             {item.february}
              </span>
        </>
      ),
     
    },
    {
      title: <span className='fw-600 fs-14 title-color'>March</span>,
      dataIndex: 'march',
      key: 'march',
      render: (_,item) => (
        <>
              <span className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-span-style">
             {item.march}
              </span>
        </>
      ),
    },
    {
      title: <span className='fw-600 fs-14 title-color'>April</span>,
      dataIndex: 'april',
      key: 'april',
      render: (_,item) => (
        <>
              <span className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-span-style">
             {item.april}
              </span>
        </>
      ),
    },
    {
      title: <span className='fw-600 fs-14 title-color'>May</span>,
      dataIndex: 'may',
      key: 'may',
      render: (_,item) => (
        <>
              <span className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-span-style">
             {item.may}
              </span>
        </>
      ),
    },
    {
      title: <span className='fw-600 fs-14 title-color'>June</span>,
      dataIndex: 'june',
      key: 'june',
      render: (_,item) => (
        <>
              <span className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-span-style">
             {item.june}
              </span>
        </>
      ),
    },
    {
      title: <span className='fw-600 fs-14 title-color'>July</span>,
      dataIndex: 'july',
      key: 'july',
      render: (_,item) => (
        <>
              <span className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-span-style">
             {item.july}
              </span>
        </>
      ),
    },
    {
      title: <span className='fw-600 fs-14 title-color'>August</span>,
      dataIndex: 'august',
      key: 'august',
      render: (_,item) => (
        <>
              <span className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-span-style">
             {item.august}
              </span>
        </>
      ),
    },
    {
      title: <span className='fw-600 fs-14 title-color'>September</span>,
      dataIndex: 'september',
      key: 'september',
    },
    {
      title: <span className='fw-600 fs-14 title-color'>October</span>,
      dataIndex: 'october',
      key: 'october',
    },
    {
      title: <span className='fw-600 fs-14 title-color'>November</span>,
      dataIndex: 'november',
      key: 'november',
    },
    {
      title: <span className='fw-600 fs-14 title-color'>December</span>,
      dataIndex: 'december',
      key: 'december',
    },
   
  ];
      

  const items: MenuProps["items"] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];
  return (
    <Layout className='wrappper-finance-dashboard-tables'>
    <Card  className="wrap-finance-week-wise-table border-radius-10">
       <Table  columns={columns} dataSource={weekWiseProfitTabledata} pagination={false} scroll={{ x: "max-content" }} 
        title={() => <div className='d-flex align-center justify-between finance-table-title  title-color fw-500 fs-20'> <h4 className='title-color fw-500 fs-20'>Week Wise Client Profit</h4>
         <Dropdown menu={{ items }} trigger={["click"]} className="d-flex align-center end">
                <p onClick={(e) => e.preventDefault()}>
                  <Space   className=" title-color fw-400 fs-14">
                    Tall Tree Care Home
                    <DownOutlined />
                  </Space>
                </p>
              </Dropdown>
        </div>}
       
       />
    </Card>
    </Layout>
  )
}

export default ClientProfitTable
