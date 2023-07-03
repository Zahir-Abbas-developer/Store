import { useState } from "react";
import { Col, Row } from "antd";
import { useLocation } from "react-router-dom";
import InvoiceFolderViewCommon from "./InvoiceFolderViewCommon";
// import InvoicePdfModal from "../InvoiceModals/InvoicePdfModal/InvoicePdfModal";
import AccordianLBlueImg from "../../../../assets/icons/finance-setup/accordianArrowLBlue.png";
// import InvoiceTimeSheetModal from "../InvoiceModals/InvoiceTimeSheetModal/InvoiceTimeSheetModal";
import "../FinanceReport.scss";
// import WorkSummaryModal from "../InvoiceModals/WorkSummaryModal/WorkSummaryModal";
import CarerTimeSheetModal from "../InvoiceModals/CarerTimeSheetModal/CarerTimeSheetModal";
import OtpVerificationModal from "../InvoiceModals/OtpVerificationModal/OtpVerificationModal";
import PaySlipModal from "../InvoiceModals/PaySlipModal/PaySlipModal";
import { StaffDetails } from "../../../../mock/InvoiceData";
import { useGetFinanceDetailsReportsQuery } from "../../../../store/Slices/Reports";
import ApiLoader from "../../../ApiLoader/ApiLoader";
// import PaySlipModal from "../InvoiceModals/FinanceReportPaySlipModal/PaySlipModal"; 
// import CarerTimeSheetModal from "../InvoiceModals/InvoiceTimeSheetModal/InvoiceTimeSheetModal";

const InvoiceWeekDetail = () => {
  const { state } = useLocation();
 
  const [isOpenTimeSheetModal, setIsOpenTimeSheetModal] = useState(false);
  const [isOpenInvoicePdfModal, setIsOpenInvoicePdfModal] = useState(false);
  const [isOpenSummaryModal, setIsOpenSummaryModal] = useState(false);
 const {data ,isSuccess}=useGetFinanceDetailsReportsQuery({startDate:state?.startDate ,endDate:state?.endDate})
 let financeCarerTimeSheetReports:any
 if(isSuccess){
  financeCarerTimeSheetReports=data
 }

  const handleFileClick = (item: any) => {
    switch (true) {
      case item.name.includes("Carer time sheet"):
        setIsOpenTimeSheetModal(true);
      
        break;
        case item.name.includes("Carer Work Summary.Pdf"):
          
          setIsOpenSummaryModal(true);
          break;
      default:
        setIsOpenInvoicePdfModal(true);
        break;
    }
  };

  return (
    <>
    {isSuccess? <div className="invoice-main-wrapper" style={{ paddingTop: "1.5rem" }}>
      {/* {fileArray?.length === 0 && fileFolderArray?.length === 0 && <p className="fs-24 text-center" style={{color:'#737194'}}>No Data Found</p>} */}
      {StaffDetails?.length > 0 && (
        <div style={{ paddingBottom: "7rem" }}>
          <div className="d-flex align-center" style={{ gap: "10px", padding: "0 1.7rem" }}>
            <p className="m-0 fs-20 fw-600" style={{ color: "#4E4B66" }}>
            Carer Details
            </p>
          </div>
          <Row gutter={[25, 25]} className="folder-view" style={{ paddingTop: "1rem" }}>
            {StaffDetails?.map((item: any) => (
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
        </div>
      )}
      {isOpenTimeSheetModal && (
        <CarerTimeSheetModal timePeriodDates={state} financeCarerTimeSheetReports={financeCarerTimeSheetReports} isOpenTimeSheetModal={isOpenTimeSheetModal} setIsOpenTimeSheetModal={setIsOpenTimeSheetModal} />
      )}
      {isOpenInvoicePdfModal && <PaySlipModal isOpenInvoicePdfModal={isOpenInvoicePdfModal} setIsOpenInvoicePdfModal={setIsOpenInvoicePdfModal} />}

      {isOpenSummaryModal && <OtpVerificationModal timePeriodDates={state} financeCarerTimeSheetReports={financeCarerTimeSheetReports} isOpenTimeSheetModal={isOpenTimeSheetModal} setIsOpenTimeSheetModal={setIsOpenTimeSheetModal} isOpenSummaryModal={isOpenSummaryModal} setIsOpenSummaryModal={setIsOpenSummaryModal} />}
    </div>:<ApiLoader/>}
    </>
   
  );
};

export default InvoiceWeekDetail;
