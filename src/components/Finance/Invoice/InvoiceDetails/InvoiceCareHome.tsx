import { useState } from "react";
import { Col, Row } from "antd";
import { useLocation, useNavigate} from "react-router-dom";
import InvoiceFolderViewCommon from "./InvoiceFolderViewCommon";
import InvoiceTableView from "../InvoiceTableView";
import ToggleListGridViewBtn from "./ToggleListGridViewBtn";
import "../Invoice.scss";
import { useGetInvoiceUserQuery} from "../../../../store/Slices/CoordinatorFinance";

const InvoiceCareHome = () => {
  const [isListView, setIsListView] = useState(false);
  const { pathname } = useLocation()
  const route = pathname.split('/')
  const careCoordinatorId = route[4]

  let userType = "care_homes";
  const { data: InvoiceCareCoordinator } = useGetInvoiceUserQuery({userType, careCoordinatorId})

  const navigate = useNavigate();

  const handleFileDownload = (item: any, index:any,CareHomeName:any) => {
    navigate(`/finance/invoice/invoice-coordinator/week/${item}`, { state: { InvoiceCareCoordinatorId:InvoiceCareCoordinator?.data?.result[index]._id ,CareHomeName:CareHomeName} });
  };

  return (
    <div className="invoice-main-wrapper">
      <div className="invoice-wrapper-header d-flex align-center justify-between" style={{ paddingBottom: "2rem" }}>
        <p className="invoice-care-heading fs-20 fw-500 m-0">{isListView?"Folders":"Care Home"}</p>
        <ToggleListGridViewBtn toggle={isListView} setToggle={setIsListView} />
      </div>
      {!isListView ? (
        <>
          {InvoiceCareCoordinator?.data?.result?.length > 0 ? (
            <Row gutter={[25, 25]} className="folder-view">
              {InvoiceCareCoordinator?.data?.result?.map((item:any ,index:any) => (
                <Col xxl={4} xl={8} lg={9} sm={8} xs={24} key={item.key}>
                  <InvoiceFolderViewCommon
                    onClick={() => handleFileDownload(item._id,index,item.clientName)}
                    type="File Folder"
                    size="600KB"
                    dateModified={item.updatedAt}
                    name={item.clientName}
                    dateCreated={item.dateCreated}                  
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <p className="fs-24 text-center" style={{color:'#737194'}}>No Data Found</p>
          )}
        </>
      ) : (
        <InvoiceTableView invoiceData={InvoiceCareCoordinator?.data?.result} handleFileDownload={handleFileDownload} />
      )}
    </div>
  );
};

export default InvoiceCareHome;
