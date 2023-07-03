import React, { useState } from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';

// Table and Filters Mock Data and Interface
import { ShiftBookingReportFilters, ShiftBookingReportMockData } from '../../../mock/ReportMockData/ShiftBookingReportMockData';
import { shiftBookingReportMockDataInterface } from '../../../types/ReportsInterface';
import { useGetBookingShitReportsQuery } from '../../../store/Slices/Reports';
import dayjs from 'dayjs';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';
import { renderDashboard } from '../../../utils/useRenderDashboard';
import ShiftBookingReportFilter from './ShiftBookingReportFilter/ShiftBookingReportFilter';
import { debouncedSearch } from '../../../utils/utils';



const ShiftBookingReport = () => {
  const [currentPage ,setCurrentPage]=useState(1)
  const [searchClientName ,setSearchClientName]=useState("")
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [extraReportsFilter, setExtraReportsFilter] = useState({
    clientName: '',
    userType: '',
  });
  const [filterValues, setFilterValues] = useState({ startDate: "", endDate: "" });
  const paramsObj: any = {};
  //query parameters of search and filter
  if (searchClientName) paramsObj["search"] = searchClientName;
  if (extraReportsFilter.clientName) paramsObj["careHomeId"] = extraReportsFilter.clientName;
  if (extraReportsFilter.userType) paramsObj["carerType"] = extraReportsFilter.userType;
  if (filterValues?.startDate) paramsObj["startTime"] = filterValues?.startDate;
  if (filterValues?.endDate) paramsObj["endTime"] = filterValues?.endDate;
  const userData: any = localStorage.getItem("careUserData")
  const { role,id}: any = JSON.parse(userData);
  if (role==="client") paramsObj["careHomeId"] = id;
  const query = "&" + new URLSearchParams(paramsObj).toString();
  const {data,isSuccess,isLoading}=useGetBookingShitReportsQuery({query,pagination})
  let bookingShiftReportData:any
  if(isSuccess){
    bookingShiftReportData=data
  }

  const handleExtraHours = (value: any, type: string) => {
    setExtraReportsFilter({ ...extraReportsFilter, [type]: value })
  }
  const searchedByClientName = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchClientName);
  };

  //BreadCrumb Items
  const breadCrumbItems = [{ title: "Shift Booking Report", path: "", }, { title: "Dashboard", path: renderDashboard(role), }, { title: role==="admin"? "Admin Reports":"Reports", path: "/reports", }];
  // Shift Booking Report Table Columns
  const ShiftBookingReportTableHeader: ColumnsType<shiftBookingReportMockDataInterface> = [
    {
      title: 'Sr #',
      dataIndex: 'key',
      key: 'key',
      render: (_: any, item: any, index: number) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(currentPage) * 5 + index - 4}</span>,
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
      title: 'Staff Type',
      dataIndex: 'staffType',
      key: 'staffType',
      align: "center",
      render: (_: any,staffType: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffType?.carerType?.shortForm}</span>,
    },
    {
      title: 'Shift Name',
      dataIndex: 'shiftName',
      key: 'shiftName',
      align: "center",
      render: (_: any, shiftName: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftName?.shiftType}</span>,
    },
    {
      title: 'Shift Date',
      dataIndex: 'shiftDate',
      key: 'shiftDate',
      align: "center",
      render: (shiftDate: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(shiftDate).format("DD-MM-YYYY")}</span>,
    },
    {
      title: 'Booked By',
      dataIndex: 'bookedBy',
      key: 'bookedBy',
      render: (_: any, bookedBy: any) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{bookedBy?.addedBy?.firstName + " " + bookedBy?.addedBy?.lastName}</span>
      ),
      align: "center",
    },
    {
      title: 'Booked At',
      dataIndex: 'bookedAt',
      key: 'bookedAt',
      render: (_: any, bookedAt: any) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(bookedAt?.createdAt).format("DD-MM-YYYY")}</span>
      ),
      align: "center",
    },
    {
      title: 'Requested By',
      dataIndex: 'requestedBy',
      key: 'requestedBy',
      render: (_: any, requestedBy: any) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{requestedBy?.requestedBy}</span>
      ),
      align: "center",
    },
  ];
  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
        <div className='reports-child-wrapper-class'>
            <Row>
                <Col xs={24} className="filter-div">
                <ShiftBookingReportFilter setFilterValues={setFilterValues} handleExtraHours={handleExtraHours} />
                </Col>
                <Col xs={24}>
                    <CommonReportTable downloadFileName="ClientShiftDetails" downLoadXlsEndPoint={`reports/rate-setting?page=1&limit=${bookingShiftReportData?.data?.total}&downloadType=xls`} downLoadCsvEndPoint={`reports/rate-setting?page=1&limit=${bookingShiftReportData?.data?.total}&downloadType=csv`} setPagination={setPagination} pagination={pagination} total={bookingShiftReportData?.data?.total} placeholder="Search By Shift Name" searchedByClientName={searchedByClientName} loading={isLoading}  tableHeader={ShiftBookingReportTableHeader} tableData={bookingShiftReportData?.data?.shifts} />
                </Col>
            </Row>
        </div>
      </>
    )
}

export default ShiftBookingReport