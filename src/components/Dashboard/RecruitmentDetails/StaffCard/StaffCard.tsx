import { Card, Col, Layout, Row, Spin } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { Link } from 'react-router-dom';
import { ClientCardGraph } from '../ClientCard/ClientGraph';
import { StaffGraph } from '../../Graphs/StaffGraph';
import { LoadingOutlined } from '@ant-design/icons';

//Main
export const StaffCard = ({staffStats}:any) => {
  return (
    <Layout className='dashboard bg-unset' >
    <Card className="most-used-services-card  border-radius-8 card card-bg-color" bordered={false}  style={{boxShadow: "0px 12px 23px rgba(62, 73, 84, 0.04)",minHeight:"400px"}}>
      <div className="attendance-summary">
        <Row>
          <Col xs={24} sm={12} lg={12} xl={12} md={12}>
          <Paragraph className="attendance-summary-text title-color fw-500 fs-20">Staff</Paragraph>
          </Col>
          <Col xs={24} sm={12} lg={12} xl={12} md={12} style={{ textAlign: "end" }}>
              <Link to="/staff-manager"className="fw-400 fs-16" style={{ color: "#A0ACBB" }}>
                View All
              </Link>
            </Col>
        </Row>
      </div>
      {!staffStats ? <div style={{ textAlign: "center", paddingTop: "30px" }}><Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} /></div> : <StaffGraph staffStats={staffStats} />}
    </Card>
    </Layout>
  );
};