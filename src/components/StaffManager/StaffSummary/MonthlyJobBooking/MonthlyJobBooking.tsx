import React from "react";
import { Layout, Card, Row, Col } from "antd";
import { ShiftsCardGragh } from "../../../Dashboard/ShiftsInvoiceSheet/ShiftsCard/ShiftsCardGraph";
import MonthlyJobGraph from "./MonthlyJobGraph";

const MonthlyJobBooking = ({ shiftData }: any) => {

  return (
    <Layout className="dashboard bg-unset">
      <Card
        className="most-used-services-card  border-radius-8 card card-bg-color"
        bordered={false}
        style={{
          minHeight: "360px",
          boxShadow: "0px 12px 23px rgba(62, 73, 84, 0.04)",
        }}
      >
        <div className="attendance-summary">
          <Row>
            <Col xl={24} lg={24} xs={24} sm={12}>
              <p className="attendance-summary-text title-color fw-500 fs-20" style={{ marginBottom: "0px", marginTop: "0px" }}>
                Monthly Job Booking
              </p>
            </Col>
            <Col xl={24} lg={24} xs={24} sm={24}>
              <MonthlyJobGraph shiftData={shiftData} />
            </Col>
          </Row>
        </div>
      </Card>
    </Layout>
  );
};
export default MonthlyJobBooking;