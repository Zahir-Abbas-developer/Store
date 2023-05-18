import { Col, Row } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InvoiceFolderViewCommon from "./InvoiceFolderViewCommon";
import ToggleListGridViewBtn from "./ToggleListGridViewBtn";
import FinanceTableView from "../FinanceTableView";
import "../FinanceReport.scss";
import { ClientRateTable } from "../../../../mock/InvoiceData";

const FinanceWeeks = () => {
//   const [isListView, setIsListView] = useState(false);
//   const { state } = useLocation();
//   console.log("state",state)
//   const navigate = useNavigate();

//   const handleFileDownload = (item: any) => {
//     navigate(`/reports/finance-report/finance-week-detail/${item.key}`, { state: item });
//   };

//   return (
//     <div className="invoice-main-wrapper">
//       <div className="invoice-wrapper-header d-flex align-center justify-between" style={{ paddingBottom: "2rem" }}>
//         <p className="invoice-care-heading fs-20 fw-500 m-0">Folders</p>
//         <ToggleListGridViewBtn toggle={isListView} setToggle={setIsListView} />
//       </div>
//       {!isListView ? (
//         <>
//           {state?.childItems?.length > 0 ? (
//             <Row gutter={[25, 25]} className="folder-view">
//               {state?.childItems?.map((item: any) => (
//                 <Col xxl={4} xl={8} lg={9} sm={8} xs={24} key={item.key}>
//                   <InvoiceFolderViewCommon
//                     onClick={() => handleFileDownload(item)}
//                     type={item.type}
//                     size={item.size}
//                     dateModified={item.dateModified}
//                     name={item.name}
//                     dateCreated={item.dateCreated}
//                   />
//                 </Col>
//               ))}
//             </Row>
//           ) : (
//             <p className="fs-24 text-center" style={{color:'#737194'}}>No Data Found</p>
//           )}
//         </>
//       ) : (
//         <FinanceTableView invoiceData={state?.childItems} handleFileDownload={handleFileDownload} />
//       )}
//     </div>
//   );
// };
}

export default FinanceWeeks;
