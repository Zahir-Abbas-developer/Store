import { Progress } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import mailIcon from "../../../../assets/icons/training/mail-icon.png";
import viewIcon from "../../../../assets/icons/training/view-icon.png";

const CourseCard = ({ course, carerSelectedId }: any) => {

  const navigate = useNavigate()

  return (
    <div className={course.status === "INPROGRESS" ? "course-card overly" : "course-card"}>
      <div className="course-content w-100">
        <div className="img-container">
          {course?.image && <img
            // src={course?.img}
            src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${course?.image?.mediaId}.${course?.image?.mediaMeta?.extension}`}
            alt="course-1" className="w-100" style={{height:"100%"}}/>}
        </div>
        {course?.status === "INPROGRESS" || course?.status === "ENROLLED" ? (
          <>
            <p className="course-name fs-16-fw-500 m-0">{course?.title}</p>
            {course && course?.progress !== undefined && (
              <div>
                <Progress
                  className="progress"
                  strokeColor="#65CDF0"
                  showInfo={false}
                  percent={course?.progress}
                />
                {course?.progress === 0 ? (
                  <p className="completion-status fs-14 fw-400 m-0">Start Course</p>
                ) : (
                  <p className="completion-status fs-14 fw-400 m-0">
                    {course?.progress}% completed
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="course-title fs-16-fw-500 m-0">{course?.title}</p>
        )}

        <div style={{ marginTop: "15px" }} className="text-center">
          {course?.status === "COMPLETED" ? (
            // <Link to={`certificate/${course?.courseId}`}>
              <img className="cursor-pointer" src={viewIcon} alt="status" onClick={() => navigate(`certificate/${course?.courseId}` ,{ state: { carerID: carerSelectedId, courseId:course?.courseId  } })}/>
            // </Link>
          ) : (
            <img className="cursor-pointer" src={mailIcon} alt="status" />
          )}
        </div>
      </div>
      {/* <img
        className={
          course?.courseType === "optional" || course?.courseType === "mandatory" ? "icon" : "new"
        }
        src={course?.icon}
        alt="icon"
      /> */}
    </div>
  );
};

export default CourseCard;
