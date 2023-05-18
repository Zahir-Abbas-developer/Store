import { Card, Col, Progress, Row } from "antd";
import { AverageRatings, OverAllRatingsData } from "../../../mock/Ratings";
import { Rate } from "antd";
import { v4 as uuidv4 } from "uuid";
import "../../../sass/common.scss";
import "./OverAllRatings.scss";
import { AverageRatingsGraph } from "./AverageRatingsGraph";
const OverAllRatings = () => {
  return (
    <Row gutter={[26, 26]}>
      <Col lg={24} xxl={18} xl={24} md={24} xs={24} sm={24}>
        <Card>
          <p
            className="fw-500 fs-20 m-0"
            style={{ color: "#333333", marginBottom: "20px" }}
          >
            Reviews
          </p>
          {OverAllRatingsData.map((ratingsData: any) => {
            return (
              <Card
                key={uuidv4()}
                style={{
                  boxShadow: "0px 0px 18px rgba(0, 0, 0, 0.08)",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              >
                <Row>
                  <Col lg={24} xl={24} md={24} xs={24} sm={24}>
                    <div className="d-flex align-center reviews-ratings">
                      <img src={ratingsData.img} />
                      <div style={{ marginLeft: "22px" }}>
                        <p
                          className="fw-600 fs-14"
                          style={{ color: "#6E7191", marginTop: "0px" }}
                        >
                          {ratingsData.title}
                        </p>
                        <Rate
                          allowHalf
                          defaultValue={ratingsData.stars}
                          style={{ color: "#FABF35" }}
                        />
                        <p
                          className="fw-400 fs-14"
                          style={{ color: "#9DA1A6", marginTop: "0px" }}
                        >
                          {ratingsData.description}
                        </p>
                      </div>
                    </div>
                    <p
                      className="fw-400 fs-14 m-0"
                      style={{ color: "#969BA0", textAlign: "end" }}
                    >
                      {ratingsData?.createdDate}
                    </p>
                  </Col>
                </Row>
              </Card>
            );
          })}
        </Card>
      </Col>
      <Col lg={24} xxl={6} xl={24} md={24} xs={24} sm={24}>
        <Card>
          <p className="fw-500 fs-20 m-0" style={{ color: "#14142B" }}>
            Average Rating
          </p>
          <div style={{ textAlign: "center" }}>
            <AverageRatingsGraph />
          </div>

          {AverageRatings.map((averageRatingsData) => {
            return (
              <Row style={{ marginBottom: "10px" }} key={uuidv4()}>
                <Col xl={12} lg={24} sm={24} xs={24} md={24}>
                  <Rate
                    allowHalf
                    defaultValue={averageRatingsData.star}
                    style={{ color: "#FABF35" }}
                  />
                </Col>
                <Col xl={12} lg={24} sm={24} xs={24} md={24}>
                  <div style={{ display: "flex", marginTop: "4px" }}>
                    <Progress
                      percent={averageRatingsData.progressValue}
                      className="progress-bar"
                      strokeColor={averageRatingsData.strokeColor}
                      showInfo={false}
                    />
                    <span>({averageRatingsData.totalRatings})</span>
                  </div>
                </Col>
              </Row>
            );
          })}
        </Card>
      </Col>
    </Row>
  );
};
export default OverAllRatings;
