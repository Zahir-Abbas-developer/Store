import { Col, Layout, Row } from "antd";
import ActivitySessions from "./AuditBackup/ActivityTimeRequests/ActivitySessions";
import AuditTrailBackup from "./AuditBackup/AuditTrail/AuditTrailBackup";
import ManageUsers from "./ManageUsers/ManageUsers";
import { MemoryUsage } from "./MemoryUsage/MemoryUsage";
import { RemindersActivities } from "./RemindersActivities/RemindersActivities";
import TrafficMonitorng from "./TrafficMonitoring/TrafficMonitoring";


const SuperAdminDashboard = () => {
  const auditSessionsReminders = ["AuditTrailBackup", "ActivitySessions", "RemindersActivities"]
  const { name }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");
  
  const renderAuditSessionsReminders = (item: any) => {
    if (item === "AuditTrailBackup") { return <AuditTrailBackup />; }
    else if (item === "ActivitySessions") { return <ActivitySessions />; }
    else if (item === "RemindersActivities") { return <RemindersActivities />; }
  }

  return (
    <Layout className="bgLight-color dashboard">
      <p className="m-0 fs-24 fw-500">Hi Welcome</p>
      <p className="m-0 fs-20 fw-500" style={{ color: '#7C7C7C', paddingBottom: '1rem' }}>{name}</p>
      <Row gutter={[29, 29]}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          xxl={24}
          className="manage-users-row"
        >
          <ManageUsers />
        </Col>
        {/* <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
          <ManageDevicesConnected/>
        </Col> */}
      </Row>
      <Row gutter={[29, 29]}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          xxl={12}
        >
          <TrafficMonitorng />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          xxl={12}
          style={{ paddingBottom: "30px" }}
        >
          <MemoryUsage />
        </Col>
      </Row>
      <Row gutter={[29, 29]} style={{ paddingBottom: "30px" }}>
        {auditSessionsReminders.map((item: string) => {
          return (<Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
            xxl={8}
          >
            {renderAuditSessionsReminders(item)}
          </Col>)
        })}

      </Row>
    </Layout>
  );
};

export default SuperAdminDashboard;
