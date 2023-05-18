import { Collapse, Row, Col } from "antd";
import StaffRateAccordiansBody from "./StaffRateAccordianBody/StaffRateAccordianBody";
import "./StaffRateSetup.scss";

const StaffRateSetupAccordians = ({ name, staffRateData, id, img }: any) => {
  const { Panel }: any = Collapse;
  return (
    <Collapse className="staff-rate-collapse-panel" accordion ghost={true} style={{ marginBlock: "1rem" }}>
      <Panel
        showArrow={false}
        className="clients-panel"
        style={{
          boxShadow: "2px 6px 13px rgba(211, 211, 211, 0.43)",
          alignItem: "center",
        }}
        header={
          <Row justify="center" align="middle" gutter={12} className="accordion-header">
            <img src={img} alt="" className="accordianImg" />
            <Col xs={19} sm={21} lg={23}>
              <p className="fs-16 fw-500 accordian-header-title">{name}</p>
            </Col>
          </Row>
        }
      >
        <div className="accordion-body">
          <StaffRateAccordiansBody accordianName={id} staffRateData={staffRateData} />
        </div>
      </Panel>
    </Collapse>
  );
};

export default StaffRateSetupAccordians;
