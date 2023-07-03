import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import CourseContent from "./CourseContentList/CourseContent";
import "./CourseDetails.scss";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import { useGetMyCoursesByIdQuery } from "../../../../store/Slices/Training";
import ApiLoader from "../../../ApiLoader/ApiLoader";

const CourseDetails = () => {

  const { pathname } = useLocation()
  const route = pathname.split('/')

  const isInstructor = route[2] === "trainee-courses"
  const { state }: any = useLocation()
  console.log("state", state?.selectedObject)

  const [selectedContentContex, setselectedContentContex] = useState<any>(state?.selectedObject)
  const [showDocument, setShowDocument] = useState(true);
  const [videoToPlay, setVideoToPlay] = useState<any>();
  const { id } = useParams();

  



  const isTrainingCourses = route[2]



  console.log("selectedContentContex", selectedContentContex)
  console.log("videoToPlay", videoToPlay)


  useEffect(() => {

  }, [videoToPlay])


  const { data, isLoading, isError, isSuccess } = useGetMyCoursesByIdQuery({ id: route[3], isInstructor: isInstructor, createdBy: state?.createdBy, courseId: route[4] || route[3] })
  let getViewCourseData: any;
  if (isLoading) {
    getViewCourseData = <p>Loading...</p>
  }
  else if (isSuccess) {
    getViewCourseData = data
  }
  else if (isError) {
    getViewCourseData = <p>Error...</p>
  }
  console.log("getViewCourseData =>>", getViewCourseData?.data)

  useEffect(() => {

  }, [data])


  const captureContentHandler = (children: any) => {
    setselectedContentContex(children)
  }

  console.log("selectedContentContex", selectedContentContex)


  return (
    <>
      {
        isSuccess ? <div className="course-details-wrapper">
          <Row gutter={[20, 20]}>
            <Col xxl={8} xl={10} xs={24}>
              <CourseContent
                setVideoToPlay={setVideoToPlay}
                setShowDocument={setShowDocument}
                courseData={getViewCourseData?.data[0]}
                captureContentHandler={captureContentHandler}
                isInstructor={isInstructor}
                state={state}
              />
            </Col>
            <Col xxl={16} xl={14} xs={24}>
              <VideoPlayer videoToPlay={videoToPlay} showDocument={showDocument} selectedContentContex={selectedContentContex}/>
            </Col>
          </Row>
        </div> : <ApiLoader />
      }
    </>

  );
};

export default CourseDetails;
