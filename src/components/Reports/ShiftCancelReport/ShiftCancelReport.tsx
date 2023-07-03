import { useState } from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';

// Table and Filters Mock Data and Interface
import { shiftCancelReportMockDataInterface } from '../../../types/ReportsInterface';
import { useGetReportsCancelShiftQuery } from '../../../store/Slices/Reports';
import dayjs from 'dayjs';
import { debouncedSearch } from '../../../utils/utils';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';
import { renderDashboard } from '../../../utils/useRenderDashboard';
import ShiftCancelReportFilter from './ShiftCancelReportFilter/ShiftCancelReportFilter';



const ShiftCancelReport = () => {
  const [searchClientName, setSearchClientName] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10)
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [extraReportsFilter, setExtraReportsFilter] = useState({
    clientName: '',
    userType: ''
  });
  const [filterValues, setFilterValues] = useState({ startDate: "", endDate: "" });
  const paramsObj: any = {};
  if (searchClientName) paramsObj["clientName"] = searchClientName;
  if (extraReportsFilter.clientName) paramsObj["careHomeId"] = extraReportsFilter.clientName;
  if (extraReportsFilter.userType) paramsObj["carerType"] = extraReportsFilter.userType;
  if (filterValues.startDate) paramsObj["start"] = filterValues.startDate;
  if (filterValues.endDate) paramsObj["end"] = filterValues.endDate;
  const userData: any = localStorage.getItem("careUserData")
  const { role,id }: any = JSON.parse(userData)
  if(role==="client") paramsObj["careHomeId"] = id;
  const query = "&" + new URLSearchParams(paramsObj).toString();
  const { data, isSuccess, isLoading } = useGetReportsCancelShiftQuery({query,pagination});

  const handleExtraHours = (value: any, type: string) => {
    setExtraReportsFilter({ ...extraReportsFilter, [type]: value })
  }

  let cancelShiftData: any
  if (isSuccess) {
    cancelShiftData = data
  }
 
  //BreadCrumb Items 
  const breadCrumbItems = [{ title: "Shift Cancelled Report", path: "", }, { title: "Dashboard", path: renderDashboard(role), }, {title: role==="admin"? "Admin Reports":"Reports", path: "/reports", }];
  // Shift Cancel Report Table Columns
  const ShiftCancelReportTableHeader: ColumnsType<shiftCancelReportMockDataInterface> = [
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
      dataIndex: 'staffName',
      key: 'staffName',
      align: "center",
      render: (_: any, staffName: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffName?.carerType?.shortForm}</span>,
    },
    {
      title: 'Shift Type',
      dataIndex: 'shiftType',
      key: 'staffType',
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
      title: 'Cancelled By',
      dataIndex: 'cancelledBy',
      key: 'cancelledBy',
      render: (_:any ,cancelledBy: any) => (
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{`${cancelledBy?.cancelledBy?.firstName} ${cancelledBy?.cancelledBy?.lastName}` }</span>
      ),
    },
    {
      title: 'Cancelled At',
      dataIndex: 'cancelledDate',
      key: 'cancelledDate',
      render: (cancelledDate: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(cancelledDate).format("DD-MM-YYYY")}</span>
      ),
      align: "center",
    },
    {
      title: 'Cancel Reason',
      dataIndex: 'cancelledReason',
      key: 'cancelledReason',
      render: (cancelledReason: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{cancelledReason}</span>
      ),
      align: "center",
    },
  ];

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
            <ShiftCancelReportFilter handleExtraHours={handleExtraHours} setFilterValues={setFilterValues}  />
          </Col>
          <Col xs={24}>
            <CommonReportTable downloadFileName="cancelShift" downLoadCsvEndPoint={`reports/cancel-shift?page=1&limit=${cancelShiftData?.data?.total}&downloadType=csv`} total={cancelShiftData?.data?.total
              } setPagination={setPagination} pagination={pagination} placeholder="Search By Client Name" searchedByClientName={searchedByClientName} loading={isLoading}  tableHeader={ShiftCancelReportTableHeader} tableData={cancelShiftData?.data?.shifts} />
          </Col>
        </Row>
      </div>
    </>

  )
}

export default ShiftCancelReport