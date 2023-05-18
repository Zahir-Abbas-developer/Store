import { Card, Col, Layout, Row, Spin } from 'antd';
import { shiftsGraphData } from '../../../../mock/AdminDashboard/AdminDashboardData';
import { ShiftsCardGragh } from './ShiftsCardGraph';
import { ShiftsGragh } from '../../Graphs/ShiftsGraph';
import { LoadingOutlined } from '@ant-design/icons';
//Main
export const ShiftsCard = ({shiftsGraphStats}:any) => {
  return (
    <Layout className='dashboard bg-unset' >
    <Card className="most-used-services-card  border-radius-8 card card-bg-color" bordered={false}  style={{minHeight:"360px",boxShadow: "0px 12px 23px rgba(62, 73, 84, 0.04)"}}>
      <div className="attendance-summary">
        <Row>
          <Col xs={24} sm={12}>
          <p className="attendance-summary-text title-color fw-500 fs-20" style={{marginBottom:"0px",marginTop:"0px"}}>Shifts</p>
          </Col>
        </Row>
      </div>
      {!shiftsGraphStats ? <div style={{ textAlign: "center", paddingTop: "30px" }}><Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} /></div> : <ShiftsGragh shiftsGraphStats={shiftsGraphStats}/>}
      
    </Card>
    </Layout>
  );
};