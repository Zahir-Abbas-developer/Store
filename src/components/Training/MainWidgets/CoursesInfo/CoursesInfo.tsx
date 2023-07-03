import { Link } from "react-router-dom";

const CoursesInfo = ({ courseInfo }: any) => {
  return (
    <div className="course-info-card">
      <div className="header">
        <h1 className={`title fw-500 ${courseInfo?.color}`}>{courseInfo?.title}</h1>
        <Link to={courseInfo?.link}>
          <button className={`link-btn fw-600 ${courseInfo?.color}`}>{courseInfo?.btnTitle}</button>
        </Link>
      </div>
      <div className="courses-details">
        <div>
          {courseInfo?.details?.map((item: any) => (
            <div className="courses-count">
              <img src={item.icon} alt="" />
              <p className="fw-600">
                {item?.title}: <span className="fw-400">{item?.count}</span>
              </p>
            </div>
          ))}
        </div>
        <img className="mandatory-icon" src={courseInfo?.img} alt="" />
      </div>
    </div>
  );
};

export default CoursesInfo;
