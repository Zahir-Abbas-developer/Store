import { Col, Layout, Row } from "antd";
import ManageUserTypes from "./ManageUserTypes/ManageUserTypes";

const ManageUsersTypes = () => {
 
  return (
    <Layout className="bgLight-color dashboard">
      <Row gutter={[30, 81]} style={{ paddingBottom: "30px" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <ManageUserTypes />
        </Col>
      </Row> 
    </Layout>

  );
};

export default ManageUsersTypes;
