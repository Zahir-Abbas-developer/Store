import { useEffect, useState } from "react";
import { allCourses } from "../../../../mock/TrainingData/CoursesData";
import { useGetViewAllCoursesByCategoryQuery } from "../../../../store/Slices/Training";
import CourseCard from "./CourseCard";
import { useLocation } from "react-router-dom";

const CoursesList = ({query}:any) => {


const { pathname } = useLocation()
const route = pathname.split('/')

  // const { data, isLoading, isError, isSuccess } = useGetWebinarHistoryDataQuery({query})

  const { data, isLoading, isError, isSuccess } = useGetViewAllCoursesByCategoryQuery({courseType:route[3] ,query:query})
  let getCoursesQuery: any;
  if (isLoading) {
    getCoursesQuery = <p>Loading...</p>
  }
  else if (isSuccess) {
    getCoursesQuery = data
  }
  else if (isError) {
    getCoursesQuery = <p>Error...</p>
  }
  console.log("getCoursesQuery =>>",getCoursesQuery?.data)

  useEffect(() => {
    
  }, [data])
  

  return (
    <div className="courses-list">
      <div className="cards-list">
        {getCoursesQuery?.data && getCoursesQuery?.data?.map((course: any) => (
          <div className="single-card">
            <CourseCard courseData={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
