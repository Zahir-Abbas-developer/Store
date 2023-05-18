import { coursesData } from "../../../../mock/TrainingData/CarerTraining";
import { useGetCarerCoursesQuery } from "../../../../store/Slices/Training";
import CourseCard from "./CourseCard";

const CoursesList = ({ activeTab, carerSelectedId }: any) => {
  const filteredData = coursesData.filter((course: any) => course.courseStatus === activeTab);

  console.log("activeTab=>", activeTab)


  const { data, isLoading, isError, isSuccess } = useGetCarerCoursesQuery({ carerId: carerSelectedId, status: activeTab })

  let getCarerCourses: any;
  if (isLoading) {
    getCarerCourses = <p>Loading...</p>
  }
  else if (isSuccess) {
    getCarerCourses = data
  }
  else if (isError) {
    getCarerCourses = <p>Error...</p>
  }

  console.log("getCarerCourses +=>", getCarerCourses?.data)


  return (
    <>
      {
        carerSelectedId ? (
          <div className="cards-list">
            {getCarerCourses?.data && getCarerCourses?.data.map((course: any, index: number) => (
              <div key={index} className="single-card">
                <CourseCard course={course} carerSelectedId={carerSelectedId}/>
              </div>
            ))}
          </div>
        ) : (
          <div style={{marginLeft:'20px'}}>Select carer to view courses</div>
        )
      }</>
  );
};

export default CoursesList;
