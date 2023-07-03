import React from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../../../Reports/CommonReportTable/CommonReportTable';
import CommonFilters from '../CommonFilters/CommonFilters';

// Table and Filters Mock Data and Intterface
import { limitedMockDataInterface } from '../../../../types/FinanceInterface';
import { LimitedReportMockData } from '../../../../mock/FinanceMockData/LimitedReportMockData';
import BreadCrumb from '../../../../layout/BreadCrumb/BreadCrumb';

// Limited Report Table Columns
const LimitedReportTableHeader: ColumnsType<limitedMockDataInterface> = [
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
    title: 'Account Title',
    dataIndex: 'accountTitle',
    key: 'accountTitle',
    render: (accountTitle: string) => (
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{accountTitle}</span>
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

const LimitedReport = () => {
  const breadCrumbItems = [
    {
      title: "Limited",
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
            <CommonReportTable tableHeader={LimitedReportTableHeader} tableData={LimitedReportMockData} />
          </Col>
        </Row>
      </div>
    </>

  )
}

export default LimitedReport