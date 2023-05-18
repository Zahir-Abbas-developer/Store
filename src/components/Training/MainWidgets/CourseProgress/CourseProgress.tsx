import { Progress } from "antd";
import { useGetCourseCompletionQuery } from "../../../../store/Slices/Training";
import { useEffect } from "react";

const coursesProgress = [
  {
    color: "#65CDF0",
    course: "BLS: Adults & Children , AED and Recovery Position",
    completionStatus: 80,
  },
  {
    color: "#FF4D4F",
    course: "Medical Emergencies in General Practice ",
    completionStatus: 20,
  },
  {
    color: "#F7B923",
    course: "Mental Capacity Act, Human Rights and DoLS ",
    completionStatus: 40,
  },
  {
    color: "#65CDF0",
    course: "Medical Emergencies in General Practice ",
    completionStatus: 75,
  },
];

const CourseProgress = () => {

  const { data, isLoading, isError, isSuccess } = useGetCourseCompletionQuery([])

  let getCoursesCompletion: any;
  if (isLoading) {
    getCoursesCompletion = <p>Loading...</p>
  }
  else if (isSuccess) {
    getCoursesCompletion = data
  }
  else if (isError) {
    getCoursesCompletion = <p>Error...</p>
  }
  console.log("getCoursesCompletion =>>", getCoursesCompletion?.data)


  useEffect(() => {
  }, [data])



  return (
    <div className="courses-progress-card">
      <h1 className="title">Course Completion Progress</h1>
      <div className="courses-details">
        {
          isSuccess ?
            <>
              {getCoursesCompletion?.data?.length ? (getCoursesCompletion?.data?.map((item: any, index: number) => (
                <>
                  <div key={index} className="course">
                    <p className="course-title">{item?.courseTitle}</p>
                    <p
                      className="course-progress"
                      style={{ color: '#65CDF0' }}
                    >{`${item?.progress.toFixed(2)}%`}</p>
                  </div>
                  <Progress
                    className="progress"
                    strokeColor='#65CDF0'
                    showInfo={false}
                    percent={item?.progress}
                  />
                </>
              ))) : "No data found"}
            </>
            : "Loading"
        }

      </div>
    </div>
  );
};

export default CourseProgress;
