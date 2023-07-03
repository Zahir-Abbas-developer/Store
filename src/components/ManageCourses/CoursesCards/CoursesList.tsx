
import { allCourses } from "../../../mock/ManageCoures/CoursesData";
import { useGetCoursesQuery } from "../../../store/Slices/ManageCourse";
import ApiLoader from "../../ApiLoader/ApiLoader";
import CourseCard from "./CourseCard";

const CoursesList = ({ searchManageCourses, searchFilters }: any) => {
  //query parameters of search and filter
  const paramsObj: any = {};
  if (searchManageCourses) paramsObj["search"] = searchManageCourses;
  if (searchFilters) paramsObj["courseType"] = searchFilters;
  const query = "&" + new URLSearchParams(paramsObj).toString();



  const { data, isLoading, isError, isSuccess } = useGetCoursesQuery({ query })

  let manageCourse: any;
  if (isLoading) {
    manageCourse = <p>Loading...</p>
  }
  else if (isSuccess) {
    manageCourse = data
  }
  else if (isError) {
    manageCourse = <p>Error...</p>
  }
  console.log('manageCourse',manageCourse?.data)






  return (
    <>
      <div className="courses-list">
        {isSuccess ?
          <div className="cards-list">
            {manageCourse?.data?.map((course: any, index:any) => (
              <div className="single-card" key={index}>
                <CourseCard courseData={course} />
              </div>
            ))}
          </div>
          :
          <div style={{margin:"0 auto"}}><ApiLoader/></div>
        }
      </div>
    </>

  );
};

export default CoursesList;
