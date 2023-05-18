import React, { useState } from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';

// Table and Filters Mock Data and Interface
import { staffDataReportMockDataInterface } from '../../../types/ReportsInterface';
import { useGetReportsStaffDataQuery } from '../../../store/Slices/Reports';
import dayjs from 'dayjs';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';
import { renderDashboard } from '../../../utils/useRenderDashboard';
import StaffDataReportFilter from './StaffDataReportFilter/StaffDataReportFilter';
import { debouncedSearch } from '../../../utils/utils';


const StaffDataReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [searchClientName ,setSearchClientName]=useState("")
  const [extraReportsFilter, setExtraReportsFilter] = useState({
    userType: '',
    staffType: '',
    userStatus: '',
  });
  const paramsObj: any = {};
  //query parameters of search and filter
  if (searchClientName) paramsObj["search"] = searchClientName;
  if (extraReportsFilter.userType) paramsObj["userType"] = extraReportsFilter.userType;
  if (extraReportsFilter.staffType) paramsObj["careHomeId"] = extraReportsFilter.staffType;
  if (extraReportsFilter.userStatus) paramsObj["status"] = extraReportsFilter.userStatus;
  const query = "?" + new URLSearchParams(paramsObj).toString();
  const { data, isSuccess } = useGetReportsStaffDataQuery({query,pagination});

  const handleExtraHours = (value: any, type: string) => {
    setExtraReportsFilter({ ...extraReportsFilter, [type]: value })
  }

  let staffReportsData: any;
  if (isSuccess) {
    staffReportsData = data
  }
  const searchedByClientName = (event:any) => {
    const { value } = event.target;
   debouncedSearch(value, setSearchClientName);
   };
  const userData: any = localStorage.getItem("careUserData")
  const {role}: any = JSON.parse(userData)

  //BreadCrumb Items 
  const breadCrumbItems = [{ title: "Staff Data Report", path: "", }, { title: "Dashboard", path: renderDashboard(role) }, { title: role==="admin"? "Admin Reports":"Reports", path: "/reports", }];
  // Staff Data Report Table Columns
  const StaffDataReportTableColumnData: ColumnsType<staffDataReportMockDataInterface> = [
    {
      title: 'Sr #',
      dataIndex: 'key',
      key: 'key',
      render: (_: any, item: any, index: number) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(currentPage) * 5 + index - 4}</span>,
    },
    // {
    //     title: 'Staff Name',
    //     dataIndex: 'staffName',
    //     key: 'staffName',
    //     align: "center",
    //     render: (staffName: string) => (
    //         <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffName}</span>
    //     )
    // },
    // {
    //     title: 'Staff Type',
    //     dataIndex: 'staffType',
    //     key: 'staffType',
    //     align: "center",
    //     render: (staffType: string) =>
    //         <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffType}</span>,
    // },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      align: "center",
      render: (_: any, gender: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{gender?.personalInformation?.gender}</span>,
    },
    {
      title: 'DOJ',
      dataIndex: 'doj',
      key: 'doj',
      align: "center",
      render: (doj: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{doj}</span>,
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      key: 'dob',
      align: "center",
      render: (_: any, dob: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(dob?.personalInformation?.dob).format("DD-MM-YYYY")}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: "center",
      render: (email: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{email}</span>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      align: "center",
      render: (phone: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{phone}</span>,
    },
    // {
    //     title: 'Staff Band',
    //     dataIndex: 'staffBand',
    //     key: 'staffBand',
    //     align: "center",
    //     render: (staffBand: string) =>
    //         <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffBand}</span>,
    // },
    // {
    //     title: 'EMP. Status',
    //     dataIndex: 'empStatus',
    //     key: 'empStatus',
    //     align: "center",
    //     render: (empStatus: string) =>
    //         <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{empStatus}</span>,
    // },
    // {
    //     title: 'Profile Percentage',
    //     dataIndex: 'profilePercentage',
    //     key: 'profilePercentage',
    //     align: "center",
    //     render: (profilePercentage: string) =>
    //         <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{profilePercentage}</span>,
    // },
    {
      title: 'User Status',
      dataIndex: 'status',
      key: 'status',
      align: "center",
      render: (status: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{status}</span>,
    },
    // {
    //     title: 'Visa Type',
    //     dataIndex: 'visaType',
    //     key: 'visaType',
    //     align: "center",
    //     render: (visaType: string) =>
    //         <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{visaType}</span>,
    // },
  ];

  return (
    <>
    <BreadCrumb breadCrumbItems={breadCrumbItems} />
    <div className='reports-child-wrapper-class'>
      <Row>
        <Col xs={24} className="filter-div">
          <StaffDataReportFilter handleExtraHours={handleExtraHours} />
        </Col>
        <Col xs={24}>
          <CommonReportTable 
                 downloadFileName="ComplienceReport" downLoadCsvEndPoint={`reports/staff-data?page=1&limit=${staffReportsData?.data?.total}&downloadType=csv`} downLoadXlsEndPoint={`reports/staff-data?page=1&limit=${staffReportsData?.data?.total}&downloadType=csv`}
          
          total={staffReportsData?.data?.total} setPagination={setPagination} pagination={pagination} placeholder="Search By Email" searchedByClientName={searchedByClientName} tableHeader={StaffDataReportTableColumnData} tableData={staffReportsData?.data?.staff} />
        </Col>
      </Row>
    </div>
    </>
   
  )
}

export default StaffDataReport