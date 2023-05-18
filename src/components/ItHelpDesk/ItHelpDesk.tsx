import { Col, Row } from "antd";
import { MyTicketDetails } from "./ItHelpDeskDashboard/MyTicketDetails";
import TicketsSummary from "./ItHelpDeskDashboard/TicketsSummary";
import TaskSummaryGraph from "./ItHelpDeskDashboard/TaskSummaryGraph";
import BreadCrumb from "../../layout/BreadCrumb/BreadCrumb";
import "../../sass/common.scss";

export const ItHelpDesk = () => {
  const breadCrumbItems = [
    {
      title: "IT Help Desk",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
  ];
  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xl={10} lg={24}>
          <div className="bg-white border-radius-12 padding-30" style={{ marginBottom: "30px", maxHeight: "100%", minHeight: "80vh" }}>
            <h6
              className="fs-20 fw-600 line-height-18 m-0"
              style={{
                color: "#23262F",
                marginBottom: "30px",
              }}
            >
              Tickets Summary
            </h6>

            <TicketsSummary />
          </div>
        </Col>

        <Col className="gutter-row" xs={24} sm={24} md={24} xl={14} lg={24}>
          <div className="bg-white border-radius-12 padding-30" style={{ marginBottom: "30px", height: "auto" }}>
            <div style={{ marginBottom: "30px" }}>
              <h6 className="fs-20 fw-600 line-height-18 m-0" style={{ color: "#23262F" }}>
                Task Summary
              </h6>
            </div>
            <TaskSummaryGraph />
          </div>
          <div className="bg-white border-radius-12" style={{ minHeight: "38.49vh", maxHeight: "auto" }}>
            <MyTicketDetails />
          </div>
        </Col>
      </Row>
    </>
  );
};
