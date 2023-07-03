import { Progress } from "antd";
import { Link } from "react-router-dom";

const CourseCard = ({ course }: any) => {
  return (
    <div className="course-card">
      <div className="course-content w-100">
        <div className="img-container">
          <img 
          // src={course?.img}
          src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${course?.image[0]?.mediaId}.${course?.image[0]?.mediaMeta?.extension}`} 
          alt="course-1" className="w-100" />
          <div className="overlay">
            <div className="d-flex align-center justify-center" style={{ height: "100%" }}>
              <Link to={`/training/my-courses/${course.id}`}>
                <button className="btn fs-16 fw-500">Read more</button>
              </Link>
            </div>
          </div>
        </div>
        <p className="course-name fs-16-fw-500 m-0">{course?.title}</p>
        <div>
          <Progress
            className="progress"
            strokeColor="#65CDF0"
            showInfo={false}
            percent={course?.progress}
          />
        </div>
        {course?.progress === 0 ? (
          <p className="completion-status fs-14 fw-400 m-0">Start Course</p>
        ) : (
          <p className="completion-status fs-14 fw-400 m-0">{course?.progress.toFixed(2)}% completed</p>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
