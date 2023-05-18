import { Row, Col } from "antd";

const EmploymentStatus = ({ staffData }: any) => {
  return (
    <>
      <div className="employment-status-card-wrapper">
        <h4 className="fs-20 fw-500 line-height-28 title-color">Employment Status</h4>
        <Row gutter={[16, 16]} className="m-0">
          <Col xs={12} className="m-0">
            <span className="fs-12 fw-400 line-height-18">Billing Type</span>
            <p className="fs-14 fw-600 line-height-22 m-0">{staffData?.data?.result[0].employmentStatus?.billingType}</p>
          </Col>
          <Col xs={12} className="m-0">
            <p className="fs-12 fw-400 line-height-18 m-0">Business Type</p>
            <p className="fs-14 fw-600 line-height-22 m-0">{staffData?.data?.result[0].employmentStatus?.BusinessType}</p>
          </Col>
          <Col xs={12} className="m-0">
            <p className="fs-12 fw-400 line-height-18 m-0">National Insurance No</p>
            <p className="fs-14 fw-600 line-height-22 m-0">{staffData?.data?.result[0].employmentStatus?.insuranceNo}</p>
          </Col>
          <Col xs={12} className="m-0">
            <p className="fs-12 fw-400 line-height-18 m-0">Pay Tax Code</p>
            <p className="fs-14 fw-600 line-height-22 m-0">{staffData?.data?.result[0].employmentStatus?.payTaxCode}</p>
          </Col>
          <Col xs={12} className="m-0">
            <p className="fs-12 fw-400 line-height-18 m-0">Nationality</p>
            <p className="fs-14 fw-600 line-height-22 m-0">{staffData?.data?.result[0].nationality}</p>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default EmploymentStatus;