import { Card, Col, Row } from "antd"
import { ActivitySessionsData } from "../../../../mock/SuperAdmin"
import "../../../../sass/common.scss"
import "./ActivitySessions.scss"
import activitysessions  from "../../../../assets/icons/SuperAdminDashboard/activity-sessions.svg"

//Main
const ActivitySessions = () => {
  return (
    <Card className="super-admin" style={{minHeight:"300px",boxShadow:"-7.07129px 7.07129px 10.6069px rgba(131, 164, 249, 0.15)"}}>
      <Row gutter={[21, 21]} >
        {ActivitySessionsData.map((superAdminData: any) => {
          return (
            <Col xs={24} xl={12} lg={24} md={24} sm={24} key={superAdminData.id}>
              <Card className="activity-sessions-card"
                style={{  borderRadius: "14px",boxShadow:"-7.07129px 7.07129px 10.6069px rgba(131, 164, 249, 0.15)"}}
              >
                <p style={{ color: superAdminData.color,marginTop:"0px"}} className=" fw-400 fs-12">
                  {superAdminData.title}
                </p>
                <p style={{ color: superAdminData.color }} className="text-center fs-16 fw-500">
                  {superAdminData.description}
                </p>
                <div>
                  <span className="border-radius-4" style={{background:superAdminData.backgroundColorPercentageText ,color:"#4AB58E",padding:"2px 4px"}}><span><img src={activitysessions} alt="review-care-homes"/> <span>{superAdminData.percentageText}</span></span></span>
                  <span className="fs-12 fw-400" style={{marginLeft:"5px",color:"#6C757D"}}>   {superAdminData.fromText}</span>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
}

export default ActivitySessions;
