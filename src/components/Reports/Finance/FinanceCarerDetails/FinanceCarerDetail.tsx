import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Col, Row } from "antd";
import InvoiceFolderViewCommon from "./InvoiceFolderViewCommon";
// import InvoiceTimeSheetModal from "../InvoiceModals/InvoiceTimeSheetModal/InvoiceTimeSheetModal";
// import PaySlipModal from "../InvoiceModals/PaySlipModal/PaySlipModal";
// import WorkSummaryModal from "../InvoiceModals/WorkSummaryModal/WorkSummaryModal";
import "../FinanceReport.scss";
import CarerTimeSheetModal from "../InvoiceModals/CarerTimeSheetModal/CarerTimeSheetModal";
import OtpVerificationModal from "../InvoiceModals/OtpVerificationModal/OtpVerificationModal";
import PaySlipModal from "../InvoiceModals/PaySlipModal/PaySlipModal";


const FinanceCarerDetail = () => {
  const { state } = useLocation();
  const [isOpenTimeSheetModal, setIsOpenTimeSheetModal] = useState(false);
  const [isOpenPaySlipModal, setIsOpenPaySlipModal] = useState(false);
  const [isOpenWorkSummaryModal, setIsOpenWorkSummaryModal] = useState(false);
  
  const handleFileClick = (item: any) => {
    switch (true) {
      case item.name.includes("Payslip"):
        setIsOpenPaySlipModal(true);
        break;
      case item.name.includes("Summary"):
        setIsOpenWorkSummaryModal(true);
        break;
      default:
        setIsOpenTimeSheetModal(true);
        break;
    }
  };
  return (
    <div className="invoice-main-wrapper">
      <div className="invoice-wrapper-header" style={{ paddingBottom: "2rem" }}>
        <p className="invoice-care-heading fs-20 fw-500 m-0">{state.name}</p>
      </div>
      {state?.childItems?.length > 0 ? (
        <Row gutter={[25, 25]} className="folder-view">
          {state?.childItems?.map((item: any) => (
            <Col xxl={4} xl={8} lg={9} sm={8} xs={24} key={item.key}>
              <InvoiceFolderViewCommon
                onClick={() => handleFileClick(item)}
                type={item.type}
                size={item.size}
                dateModified={item.dateModified}
                name={item.name}
                dateCreated={item.dateCreated}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <p className="fs-24 text-center" style={{color:'#737194'}}>No Data Found</p>
      )}
      {isOpenTimeSheetModal && (
        <CarerTimeSheetModal isOpenTimeSheetModal={isOpenTimeSheetModal} setIsOpenTimeSheetModal={setIsOpenTimeSheetModal} />
      )}
      {isOpenPaySlipModal && <PaySlipModal isOpenPaySlipModal={isOpenPaySlipModal} setIsOpenPaySlipModal={setIsOpenPaySlipModal} />}
      {isOpenWorkSummaryModal && (
        <OtpVerificationModal isOpenWorkSummaryModal={isOpenWorkSummaryModal} setIsOpenWorkSummaryModal={setIsOpenWorkSummaryModal} />
      )}
    </div>
  );
};

export default FinanceCarerDetail;
