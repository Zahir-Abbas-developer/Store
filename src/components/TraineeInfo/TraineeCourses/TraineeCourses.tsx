import React from 'react'

// import "../../../sass/common.scss"
import "./TraineeCourses.scss"
import userIcon from '../../../assets/images/TraineeInfo/avatar-one.svg'

import course1 from "../../../assets/images/Training/course-1.png";
import course2 from "../../../assets/images/Training/course-2.png";
import CourseCard from './CourseCard/CourseCard';
import { useGetUserEnrolledCoursesQuery } from '../../../store/Slices/TraineeInfo';
import { useLocation } from 'react-router-dom';
import { isNullOrEmpty } from '../../../utils/utils';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';

const courseData = [
  {
    id:"01",
    img: course1,
    courseName: "BLS: Adults & Children , AED and Recovery Position",
    completed: 5,
  },
  {
    id:"02",
    img: course2,
    courseName: "BLS: Adults & Children , AED and Recovery Position",
    completed: 15,
  },
  {
    id:"03",
    img: course1,
    courseName: "BLS: Adults & Children , AED and Recovery Position",
    completed: 0,
  },
  {
    id:"04",
    img: course1,
    courseName: "BLS: Adults & Children , AED and Recovery Position",
    completed: 82,
  },
  {
    id:"05",
    img: course2,
    courseName: "BLS: Adults & Children , AED and Recovery Position",
    completed: 45,
  },
  {
    id:"06",
    img: course1,
    courseName: "BLS: Adults & Children , AED and Recovery Position",
    completed: 0,
  },
];

const TraineeCourses = () => {

  const {pathname} = useLocation()
  const route = pathname.split('/')

  const { data, isLoading, isError, isSuccess } = useGetUserEnrolledCoursesQuery(route[3])

  let userEnrolledCoursesDetails: any;
  if (isLoading) {
    userEnrolledCoursesDetails = <p>Loading...</p>
  }
  else if (isSuccess) {
    userEnrolledCoursesDetails = data
  }
  else if (isError) {
    userEnrolledCoursesDetails = <p>Error...</p>
  }
  console.log("userEnrolledCoursesDetails", userEnrolledCoursesDetails?.data)   // TODO

  const breadCrumbItems = [
    {
      title: "Trainee Courses",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/instructor-dashboard",
    },
    {
      title: "Trainee Info",
      path: "",
    },
  ];

  return (
   <>
    <BreadCrumb breadCrumbItems={breadCrumbItems} />
    <div className='trainee-courses-main-wrapper'>
      <div className="course-details-head d-flex align-center justify-between">
        <div className="user-details">
          <div className="user-profile-image">
            <img  src={ isNullOrEmpty(userEnrolledCoursesDetails?.data?.profileImage)? `https://ui-avatars.com/api/?rounded=true&name=${userEnrolledCoursesDetails?.data.firstName}` :  `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${userEnrolledCoursesDetails?.data?.profileImage?.mediaId}.${userEnrolledCoursesDetails?.data?.profileImage?.mediaMeta?.extension}`} height={50} width={50} style={{borderRadius:"50%"}} alt="img"
          onError={(e:any) => {
          e.target.onerror = null; 
           e.target.src = `https://ui-avatars.com/api/?rounded=true&name=${userEnrolledCoursesDetails?.data?.firstName}${userEnrolledCoursesDetails?.data?.lastName}`;
          }}
          />
            </div>
          <div className='d-flex flex-column'>
            <span className='fs-14 fs-600'>{userEnrolledCoursesDetails?.data?.firstName}&nbsp;{userEnrolledCoursesDetails?.data?.lastName}</span>
            <span className='fs-12 fs-400'>{userEnrolledCoursesDetails?.data?.designation ? userEnrolledCoursesDetails?.data?.designation : 'nan'}</span>
          </div>
        </div>
        <div className='fs-14 fw-600 dark-brown-color'>Registered Courses : <span className='fw-400'>{userEnrolledCoursesDetails?.data?.registerCourses}</span></div>
      </div>


      <div className="courses-flex-mian-wrapper">
        <span className='fs-24 fs-500'>Trainee Courses</span>
        <div className=" cards-list">
          {userEnrolledCoursesDetails?.data?.courses?.map((course: any, index: any) => (
            <CourseCard course={course} createdBy={userEnrolledCoursesDetails?.data?.createdBy}/>
          ))}
        </div>
      </div>

    </div>
   </>
  )
}

export default TraineeCourses