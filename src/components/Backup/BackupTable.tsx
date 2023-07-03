import React from "react";
import { Col, Input, Row, Table } from "antd";
import Search from "../../assets/images/OnBoarding/Search.svg";
import { BackupData, ColumnsData } from "../../mock/Backup";

import "./Backup.scss";
import BreadCrumb from "../../layout/BreadCrumb/BreadCrumb";

const breadCrumbItems = [
  {
    title: "Backup",
    path: "",
  },
  {
    title: "Dashboard",
    path: "/dashboard",
  },
];
const BackUpTable: React.FC = () => (
  <>
    <BreadCrumb breadCrumbItems={breadCrumbItems} />

  <div className="backup-container">
    <Row style={{ justifyContent: 'end', marginBottom: '15px' }}>
      <Col xs={24} md={12} lg={6}>
        <div className="input-search-wrapper">
          <Input
            placeholder="search"
            prefix={<img src={Search} alt="search icon" className="icon" />}
          />
        </div>
      </Col>
    </Row>
    <Table columns={ColumnsData} dataSource={BackupData} pagination={false} scroll={{x:'max-content'}} />
  </div>
  </>

);

export default BackUpTable;
