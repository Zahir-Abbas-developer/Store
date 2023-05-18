import React from "react";
import { Row, Col, Card } from "antd";
import { v4 as uuidv4 } from "uuid";
import shiftCompensation from "../../../../assets/icons/Dashboard/shifts-comprehension.svg";
import { totalHoursCount } from "../../../../mock/StaffManagerMock";
import "./CountWedgits.scss";

const CountWedgits = (props: any) => {
  const { data } = props;
  
  const totalHoursCount = [
    {
      text: "Total Hrs Worked",
      borderStyle: "solid",
      borderColor: "#65CDF0",
      img: shiftCompensation,
      shiftComprehensionText: data?.totalWorkingHours,
    },
    {
      text: "Hours this month",
      borderStyle: "solid",
      borderColor: "#FAAD14",
      img: shiftCompensation,
      shiftComprehensionText: data?.thisMonthHours,
    },
    {
      text: "Settled Invoice",
      borderStyle: "solid",
      borderColor: "#52C41A",
      img: shiftCompensation,
      shiftComprehensionText: data?.settledInvoices,
    },
    {
      text: "Pending Invoice",
      borderStyle: "solid",
      borderColor: "#4E132C",
      img: shiftCompensation,
      shiftComprehensionText: data?.pendingInvoinces,
    },
  ];
  return (
    <Row gutter={[23, 23]} style={{ paddingTop: "20px" }}>
      {totalHoursCount.map((card, index) => {
        return (
          <Col lg={12} xl={6} sm={24} md={24} xs={24} key={uuidv4()}>
            <Card
              className="border-radius-10 total-counts-wedgits"
              key={index}
              style={{ borderLeft: `10px ${card.borderStyle} ${card.borderColor}`, borderTop: "none", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.13)" }}
            >
              <div className="d-flex align-center justify-between">
                <span className="fw-600 fs-14">{card.text}</span>
                <img src={card.img} style={{ background: card.borderColor, borderRadius: "50%", padding: "10px" }} alt={`Image for ${card.text}`} />
              </div>
              <span className="fw-600 fs-32">{card.shiftComprehensionText}</span>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};
export default CountWedgits;
