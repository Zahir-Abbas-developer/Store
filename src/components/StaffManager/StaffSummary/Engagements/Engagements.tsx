import { Layout, Card, Row, Col } from "antd";
import { useState } from "react";
import { EngagementsGraph } from "./EngagementsGraph";

const Engagements = ({ shiftData }: any) => {
  const { engagement7Days=[], engagement30Days=[] } = shiftData?.data ?? {};

  const [selectedEngagements, setSelectedEngagements] = useState<any>({
    name: "weeks",
    data: [],
  });

  const [filterBy, setFilterBy] = useState<any>("weekly");

  const formatData = filterBy?.data?.map((d: any) => {
    return {
      type: "",
      value: "",
    };
  });
 
  const data = [
    { id: "1", label: "Weekly", data: shiftData?.data?.engagement7Days },
    { id: "2", label: "Monthly", data: shiftData?.data?.engagement30Days },
  ];

  const getColor = (label: any) => {
    return selectedEngagements.name === label ? "#4E132C" : "#C4C4C4";
  };

  return (
    <Layout className="bg-unset">
      <Card
        className="most-used-services-card border-radius-8 card card-bg-color"
        bordered={false}
        style={{
          minHeight: "360px",
          boxShadow: "0px 12px 23px rgba(62, 73, 84, 0.04)",
        }}
      >
        <div className="d-flex justify-between">
          <div style={{ display: "flex" }}>
            <p className="fw-500 fs-20" style={{ color: "#4E4B66", marginTop: "0px" }}>
              Engagements
            </p>
          </div>
          <div className="filter-score">
            <Row>
              {data.map((item) => (
                <Col
                  key={item.id}
                  sm={12}
                  lg={12}
                  xl={12}
                  md={12}
                  style={{
                    borderRight: item.label === "Weekly" ? "1px solid #a0acbb" : "none",
                  }}
                >
                  <span
                    className={`lowest fw-400 fs-16 cursor-pointer ${filterBy.name === item.label && "fw-600"}`}
                    onClick={() => setFilterBy({ name: item.label, data: item.data })}
                    style={{ color: getColor(item.label), margin: "0px 10px" }}
                  >
                    {item.label}
                  </span>
                </Col>
              ))}
            </Row>
          </div>
        </div>
        <EngagementsGraph shiftData={filterBy==="weekly"?engagement7Days:engagement30Days} formatData={formatData}/>
      </Card>
    </Layout>
  );
};
export default Engagements;