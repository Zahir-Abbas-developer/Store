import { Card, Col, Layout, Row, Spin } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { Link } from "react-router-dom";
import { ClientCardGraph } from "../../RecruitmentDetails/ClientCard/ClientGraph";
import { StaffStatusGraph } from "../../Graphs/StaffStatusGraph";
import { LoadingOutlined } from "@ant-design/icons";

//Main
export const StaffStatusCard = ({ staffStatusStats, isLoading }: any) => {
  return (
    <Layout className="dashboard bg-unset">
      <Card
        className="most-used-services-card  border-radius-8 card card-bg-color"
        bordered={false}
        style={{
          boxShadow: "0px 12px 23px rgba(62, 73, 84, 0.04)",
          minHeight: "400px",
        }}
      >
        <div className="attendance-summary">
          <Row>
            <Col xs={24} sm={12} lg={12} xl={12} md={12}>
              <Paragraph className="attendance-summary-text title-color fw-500 fs-20">
                Staff Status
              </Paragraph>
            </Col>
          </Row>
        </div>
        {!staffStatusStats ? <div style={{ textAlign: "center", paddingTop: "30px" }}><Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} /></div> : <StaffStatusGraph staffStatusStats={staffStatusStats} />}

      </Card>
    </Layout>
  );
};
