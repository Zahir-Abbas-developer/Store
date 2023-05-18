import  { useState } from 'react'

// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';

// Table and Filters Mock Data and Interface
import { clientWorkHistoryMockDataInterface } from '../../../types/ReportsInterface';
import { useGetReportsWorkedHistoryQuery } from '../../../store/Slices/Reports';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';
import ClientWorkHistoryFilter from './ClientWorkHistoryFilter/ClientWorkHistoryFilter';
import { debouncedSearch } from '../../../utils/utils';
import { renderDashboard } from '../../../utils/useRenderDashboard';
import dayjs from 'dayjs';

const ClientWorkHistory = () => {
  const [shiftStatus ,setShiftStatus]=useState("")
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [extraReportsFilter, setExtraReportsFilter] = useState({
    staffName: '',
    clientName: '',
    shiftStatus: ''
  });
  const paramsObj: any = {};
  if (extraReportsFilter.staffName) paramsObj["staffId"] = extraReportsFilter.staffName;
  if (extraReportsFilter.clientName) paramsObj["careHomeId"] = extraReportsFilter.clientName;
  if (extraReportsFilter?.shiftStatus) paramsObj["startTime"] = extraReportsFilter?.shiftStatus;
  if (shiftStatus) paramsObj["search"] = shiftStatus
  // if (filterValues?.startDate) paramsObj["startTime"] = filterValues?.startDate;
  // if (filterValues?.endData) paramsObj["endTime"] = filterValues?.endData;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  const { data, isSuccess } = useGetReportsWorkedHistoryQuery({query,pagination});
  const [currentPage, setCurrentPage] = useState(1);

  const handleExtraHours = (value: any, type: string) => {
    setExtraReportsFilter({ ...extraReportsFilter, [type]: value })
  }

  let workHistoryData: any;
  if (isSuccess) {
    workHistoryData = data
    console.log(workHistoryData?.data?.total)
  }
  const searchedByClientName = (event:any) => {
    const { value } = event.target;
    debouncedSearch(value, setShiftStatus);
    };
  const userData: any = localStorage.getItem("careUserData")
  const {role}: any = JSON.parse(userData);
  //BreadCrumb Items
   const breadCrumbItems = [ { title: "Client Work History", path: "", }, { title: "Dashboard", path:renderDashboard(role) }, { title: role==="admin"? "Admin Reports":"Reports",path: "/reports", } ];
  // Client Work History Table Columns
  const ClientWorkHistoryReportTableHeader: ColumnsType<clientWorkHistoryMockDataInterface> = [
    {
      title: 'Sr #',
      dataIndex: 'currentPage',
      key: 'currentPage',
      render: (_: any, item: any, index: number) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(currentPage) * 5 + index - 4}</span>,
    },
    {
      title: 'Shift Name',
      dataIndex: 'shiftName',
      key: 'shiftName',
      align: "center",
      render: (_:any,shiftName: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftName?.shift?.shiftType}</span>,
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
      title: 'Job Date',
      dataIndex: 'jobDate',
      key: 'jobDate',
      align: "center",
      render: (_: any, jobDate: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(jobDate?.createdAt).format("DD-MM-YYYY")}</span>,
    },

    {
      title: 'Worked Hours',
      dataIndex: 'workedHours',
      key: 'workedHours',
      render: (_:any,workedHours: any) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{Math.round(workedHours?.hoursWorked)}</span>
      ),
      align: "center",
    },
    {
      title: 'Hourly Rate(£)',
      dataIndex: 'hourlyRate',
      key: 'hourlyRate',
      render: (_: any, hourlyRate: any) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{hourlyRate?.perHour}</span>
      ),
      align: "center",
    },
    {
      title: 'Shift Amount',
      dataIndex: 'shiftAmount',
      key: 'shiftAmount',
      render: (_: any, shiftAmount: any) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftAmount?.totalAmount}</span>
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
  ];

    return (
      <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className='reports-child-wrapper-class'>
            <Row>
         <Col xs={24} className="filter-div">
         <ClientWorkHistoryFilter handleExtraHours={handleExtraHours}  />
                </Col>
                <Col xs={24}>
                    <CommonReportTable  downloadFileName="ClientWorkHistory" downLoadCsvEndPoint={`reports/work-history?page=1&limit=${workHistoryData?.data?.total}&downloadType=csv`} downLoadXlsEndPoint={`reports/work-history?page=1&limit=${workHistoryData?.data?.total}&downloadType=csv`} searchedByClientName={searchedByClientName}  
            total={workHistoryData?.data?.total} setPagination={setPagination} pagination={pagination} placeholder="Search By Shift Name" tableHeader={ClientWorkHistoryReportTableHeader} tableData={workHistoryData?.data?.shifts}  />
                </Col>
            </Row>
        </div>
      </>
      
    )
}

export default ClientWorkHistory