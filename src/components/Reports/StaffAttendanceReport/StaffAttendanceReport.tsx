import React, { useState } from 'react';

// Ant Components
import { Col, Row, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable'
import AttendanceReportDetails from './AttendanceReportDetails/AttendanceReportDetails';

// Table and Filters Mock Data and Interface
import { staffAttendanceReportMockDataInterface } from '../../../types/ReportsInterface';

// Assets
import blueEyeIcon from "../../../assets/icons/Report/blue-eye.png";
import { useGetReportsStaffAttendanceQuery } from '../../../store/Slices/Reports';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';
import AttendanceReportFilter from './AttendanceReportFilter/AttendanceReportFilter';
import { debouncedSearch } from '../../../utils/utils';
import dayjs from 'dayjs';
import { renderDashboard } from '../../../utils/useRenderDashboard';


const StaffAttendanceReport = () => {
    const [isAttendanceReportDetails, setIsAttendanceReportDetails] = useState<boolean>(false);
    const [searchClientName ,setSearchClientName]=useState("")
    const [pagination, setPagination] = useState({ limit: 10, page: 1 });
    const [extraReportsFilter, setExtraReportsFilter] = useState({
      staffName: '',
      clientName: ''
    });
    const [filterValues, setFilterValues] = useState({ startDate: "", endDate: "" });
    const paramsObj: any = {};
    if (extraReportsFilter.staffName) paramsObj["staffId"] = extraReportsFilter.staffName;
    if (extraReportsFilter.clientName) paramsObj["careHomeId"] = extraReportsFilter.clientName;
    if (filterValues?.startDate) paramsObj["startTime"] = filterValues?.startDate;
    if (filterValues?.endDate) paramsObj["endTime"] = filterValues?.endDate;
    if (searchClientName) paramsObj["clientName"] = searchClientName;
    const userData: any = localStorage.getItem("careUserData");
    const {role ,id}: any = JSON.parse(userData);
      if(role==="client") paramsObj["careHomeId"]=id
    const query = "&" + new URLSearchParams(paramsObj).toString();

    const {data ,isSuccess}=useGetReportsStaffAttendanceQuery({query,pagination});
    
    const [selectedRecordById ,setSelectedRecordById]=useState("")
    const [currentPage ,setCurrentPage]=useState(1)
  
    let staffAttendanceData: any;
    if (isSuccess) {
      staffAttendanceData = data
    }

    //BreadCrumb Items 
    const breadCrumbItems = [ { title: "Attendance Reports", path: "", }, { title: "Dashboard", path: renderDashboard(role), }, { title: role==="admin"? "Admin Reports":"Reports", path: "/reports", } ];

    const handleExtraHours = (value: any, type: string) => {
      setExtraReportsFilter({ ...extraReportsFilter, [type]: value })
    }
    const searchedByClientName = (event:any) => {
      const { value } = event.target;
      debouncedSearch(value, setSearchClientName);
       };
    // Staff Attendance Report Table Columns
    const StaffAttendaceReportTableHeader: ColumnsType<staffAttendanceReportMockDataInterface> = [
        {
            title: 'Sr #',
            dataIndex: 'key',
            key: 'key',
            render: (_: any, item: any, index: number) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{currentPage + index}</span>,
        },
        {
            title: 'Staff Name',
            dataIndex: 'staffName',
            key: 'staffName',
            align: "center",
            render: (_,   staffName : any) => (
                <div style={{ marginLeft: "auto", textAlign: "center", width: "80%" }}>
                    <Space size={16} style={{ width: "100%" }}>
                        {/* <img src={staffImg} alt={staffImg} /> */}
                        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffName?.staff?.firstName + " " +  staffName?.staff?.lastName}</span>
                    </Space>
                </div>
            )
        },
        {
            title: 'Client Name',
            dataIndex: 'clientName',
            key: 'clientName',
            align: "center",
            render: (_:any ,clientName: any) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{clientName?.client?.clientName}</span>,
        },
        {
            title: 'Shift Date',
            dataIndex: 'shiftDate',
            key: 'shiftDate',
            align: "center",
            render: (_:any,  shiftDate: any) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(shiftDate?.shift?.shiftDate).format("DD-MM-YYYY")}</span>,
        },
        {
            title: 'Shift Name',
            dataIndex: 'shiftName',
            key: 'shiftName',
            align: "center",
            render: (_:any,  staffName: any) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffName?.shift
                  ?.shiftType
              }</span> },
        {
            title: 'Total Hours',
            dataIndex: 'totalHours',
            key: 'totalHours',
            render: (totalHours: any) => (
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{Math.round(totalHours)}</span>
            ),
            align: "center",
        },
        {
            title: 'Out of Office Hours',
            dataIndex: 'takenBreak',
            key: 'takenBreak',
            render: (takenBreak: any) => (
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{takenBreak}</span>
            ),
            align: "center",
        },
        {
            title: "View",
            dataIndex: "View",
            key: 'View',
            render: (_:any ,record:any) => (
                <div className="fs-12 fw-400 line-height-22">
                    <img src={blueEyeIcon} alt='Delete' className='cursor-pointer' onClick={() =>{ setSelectedRecordById(record); setIsAttendanceReportDetails(true)}} />
                </div>
            ),
        },
    ];

    return (
      <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className='reports-child-wrapper-class'>
            {!!isAttendanceReportDetails ? (
                <AttendanceReportDetails selectedRecordById={selectedRecordById}/>
            ) : (
                <Row>
                    <Col xs={24} className="filter-div">
                        <AttendanceReportFilter  setFilterValues={setFilterValues} handleExtraHours={handleExtraHours} />
                    </Col>
                    <Col xs={24}>
                        <CommonReportTable setCurrentPage={setCurrentPage} downloadFileName="ClientShiftDetails" downLoadCsvEndPoint={`reports/staff-attendance?page=1&limit=${staffAttendanceData?.data?.total}&downloadType=csv`} downLoadXlsEndPoint={`reports/staff-attendance?page=1&limit=${staffAttendanceData?.data?.total}&downloadType=csv`} total={staffAttendanceData?.data?.total} setPagination={setPagination} pagination={pagination} placeholder="Search By Client Name" searchedByClientName={searchedByClientName}  tableHeader={StaffAttendaceReportTableHeader} tableData={staffAttendanceData?.data?.staff} />
                    </Col>
                </Row>
            )}
        </div>
      </>
       
    )
}

export default StaffAttendanceReport