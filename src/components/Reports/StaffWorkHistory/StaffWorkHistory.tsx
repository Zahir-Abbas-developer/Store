import React, { useState } from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';

// Table and Filters Mock Data and Interface
import { staffWorkHistoryReportMockDataInterface } from '../../../types/ReportsInterface';
import { useGetReportsWorkedHistoryQuery } from '../../../store/Slices/Reports';
import StaffWorkHistoryFilter from './StaffWorkHistoryFilter/StaffWorkHistoryFilter';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';
import { renderDashboard } from '../../../utils/useRenderDashboard';
import dayjs from 'dayjs';
import { debouncedSearch } from '../../../utils/utils';


const StaffWorkHistory = () => {
  const [extraReportsFilter, setExtraReportsFilter] = useState({
    staffName: '',
    shiftStatus: ''
  });
  const [shiftStatus, setShiftStatus] = useState("");
  const [filterValues, setFilterValues] = useState({ startDate: "", endDate: "" });
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const paramsObj: any = {};
  if (extraReportsFilter.staffName) paramsObj["staffId"] = extraReportsFilter.staffName;
  if (extraReportsFilter?.shiftStatus) paramsObj["shiftStatus"] = extraReportsFilter?.shiftStatus;
  // if (shiftStatus) paramsObj["shiftStatus"] = shiftStatus;
  if (filterValues?.startDate) paramsObj["startTime"] = filterValues?.startDate;
  if (filterValues?.endDate) paramsObj["endTime"] = filterValues?.endDate;
  if (shiftStatus) paramsObj["search"] = shiftStatus
  const userData: any = localStorage.getItem("careUserData");
  const {role ,id}: any = JSON.parse(userData);
    if(role==="client") paramsObj["careHomeId"]=id

  const query = "&" + new URLSearchParams(paramsObj).toString();

  const { data, isSuccess } = useGetReportsWorkedHistoryQuery({ query, pagination });
  const [currentPage, setCurrentPage] = useState(1);


  const handleExtraHours = (value: any, type: string) => {
    setExtraReportsFilter({ ...extraReportsFilter, [type]: value })
  }

  const searchedByClientName = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setShiftStatus);
  };
  let workHistoryData: any;
  if (isSuccess) {
    workHistoryData = data
  }
  
  //BreadCrumb Items
  const breadCrumbItems = [{ title: "Staff Work History", path: "", }, { title: "Dashboard", path: renderDashboard(role), }, { title: role==="admin"? "Admin Reports":"Reports", path: "/reports", }];
  // Staff Work History Report Table Columns
  const StaffWorkHistoryTableHeader: ColumnsType<staffWorkHistoryReportMockDataInterface> = [
    {
      title: 'Sr #',
      dataIndex: 'key',
      key: 'key',
      render: (_: any, item: any, index: number) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(currentPage) * 5 + index - 4}</span>,
    },
    {
      title: 'Shift Name',
      dataIndex: 'shiftName',
      key: 'shiftName',
      align: "center",
      render: (_: any, shiftName: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftName?.shift?.shiftType}</span>,
    },
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      key: 'clientName',
      align: "center",
      render: (_: any, clientName: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{clientName?.carer?.firstName + " " + clientName?.carer?.lastName}</span>,
    },

    {
      title: 'Shift Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: "center",
      render: (createdAt: string) =>
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(createdAt).format("DD-MM-YYYY")}</span>,
  },

    {
      title: 'Shift Hours',
      dataIndex: 'shiftRate',
      key: 'shiftRate',
      render: (shiftRate: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftRate}</span>
      ),
      align: "center",
    },
    {
      title: 'Hourly Rate(£)',
      dataIndex: 'perHour',
      key: 'perHour',
      render: (perHour: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{perHour}</span>
      ),
      align: "center",
    },
    {
      title: 'Shift Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (totalAmount: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{totalAmount}</span>
      ),
      align: "center",
    },
    {
      title: 'Invoice Number',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      render: (invoiceNumber: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{invoiceNumber}------</span>
      ),
      align: "center",
    },
    {
      title: 'Shift Status',
      dataIndex: 'shiftStatus',
      key: 'shiftStatus',
      render: (shiftStatus: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftStatus}</span>
      ),
      align: "center",
    },
    {
      title: 'Payment Date',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (paymentDate: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{paymentDate}------</span>
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
            <StaffWorkHistoryFilter handleExtraHours={handleExtraHours} setFilterValues={setFilterValues} />
          </Col>
          <Col xs={24}>
            <CommonReportTable downloadFileName="staffworkhistory" downLoadCsvEndPoint={`reports/rate-setting?page=1&limit=${workHistoryData?.data?.total}&downloadType=csv&careHomeId=${id}`} searchedByClientName={searchedByClientName} total={workHistoryData?.data?.total} setPagination={setPagination} pagination={pagination} placeholder="Search By Shift Name" tableHeader={StaffWorkHistoryTableHeader} tableData={workHistoryData?.data?.shifts} />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default StaffWorkHistory