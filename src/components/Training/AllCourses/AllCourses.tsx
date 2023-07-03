import { Col, Input, Row } from "antd";

import SearchIcon from "../../../assets/icons/Search.png";
import { myResultsFilter } from "../../../mock/TrainingData/ResultDropDownData";
import CommonReportChildFilters from "../../Reports/CommonReportChildFilters/CommonReportChildFilters";
import "./AllCourses.scss";
import CoursesList from "./CoursesCards/CoursesList";
import { debouncedSearch } from "../../../utils/utils";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const AllCourses = () => {



  const [searchCourses, setsearchCourses] = useState()
  const [courseCategory, setcourseCategory] = useState()
  const debouncedResults = (event:any) => {
    const { value } = event.target;
    debouncedSearch(value, setsearchCourses);
  };



  const paramsObj: any = {};
if (searchCourses) paramsObj["search"] = searchCourses;
if (courseCategory) paramsObj["courseCategory"] = courseCategory;
const query =  "&" + new URLSearchParams(paramsObj).toString();
  
  return (
    <div className="courses-wrapper">
      <div className="top-header">
      <div className="content">
          <div className="select-wrapper">
            <CommonReportChildFilters filtersArray={myResultsFilter} setcourseCategory={setcourseCategory} />
          </div>
          <div className="input-search-wrapper">
            <Input
              placeholder="Search"
              prefix={<img src={SearchIcon} alt="search icon" className="icon" />}
              onChange={debouncedResults}
            />
          </div>
        </div>
      </div>
      <div className="courses">
        <CoursesList query={query}/>
      </div>
    </div>
  );
};

export default AllCourses;
