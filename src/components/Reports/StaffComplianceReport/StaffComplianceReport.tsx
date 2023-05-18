import { useState } from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable'

// Table and Filters Mock Data and Interface
import { staffComplianceReportMockDataInterface } from '../../../types/ReportsInterface';
import { useGetReportsComplienceQuery } from '../../../store/Slices/Reports';
import ApiLoader from '../../ApiLoader/ApiLoader';
import dayjs from 'dayjs';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';
import { renderDashboard } from '../../../utils/useRenderDashboard';
import { debouncedSearch } from '../../../utils/utils';
import StaffComplianceReportFilter from './StaffComplianceReportFilter/StaffComplianceReportFilter';




const StaffComplianceReport = () => {
  const [currentPage ,setCurrentPage]=useState(1)
  const [pageLimit ,setPageLimit]=useState(10)
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [searchClientName ,setSearchClientName]=useState("")
  const [extraReportsFilter, setExtraReportsFilter] = useState({
    staffName: '',
    userType: ''
  });
  const paramsObj: any = {};
  if (searchClientName) paramsObj["search"] = searchClientName;
  if (extraReportsFilter.staffName) paramsObj["staffId"] = extraReportsFilter.staffName;
  if (extraReportsFilter.userType) paramsObj["userType"] = extraReportsFilter.userType;
  const query = "?" + new URLSearchParams(paramsObj).toString();
  const {data ,isSuccess }=useGetReportsComplienceQuery({query,pagination})
  let compilenceData:any
  if(isSuccess){
    compilenceData=data
  }
  const searchedByClientName = (event:any) => {
   const { value } = event.target;
  debouncedSearch(value, setSearchClientName);
};
const handleExtraHours = (value: any, type: string) => {
  setExtraReportsFilter({ ...extraReportsFilter, [type]: value })
}
  const userData: any = localStorage.getItem("careUserData")
  const { role }: any = JSON.parse(userData);
  //BreadCrumb Items
  const breadCrumbItems = [{ title: "Compliance Report", path: "", }, { title: "Dashboard", path: renderDashboard(role), }, { title: role==="admin"? "Admin Reports":"Reports", path: "/reports", }];
  // Staff Compliance Report Table Columns
  const StaffComplianceReportTableHeader: ColumnsType<staffComplianceReportMockDataInterface> = [
    {
      title: 'Sr #',
      dataIndex: 'key',
      key: 'key',
      render: (_: any, item: any, index: number) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(currentPage) * 5 + index - 4}</span>,
    },
    {
      title: 'Certificate Name',
      dataIndex: 'courseTitle',
      key: 'courseTitle',
      align: "left",
      render: (_: any, courseTitle: any) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{courseTitle?.course?.courseTitle}</span>
      )
    },
    {
      title: 'User Type',
      dataIndex: 'firstName',
      key: 'firstName',
      align: "center",
      render: (_: any, courseTitle: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{courseTitle?.carer?.firstName + " " + courseTitle?.carer?.lastName}</span>,
    },
    {
      title: 'Issue Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: "center",
      render: (createdAt: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(createdAt).format("DD-MM-YYYY")}</span>,
    },
    {
      title: 'Expired Date',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      align: "center",
      render: (expiryDate: string) =>
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(expiryDate).format("DD-MM-YYYY")}</span>,
  },
];
    return (
       <>
       <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className='reports-child-wrapper-class'>
            <Row>
                <Col xs={24} className="filter-div">
                <StaffComplianceReportFilter handleExtraHours={handleExtraHours} />
                </Col>
                <Col xs={24}>
                    <CommonReportTable
                    total={compilenceData?.data?.total}
                     downloadFileName="ComplienceReport" downLoadCsvEndPoint={`reports/complience?page=1&limit=${compilenceData?.data?.total}&downloadType=csv`} downLoadXlsEndPoint={`reports/complience?page=1&limit=${compilenceData?.data?.total}&downloadType=csv`}
                    searchedByClientName={searchedByClientName}
                    setPagination={setPagination} pagination={pagination}
                  
                     tableHeader={StaffComplianceReportTableHeader} tableData={compilenceData?.data?.certificates} />
                </Col>
            </Row>
        </div>
       </>
    )
}

export default StaffComplianceReport