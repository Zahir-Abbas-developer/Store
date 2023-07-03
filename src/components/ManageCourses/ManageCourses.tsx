import React, { useState } from 'react'
import './ManageCourses.scss'

import searchIcon from "../../assets/icons/search.svg";
import { Button, Input } from 'antd';
import ManageCoursesFilters from './ManageCoursesFilters/ManageCoursesFilters';
import { useNavigate } from 'react-router-dom';
import CoursesList from './CoursesCards/CoursesList';
import DeleteModal from '../../shared/DeleteModal/DeleteModal';
import { debouncedSearch } from '../../utils/utils';
import BreadCrumb from '../../layout/BreadCrumb/BreadCrumb';

const ManageCourses = () => {


  const navigate = useNavigate()

  const [searchManageCourses, setsearchManageCourses] = useState()
  const [searchFilters, setsearchFilters] = useState('ALL')


  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setsearchManageCourses);
  };


  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Manage Course",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/instructor-dashboard",
    },
  ];


  return (
    <>
    <BreadCrumb breadCrumbItems={breadCrumbItems} />
    <div className='manage-courses-info-main-wrapper'>
      <div className="inner-main-head">
        <Button className='add-new-course-btn' onClick={() => navigate(`/manage-courses/add-courses`)}>
          <span className='fs-16 fw-600 border-radius-2'>Add New Course</span>
        </Button>
        <div className="inset-main-head">
          {/* <div className="search-and-filters"> */}
          {/* </div> */}
          <ManageCoursesFilters setsearchFilters={setsearchFilters}/>
          <Input
            className="search-input"

            onChange={debouncedResults}
            placeholder="Search"
            prefix={<img src={searchIcon} alt="searchIcon" width={24} height={24} style={{ marginRight: '0.623rem' }} />}
          />
        </div>
      </div>

      <div className="cards-wrapper">
        <CoursesList searchFilters={searchFilters} searchManageCourses={searchManageCourses}/>
      </div>
    </div>
    </>
  )
}

export default ManageCourses