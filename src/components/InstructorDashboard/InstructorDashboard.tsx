import { Col, Row, Space } from 'antd'
import React from 'react'
import DashbaordCalender from './DashbaordCalender/DashbaordCalender'
import DashboardMenuCards from './DashboardMenuCards/DashboardMenuCards'



import "./InstructorDashboard.scss"
import NoOfTrainneEnrolledChart from './NoOfTrainneEnrolledChart/NoOfTrainneChart'
import NumberOfStudents from './NumberOfStudents/NumberOfStudents'
import RecentActivities from './RecentActivities/RecentActivities'
import BreadCrumb from '../../layout/BreadCrumb/BreadCrumb'

const InstructorDashboard = () => {
    //BreadCrumb Items
    const breadCrumbItems = [
      {
        title: "Dashboard",
        path: "/instructor-dashboard",
      },
    ];
    return (
<>
<BreadCrumb breadCrumbItems={breadCrumbItems} />
        <div className='instructor-dashboard-wrapper-main'>
            <Row gutter={[30, 30]}>
                <Col xs={24} sm={24} md={10} lg={10} xl={6}>
                    <div className='dashboard--cards-common-height-365px d-flex flex-column justify-between'>
                        <DashboardMenuCards/>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={14} lg={14} xl={10}>
                    <div className='bg--overlay dashboard--cards-common-height-365px'>
                        <NoOfTrainneEnrolledChart/>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={10} lg={10} xl={8}>
                    <div className='bg--overlay dashboard--cards-common-height-365px'>
                        <NumberOfStudents/>
                    </div>
                </Col>

                <Col xs={24} sm={24} md={14} lg={14} xl={10}>
                    <div className='bg--overlay dashboard--cards-common-height-335px res-height-calender'  style={{padding:"15px"}}>
                        <div className='fs-20 fw-500' style={{marginBottom:'15px'}}>Calendar</div>
                        <DashbaordCalender/>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={14}>
                    <div className='bg--overlay dashboard--cards-common-height-335px res-recent-activities'>
                        <RecentActivities/>
                    </div>
                </Col>
            </Row>
        </div>
        </>
    )
}

export default InstructorDashboard