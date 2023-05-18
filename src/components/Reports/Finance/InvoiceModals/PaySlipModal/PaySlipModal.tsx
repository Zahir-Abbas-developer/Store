import { Fragment } from "react";
import { Col, Modal, Row } from "antd";
import MainLogo from "../../../../../assets/brand/Logo.png";
import Print from "../../../../../assets/icons/finance-setup/print.png";
import Download from "../../../../../assets/icons/finance-setup/download.png";
import Close from '../../../../../assets/images/OnBoarding/Close.svg';
import GrossPayTable from "./GrossPayTable";
import DeductionTable from "./DeductionTable";
import "./PaySlipModal.scss";

const PaySlipModal = (props: any) => {
  const { isOpenInvoicePdfModal, setIsOpenInvoicePdfModal } = props;

  const tableHeaderDetails = [
    { heading: "Employer", details: "MARKETICON LTD" },
    { heading: "Employer", details: "4764081 Zamir Shaikh" },
    { heading: "Departmant", details: "MARKETICON LTD" },
    { heading: "Pay Period", details: "W10" },
    { heading: "Payment Date", details: "12/06/2022" },
    { heading: "NI Number", details: "NINUnknown" },
    { heading: "Table", details: "A" },
    { heading: "Tax Reference", details: "120 / EE34660" },
  ];
  const tableFooterDetails = [
    { heading: "Total Pay", details: "200.00" },
    { heading: "Total Adjustments", details: "-1.32" },
    { heading: "Net Pay", details: "198.68" },
  ];

  return (
    <Modal
      className="payslip-main"
      centered
      title={<img src={MainLogo} alt="main-logo" />}
      closeIcon={< img src={Close} alt="close-icon" />}
      footer={false}
      open={isOpenInvoicePdfModal}
      onOk={() => {
        setIsOpenInvoicePdfModal(false);
      }}
      onCancel={() => {
        setIsOpenInvoicePdfModal(false);
      }}
      width={1400}
    >
      <Fragment>
        <div className="icon-wrapper d-flex justify-end">
          <img className="cursor-pointer" src={Print} height={24} width={24} alt="print" />
          <img className="cursor-pointer" src={Download} height={24} width={25} alt="cloud" />
        </div>
        <Row gutter={[25, 10]} style={{ marginTop: "2rem", height: "40rem", overflowY: "scroll" }}>
          <Col xs={24}>
            <h3 className="fs-22 m-0 fw-600">Pay Slip</h3>
            {tableHeaderDetails.map((data) => {
              return (
                <Row className="details-wrapper align-center">
                  <Col xs={12} md={6} xl={12} xxl={12}>
                    <p className="fs-18 fw-400 m-0" style={{ color: "#6E7191" }}>
                      {data.heading}
                    </p>
                  </Col>
                  <Col xs={12} md={6} xl={12} xxl={12} className="text-end">
                    <p className="fs-20 fw-500 m-0" style={{ color: "#14142B" }}>{data.details}</p>
                  </Col>
                </Row>
              );
            })}
          </Col>
          <Col xs={24}>
            <div className="main-heading">
              <h2 className="fs-20 fw-600 m-0">GROSS PAY</h2>
            </div>
          </Col>
          <Col xs={24} md={24} style={{ margin: "1rem 0" }}>
            <div className="table-wrapper">
              <GrossPayTable />
            </div>
          </Col>
          <Col xs={24}>
            <div className="main-heading">
              <h2 className="fs-20 fw-600 m-0">DEDUCTIONS/ADJUSTMENTS</h2>
            </div>
          </Col>
          <Col xs={24} md={24} style={{ margin: "1rem 0" }}>
            <div className="table-wrapper">
              <DeductionTable />
            </div>
          </Col>
          <Col xs={24} md={24}>
            {tableFooterDetails.map((data) => {
              return (
                <Row className="details-wrapper align-center">
                  <Col xs={12} md={12}>
                    <p className="fs-18 fw-600 m-0" >{data.heading}</p>
                  </Col>
                  <Col xs={12} md={9} className="text-end">
                    <p className="fs-16 fw-500 m-0">{data.details}</p>
                  </Col>
                </Row>
              );
            })}
          </Col>
          <Col xs={24} className="text-center fs-16" style={{ color: "#000", marginTop: "3rem" }}>
            <p className="m-0 fw-500">Suite 6 office I-K </p>
            <p className="m-0 fw-500">Uxbridge</p>
            <p className="m-0 fw-500">Accounts@carelibrary.co.uk</p>
            <p className="m-0 fw-500">Company Registration No. 12988445</p>
          </Col>
        </Row>
      </Fragment>
    </Modal>
  );
};

export default PaySlipModal;
