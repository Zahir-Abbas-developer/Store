import React from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../../../Reports/CommonReportTable/CommonReportTable';
import CommonFilters from '../CommonFilters/CommonFilters';

// Table and Filters Mock Data and Intterface
import { NIPaymentMockData } from '../../../../mock/FinanceMockData/NIPaymentMockData';
import { niPaymentMockDataInterface } from '../../../../types/FinanceInterface';
import BreadCrumb from '../../../../layout/BreadCrumb/BreadCrumb';

// NI Payment Report Table Columns
const NIReportReportTableHeader: ColumnsType<niPaymentMockDataInterface> = [
  {
    title: 'Sr #',
    dataIndex: 'key',
    key: 'key',
    render: (key: React.Key) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{key}</span>,
  },
  {
    title: 'Staff Name',
    dataIndex: 'staffName',
    key: 'staffName',
    render: (staffName: string) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffName}</span>,
  },
  {
    title: 'Employee Code',
    dataIndex: 'employeeCode',
    key: 'employeeCode',
    render: (employeeCode:string) => (
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{employeeCode}</span>
    )
  },
  {
    title: 'Staff Type',
    dataIndex: 'staffType',
    key: 'staffType',
    render: (staffType: string) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffType}</span>,
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    key: 'rate',
    render: (rate: string) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{rate}</span>,
  },
  {
    title: 'Sort Code',
    dataIndex: 'sortCode',
    key: 'sortCode',
    render: (sortCode: string) => (
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{sortCode}</span>
    ),
  },
  {
    title: 'Bank Account',
    dataIndex: 'bankAccount',
    key: 'bankAccount',
    render: (bankAccount: string) => (
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{bankAccount}</span>
    ),
  },
  {
    title: 'Total Payable',
    dataIndex: 'totalPayable',
    key: 'totalPayable',
    render: (totalPayable: string) => (
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{totalPayable}</span>
    ),
  },
];


const NIPaymentReport = () => {

  const breadCrumbItems = [
    {
      title: "NI Payment",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Finance Reports",
      path: "/finance/reports",
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
    <div className='reports-child-wrapper-class'>
      <Row>
        <Col xs={24} className="filter-div">
          <CommonFilters />
        </Col>
        <Col xs={24}>
          <CommonReportTable tableHeader={NIReportReportTableHeader} tableData={NIPaymentMockData} />
        </Col>
      </Row>
    </div>
    </>
  )
}

export default NIPaymentReport