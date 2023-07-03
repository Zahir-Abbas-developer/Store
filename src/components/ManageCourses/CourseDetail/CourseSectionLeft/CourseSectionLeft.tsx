import React, { useEffect } from 'react'
import courseCardImage from '../../../../assets/images/ManageCourse/CourseDetails/image 18.png'
import infoIcon from "../../../../assets/icons/ManageCourse/CourseDetails/info-icon.svg"
import usersIcon from "../../../../assets/icons/ManageCourse/CourseDetails/users-icon.svg"

import './CourseSectionLeft.scss'
import { Button, Rate } from 'antd'
import dayjs from 'dayjs'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEnrollUserMutation } from '../../../../store/Slices/Training'
import AppSnackbar from '../../../../utils/AppSnackbar'
const CourseSectionLeft = ({ courseDetailsData, isTrainingCourses }: any) => {
  const navigate = useNavigate()

  
  const authorCourseAverageReview = courseDetailsData?.authorStats?.authorCoursesAverageReview

  const { pathname } = useLocation()
  const route = pathname.split('/')

  console.log("route", route)

  const mediaImage = courseDetailsData?.mediaImage;
const courseImage = courseDetailsData?.courseImage;
const extension = courseDetailsData?.mediaImage[0]?.mediaMeta?.extension ;


    const [enrollUser] = useEnrollUserMutation()

    const handelEnrollUser = async() => {

      

      const payload = {
        "courseId": route[3]
      }
      try {
        await enrollUser({ payload }).unwrap();
        AppSnackbar({
          type: "success",
          messageHeading: "Sucessfull",
          message: "Sucessfully enrolled"
        });
        navigate(`/training/my-courses/${route[3]}` , { state: { courseId: route[3] } })
      } catch (error: any) {
        AppSnackbar({
          type: "error",
          messageHeading: "Error",
          message: error?.data?.message ?? "Something went wrong!"
        });
      }
    }


    // useEffect(() => {
    // }, [mediaImage, courseImage, extension, imageUrl, courseDetailsData])
    

  return (
    <div className='course-section-left'>
      <div className="course-card">
        <img
          src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${mediaImage[0]?.mediaId}.${extension}`} 
          alt="" style={{ width: "100%", height: "238px" }} className='border-radius-10'/>
        <div className='fs-16 fw-500 text-center center--box' style={{ marginTop: "43px", width: '80%' }}>{courseDetailsData?.courseTitle}</div>
        <div className="course-ratings d-flex justify-center" style={{ gap: '10px', marginTop: "15px" }}>
          <span className='orange-color fs-24 fw-600'>{courseDetailsData?.authorStats?.authorCoursesAverageReview ? courseDetailsData?.authorStats?.authorCoursesAverageReview.toFixed(1) : 0}</span>
          <Rate className='custom-rate' disabled value={authorCourseAverageReview} />
        </div>
        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          <label className='fs-16 fw-600 form-heading-color' style={{ marginRight: "10px" }}>Author</label>
          <span className='fs-14 fs-600' style={{ color: '#898989' }}>{courseDetailsData?.authorStats?.authorFirstName}&nbsp;{courseDetailsData?.authorStats?.authorLastName}</span>
        </div>
        <div className='d-flex align-items-center justify-between' style={{ width: '90%', margin: '0 auto', marginTop: '15px', }}>
          <div className='d-flex align-items-center' style={{ gap: '10px' }}><img src={infoIcon} alt="" /><span className='blue-color fs-14 fw-600'>Last updated {dayjs(courseDetailsData?.updatedAt).format("D/YYYY")}</span></div>
          <div className='d-flex align-items-center' style={{ gap: '10px' }}><img src={usersIcon} alt="" /><span className='fs-14 fw-600' style={{ color: "#0E918C" }}>{courseDetailsData?.authorStats?.totalEnrolledUsers}</span></div>
        </div>


       {route[1] === "training" && <div className="d-flex justify-center" style={{marginTop:'31px'}}>
        <Button type="primary" onClick={handelEnrollUser} className="cancel-btn" >
          Enroll Now
        </Button>
        </div>}

        {/* 
        {isTrainingCourses  && 
        <Button type="primary" className="cancel-btn" onClick={() => props.setIsAddModalOpen(false)}>
        Enroll Now
          </Button>
          } */}
      </div>

    </div>
  )
}

export default CourseSectionLeft