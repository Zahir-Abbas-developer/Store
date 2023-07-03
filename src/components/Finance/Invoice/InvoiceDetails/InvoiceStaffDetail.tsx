import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Col, Row } from "antd";
import InvoiceFolderViewCommon from "./InvoiceFolderViewCommon";
import PaySlipModal from "../InvoiceModals/PaySlipModal/PaySlipModal";
import "../Invoice.scss";
import { StaffDetails } from "../../../../mock/InvoiceData";
import { useGetTimeSheetQuery } from "../../../../store/Slices/CoordinatorFinance";
import InvoiceStaffTimeSheetModal from "../InvoiceModals/InvoiceStaffTimeSheetModal/InvoiceStaffTimeSheetModal";

const InvoiceStaffDetail = () => {
  const { state } = useLocation();
  const [isOpenTimeSheetModal, setIsOpenTimeSheetModal] = useState(false);
  const [isOpenPaySlipModal, setIsOpenPaySlipModal] = useState(false);
  const [isOpenWorkSummaryModal, setIsOpenWorkSummaryModal] = useState(true);

  const careHomeId = state.CareCoordinatorId;
  const startDate= state.startDate;
  const endDate= state.endDate;
const weekNumber=state.weekNumber;

  const userType ="carer";
  const carerId= state.carerId;

  const { data: carerTimeSheet } = useGetTimeSheetQuery({careHomeId,userType,startDate,endDate,carerId})

  const handleFileClick = (item: any) => {
    if(item.name.includes("Payslip")){ 
      setIsOpenPaySlipModal(true);
    }else if(item.name.includes("Summary")){
      setIsOpenTimeSheetModal(true);
     setIsOpenWorkSummaryModal(true)
    }
    else{
      setIsOpenTimeSheetModal(true);
      setIsOpenWorkSummaryModal(false)
    }
    };
  return (
    <div className="invoice-main-wrapper">
      <div className="invoice-wrapper-header" style={{ paddingBottom: "2rem" }}>
        <p className="invoice-care-heading fs-20 fw-500 m-0">{state.staffDetaiFirstName} {state.staffDetaiLastName}</p>
      </div>
      {StaffDetails?.length > 0 ? (
        <Row gutter={[25, 25]} className="folder-view">
          {StaffDetails?.map((item: any) => (
            <Col xxl={4} xl={8} lg={9} sm={8} xs={24} key={item.key}>
              <InvoiceFolderViewCommon
                onClick={() => handleFileClick(item)}
                type="File"
                size="600KB"
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
        <InvoiceStaffTimeSheetModal CareHomeName={state.CareHomeName} weekNumber={weekNumber} isOpenWorkSummaryModal={isOpenWorkSummaryModal} isOpenTimeSheetModal={isOpenTimeSheetModal} setIsOpenTimeSheetModal={setIsOpenTimeSheetModal} InvoiceTimeSheet={carerTimeSheet.data} endDate={endDate} startDate={startDate}/>
      )}
      {isOpenPaySlipModal && <PaySlipModal isOpenPaySlipModal={isOpenPaySlipModal} setIsOpenPaySlipModal={setIsOpenPaySlipModal} />}
    
{isOpenTimeSheetModal && (
        <InvoiceStaffTimeSheetModal CareHomeName={state.CareHomeName} weekNumber={weekNumber} isOpenWorkSummaryModal={isOpenWorkSummaryModal} isOpenTimeSheetModal={isOpenTimeSheetModal} setIsOpenTimeSheetModal={setIsOpenTimeSheetModal} InvoiceTimeSheet={carerTimeSheet.data} endDate={endDate} startDate={startDate}/>
      )}
    </div>
  );
};

export default InvoiceStaffDetail;
