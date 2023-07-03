import { Card, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { SuperAdmin } from "../../../../mock/SuperAdmin";
import "../../../../sass/common.scss";
import "./AuditTrail.scss";

//Main
const AuditTrailBackup = () => {
  const navigate = useNavigate();
  return (
    <Card className="super-admin" style={{ minHeight: "354px" }}>
      <Row gutter={[34, 34]} style={{ marginTop: "40px" }}>
        {SuperAdmin.map((superAdminData: any) => {
          return (
            <Col xs={24} lg={12} key={superAdminData.id} onClick={() => navigate(`${superAdminData.link}`)}>
              <Card
                className="audit-trail-card"
                style={{ minHeight: "224px", borderRadius: "14px", position: "relative", display: "flex", justifyContent: "center" }}
              >
                <p style={{ color: superAdminData.color, marginBottom: "0px", marginTop: "61px" }} className="text-center fw-700 fs-14">
                  {superAdminData.title}
                </p>
                <p style={{ color: superAdminData.color, marginTop: "0px" }} className="text-center fs-12 fw-400">
                  {superAdminData.description}
                </p>
                <img
                  src={superAdminData.imageTrail}
                  alt="Trail"
                  style={{
                    position: "absolute",
                    top: "-2%",
                    left: "50%",
                    transform: superAdminData.title === "Backup & Archive" ? "translate(40%, -50%)" : "translate(-50%, -50%)",
                    maxWidth: "100%",
                    zIndex: "10",
                  }}
                />
                <img
                  src={superAdminData.imageTrailBackground}
                  alt="TrailBg"
                  style={{ position: "absolute", top: "0", left: "50%", transform: "translate(-50%, -50%)" }}
                />
                {superAdminData.title === "Backup & Archive" && (
                  <img
                    src={superAdminData.backupImage}
                    alt="TrailBg"
                    style={{ position: "absolute", top: "0", left: "50%", transform: "translate(-87%, -52%)" }}
                  />
                )}
                {superAdminData.title === "Backup & Archive" && (
                  <img
                    src={superAdminData.fullCupImage}
                    alt="Trail"
                    style={{ position: "absolute", top: "-1%", left: "50%", transform: "translate(-100%, -50%)", maxWidth: "100%", zIndex: "10" }}
                  />
                )}
              </Card>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
};

export default AuditTrailBackup;
