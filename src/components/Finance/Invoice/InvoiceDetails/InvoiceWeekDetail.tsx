import { useState } from "react";
import { Col, Row } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import InvoiceFolderViewCommon from "./InvoiceFolderViewCommon";
import InvoicePdfModal from "../InvoiceModals/InvoicePdfModal/InvoicePdfModal";
import AccordianLBlueImg from "../../../../assets/icons/finance-setup/accordianArrowLBlue.png";
import InvoiceTimeSheetModal from "../InvoiceModals/InvoiceTimeSheetModal/InvoiceTimeSheetModal";
import { invoiceDetails } from "../../../../mock/InvoiceData";
import { useGetTimeSheetQuery,useGetInvoicesCarersQuery } from "../../../../store/Slices/CoordinatorFinance";
import "../Invoice.scss";

const InvoiceWeekDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isOpenTimeSheetModal, setIsOpenTimeSheetModal] = useState(false);
  const [isOpenInvoicePdfModal, setIsOpenInvoicePdfModal] = useState(false);
  const { pathname } = useLocation()
  const route = pathname.split('/')
  const careHomeId = route[6]
  const startDate= state.startDate;
  const endDate= state.endDate;
 const weekNumber=state.weekNumber;

  let userType ="client";
  const { data: InvoiceTimeSheet } = useGetTimeSheetQuery({careHomeId,userType,startDate,endDate})
  const { data: InvoiceCarer } = useGetInvoicesCarersQuery({careHomeId})


  const handleFileClick = (item: any) => {
     if(item.name.includes("Invoice")){ 
    setIsOpenInvoicePdfModal(true);
     }else{
     setIsOpenTimeSheetModal(true);
     }
     };

  return (
    <div className="invoice-main-wrapper" style={{ paddingTop: "6rem" }}>
      {invoiceDetails?.length === 0 && <p className="fs-24 text-center" style={{color:'#737194'}}>No Data Found</p>}
      {invoiceDetails?.length > 0 && (
        <div style={{ paddingBottom: "7rem" }}>
          <div className="d-flex align-center" style={{ gap: "10px", padding: "0 1rem" }}>
            <img src={AccordianLBlueImg} alt="" />
            <p className="m-0 fs-16 fw-500" style={{ color: "#4E4B66" }}>
              Tall Tree Invoice Details
            </p>
            <div style={{ border: "1px solid", width: "80%" }}></div>
          </div>
          <Row gutter={[25, 25]} className="folder-view" style={{ paddingTop: "1rem" }}>
            {invoiceDetails?.map((item: any) => (
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
      {InvoiceCarer?.data.length > 0 && (
        <div style={{ paddingBottom: "3rem" }}>
          <div className="d-flex align-center" style={{ gap: "10px", padding: "0 1rem" }}>
            <img src={AccordianLBlueImg} alt="" />
            <p className="m-0 fs-16 fw-500" style={{ color: "#4E4B66" }}>
              Tall Tree Staff Details
            </p>
            <div style={{ border: "1px solid", width: "80%" }}></div>
          </div>

          <Row gutter={[25, 25]} className="folder-view" style={{ paddingTop: "1rem" }}>
            {InvoiceCarer?.data.map((item: any,index:any) => (
              <Col xxl={4} xl={8} lg={9} sm={8} xs={24} key={item.key}>
                <InvoiceFolderViewCommon
                  onClick={() => navigate(`/finance/invoice/invoice-coordinator/week/detail/staff-detail/${item._id}`, { state: { endDate: endDate,startDate:startDate,carerId:InvoiceCarer?.data[index].userData._id ,CareCoordinatorId:state.InvoiceCareCoordinatorId,staffDetaiFirstName:item.userData.firstName,staffDetaiLastName:item.userData.lastName,weekNumber:weekNumber,CareHomeName:state.CareHomeName } })}
                  type="File Folder"
                    size="600KB"
                  dateModified={item.dateModified}
                  name={`${item.userData.firstName} ${item.userData.lastName}`}
                  dateCreated={item.dateCreated}
                />
              </Col>
            ))}
          </Row>
        </div>
      )}
      {isOpenTimeSheetModal && (
        <InvoiceTimeSheetModal weekNumber={weekNumber} CareHomeName={state.CareHomeName} isOpenTimeSheetModal={isOpenTimeSheetModal} setIsOpenTimeSheetModal={setIsOpenTimeSheetModal} InvoiceTimeSheet={InvoiceTimeSheet.data} startDate={startDate} endDate={endDate}/>
      )}
      {isOpenInvoicePdfModal && <InvoicePdfModal isOpenInvoicePdfModal={isOpenInvoicePdfModal} setIsOpenInvoicePdfModal={setIsOpenInvoicePdfModal} />}
    </div>
  );
};

export default InvoiceWeekDetail;
