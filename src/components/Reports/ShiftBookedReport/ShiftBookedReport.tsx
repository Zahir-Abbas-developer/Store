import { useState } from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';

// Table and Filters Mock Data and Interface
import { shiftBookedReportMockDataInterface } from '../../../types/ReportsInterface';
import { useGetReportsBookedShiftQuery } from '../../../store/Slices/Reports';
import { debouncedSearch } from '../../../utils/utils';
import dayjs from 'dayjs';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';
import { renderDashboard } from '../../../utils/useRenderDashboard';
import ShiftBookedReportFilter from './ShiftBookedReportFilter/ShiftBookedReportFilter';



const ShiftBookedReport = () => {
  const [searchClientName, setSearchClientName] = useState("")
  //query parameters of search and filter
  const paramsObj: any = {};
  const [extraReportsFilter, setExtraReportsFilter] = useState({
    clientName: '',
    userType: ''
  });
  const [filterValues, setFilterValues] = useState({ startDate: "", endDate: "" });
  const [currentPage, setCurrentPage] = useState(1)
  if (searchClientName) paramsObj["clientName"] = searchClientName;
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  if (extraReportsFilter.clientName) paramsObj["careHomeId"] = extraReportsFilter.clientName;
  if (extraReportsFilter.userType) paramsObj["carerType"] = extraReportsFilter.userType;
  if (filterValues?.startDate) paramsObj["startTime"] = filterValues?.startDate;
  if (filterValues?.endDate) paramsObj["endTime"] = filterValues?.endDate;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  const { data, isSuccess, isLoading } = useGetReportsBookedShiftQuery({query,pagination});

  let bookedShiftsData: any;
  if (isSuccess) {
    bookedShiftsData = data
  }

  const handleExtraHours = (value: any, type: string) => {
    setExtraReportsFilter({ ...extraReportsFilter, [type]: value })
  }

  const userData: any = localStorage.getItem("careUserData")
  const { role }: any = JSON.parse(userData)
  //BreadCrumb Items 
  const breadCrumbItems = [{ title: "Shift Booked Report", path: "", }, { title: "Dashboard", path: renderDashboard(role), }, { title: role==="admin"? "Admin Reports":"Reports", path: "/reports", }];
  // Shift Booked Report Table Columns
  const ShiftBookedReportTableHeader: ColumnsType<shiftBookedReportMockDataInterface> = [
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
      render: (staffType: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffType}</span>,
    },
    {
      title: 'Shift Name',
      dataIndex: 'shiftType',
      key: 'shiftType',
      align: "center",
      render: (shiftType: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftType}</span>,
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
      render: (_: any, addedBy: any) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{addedBy?.addedBy?.firstName + " " + addedBy?.addedBy?.lastName}</span>
      ),
      align: "center",
    },
    {
      title: 'Booked At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(createdAt).format("DD-MM-YYYY")}</span>
      ),
      align: "center",
    },
    {
      title: 'Requested By',
      dataIndex: 'requestedBy',
      key: 'requestedBy',
      render: (requestedBy: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(requestedBy).format("DD-MM-YYYY")}</span>
      ),
      align: "center",
    },
  ];
  // const bookedShift=bookedShiftsData?.data?.shifts?.map((clientName:any)=>clientName)
  // const bookedShiftClientName=bookedShift?.map((bookedShiftClientName)=>)
  // console.log(bookedShift)
  const searchedByClientName = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchClientName);
  };
  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className='reports-child-wrapper-class'>
            <Row>
                <Col xs={24} className="filter-div">
                   <ShiftBookedReportFilter setFilterValues={setFilterValues} handleExtraHours={handleExtraHours} />
                </Col>
                <Col xs={24}>
                <CommonReportTable  
                 downloadFileName="ComplienceReport" downLoadCsvEndPoint={`reports/booked-shift?page=1&limit=${bookedShiftsData?.data?.total}&downloadType=csv`} downLoadXlsEndPoint={`reports/booked-shift?page=1&limit=${bookedShiftsData?.data?.total}&downloadType=csv`}
                total={bookedShiftsData?.data?.total} setPagination={setPagination} pagination={pagination} placeholder="Search By Client Name" searchedByClientName={searchedByClientName} loading={isLoading}  tableHeader={ShiftBookedReportTableHeader} tableData={bookedShiftsData?.data?.shifts} />

          </Col>
        </Row>
      </div>
    </>

  )
}

export default ShiftBookedReport