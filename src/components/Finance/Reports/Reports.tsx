import React from 'react';

// Ant Components
import { Col, Row } from 'antd';

// Components
import ReportsCards from './ReportsCards/ReportsCards'

// Reports Cards Data and Interface
import { adminReportsDataInterface } from '../../../types/ReportsInterface'
import { financeReportsCardsMockData } from '../../../mock/FinanceMockData/FinanceReportsCardsMockData'


// SCSS
import "./Reports.scss";
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';

const Reports = () => {

  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");

  const breadCrumbItems = [
    {
      title: "Reports",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Finance",
      path: "/finance",
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />

      <div className='finance-reports-wrapper'>
        <p className='title-color fs-14 fw-400 line-height-22'>Please click on each of the following boxes to see a full report. If you need only any other report, please let us know so we can make them available for you.</p>

        <Row gutter={[20, 40]}>
          {!!financeReportsCardsMockData.length && financeReportsCardsMockData.map((singleReportItem: adminReportsDataInterface) => (
            singleReportItem.allowdedRoles.includes(role) && (
              <Col xs={24} md={12} lg={8} xl={6} key={singleReportItem.id}>
                <ReportsCards item={singleReportItem} />
              </Col>
            )
          ))}
        </Row>
      </div>
    </>

  )
}

export default Reports