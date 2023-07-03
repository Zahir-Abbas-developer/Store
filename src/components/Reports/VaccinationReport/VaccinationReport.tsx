import { useState } from "react";

// Ant Components
import { Col, Row } from "antd";
import type { ColumnsType } from "antd/es/table";

// Components
import CommonReportTable from "../CommonReportTable/CommonReportTable";

// Table and Filters Mock Data and Interface
import { vaccinationReportTableMockDataInterface } from "../../../types/ReportsInterface";

// Assets
import pdfDownloadImage from "../../../assets/images/Reports/pdf-download.png";
import { useGetReportsVaccinationQuery } from "../../../store/Slices/Reports";
import dayjs from "dayjs";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";
import { renderDashboard } from "../../../utils/useRenderDashboard";
import VaccinationReportFilter from "./VaccinationReportFilter/VaccinationReportFilter";
import { debouncedSearch } from "../../../utils/utils";

const VaccinationReport = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchClientName ,setSearchClientName]=useState("")
  const [extraReportsFilter, setExtraReportsFilter] = useState({
    staffName: '',
    userStatus: '',
    userType: ''
  });

  const paramsObj: any = {};
  //query parameters of search and filter
  if (searchClientName) paramsObj["search"] = searchClientName;
  if (extraReportsFilter.staffName) paramsObj["userId"] = extraReportsFilter.staffName;
  if (extraReportsFilter.userStatus) paramsObj["uStatus"] = extraReportsFilter.userStatus;
  if (extraReportsFilter.userType) paramsObj["userType"] = extraReportsFilter.userType;
  const userData: any = localStorage.getItem("careUserData")
  const {role,id }: any = JSON.parse(userData);
  if(role==="client") paramsObj["userId"]=id
  const query = "&" + new URLSearchParams(paramsObj).toString();
  const { data, isSuccess, isLoading } = useGetReportsVaccinationQuery({query,pagination});

  const handleExtraHours = (value: any, type: string) => {
    setExtraReportsFilter({ ...extraReportsFilter, [type]: value })
  }
  const searchedByClientName = (event:any) => {
    const { value } = event.target;
   debouncedSearch(value, setSearchClientName);
 };
  let vaccinationData: any;
  if (isSuccess) {
    vaccinationData = data;
  }
  //BreadCrumb Items
  const breadCrumbItems = [
    { title: "Vaccination Report", path: "" },
    { title: "Dashboard", path: renderDashboard(role) },
    { title: role==="admin"? "Admin Reports":"Reports", path: "/reports" },
  ];
  // Vaccination Report Table Columns
  const VaccinationReportTableColumnData: ColumnsType<vaccinationReportTableMockDataInterface> =
    [
      {
        title: "Sr #",
        dataIndex: "key",
        key: "key",
        render: (_: any, item: any, index: number) => (
          <span className="fs-14 fw-400 m-0 line-height-22 title-color">
            {currentPage * 5 + index - 4}
          </span>
        ),
      },
      {
        title: "Staff Name",
        dataIndex: "staffName",
        key: "staffName",
        align: "center",
        render: (_: any, staffName: any) => (
          <span className="fs-14 fw-400 m-0 line-height-22 title-color">
            {staffName?.firstName + " " + staffName?.lastName}
          </span>
        ),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        align: "center",
        render: (email: string) => (
          <span className="fs-14 fw-400 m-0 line-height-22 title-color">
            {email}
          </span>
        ),
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        align: "center",
        render: (phone: string) => (
          <span className="fs-14 fw-400 m-0 line-height-22 title-color">
            {phone}
          </span>
        ),
      },
      {
        title: "User Type",
        dataIndex: "userType",
        key: "userType",
        align: "center",
        render: (userType: string) => (
          <span className="fs-14 fw-400 m-0 line-height-22 title-color">
            {userType}
          </span>
        ),
      },
      {
        title: "User Status",
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (status: string) => (
          <span className="fs-14 fw-400 m-0 line-height-22 title-color">
            {status}
          </span>
        ),
      },
      {
        title: "Vaccination Name",
        dataIndex: "vaccinationName",
        key: "vaccinationName",
        align: "center",
        render: (_: any, vaccinationName: any) => {
         
            console.log(vaccinationName?.otherinfo?.immunisation)
            return (
              <span className="fs-14 fw-400 m-0 line-height-22 title-color">
             {   Object.keys(
vaccinationName?.otherinfo?.immunisation,
)?.length
? `${Object.keys(vaccinationName?.otherinfo?.immunisation).join(',')}`
: 'No Vaccination'}
              </span>)
           
         
        },
      },
      {
        title: "Vaccination Date",
        dataIndex: "vaccinationDate",
        key: "vaccinationDate",
        align: "center",
        render: (_: any, vaccinationDate: any) => (
          <span className="fs-14 fw-400 m-0 line-height-22 title-color">
            {dayjs(vaccinationDate?.updatedAt).format("DD-MM-YYYY")}
          </span>
        ),
      },
      {
        title: "View Certification",
        dataIndex: "ViewCertification",
        key: "ViewCertification",
        align: "center",
        render: (_:any,ViewCertification:any) => (
          <div className="fs-12 fw-400 line-height-22">
         {ViewCertification?.otherinfo?.otherinfo?.certificate?.length > 0 ? (
  <a href={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${ViewCertification?.otherinfo?.otherinfo?.certificate[0]?.mediaId}.${ViewCertification?.otherinfo?.otherinfo?.certificate[0]?.mediaMeta?.extension}`}>
    <img src={pdfDownloadImage} alt="" />
  </a>
) : (
  <div>No Certificate</div>
)}
          
          </div>
        ),
      },
    ];



  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="reports-child-wrapper-class">
        <Row>
          <Col xs={24} className="filter-div">
          <VaccinationReportFilter handleExtraHours={handleExtraHours} />
          </Col>
          <Col xs={24}>
            <CommonReportTable
             downloadFileName="VaccinationReport" downLoadCsvEndPoint={`reports/vaccination?page=1&limit=${vaccinationData?.data
              ?. total}&downloadType=csv`} downLoadXlsEndPoint={`reports/vaccination?page=1&limit=${vaccinationData?.data?.total}&downloadType=csv`}
            searchedByClientName={searchedByClientName}
            placeholder="Search By Email"
            setPagination={setPagination} pagination={pagination}  
              loading={isLoading}
              tableHeader={VaccinationReportTableColumnData}
              tableData={vaccinationData?.data?.users}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default VaccinationReport;
