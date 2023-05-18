import { Progress } from "antd";
import { useNavigate } from "react-router-dom";
import playButton from "../../../../assets/icons/play-button.svg"
import './CourseCard.scss'

const CourseCard = ({ course, createdBy }: any) => {

  const navigate = useNavigate()

  console.log("course", course)

  return (
    <div className="course-card">
      <div className="course-content w-100">
        <div className="img-container">
          <img 
          // src={course?.image}
          src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${course?.image[0]?.mediaId}.${course?.image[0]?.mediaMeta?.extension}`}
           alt="course-1" className="w-100" style={{borderRadius:"10px", height:'163px'}} />
          <div onClick={() => navigate(`/trainee-info/trainee-courses/course-content/${course.id}`, { state: { createdBy: createdBy, isTraineeInfo:true } })} className="overlay">
            <div className="d-flex align-center justify-center" style={{ height: "100%" }}>
              <img src={playButton} alt="" />
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
        {course?.completed === 0 ? (
          <p className="completion-status fs-14 fw-400 m-0">Start Course</p>
        ) : (
          <p className="completion-status fs-14 fw-400 m-0">{course?.progress.toFixed(0)}% completed</p>
        )}
      </div> 
    </div>
  );
};

export default CourseCard;
