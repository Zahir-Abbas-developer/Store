import React, { useState } from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';

// Table and Filters Mock Data and Interface
import { extraHoursReportTableMockDataInterface } from '../../../types/ReportsInterface';
import { useGetReportsExtraHoursQuery } from '../../../store/Slices/Reports';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';
import ExtraHoursReportFilter from './ExtraHoursReportFilter/ExtraHoursReportFilter';
import { debouncedSearch } from '../../../utils/utils';
import dayjs from 'dayjs';
import { renderDashboard } from '../../../utils/useRenderDashboard';



const ExtraHoursReport = () => {
  const [currentPage ,setCurrentPage]=useState(1)
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [searchClientName ,setSearchClientName]=useState("")
  const [extraReportsFilter, setExtraReportsFilter] = useState({
    staffName: '',
    clientName: ''
  });
  const [filterValues, setFilterValues] = useState({ startDate: "", endDate: "" });
  const paramsObj: any = {};
  //query parameters of search and filter
  if (extraReportsFilter.staffName) paramsObj["staffId"] = extraReportsFilter.staffName;
  if (extraReportsFilter.clientName) paramsObj["careHomeId"] = extraReportsFilter.clientName;
  if (filterValues?.startDate) paramsObj["startTime"] = filterValues?.startDate;
  if (filterValues?.endDate) paramsObj["endTime"] = filterValues?.endDate;
  if (searchClientName) paramsObj["staffName"] = searchClientName;

  const userData: any = localStorage.getItem("careUserData");
const {role ,id}: any = JSON.parse(userData);
  if(role==="client") paramsObj["careHomeId"]=id
  const query = "&" + new URLSearchParams(paramsObj).toString();
  

  const { data, isSuccess } = useGetReportsExtraHoursQuery({query,pagination});

  const handleExtraHours = (value: any, type: string) => {
    setExtraReportsFilter({ ...extraReportsFilter, [type]: value })
  }
  const searchedByClientName = (event:any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchClientName);
  };

   //BreadCrumb Items
   const breadCrumbItems = [
    {
      title: "Extra Hours Report",
      path: "",
    },
    {
      title: "Dashboard",
      path: renderDashboard(role)
    },
    {
       title: role==="admin"? "Admin Reports":"Reports",
      path: "/reports",
    }
  ];

  let extraReportsData: any
  if (isSuccess) {
    extraReportsData = data
  }

  
  // Extra Hours Report Table Columns
const ExtraHoursReportTableHeader: ColumnsType<extraHoursReportTableMockDataInterface> = [
  {
    title: 'Sr #',
    dataIndex: 'key',
    key: 'key',
    render: (_: any, item: any, index: number) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(currentPage) * 5 + index-4}</span>,
  },
  {
    title: 'Staff Name',
    dataIndex: 'staffName',
    key: 'staffName',
    align: "center",
    render: (_: any, staffName: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffName?.carer?.firstName + " " + staffName?.carer?.lastName}</span>,
  },
  {
    title: 'Client Name',
    dataIndex: 'clientName',
    key: 'clientName',
    align: "center",
    render: (_: any, clientName: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{clientName?.careHome?.clientName}</span>,
  },
  {
    title: 'Shift Name',
    dataIndex: 'shiftType',
    key: 'shiftType ',
    align: "center",
    render: (_: any, shiftType: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftType?.shift?.shiftType}</span>,
  },
  {
    title: 'First Check In',
    dataIndex: 'firstCheckIn',
    key: 'checkIn',
    align: "center",
    render: (_: any, checkIn: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(checkIn?.timeTrack[0]?.checkIn).format("DD-MM-YYYY")}</span>,
  },
  {
    title: 'Last Check Out',
    dataIndex: 'checkOut',
    key: 'checkOut',
    render: (_: any, checkOut: any) => (
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(checkOut?.timeTrack?.slice(-1)[0]?.checkOut).format("DD-MM-YYYY")}</span>
    ),
    align: "center",
  },
  {
    title: 'Extra Hours',
    dataIndex: 'extraHours',
    key: 'extraHours',
    render: (extraHours: any) => (
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{Math.round(extraHours)}</span>
    ),
    align: "center",
  },
 
];

  
  
  return (
    <>   <BreadCrumb breadCrumbItems={breadCrumbItems} /> <div className='reports-child-wrapper-class'>

    <Row>
      <Col xs={24} className="filter-div">
      <ExtraHoursReportFilter handleExtraHours={handleExtraHours} setFilterValues={setFilterValues}  />
      </Col>
      <Col xs={24}>
        <CommonReportTable downloadFileName="ExtraHoursReport" downLoadCsvEndPoint={`reports/extra-hours?page=1&limit=10&downloadType=csv`} setPagination={setPagination} pagination={pagination} placeholder="Serach By ClientName" searchedByClientName={searchedByClientName}    tableHeader={ExtraHoursReportTableHeader} tableData={extraReportsData?.data?.shifts} />
      </Col>
    </Row>
  </div></>
   
  )
}

export default ExtraHoursReport