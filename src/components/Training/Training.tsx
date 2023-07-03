import CoursesInfo from "./MainWidgets/CoursesInfo/CoursesInfo";

import TraineeServices from "./MainWidgets/TraineeServices/TraineeServices";
// import { coursesInfoData } from "../../mock/TrainingData/CoursesInfo";
import "./Training.scss";
import CourseProgress from "./MainWidgets/CourseProgress/CourseProgress";
import NewsAndActivity from "./MainWidgets/NewsAndActivity/NewsAndActivity";
import { Col, Row } from "antd";
import MandatoryGraph from "./MainWidgets/MandatoryGraph/MandatoryGraph";
import { mandatoryGraphData } from "../../mock/TrainingData/GraphData";
import TrainingProgress from "./MainWidgets/TrainingProgress/TrainingProgress";

//images 
import clockIcon from "../../assets/icons/carerDashboard/clock.png";
import clockIcon1 from "../../assets/icons/training/clock.png";
import clockIcon2 from "../../assets/icons/training/clock-1.png";
import bookingIcon from "../../assets/icons/carerDashboard/noun-booking.png";
import bookingIcon1 from "../../assets/icons/training/noun-booking.png";
import bookingIcon2 from "../../assets/icons/training/noun-booking-1.png";
import trainingGroupIcon from "../../assets/icons/training/training-group.png";
import trainingNoteIcon from "../../assets/icons/training/training-note.png";
import mandatoryIcon from "../../assets/icons/training/mandatory.png";
import popularIcon from "../../assets/icons/training/popular.png";
import optionalIcon from "../../assets/icons/training/optional.png";
import trainingIcon from "../../assets/icons/training/carer-training.png";
import { useGetCararTrainingStatsQuery, useGetCoursesStatsQuery } from "../../store/Slices/Training";
import { useEffect } from "react";
import { ROLES } from "../../constants/Roles";

const Training = () => {


  const { data, isLoading, isError, isSuccess } = useGetCoursesStatsQuery([])
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
  // console.log("getCoursesQuery =>>",getCoursesQuery.data)



  const { data: isTrainingData, isLoading: isLoadingTraining, isError: isisTrainingError, isSuccess: isTrainingSuccess } = useGetCararTrainingStatsQuery([])
  let getTrainingCourseData: any;
  if (isLoadingTraining) {
    getTrainingCourseData = <p>Loading...</p>
  }
  else if (isTrainingSuccess) {
    getTrainingCourseData = isTrainingData
  }
  else if (isisTrainingError) {
    getTrainingCourseData = <p>Error...</p>
  }
  console.log("getTrainingCourseData =>>", getTrainingCourseData?.data)


  const dataCheck = getCoursesQuery?.data?.length
  const dataCheckTraining = getTrainingCourseData?.data?.length

  const coursesInfoData: any = [
    {
      color: "blue",
      title: "Mandatory",
      btnTitle: "View Courses",
      link: '/training/courses/MANDATORY',
      details: [
        { icon: clockIcon, title: "Total Courses", count: `${dataCheck ? getCoursesQuery?.data[0]?.totalCourses : 'nan'}` },
        { icon: bookingIcon, title: "Courses Enrolled", count: `${dataCheck ? getCoursesQuery?.data[0]?.enrolledCourses : 'nan'}` },
      ],
      img: mandatoryIcon,
      allowdedRoles: [ROLES.admin, ROLES.superAdmin, ROLES.coordinator, ROLES.client, ROLES.carer],
    },
    {
      color: "yellow",
      title: "Most Popular",
      btnTitle: "View Courses",
      link: '/training/courses/POPULAR',
      details: [
        { icon: clockIcon2, title: "Total Courses", count: `${dataCheck ? getCoursesQuery?.data[1]?.totalCourses : 'nan'}` },
        { icon: bookingIcon2, title: "Courses Enrolled", count: `${dataCheck ? getCoursesQuery?.data[1]?.enrolledCourses : 'nan'}` },
      ],
      img: popularIcon,
      allowdedRoles: [ROLES.admin, ROLES.superAdmin, ROLES.coordinator, ROLES.client, ROLES.carer],
    },
    {
      color: "pink",
      title: "Optionals",
      btnTitle: "View Courses",
      link: '/training/courses/OPTIONAL',
      details: [
        { icon: clockIcon1, title: "Total Courses", count: `${dataCheck ? getCoursesQuery?.data[2]?.totalCourses : 'nan'}` },
        { icon: bookingIcon1, title: "Courses Enrolled", count: `${dataCheck ? getCoursesQuery?.data[2]?.enrolledCourses : 'nan'}` },
      ],
      img: optionalIcon,
      allowdedRoles: [ROLES.admin, ROLES.superAdmin, ROLES.coordinator, ROLES.client, ROLES.carer],
    },
    {
      color: "green",
      title: "Carer Training",
      btnTitle: "View Details",
      link: '/training/carer-training',
      details: [
        { icon: trainingGroupIcon, title: "Total Carers", count: `${getTrainingCourseData?.data ? getTrainingCourseData?.data?.totalCarers : 'nan'}` },
        { icon: trainingNoteIcon, title: "Total Courses", count: `${getTrainingCourseData?.data ? getTrainingCourseData?.data?.totalCourses : 'nan'}` },
      ],
      img: trainingIcon,
      allowdedRoles: [ROLES.admin, ROLES.superAdmin, ROLES.client, ROLES.coordinator,],
    },
  ];

  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");

  // console.log(role === ROLES.carer)

  useEffect(() => {

  }, [data, isTrainingData])


  return (
    <div className="training-wrapper">
      <Row gutter={[20, 20]}>
        {coursesInfoData.map((courseInfo: any, index: number) => (
          courseInfo.allowdedRoles.includes(role) && (
            <Col key={index} xxl={role !== ROLES.carer ? 6 : 8} lg={12} md={12} xs={24}>
              <CoursesInfo courseInfo={courseInfo} />
            </Col>
          )
        ))}
      </Row>

      <Row style={{ marginTop: "22px" }} gutter={[20, 20]}>
        <Col xxl={9} lg={12} md={12} xs={24}>
          <CourseProgress />
        </Col>
        <Col xxl={6} lg={12} md={12} xs={24}>
          <TraineeServices />
        </Col>
        <Col xxl={9} lg={12} md={12} xs={24}>
          <NewsAndActivity />
        </Col>
        {role !== ROLES.carer && <Col xxl={15} lg={12} md={12} xs={24}>
          <TrainingProgress />
        </Col>}
        {role !== ROLES.carer && <Col xxl={9} lg={12} md={12} xs={24}>
          <MandatoryGraph />
        </Col>}
      </Row>
    </div>
  );
};

export default Training;
