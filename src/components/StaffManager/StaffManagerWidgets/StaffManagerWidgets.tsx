import React from "react";
import { Row, Col, Card } from "antd";
import { v4 as uuidv4 } from "uuid";
import { staffWidgetsData } from "../../../mock/StaffManagerMock";
import { useGetRequestByWidgetsQuery } from "../../../store/Slices/StaffManager";
import "../StaffManager.scss";

const StaffManagerWidgets = () => {
  const { data, isLoading, isSuccess, isError } = useGetRequestByWidgetsQuery({});

  let StaffManagerWidgets: any;
  if (isLoading) {
    StaffManagerWidgets = <p>Loading...</p>;
  } else if (isSuccess) {
    StaffManagerWidgets = data;
  } else if (isError) {
    StaffManagerWidgets = <p>Error...</p>;
  }

  const generateColors = (index: number) => {
    let newColors = [
      { color: "#65CDF0", boxShadow: "0px 4px 20px rgba(101, 205, 240, 0.2)" },
      { color: "#F7B923", boxShadow: "0px 4px 20px rgba(247, 185, 35, 0.18)" },
      { color: "#52C41A", boxShadow: "0px 4px 20px rgba(82, 196, 26, 0.18)" },
      { color: "#EE2E7E", boxShadow: "0px 4px 20px rgba(238, 46, 126, 0.18)" },
      { color: "#4E132C", boxShadow: "0px 4px 20px rgba(238, 46, 126, 0.18)" },
    ];
    const i = index < newColors.length ? index : index % newColors.length;
    return newColors[i];
  };
  return (
    <>
      <div className="total-staff-count-main d-flex align-center" style={{ gap: "20px", justifyContent: "flex-end" }}>
        <p className="fs-15 fw-600 line-height-28 m-0">Total Staff:</p>
        <div className="counter-div">
          <p className="staff-count fs-16 fw-600 line-height-22 m-0">{data?.data?.Total}</p>
        </div>
      </div>
      <Row gutter={[20, 30]} style={{ paddingTop: "20px" }}>
        {data?.data?.userTypeCount.map((card: any, index: any) => {
          return (
            <Col xl={6} lg={8} sm={24} md={12} xs={24} key={uuidv4()}>
              <Card
                className="border-radius-10 satff-manager-widgets-wrapper"
                key={index}
                style={{
                  borderLeft: `7px solid ${generateColors(index).color}`,
                  boxShadow: `${generateColors(index).boxShadow}`,
                }}
              >
                <div className="d-flex align-center justify-between">
                  <span className="fw-600 fs-20">{card.name}</span>
                  <span
                    className="staff-widgets-amount fw-600 fs-30"
                    style={{
                      background: `${generateColors(index).color}`,
                    }}
                  >
                    {card.value < 10 ? `0${card.value}` : card.value}
                  </span>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
export default StaffManagerWidgets;