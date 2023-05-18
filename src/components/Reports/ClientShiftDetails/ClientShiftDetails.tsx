import React, { useState } from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';

// Table and Filters Mock Data and Interface
import { shiftRateSettingMockDataInterface } from '../../../types/ReportsInterface';
import { useGetReportsRateSettingQuery } from '../../../store/Slices/Reports';
import dayjs from 'dayjs';
import { debouncedSearch, isNullOrEmpty } from '../../../utils/utils';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';
import { renderDashboard } from '../../../utils/useRenderDashboard';
import ClientShiftDetailsFilter from './ClientShiftDetailsFilter/ClientShiftDetailsFilter';
import path from 'path';


const ClientShiftDetails = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchClientName ,setSearchClientName]=useState("")
  const [filterValues, setFilterValues] = useState({ startDate: "", endDate: "" });
  const [extraReportsFilter, setExtraReportsFilter] = useState({
    clientName: '',
  });
  const paramsObj: any = {};
  if (extraReportsFilter.clientName) paramsObj["careHomeId"] = extraReportsFilter.clientName;
  if (filterValues.startDate) paramsObj["startTime"] = filterValues.startDate;
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  if (filterValues.endDate) paramsObj["endTime"] = filterValues.endDate;
  if (searchClientName) paramsObj["search"] = searchClientName;
  const userData: any = localStorage.getItem("careUserData")
  const { role,id}: any = JSON.parse(userData);
  if (role==="client") paramsObj["careHomeId"] = id;
  const query = "&"+ new URLSearchParams(paramsObj).toString();
  const { data, isSuccess, isLoading } = useGetReportsRateSettingQuery({query,pagination});

  const handleExtraHours = (value: any, type: string) => {
    setExtraReportsFilter({ ...extraReportsFilter, [type]: value })
  }

  let rateSettingsReports: any
  if (isSuccess) {
    rateSettingsReports = data
  }
  const searchedByClientName = (event:any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchClientName);
    };
 
  //BreadCrumb Items 
  const breadCrumbItems = [{   title: role==="admin"? "Client Shift Details" :"Shift Rate Details", path: "", }, { title: "Dashboard", path: renderDashboard(role), }, { title: role==="admin"? "Admin Reports":"Reports", path: "/reports", }];
  // Client Shift Details Table Columns
  const ClientShiftDetailsTableColumnData: ColumnsType<shiftRateSettingMockDataInterface> = [
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
      render: (_: any, shiftName: any) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftName?.shift?.shiftType}</span>
      )
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      align: "center",
      render: (_: any, startTime: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(startTime?.shift?.startTime).format('HH:mm:ss a')}</span>,
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      align: "center",
      render: (_: any, endTime: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(endTime?.shift?.endTime).format('HH:mm:ss a')}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'shiftDate',
      key: 'shiftDate',
      align: "center",
      render: (_: any, shiftDate: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(shiftDate?.shift?.shiftDate).format("DD-MM-YYYY")}</span>,
    },
    {
      title: 'Client Shift Break Pay Status',
      dataIndex: 'breakPayment        ',
      key: 'breakPayment',
      align: "center",
      render: (_: any, breakPayment: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{isNullOrEmpty(breakPayment?.breakData) ? "Shift Break  payment" : "Shift Break without payment"}</span>,
    },
    {
      title: 'Client Shift Break Time',
      dataIndex: 'clientShiftBreakTime',
      key: 'clientShiftBreakTime',
      align: "center",
      render: (_: any, clientShiftBreakTime: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{clientShiftBreakTime?.breakData[0]?.breakTime ? "Break Allowed" : "No break allowed"}</span>,
    },
    {
      title: 'Staff Shift Break Time Pay Status',
      dataIndex: 'staffShiftBreakTimePayStatus',
      key: 'staffShiftBreakTimePayStatus',
      align: "center",
      render: (_: any, staffShiftBreakTimePayStatus: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{isNullOrEmpty(staffShiftBreakTimePayStatus?.breakData) ? "Shift Break  payment" : "Shift Break without payment"}</span>,
    },
    {
      title: 'Staff Shift Break Time',
      dataIndex: 'staffShiftBreakTime',
      key: 'staffShiftBreakTime',
      align: "center",
      render: (_: any, staffShiftBreakTime: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffShiftBreakTime?.breakData[0]?.breakTime ? "Break Allowed" : "No break allowed"}</span>,
    },
    {
      title: 'Payment Type',
      dataIndex: 'paymentType',
      key: 'paymentType',
      align: "center",
      render: (paymentType: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>Hourly</span>,
    },
    {
      title: 'Split Rate Applicable',
      dataIndex: 'splitRateApplicable',
      key: 'splitRateApplicable',
      align: "center",
      render: (splitRateApplicable: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>Yes</span>,
    },
    {
      title: 'Tax Vat Applicable',
      dataIndex: 'taxVatApplicable',
      key: 'taxVatApplicable',
      align: "center",
      render: (taxVatApplicable: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>No</span>,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      align: "center",
      render: (_: any, department: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{department?.shift?.department?.name}</span>,
    },



    {
      title: 'Shift Break Staff Info',
      dataIndex: 'shiftBreakStaffInfo',
      key: 'shiftBreakStaffInfo',
      align: "center",
      render: (_: any, shiftBreakStaffInfo: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftBreakStaffInfo?.breakData[0]?.breakTime ? "Break Allowed" : "No break allowed"}</span>,
    },
  ];
  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className='reports-child-wrapper-class'>
        <Row>
          <Col xs={24} className="filter-div">
            <ClientShiftDetailsFilter handleExtraHours={handleExtraHours} setFilterValues={setFilterValues} />
          </Col>
          <Col xs={24}>
            <CommonReportTable downloadFileName="ClientShiftDetails" downLoadXlsEndPoint={`reports/rate-setting?page=1&limit=${rateSettingsReports?.data?.total}&downloadType=xls`} downLoadCsvEndPoint={`reports/rate-setting?page=1&limit=${rateSettingsReports?.data?.total}&downloadType=csv`} placeholder="Search By Client Shift Break Time" searchedByClientName={searchedByClientName}  
            total={rateSettingsReports?.data?.total} setPagination={setPagination} pagination={pagination} loading={isLoading} tableHeader={ClientShiftDetailsTableColumnData} tableData={rateSettingsReports?.data?.shifts} />
          </Col>
        </Row>
      </div>
    </>

  )
}

export default ClientShiftDetails