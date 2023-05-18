import { useState } from "react";
import { Card, Col, Layout, Row, Spin } from "antd";
import { v4 as uuidv4 } from "uuid";
import { TopCandidatesData } from "../../../../mock/Dashboard";
import "./TopCandidates.scss";
import { LoadingOutlined } from "@ant-design/icons";

export const TopCandidates = ({ topCandidatesData }: any) => {
  //state
  const [selectedShiftComprehension, setSelectedShiftComprehension] = useState("months");

  //Shift Comprehension Card Filter values
  const topCandidatesFilter = [
    { id: "months", label: "Months" },
    { id: "weeks", label: "Weeks" },
  ];
  //Get Filter values deponding upon on which filter value we want i.e Weeks and Month
  const handleChangeFilterValues = (id: any) => {
    setSelectedShiftComprehension(id);
  };
  //getColor Function it will change border color of card deponding upon card id
  const getColor = (id: any) => {
    return selectedShiftComprehension === id ? "#4E132C" : "#C4C4C4";
  };
  //Main
  return (
    <Layout className="dashboard bg-unset">
      {
        <Card
          className=" top-candidates overallscroe-card border-radius-10 card-bg-color"
          bordered={false}
          style={{
            boxShadow: "0px 12px 23px rgba(62, 73, 84, 0.04)",
            minHeight: "504px",
          }}
        >
          <div className="top-candidates-card">
            <div style={{ display: "flex" }}>
              <p className="fw-500 fs-20" style={{ color: "#4E4B66", marginTop: "0px" }}>
                Top Candidates
              </p>
            </div>
            <div className="filter-score">
              <Row>
                {topCandidatesFilter.map((item) => (
                  <Col
                    key={item.id}
                    sm={12}
                    style={{
                      borderRight: item.id === "months" ? "1px solid #a0acbb" : "none",
                    }}
                  >
                    <span
                      className={`lowest fw-400 fs-16 cursor-pointer ${selectedShiftComprehension === item.id ? "active" : ""}`}
                      onClick={() => handleChangeFilterValues(item.id)}
                      style={{ color: getColor(item.id), margin: "0px 10px" }}
                    >
                      {item.label}
                    </span>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
          {!topCandidatesData && <div style={{ textAlign: "center", paddingTop: "30px" }}><Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} /></div>}
          {topCandidatesData && <div style={{ maxHeight: "400px", overflow: "auto" }} className="top-projects-candidates-details">
            <Row gutter={[10, 10]}>
              {selectedShiftComprehension === "weeks" &&
                topCandidatesData?.topCandidatesWeekly.slice(0, 5)?.map((card: any, index: any) => {
                  return (
                    <Col md={24} lg={24} xl={24} sm={24} xs={24}>
                      <Card
                        className="border-radius-10 top-candidates-cards"
                        key={index}
                        style={{
                          borderTop: "none",
                          boxShadow: "0px 0px 4px rgba(62, 73, 84, 0.28)",
                        }}
                      >
                        <div className="d-flex align-center justify-between top-candidates-details">
                          <div className="d-flex align-center">
                            <img
                              src={card?.profilePhoto?.mediaId ? `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${card?.profilePhoto?.mediaId}.${card?.profilePhoto?.mediaMeta?.extension}` : `https://ui-avatars.com/api/?name=${card?.firstName}+${card?.lastName}`}
                              height={37}
                              width={37}
                              style={{
                                background: "#F7B923",
                                borderRadius: "50%",
                                // padding: "5px",
                              }}
                              alt={`Image for ${card.text}`}
                            />
                            <span className="fw-600 fs-14" style={{ paddingLeft: "10px" }}>
                              {card?.users}
                            </span>
                          </div>
                          <p
                            className="fw-500 fs-16 top-candidates-button m-0"
                            style={{
                              background: "rgb(101, 205, 240)",
                              color: "#FCFCFC",
                              padding: "2px 11px",
                              borderRadius: "5px",
                            }}
                          >
                            {`${card?.totalHours.toFixed(2, 0)} HRs`}
                          </p>
                        </div>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </div>}
          {topCandidatesData && <div style={{ maxHeight: "400px", overflow: "auto" }} className="top-projects-candidates-details">
            <Row gutter={[10, 10]}>
              {selectedShiftComprehension === "months" &&
                topCandidatesData?.topCandidatesMonthly.slice(0, 5)?.map((card: any, index: any) => {
                  return (
                    <Col md={24} lg={24} xl={24} sm={24} xs={24}>
                      <Card
                        className="border-radius-10 top-candidates-cards"
                        key={index}
                        style={{
                          borderTop: "none",
                          boxShadow: "0px 0px 4px rgba(62, 73, 84, 0.28)",
                        }}
                      >
                        <div className="d-flex align-center justify-between top-candidates-details">
                          <div className="d-flex align-center">
                            <img
                              src={card?.profilePhoto?.mediaId ? `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${card?.profilePhoto?.mediaId}.${card?.profilePhoto?.mediaMeta?.extension}` : `https://ui-avatars.com/api/?name=${card?.firstName}+${card?.lastName}`}
                              height={37}
                              width={37}
                              style={{
                                background: "#F7B923",
                                borderRadius: "50%",
                              }}
                              alt={`Image for ${card.text}`}
                            />
                            <span className="fw-600 fs-14" style={{ paddingLeft: "10px" }}>
                              {card?.users}
                            </span>
                          </div>
                          <p
                            className="fw-500 fs-16 top-candidates-button m-0"
                            style={{
                              background: "rgb(101, 205, 240)",
                              color: "#FCFCFC",
                              padding: "2px 11px",
                              borderRadius: "5px",
                            }}
                          >
                            {`${card?.totalHours.toFixed(2, 0)} HRs`}
                          </p>
                        </div>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </div>}
        </Card>
      }
    </Layout>
  );
};
