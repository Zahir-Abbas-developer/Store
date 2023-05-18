import React from "react";
import { Row, Col } from "antd";
import dayjs from "dayjs";

const TraningsCard = (props: any) => {
  const { staffData } = props;
  let counter = 0;
  return (
    <>
      <div className="tranings-card-wrapper">
        <h4 className="fs-20 fw-500 line-height-28 title-color">Tranings</h4>
        <Row gutter={[16, 16]} className="m-0">
          {staffData?.data?.result?.map((data: any) => (
            data?.additionalTraningCertificates?.map((nestedData: any) => (
              nestedData?.certificatesDetails?.map((nestedChildData: any) => {
                counter++;
                if (counter <= 3) {
                  return (
                    <>
                      <Col lg={12} md={24} xs={24} sm={24} className="m-0">
                        <span className="fs-12 fw-400 line-height-18">Training Name</span>
                        <p className="fs-14 fw-600 line-height-22 m-0">{nestedChildData?.trainingName}</p>
                      </Col>
                      <Col lg={12} md={24} xs={24} sm={24} className="m-0">
                        <p className="fs-12 fw-400 line-height-18 m-0">Next Minimum Expiray Date</p>
                        <p className="fs-14 fw-600 line-height-22 m-0">{dayjs(nestedChildData?.certificateExpiryDate).format("dddd, MMMM D, YYYY")}</p>
                      </Col>
                    </>
                  );
                }
              })
            ))
          ))}
        </Row>
      </div>
    </>
  );
};
export default TraningsCard;