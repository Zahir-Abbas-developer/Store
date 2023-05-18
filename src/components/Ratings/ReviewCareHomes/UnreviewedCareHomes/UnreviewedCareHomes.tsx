import { Button, Card, Col, Row } from "antd";
import { Rate } from "antd";
import { Input } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ClientAverageRating } from "../../../../mock/Ratings";
import "../../../../sass/common.scss";
import "./UnreviewdCareHomes.scss";

export const UnreviewCareHomes = () => {
  const { TextArea } = Input;
  return (
    <div className="ratings-reviews">
      {ClientAverageRating.map((clientData: any) => {
        return (
          <Card
            key={uuidv4()}
            className="cursor-pointer client-average"
            style={{
              boxShadow: "0px 0px 18px rgba(0, 0, 0, 0.08)",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <Row key={uuidv4()} className="unreviewed-ratings-care-home">
              <Col lg={24} xl={16} md={24} xs={24} sm={24}>
                <div className="d-flex align-center">
                  <img src={clientData.clientAverageImage} />
                  <div style={{ marginLeft: "22px" }}>
                    <p
                      className="fw-600 fs-14"
                      style={{ color: "#6E7191", marginTop: "0px" }}
                    >
                      {clientData?.title}
                    </p>
                  </div>
                </div>

                <Row style={{ marginBottom: "9px" }}>
                  <Col
                    className="unreviewed-care-shift-details"
                    xxl={{ span: 4, offset: 2 }}
                    lg={6}
                    xl={12}
                    md={12}
                    xs={24}
                    sm={12}
                  >
                    <p className="fw-600 fs-12" style={{ color: "#6E7191" }}>
                      Date
                    </p>
                    <p className="fw-600 fs-12" style={{ color: "#6E7191" }}>
                      Shift Timing
                    </p>
                    <p className="fw-600 fs-12" style={{ color: "#6E7191" }}>
                      Check In/Check Out Time
                    </p>
                    <p className="fw-600 fs-12" style={{ color: "#6E7191" }}>
                      Department
                    </p>
                  </Col>
                  <Col
                    xxl={{ span: 5, offset: 1 }}
                    lg={6}
                    xl={12}
                    md={12}
                    xs={24}
                    sm={12}
                  >
                    <p className="fw-400 fs-12" style={{ color: "#6E7191" }}>
                      {clientData?.date}
                    </p>
                    <p className="fw-400 fs-12" style={{ color: "#6E7191" }}>
                      {clientData?.shiftTiming}
                    </p>
                    <p className="fw-400 fs-12" style={{ color: "#6E7191" }}>
                      {clientData?.checkInOut}
                    </p>
                    <p className="fw-400 fs-12" style={{ color: "#6E7191" }}>
                      {clientData?.totalShiftHours}
                    </p>
                  </Col>
                  <Col xxl={6} lg={6} xl={12} md={12} xs={24} sm={12}>
                    <p className="fw-600 fs-12" style={{ color: "#6E7191" }}>
                      Total Shift Hours
                    </p>
                    <p className="fw-600 fs-12" style={{ color: "#6E7191" }}>
                      Total Shift Pay
                    </p>
                    <p className="fw-600 fs-12" style={{ color: "#6E7191" }}>
                      Extra Hours Worked
                    </p>
                  </Col>
                  <Col xxl={6} lg={6} xl={12} md={12} xs={24} sm={12}>
                    <p className="fw-400 fs-12" style={{ color: "#6E7191" }}>
                      {clientData?.totalShiftHours}
                    </p>
                    <p className="fw-400 fs-12" style={{ color: "#6E7191" }}>
                      {clientData?.totalShiftPay}
                    </p>
                    <p className="fw-400 fs-12" style={{ color: "#6E7191" }}>
                      {clientData?.extraHoursWorked}
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col
                lg={24}
                xl={8}
                md={24}
                xs={24}
                sm={24}
                className="client-average-ratings"
              >
                <p className="fw-600 fs-14" style={{ color: "#6E7191" }}>
                  Give Feedback
                </p>
                <TextArea
                  rows={4}
                  placeholder="Type here"
                  maxLength={6}
                  className="give-feedback-textarea"
                  style={{ borderRadius: "3px" }}
                />
                <div
                  className="d-flex align-center justify-between unreviewed-rate"
                  style={{ marginTop: "20px" }}
                >
                  <Rate
                    allowHalf
                    defaultValue={4}
                    style={{ color: "#FABF35" }}
                  />
                  <Button type="primary" >
                    Add Review
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        );
      })}
    </div>
  );
};
