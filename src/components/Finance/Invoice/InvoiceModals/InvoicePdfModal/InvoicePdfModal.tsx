import { Col, Modal, Row } from "antd";
import MainLogo from "../../../../../assets/brand/Logo.png";
import Print from "../../../../../assets/icons/finance-setup/print.png";
import Download from "../../../../../assets/icons/finance-setup/download.png";
import Close from '../../../../../assets/images/OnBoarding/Close.svg';
import TableComponent from "./InvoicePdfTable";
import "./InvoicePdfModal.scss";

function InvoicePdfModal(props: any) {
  const { isOpenInvoicePdfModal, setIsOpenInvoicePdfModal } = props;

  const tableHeaderDetails = [
    { heading: "Invoice", details: "1203" },
    { heading: "Date", details: "19/01/2022" },
    { heading: "Terms", details: "Net 30" },
    { heading: "Due Date", details: "18/02/2022" },
  ];

  return (
      <Modal
        className="invoice-modal"
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
        width={1166}
      >
        <Row gutter={[25, 10]} style={{ marginTop: "2rem" }}>
          <Col xs={24} md={12}>
            <p className="m-0 fs-20 fw-600">Invoice</p>
          </Col>
          <Col xs={24} md={12} className="icon-wrapper d-flex justify-end">
            <img className="cursor-pointer" src={Print} height={24} width={24} alt="print" />
            <img className="cursor-pointer" src={Download} height={24} width={25} alt="cloud" />
          </Col>

          <Col xs={24} md={24}>
            <Row>
              <Col xs={24} md={12}>
                <p className="fs-14 m-0">Invoice To</p>
                <p className="m-0 fs-20 fw-600">Albert Torento</p>
                <p className="fs-14 fw-500 m-0">Hight St, Cavendish</p>
                <p className="fs-14 fw-500 m-0">Sudbury</p>
                <p className="fs-14 fw-500 m-0">CO 18 BAX</p>
              </Col>
              <Col xs={24} md={12}>
                {tableHeaderDetails?.map((data) => {
                  return (
                    <Row className="details-wrapper">
                      <Col xs={12} md={4}>
                        <p className="fs-14 fw-600 m-0">{data.heading}</p>
                      </Col>
                      <Col xs={12} md={6}>
                        <p className="fs-14 fw-400 m-0">{data.details}</p>
                      </Col>
                    </Row>
                  );
                })}
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={24} style={{ margin: "1rem 0" }}>
            <div className="table-wrapper">
              <TableComponent />
            </div>
          </Col>
          <Col xs={24} md={24} className="d-flex justify-end">
            <div>
              <p className="m-0">Balance Due</p>
              <p className="m-0 fw-600" style={{ color: "#EE2E7E" }}>
                $ 2156.00
              </p>
            </div>
          </Col>
        </Row>
      </Modal>
  );
}

export default InvoicePdfModal;
