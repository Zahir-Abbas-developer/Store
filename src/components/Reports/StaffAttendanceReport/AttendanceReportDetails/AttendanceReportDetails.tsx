import React, { useState } from 'react'

// Ant Components
import { Col, Input, Pagination, Row, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import AttendanceReportDetailsFilters from './AttendanceReportDetailsFilters/AttendanceReportDetailsFilters';

// Mock Data and Interface
import { AttendanceReportDetailsMockData } from '../../../../mock/ReportMockData/StaffAttendanceReportMockData';
import { attendanceReportDetailsMockDataInterface } from '../../../../types/ReportsInterface';

// Assets
import searchIcon from "../../../../assets/icons/search.svg";
import checkInIcon from "../../../../assets/icons/Report/check-in.png";
import redCheckoutIcon from "../../../../assets/icons/Report/red-checkout.png";
import greenClockIcon from "../../../../assets/icons/Report/green-clock.png";
import coloredCopyIcon from "../../../../assets/icons/Report/colored-copy.png";
import coloredCsvIcon from "../../../../assets/icons/Report/colored-csv.png";
import coloredXlsIcon from "../../../../assets/icons/Report/colored-xls.png";
import redSquareIcon from "../../../../assets/icons/Report/red-square.png";
import greenSquareIcon from "../../../../assets/icons/Report/green-square.png";

// SCSS
import "./AttendanceReportDetails.scss";
import dayjs from 'dayjs';

const AttendanceReportDetails = ({selectedRecordById}:any) => {
  const [currentPage ,setCurrentPage]=useState(1)
    // Attendance Report Details Table Columns
const AttendanceReportDetailsTableHeader: ColumnsType<attendanceReportDetailsMockDataInterface> = [
  {
      title: 'Sr #',
      dataIndex: 'key',
      key: 'key',
      render: (_: any, item: any, index: number) =>
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(currentPage) * 5 + index-4}</span>,
  },
  {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      align: "center",
      render: (_:any,date: any) =>
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(selectedRecordById?.shift?.shiftDate).format("DD-MM-YYYY")}</span>,
  },
  {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
      align: "center",
      render: (_:any,day: any) =>
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(day?.shift?.shiftDate).format('dddd')}</span>,
  },
  {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      align: "center",
      render: (_:any,time: any) =>
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(time?.shift?.startTime).format('HH:mm:ss a')}</span>,
  },
  {
      title: 'Check In',
      dataIndex: 'checkInOut',
      key: 'checkInOut',
      align: "center",
      render: (_:any,checkIn: any) =>
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{selectedRecordById?.timeTrack?.slice(0,1)?.map((checkIn:any)=>dayjs(checkIn?.checkIn).format("hh:mm:ss a"))}</span>,
  },
  {
    title: 'Check Out',
    dataIndex: 'checkInOut',
    key: 'checkInOut',
    align: "center",
    render: (_:any,checkOut: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{selectedRecordById?.timeTrack?.slice(0,1)?.map((checkOut:any)=>dayjs(checkOut?.checkOut).format("hh:mm:ss a"))}</span>,
},
{
  title: 'Salary Hours',
  dataIndex: 'totalHours',
  key: 'totalHours',
  align: "center",
  render: (_:any,text: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{Math.round(selectedRecordById?.totalHours)}</span>,
},
  {
      title: 'Actual Hour(s)',
      dataIndex: 'actualHours',
      key: 'actualHours',
      align: "center",
      render: (actualHours: string) =>
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{selectedRecordById?.timeTrack?.slice(0,1)?.map((checkOut:any)=>dayjs(checkOut?.checkOut).format("h"))-selectedRecordById?.timeTrack?.map((checkIn:any)=>dayjs(checkIn?.checkIn).format("h"))}</span>,
  },
 
];
    return (
        <Row gutter={[40, 20]} className="attendance-report-details-wrapper">
            <Col xs={24} md={12} >
                <div className="bg-white border-radius-8" style={{ height: "100%" }}>
                    <p className='fs-18 fw-500 line-height-28 m-0 title-color' style={{ padding: "1.625rem 1.875rem" }}>Last Wroking Day (05/11/2022)</p>
                    <Space size={16} style={{ background: '#F7F7FC', width: "100%", marginBottom: "1.875rem", justifyContent: "space-between", padding: "0.75rem 1.875rem" }}>
                        <span className='d-flex align-center'>
                            <img src={checkInIcon} alt="check in" style={{ marginRight: "1rem" }} />
                            <p className='fs-16 fw-500 line-height-24 m-0 title-color'>First Check-In</p>
                        </span>
                        <p className='fs-16 fw-500 line-height-24 m-0' style={{ color: "#7B61FF" }}>{selectedRecordById?.timeTrack?.slice(0,1)?.map((checkIn:any)=>dayjs(checkIn?.checkIn).format("h:mm A"))}</p>
                    </Space>

                    <Space size={16} style={{ background: '#F7F7FC', width: "100%", marginBottom: "1.875rem", justifyContent: "space-between", padding: "0.75rem 1.875rem" }}>
                        <span className='d-flex align-center'>
                            <img src={redCheckoutIcon} alt="check in" style={{ marginRight: "1rem" }} />
                            <p className='fs-16 fw-500 line-height-24 m-0 title-color'>Last Check-Out</p>
                        </span>
                        <p className='fs-16 fw-500 line-height-24 m-0 error-color'>{selectedRecordById?.timeTrack?.slice(0,1)?.map((checkOut:any)=>dayjs(checkOut?.checkOut).format("h:mm A"))}</p>
                    </Space>

                    <Space size={16} style={{ background: '#F7F7FC', width: "100%", marginBottom: "1.875rem", justifyContent: "space-between", padding: "0.75rem 1.875rem" }}>
                        <span className='d-flex align-center'>
                            <img src={greenClockIcon} alt="check in" style={{ marginRight: "1rem" }} />
                            <p className='fs-16 fw-500 line-height-24 m-0 title-color'>Total Hours</p>
                        </span>
                        <p className='fs-16 fw-500 line-height-24 m-0' style={{ color: "#48C65C" }}>{Math.round(selectedRecordById?.totalHours)}</p>
                    </Space>
                </div>
            </Col>

            <Col xs={24} md={12}>
                <AttendanceReportDetailsFilters selectedRecordById={selectedRecordById} />
            </Col>

            {/* <Col xs={24}>
                <div className='custom-pagination-search'>
                    <Pagination
                      
                        // responsive={true}
                        showSizeChanger={true}
                        defaultPageSize={5}
                     
                        rootClassName="custom-pagination-wrapper-class"
                        total={AttendanceReportDetailsMockData.length}
                        // showTotal={(total) => `Total ${total} items`}
                       
                    />
                    <Space className='input-export-icons' size={[30, 0]}>
                        <p className='d-flex align-center fs-14 fw-400 line-height-22 title-color'>
                            <img src={redSquareIcon} alt="red square" style={{ marginRight: "0.5rem" }} />
                            Approved Hour(s)
                        </p>
                        <p className='d-flex align-center fs-14 fw-400 line-height-22 title-color'>
                            <img src={greenSquareIcon} alt="green square" style={{ marginRight: "0.5rem" }} />
                            Short/Unapproved Hour(s) / Missing Check In/Out
                        </p>
                        <Input
                            className="search-input"
                            placeholder="Search"
                            prefix={<img src={searchIcon} alt="searchIcon" width={24} height={24} style={{ marginRight: '0.623rem' }} />}
                        />
                        <Space size={[25, 0]}>
                            <img src={coloredCopyIcon} alt="csv" className='img-hover' />
                            <img src={coloredCsvIcon} alt="csv" className='img-hover' />
                            <img src={coloredXlsIcon} alt="csv" className='img-hover' />
                        </Space>
                    </Space>

                </div>
            </Col> */}

            <Col xs={24}>
                <Table tableLayout="fixed" columns={AttendanceReportDetailsTableHeader} dataSource={selectedRecordById?.timeTrack} pagination={false} className="attendance-report-details-table-wrapper" scroll={{ x: "max-content", scrollToFirstRowOnChange: true }} />
            </Col>
        </Row >
    )
}

export default AttendanceReportDetails