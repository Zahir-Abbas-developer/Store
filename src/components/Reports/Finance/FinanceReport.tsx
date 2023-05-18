import { useState } from "react";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
// import InvoiceTableView from "./InvoiceTableView";
import FinanceTableView from "./FinanceTableView"
import ToggleListGridViewBtn from "./FinanceCarerDetails/ToggleListGridViewBtn";
import InvoiceFolderViewCommon from "./FinanceCarerDetails/InvoiceFolderViewCommon";
import "./FinanceReport.scss";
import { useGetFinanceWeekReportsQuery } from "../../../store/Slices/Reports";
import ApiLoader from "../../ApiLoader/ApiLoader";
import { renderDashboard } from "../../../utils/useRenderDashboard";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";

function FinanceReport() {
  const navigate = useNavigate();
  const [isListView, setIsListView] = useState(false);
  const userData: any = localStorage.getItem("careUserData")
    const {id,role}: any = JSON.parse(userData);
  const {data ,isSuccess}=useGetFinanceWeekReportsQuery({id})
  let financeWeeksReports:any
  if(isSuccess){
    financeWeeksReports=data
  }
  const handleFileDownload = (item: any) => {
    navigate(`/reports/finance-report/finance-week-detail/${item.careHomeId}`, { state: item });
  };
 
  //BreadCrumb Items 
  const breadCrumbItems = [ { title: "Finance Report", path: "", }, { title: "Dashboard", path: renderDashboard(role), }, {title: role==="admin"? "Admin Reports":"Reports", path: "/reports", } ];
  return (
    <> <BreadCrumb breadCrumbItems={breadCrumbItems} />{isSuccess? <div className="invoice-main-wrapper">
    <div className="invoice-wrapper-header d-flex align-center justify-between" style={{ paddingBottom: "2rem" }}>
      <p className="invoice-care-heading fs-20 fw-500 m-0">{isListView?"Folders":"Care Coordinators"}</p>
      <ToggleListGridViewBtn toggle={isListView} setToggle={setIsListView} />
    </div>
    {isListView ? (
      <FinanceTableView invoiceData={financeWeeksReports?.data?.result} handleFileDownload={handleFileDownload} />
    ) : (
      <>
        {financeWeeksReports?.data?.result.length > 0 ? (
          <Row gutter={[25, 25]} className="folder-view">
            {financeWeeksReports?.data?.result?.map((item: any) => (
              <Col xxl={4} sm={8} xs={24} key={item.key}>
                <InvoiceFolderViewCommon
                  onClick={() => handleFileDownload(item)}
                  type="File Folder"
                  size="600KB"
                  dateModified={item.endDate}
                  name={`Week ${item.weekNumber}`}
                  dateCreated={item.startDate
                  }
                />
              </Col>
            ))}
          </Row>
        ) : (
          <p className="fs-24 text-center" style={{color:'#737194'}}>No Data Found</p>
        )}
      </>
    )}
  </div>:<ApiLoader/>}</>
   
  );
}

export default FinanceReport;
