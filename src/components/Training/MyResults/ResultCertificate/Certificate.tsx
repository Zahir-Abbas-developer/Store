import { Col, Row } from "antd";
import CertificateCard from "./CertificateCard";
import CertificateProfile from "./CertificateProfile";
import CertificateRating from "./CertificateRating";

import './Certificate.scss'
import { useLocation } from "react-router-dom";
import { useGetCarerCoursesCompletedQuery } from "../../../../store/Slices/Training";
import { useEffect } from "react";

const MyCertificate = () => {

 const { state }: any = useLocation()


 const { pathname } = useLocation()
 const route = pathname.split('/')
 const isResult = route[2] === "my-results"

//  console.log("state=>", state)

 const { data, isLoading, isError, isSuccess } = useGetCarerCoursesCompletedQuery({courseId:state?.courseId, carerId:state?.carerID, id:route[4], isResult:isResult})
  
 let getCetfificateData: any;
 if (isLoading) {
   getCetfificateData = <p>Loading...</p>
 }
 else if (isSuccess) {
   getCetfificateData = data
 }
 else if (isError) {
   getCetfificateData = <p>Error...</p>
 }
//  console.log("getCetfificateData =>>",getCetfificateData?.data)
 const dataCheck = getCetfificateData?.data?.length

 useEffect(() => {
   
 }, [data])
 

  return (
    <div className="certificate-wrapper">
      <Row gutter={[20, 20]}>
        <Col xxl={12} xs={24}>
          <Row gutter={[20, 20]}>
            <Col xl={24}>
              <CertificateProfile userData={getCetfificateData?.data?.user}/>
            </Col>
            <Col xl={24} style={{ width: "100%" }}>
              <CertificateRating courseIdObj={getCetfificateData?.data?.courseId} isResult={isResult} ratingData={getCetfificateData?.data?.rating} courseId={state?.courseId}/>
            </Col>
          </Row>
        </Col>
        <Col xxl={12} xs={24}>
          <CertificateCard certificate={getCetfificateData?.data?.certificate}/>
        </Col>
      </Row>
    </div>
  );
};

export default MyCertificate;
