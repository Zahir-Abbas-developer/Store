import { Card, Col, Row } from "antd";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { recentActivitiesOfEmployee } from "../../../mock/SuperAdmin";
import Dot from "../../../assets/images/SuperAdminDashboard/dot-scroll.png";
import recentemployee from "../../../assets/images/MockImages/recent-employee-avatar.png";
import "./RemindersActivities.scss";
import { useGetAuditLogsRequestQuery } from "../../../store/Slices/AuditLogs";
import dayjs from "dayjs";

//Main
export const RemindersActivities = () => {
  const { data, isSuccess } = useGetAuditLogsRequestQuery({ refetchOnMountOrArgChange: true, page: "1", limit: "10" });
  let recentActivities: any;
  if (isSuccess) {
    recentActivities = data;
  }
  console.log(recentActivities);
  return (
    <div className="super-admin-dashbboard">
      <Row>
        <Col xl={24} md={24} xs={24}>
          <Card
            className="remiders-activities-cards"
            style={{
              // border: "1px solid #DADEE8",
              boxShadow: "-7.07129px 7.07129px 10.6069px rgba(131, 164, 249, 0.15)",
              borderRadius: "8px",
              // padding: "18px",
              // height: "90%",
            }}
          >
            {/* <Card
              className="reminders"
              style={{
                // border: "1px solid #DADEE8",
                boxShadow: "-7.07129px 7.07129px 10.6069px rgba(131, 164, 249, 0.15)",
                borderRadius: "8px",
                marginBottom: 2,
                paddingTop: 2,
                paddingLeft: 2,
                paddingRight: 2,
                paddingBottom: 3,
              }}
            >
              <p className="fs-16 fw-500" style={{ color: "#152536" }}>
                Reminders
              </p>
              <div className="d-flex align-center justify-between" style={{ position: "relative", paddingTop: "2px" }}>
                <p style={{ marginBottom: "0px" }} className="fs-12 fw-400 tooltip-bg-dark">
                  Meeting with client Adam on 11 Nov at 3pm
                </p>
                <p style={{ marginBottom: "0px", color: "#6C757D" }} className="fs-10 fw-400 ">
                  1 hour left
                </p>
              </div>
            </Card> */}

            <Card
              className="recent-activities-card"
              bordered={false}
              style={{
                marginTop: "5px",
                boxShadow: "-7.07129px 7.07129px 10.6069px rgba(131, 164, 249, 0.15)",
                borderRadius: "8px",
                paddingTop: "0px",
                paddingLeft: 1,
                paddingRight: 1,
              }}
            >
              <p className="fs-16 fw-500 ">Recent Activities</p>

              <Col className="custom-scroll" xl={24} md={24} xs={24} style={{ overflowY: "scroll", height: "16rem", marginTop: 0.8 }}>
                <div>
                  {recentActivities?.result?.length > 1 &&
                    recentActivities?.result?.map((activity: any) => {
                      return (
                        <Fragment key={uuidv4()}>
                          <Row className="timeline-content-wrapper">
                            <Col xs={4} lg={4} xl={3} style={{ paddingTop: "10px" }}>
                              <p className="fs-10 fw-400">{dayjs(activity?.createdAt).format("DD MMM")}</p>
                            </Col>
                            <Col xs={20} lg={20} xl={21}>
                              <div style={{ borderLeft: "4px solid #DFE0EA", padding: "10px 10px 4px 16px" }}>
                                <div>
                                  <img className="timeline-before-circle" src={Dot} alt="" />
                                  <p className="fs-12 fw-600 selected-field-color" style={{ marginBottom: "1rem", color: "#152536" }}>
                                    {activity?.activityType}
                                  </p>
                                  <Row align="middle">
                                    <Col
                                      xl={18}
                                      sm={24}
                                      xs={24}
                                      className="d-flex recent-activites-avatar-description"
                                      style={{ alignItems: "flex-start" }}
                                    >
                                      <img className="recent-activity-user-img" src={recentemployee} alt="" width={25} height={25} />
                                      <p className="fs-10 fw-400 line-height-20" style={{ marginLeft: "0.5rem", marginBottom: 0, color: "#6C757D" }}>
                                        {activity?.activityName}
                                      </p>
                                    </Col>
                                    <Col xl={6} sm={24} xs={24} style={{ textAlign: "end" }}>
                                      {/* <span
                                        style={{
                                          padding: "0.3rem 0.6rem",
                                          textAlign: "center",
                                          color: "#fff",
                                          display:'felx',
                                          borderRadius: "4px",
                                          backgroundColor: "#4E132C",
                                          textTransform: "capitalize",
                                          fontSize: "10px",
                                        }}
                                      >
                                        {activity?.activityType}
                                      </span> */}
                                      <p className="fs-12 selected-field-color">{dayjs(activity?.createdAt).format("DD MMM")}</p>
                                    </Col>
                                  </Row>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Fragment>
                      );
                    })}
                  {recentActivities?.result?.length === 0 && <p className="disabled-color fw-700">No Activity</p>}
                </div>
              </Col>
            </Card>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
