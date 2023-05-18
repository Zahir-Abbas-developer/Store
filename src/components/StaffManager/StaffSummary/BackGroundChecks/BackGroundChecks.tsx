import { Row, Col } from "antd";

const BackGroundChecks = ({ staffData }: any) => {
  return (
    <>
      <div className="background-checks-card-wrapper">
        <h4 className="fs-20 fw-500 line-height-28 title-color">Background Checks</h4>
        <Row gutter={[16, 16]} className="m-0">
          <Col xs={12} className="m-0">
            <span className="fs-12 fw-400 line-height-18">DBS (PVG)</span>
            <p className="fs-14 fw-600 line-height-22 m-0">{staffData?.data?.result[0].backgroundChecks?.dbs}</p>
          </Col>
          <Col xs={12} className="m-0">
            <p className="fs-12 fw-400 line-height-18 m-0">Right to Work</p>
            <p className="fs-14 fw-600 line-height-22 m-0">{staffData?.data?.result[0].backgroundChecks?.rightToWork}</p>
          </Col>
          <Col xs={12} className="m-0">
            <p className="fs-12 fw-400 line-height-18 m-0">NMC Registration</p>
            <p className="fs-14 fw-600 line-height-22 m-0">{staffData?.data?.result[0].backgroundChecks?.certificateNumber}</p>
          </Col>
          <Col xs={12} className="m-0">
            <p className="fs-12 fw-400 line-height-18 m-0">Pay Tax Code</p>
            <p className="fs-14 fw-600 line-height-22 m-0">{staffData?.data?.result[0].employmentStatus?.payTaxCode}</p>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default BackGroundChecks;