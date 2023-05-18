import React from 'react'

// Ant Components
import { Col, Row } from 'antd'

// Components
import ReportCards from './ReportCards/ReportCards'

// Mock Data
import { adminReportsMockData } from '../../mock/ReportMockData/ReportsMockData'

// Interfaces
import { adminReportsDataInterface } from '../../types/ReportsInterface'

// SCSS
import './Reports.scss';
import { ROLES } from '../../constants/Roles'

const Reports = () => {

    const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");

    return (
        <div className='admin-reports-wrapper'>
            <p className='title-color fs-14 fw-400 line-height-22'>Please click on each of the following boxes to see a full report. If you need only any other report, please let us know so we can make them available for you.</p>

            <Row gutter={[20, 40]}>
                {!!adminReportsMockData.length && adminReportsMockData.map((singleReportItem: adminReportsDataInterface) => (
                    singleReportItem.allowdedRoles.includes(role) && (
                        <Col xs={24} md={12} lg={8} xl={6} key={singleReportItem.id}>
                            <ReportCards item={singleReportItem}  />
                        </Col>
                    )
                ))}
            </Row>
        </div>
    )
}

export default Reports