import React from "react";
import { Card, Row, Col, Layout } from "antd";
import RevenueComparisonGraph from "./RevenueComparisonGraph";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import '../../../../sass/common.scss'
import '../AccountRecieveable/AccountReceivable.scss';

const items: MenuProps["items"] = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

const RevenueComparison = () => {
  return (
 <Layout className="wrap-account-tabs">
      <Card
        className="most-used-services-card wrap-finance-current-due-tabs  border-radius-8 card card-bg-color"
        bordered={false}
      >
        <div className="attendance-summary ">
          <Row className="d-flex align-items-center justify-between">
            <Col xs={24} sm={12} lg={12} xl={12} md={12}>
              <p className=" title-color fw-500 fs-20">
                Revenue Comparison
              </p>
            </Col>
            <Col xs={24} sm={12} lg={12} xl={12} md={12} >
              <Dropdown menu={{ items }} trigger={["click"]} className="d-flex align-items-center justify-end">
                <p onClick={(e) => e.preventDefault()}>
                  <Space style={{marginLeft:"90px"}} className=" title-color fw-500 fs-12">
                    Tall Tree Care Home
                    <DownOutlined />
                  </Space>
                </p>
              </Dropdown>
            </Col>
          </Row>
        </div>
        <RevenueComparisonGraph />
      </Card>
      </Layout>
    
  );
};

export default RevenueComparison;
