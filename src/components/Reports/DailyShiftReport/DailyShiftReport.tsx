import React, { useState } from 'react'

// Ant Components
import { Col, Modal, Row, Table ,} from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';

// Table and Filters Mock Data and Interface
import { DailyShiftReportFilters } from '../../../mock/ReportMockData/DailyShiftReportMockData';
import { dailyShiftReportMockDataInterface, detailsShiftReportMockDataInterface } from '../../../types/ReportsInterface';

// SCSS
import "./DailyShiftReport.scss";

// Assets
import blueEyeIcon from "../../../assets/icons/Report/blue-eye.png";
import { useGetReportsDailyShiftQuery } from '../../../store/Slices/Reports';
import dayjs from 'dayjs';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';
import { renderDashboard } from '../../../utils/useRenderDashboard';
import { data } from '../../../mock/SettingJobRole.ts';
import { debouncedSearch } from '../../../utils/utils';
import DailyShiftReportFilter from './DailyShiftReportFilter/DailyShiftReportFilter';
import index from '../../../pages/ShiftManager/ShiftBooking';




const DailyShiftReport = () => {
  const [isOpenDailyShiftDetailsModal, setIsOpenDailyShiftDetailsModal] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState([])
  const [searchClientName ,setSearchClientName]=useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [filterValues, setFilterValues] = useState({ startDate: "", endDate: "" });
  const paramsObj:any={}
  if (searchClientName) paramsObj["search"] = searchClientName;
  if (filterValues?.startDate) paramsObj["start"] = filterValues?.startDate;
  if (filterValues?.endDate) paramsObj["end"] = filterValues?.endDate;
  const query = "?" + new URLSearchParams(paramsObj).toString();
  const { data, isSuccess} = useGetReportsDailyShiftQuery({query})
  let dailyShiftsData: any;
  if (isSuccess) {
    dailyShiftsData = data
  }
  const handleDailyShiftView = (record: any) => {
    setSelectedRowData(record?.shifts)
  };
  const searchedByClientName = (event:any) => {
   const { value } = event.target;
    debouncedSearch(value, setSearchClientName);
     };
  const userData: any = localStorage.getItem("careUserData")
  const { role }: any = JSON.parse(userData)
  //BreadCrumb Items 
  const breadCrumbItems = [{ title: "Daily Shift Report", path: "", }, { title: "Dashboard", path: renderDashboard(role), }, { title: role==="admin"? "Admin Reports":"Reports", path: "/reports", }];
  // Single Details Modal Table Column Data
  const DetailsModalTableColumnData: ColumnsType<detailsShiftReportMockDataInterface> = [
    {
      title: <span style={{ paddingLeft: "2rem" }}>Staff Name</span>,
      dataIndex: 'staffName',
      key: 'staffName',
      width: 300,
      render: (staffName: any) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color' style={{ paddingLeft: "2rem" }}>{staffName}</span>
      )
    },
    {
      title: 'Shift Name',
      dataIndex: 'shiftType',
      key: 'shiftType',
      align: "center",
      render: (shiftType: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftType}</span>,
    },
    {
      title: <span style={{ paddingRight: "2rem" }}>Shift Start time</span>,
      dataIndex: 'startTime',
      key: 'startTime',
      align: "right",
      render: (startTime: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color' style={{ paddingRight: "2rem" }}>{dayjs(startTime).format("YYYY-MM-DD")}</span>,
    },
  ];
  // Daily Shift Report Table Columns
  const DailyShiftReportTableColumnData: ColumnsType<dailyShiftReportMockDataInterface> = [
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
      render: (_: any, client: any) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{client?.careHome?.clientName}</span>

      )
    },
    {
      title: 'Booked Shifts',
      dataIndex: 'booked',
      key: 'booked',
      align: "center",
      render: (booked: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{booked}</span>,
    },
    {
      title: 'Accepted Shifts',
      dataIndex: 'accepted',
      key: 'accepted',
      align: "center",
      render: (accepted: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{accepted}</span>,
    },
    {
      title: 'Booking Pending',
      dataIndex: 'pending',
      key: 'pending',
      align: "center",
      render: (pending: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{pending}</span>,
    },
    {
      title: "View",
      dataIndex: "View",
      key: 'View',
      render: (_: any, record: any) => (
        <div className="fs-12 fw-400 line-height-22">
          <img src={blueEyeIcon} alt='Delete' className='cursor-pointer' onClick={(e: any) => { setIsOpenDailyShiftDetailsModal(true); handleDailyShiftView(record) }} />
        </div>
      ),
    },
  ];


  return (
    <>
    <BreadCrumb breadCrumbItems={breadCrumbItems} />
    <div className='reports-child-wrapper-class'>
      <Row>
        <Col xs={24} className="filter-div">
        <DailyShiftReportFilter setFilterValues={setFilterValues} />
        </Col>
        <Col xs={24}>
          <CommonReportTable  downloadFileName="DailyShiftReport" downLoadXlsEndPoint={`reports/daily-shift??page=1&limit=1000&downloadType=xls`} downLoadCsvEndPoint={`reports/daily-shift?page=1&limit=1000&downloadType=csv`} total={dailyShiftsData?.data[0]?.total} setPagination={setPagination} pagination={pagination} placeholder="Search By Client Name" searchedByClientName={searchedByClientName} tableHeader={DailyShiftReportTableColumnData} tableData={dailyShiftsData?.data?.shifts} />
        </Col>
      </Row>

        {/* Details Modal */}
        <Modal
          centered
          wrapClassName="daily-shit-report-details-modal"
          closeIcon={false}

          closable={false}
          open={isOpenDailyShiftDetailsModal}
          footer={false}
        >
          <p className="fs-20 fw-500 title-color line-height-28 m-0 common-border-bottom" style={{ paddingBottom: "1.063rem" }}>
            Shift Booking Details
          </p>
          {selectedRowData.length > 0 && <Table columns={DetailsModalTableColumnData} dataSource={selectedRowData} pagination={false} className="common-report-table" scroll={{ x: "max-content", scrollToFirstRowOnChange: true }} />}

          <button className="btn-secondary" onClick={() => setIsOpenDailyShiftDetailsModal(false)} style={{ marginTop: "2rem" }}>Close</button>
        </Modal>
      </div>
    </>

  )
}

export default DailyShiftReport