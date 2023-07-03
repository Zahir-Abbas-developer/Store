import { Col, Modal, Row } from "antd";
import Print from "../../../../../assets/icons/finance-setup/print.png";
import Download from "../../../../../assets/icons/finance-setup/download.png";
import Close from '../../../../../assets/images/OnBoarding/Close.svg';
import WorkSummaryTable from "./WorkSUmmaryTable";
import "./WorkSummaryModal.scss";

const WorkSummaryModal = (props: any) => {
  const { isOpenWorkSummaryModal, setIsOpenWorkSummaryModal } = props;
  const tableHeaderDetails = [
    { heading: "Date", details: "28-03-2023" },
    { heading: "Time Period", details: "28-03-2022 to 04-04-2023" },
    { heading: "Week No", details: "Week-25" },
  ];
  const tableFooterDetails = [
    { heading: "Shift Total Pay", details: "£623.00" },
    { heading: "Total Pay fot the Week", details: "£110.00" },
  ];
  return (
    <Modal
      className="work-summary"
      title={<h3 className="fs-30 fw-500 m-0">Work Summary</h3>}
      closeIcon={< img src={Close} alt="close-icon" />}
      footer={false}
      open={isOpenWorkSummaryModal}
      onOk={() => {
        setIsOpenWorkSummaryModal(false);
      }}
      onCancel={() => {
        setIsOpenWorkSummaryModal(false);
      }}
      width={1653}
    >
      <Row gutter={[25, 10]} style={{ marginTop: "2rem" }}>
        <Col xs={24} md={12}>
          {tableHeaderDetails.map((data) => {
            return (
              <Row className="details-wrapper">
                <Col xs={12} md={3}>
                  <p className="fs-14 fw-600 m-0">{data.heading}</p>
                </Col>
                <Col xs={12} md={6}>
                  <p className="fs-14 fw-400 m-0">{data.details}</p>
                </Col>
              </Row>
            );
          })}
        </Col>
        <Col xs={24} md={12} className="icon-wrapper d-flex justify-end">
          <img className="cursor-pointer" src={Print} height={24} width={24} alt="print" />
          <img className="cursor-pointer" src={Download} height={24} width={25} alt="cloud" />
        </Col>
        <Col xs={24} md={24} style={{ margin: "1rem 0" }}>
          <div className="table-wrapper">
            <WorkSummaryTable />
          </div>
        </Col>
        <Col xs={24} md={24}>
          {tableFooterDetails.map((data) => {
            return (
              <Row className="details-wrapper">
                <Col xs={12} md={3}>
                  <p className="fs-14 fw-600 m-0">{data.heading}</p>
                </Col>
                <Col xs={12} md={3} className='text-center'>
                  <p className="fs-14 fw-400 m-0">{data.details}</p>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </Modal>
  );
};

export default WorkSummaryModal;
