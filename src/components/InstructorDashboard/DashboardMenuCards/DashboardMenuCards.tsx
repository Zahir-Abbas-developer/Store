import React from 'react'
import "./DashboardMenuCards.scss"

import manageCourseIcon from "../../../assets/icons/intructorDashboard/manage-courses.svg"
import manageCourseIconHov from "../../../assets/icons/intructorDashboard/manage-course-hov.svg"
import traineeInfoIcon from "../../../assets/icons/intructorDashboard/trainee-info.svg"
import traineeInfoIconHov from "../../../assets/icons/intructorDashboard/trainee-info-hov.svg"
import webinar from "../../../assets/icons/intructorDashboard/webinar.svg"
import { useNavigate } from 'react-router-dom'

const DashboardMenuCards = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className='hoverable-cards bg--overlay d-flex align-center manage-courses-card cursor-pointer' onClick={() => navigate(`/manage-courses`)}>
                <div className='icon-wrapper'>
                    <img className='on-display' src={manageCourseIcon} alt="" />
                    <img className='on-hover' src={manageCourseIconHov} alt="" />
                </div>
                <span className='label-cards fs-20 fw-500 form-heading-color'>Manage Courses</span>
            </div>
            <div className='hoverable-cards bg--overlay d-flex align-center trainee-information-card cursor-pointer' onClick={() => navigate(`/trainee-info`)}>
                {/* <img src={traineeInfoIcon} alt="" /> */}
                <div className='icon-wrapper'>
                    <img className='on-display' src={traineeInfoIcon} alt="" />
                    <img className='on-hover' src={traineeInfoIconHov} alt="" />
                </div>
                <span className='label-cards fs-20 fw-500 form-heading-color'>Trainee Info</span>
            </div>
            <div className='hoverable-cards bg--overlay style-split-card'>
                <div className='d-flex align-center card-webminar' style={{ gap: "13px" }}>
                    <img src={webinar} alt="" />
                    <span className='fs-20 fw-500 form-heading-color'>Webinar</span>
                </div>
                <div className='inner-main-split-cards d-flex flex-column justify-between'>
                    <div className="split-cards bg--overlay">
                        <div className='d-flex align-center cursor-pointer' style={{ gap: "13px", height: "100%", padding: "0px 18px" }} onClick={() => navigate(`/webinar/upcomming-webinar`)}>
                            <div className="box-rounded"></div>
                            <span className='split-card-label fs-16 fw-500 form-heading-color'>Upcoming Webinar</span>
                        </div>
                    </div>
                    <div className="split-cards bg--overlay">
                        <div className='d-flex align-center cursor-pointer' style={{ gap: "13px", height: "100%", padding: "0px 18px" }} onClick={() => navigate(`/webinar/webinar-history`)}>
                            <div className="box-rounded"></div>
                            <span className='split-card-label fs-16 fw-500 form-heading-color'>Webinar History</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardMenuCards