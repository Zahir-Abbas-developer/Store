import { Col, Row } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InvoiceFolderViewCommon from "./InvoiceFolderViewCommon";
import ToggleListGridViewBtn from "./ToggleListGridViewBtn";
import InvoiceTableView from "../InvoiceTableView";
import "../Invoice.scss";
import { useGetWeekInvoiceUserQuery } from "../../../../store/Slices/CoordinatorFinance";

const InvoiceWeeks = () => {
  const [isListView, setIsListView] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { pathname } = useLocation()
  const route = pathname.split('/')
  const careHomeId = route[5]

  const { data: WeekInvoiceCareHome } = useGetWeekInvoiceUserQuery({careHomeId})

  const handleFileDownload = (item: any, endDate:any, startDate:any,weekNumber:any) => {
    navigate(`/finance/invoice/invoice-coordinator/week/detail/${item} ` , { state: { endDate: endDate,startDate:startDate,InvoiceCareCoordinatorId:careHomeId ,weekNumber:weekNumber,CareHomeName:state.CareHomeName } });

  };

  return (
    <div className="invoice-main-wrapper">
      <div className="invoice-wrapper-header d-flex align-center justify-between" style={{ paddingBottom: "2rem" }}>
        <p className="invoice-care-heading fs-20 fw-500 m-0">Folders</p>
        <ToggleListGridViewBtn toggle={isListView} setToggle={setIsListView} />
      </div>
      {!isListView ? (
        <>
          {WeekInvoiceCareHome?.data?.result.length > 0 ? (
            <Row gutter={[25, 25]} className="folder-view">
              {WeekInvoiceCareHome?.data?.result?.map((item: any) => (
                <Col xxl={4} xl={8} lg={9} sm={8} xs={24} key={item.key}>
                  <InvoiceFolderViewCommon
                    onClick={() => handleFileDownload(item.careHomeId,item.endDate,item.startDate,item.weekNumber)}
                    type="File Folder"
                    size="600KB"
                    dateModified={item.endDate}
                    name={item.weekNumber}
                    dateCreated={item.startDate}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <p className="fs-24 text-center" style={{color:'#737194'}}>No Data Found</p>
          )}
        </>
      ) : (
        <InvoiceTableView invoiceData={state?.childItems} handleFileDownload={handleFileDownload} />
      )}
    </div>
  );
};

export default InvoiceWeeks;
