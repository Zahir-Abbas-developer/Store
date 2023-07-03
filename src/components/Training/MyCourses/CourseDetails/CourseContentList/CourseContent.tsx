import { Checkbox, Collapse } from "antd";
import { collapsData } from "../../../../../mock/TrainingData/CollapsData";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect, useState } from "react";
import index from "../../../../../pages/ShiftManager/ShiftBooking";
import { useGetMyCoursesSectionLecturesQuery, usePostMarkasCompletedMutation } from "../../../../../store/Slices/Training";
import { useLocation } from "react-router-dom";

import videoIcon from "../../../../../assets/icons/training/video-player.png";

import AppSnackbar from "../../../../../utils/AppSnackbar";

const { Panel } = Collapse;

const CourseContent = ({ setShowDocument, setVideoToPlay, courseData, captureContentHandler, isInstructor, state }: any) => {

  const { pathname } = useLocation()
  const route = pathname.split('/')

  const [sectionId, setsectionId] = useState()

  const [postMarkasCompleted] = usePostMarkasCompletedMutation()

  const { data, isLoading, isError, isSuccess } = useGetMyCoursesSectionLecturesQuery({ courseId: isInstructor ? route[4] : route[3], sectionId: sectionId, createdBy: state?.createdBy, isInstructor:isInstructor })
  let getLecturesData: any;
  if (isLoading) {
    getLecturesData = <p>Loading...</p>
  }
  else if (isSuccess) {
    getLecturesData = data
  }
  else if (isError) {
    getLecturesData = <p>Error...</p>
  }
  console.log("getLecturesData =>>", getLecturesData?.data)

  console.log("courseData", courseData)


  const RenderPanel = ({ title }: any) => {
    return <div>{title}</div>;
  };

  const handelMarkAsCompleted = async (element: any) => {
    console.log(element)

    const payload = {
      "courseId": element?.courseId,
      "lectureId": element?._id
    }
    const isInstructorPayload = {
      "createdBy": state?.createdBy,
      "courseId": route[4],
      "lectureId": element?._id
    }

    try {
      await postMarkasCompleted({ payload:isInstructor ? isInstructorPayload :payload, isInstructor }).unwrap();
      AppSnackbar({
        type: "success",
        messageHeading: "Sucessfull",
        message: "Lecture sucessfully marked as completed"
      });
    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }

  };
  const handleContent = (item: any) => {
    console.log("item x=>", item)
    if(item?.lectureMedia?.mediaMeta){
      if( item.lectureMedia.mediaMeta.extension === "mp4"){
          setShowDocument(false)
          setVideoToPlay(`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${item?.lectureMedia?.mediaId}.${item?.lectureMedia?.mediaMeta?.extension}`);
      }else{
        setShowDocument(item?.lectureMedia)
      }
    }
    
    


    captureContentHandler(item)
  };

  const handlePanelClick = (item: any) => {
    // Code to be executed when Panel is clicked
    setsectionId(item._id);
  }

  const sectionsData = route[2] === 'trainee-courses' ?  courseData?.sections : courseData?.sections

  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");

  console.log("role", role)

  useEffect(() => {

  }, [courseData, sectionsData])

  return (
    <div className="course-content">
      <h1 className="course-title fs-16 fw-500 m-0">
        
        {courseData && route[2] === 'trainee-courses' ?  courseData[0]?.courseTitle || courseData?.courseTitle : courseData?.courseTitle }
      </h1>
      <div className="collaps-wrapper">
        <div className="collaps-panel">
          <Collapse
            accordion
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) =>
              isActive ? (
                <MinusOutlined
                  style={{ color: "#969BA0", width: "10px", height: "10px" }}
                />
              ) : (
                <PlusOutlined
                  style={{ color: "#969BA0", width: "10px", height: "10px" }}
                />
              )
            }
            className="collaps"
          >
            {sectionsData ? sectionsData?.map((item: any, index: any) => (
              <Panel
                header={
                  <div onClick={(e: any) => handlePanelClick(item)}>
                    {item?.sectionTitle}
                  </div>
                }
                key={index + 1}

              >
                {item?.lectures && item?.lectures?.map((item: any, index: number) => (
                  <div key={index} className="panel-content">
                    <Checkbox onClick={() => handelMarkAsCompleted(item)} checked={item?.markAsComplete} disabled={role === "training_instructor" ? true : false}/>
                    <div
                      onClick={() => handleContent(item)}
                      className="cursor-pointer"
                    >
                      <p className="content-name m-0">
                        {index + 1}. {item?.lectureTitle}
                      </p>
                      <div
                        style={{ gap: "5px" }}
                        className="d-flex align-center"
                      >
                        <img src={videoIcon} alt="icon" />
                        <span className="fs-12 fw-400 label-color">
                          00:00:00
                        </span>
                      </div>
                    </div>
                  </div>
                )) }
              </Panel>
            )) : <span>no data found</span>}
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
