import { Card, Layout, Table ,Tag} from 'antd';
import React from 'react'
import type { ColumnsType } from 'antd/es/table';
import '../../.../../../sass/common.scss'
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import './AmountReceivableTable.scss'
import {amountReceivableData} from '../../../mock/FinanceDashboard'
import {IAmountData} from '../../../mock/FinanceDashboard'


const AmountReceivableTable = () => {
  const columns: ColumnsType<IAmountData> = [
    {
      title: <span className='fw-600 fs-14 title-color'>Sr#</span>,
      dataIndex: 'srNo',
      key: 'srNo',
      
    },
    {
      title: <span className='fw-600 fs-14 title-color'>Client Name</span>,
      dataIndex: 'clientName',
      key: 'clientName',
    },
    {
      title:  <span className='fw-600 fs-14 title-color'>Total Invoice Amount</span>,
      dataIndex: 'totalInvoiceAmount',
      key: 'totalInvoiceAmount',
      render: (_,totalAmount) => (
        <>
              <Tag  style={{background:"#FFF7E4",color:"#F2AC03"}} className="d-flex justify-center align-items-center fs-14 fw-400 line-height-22 finance-amount-and-profit-table-tag-style">
             {totalAmount.totalInvoiceAmount}
              </Tag>
        </>
      ),
    },
    {
      title:  <span className='fw-600 fs-14 title-color'>Amount Received</span>,
      dataIndex: 'amountReceived',
      key: 'amountReceived',
      render: (_,item) => (
        <>
              <Tag  style={{background: "rgba(61, 162, 255, 0.13)",color:"#1890FF "}}  className="fs-14 fw-400 line-height-22 d-flex justify-center align-items-center finance-amount-and-profit-table-tag-style">
              {item.amountReceived}
              </Tag>
        </>
      ),
    },
    {
      title:  <span className='fw-600 fs-14 title-color'>Amount Receivable</span>,
      dataIndex: 'amountReceivable',
      key: 'amountReceivable',
      render: (_,item) => (
        <>
              <Tag  style={{background:"#FFF2F8",color:"#F21162"}}  className="fs-14 fw-400 line-height-22 d-flex justify-center align-items-center finance-amount-and-profit-table-tag-style">
             {item.amountReceivable}
              </Tag>
        </>
      ),
    },
    {
      title:  <span className='fw-600 fs-14 title-color'>Total Profit</span>,
      dataIndex: 'totalProfit',
      key: 'totalProfit',
      render: (_,item) => (
        <>
              <Tag  style={{background:"#E4FFF6",color:"#09AF42"}}  className="fs-14 fw-400 line-height-22 d-flex justify-center align-items-center finance-amount-and-profit-table-tag-style">
             {item.amountReceived}
              </Tag>
        </>
      ),
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
    <Card className='wrap-finance-amount-table border-radius-10'>
      <Table   columns={columns} dataSource={amountReceivableData} pagination={false} scroll={{ x: "max-content" }} 
      title={() => <div className='d-flex align-center justify-between finance-table-title  title-color fw-500 fs-20'> <h4 className='title-color fw-500 fs-20'>Amount receivable</h4>
     <Dropdown menu={{ items }} trigger={["click"]} className="d-flex align-center end">
                <p onClick={(e) => e.preventDefault()}>
                  <Space  className=" title-color fw-400 fs-14">
                    Last Week
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

export default AmountReceivableTable