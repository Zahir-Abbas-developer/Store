import React, { useState } from 'react'

// Ant Components
import { Col, DatePicker, Row, Select, Space } from 'antd';

// Assets
import datePickerIcon from "../../../../../assets/BookingCalander/images/date-picker.png";
import greeClockIcon from "../../../../../assets/icons/Report/green-clock.png";
// import missedCheckoutIcon from "../../../../../assets/icons/Report/missed-checkout.png";
// import blueCircleCrossIcon from "../../../../../assets/icons/Report/blue-circle-cross.png";
import redStockIcon from "../../../../../assets/icons/Report/red-stock.png";
import redDangerIcon from "../../../../../assets/icons/Report/red-danger.png";
import purpleTimerIcon from "../../../../../assets/icons/Report/purple-timer.png";

// SCSS
import "./AttendanceReportDetailsFilters.scss";
import { useGetReportsWorkedHistoryQuery } from '../../../../../store/Slices/Reports';

const AttendanceReportDetailsFilters = ({selectedRecordById}:any) => {

    const [isShowDateRangePicker, setIsShowDateRangePicker] = useState<boolean>(false)
    const [pagination, setPagination] = useState({ limit: 10, page: 1 });
    const paramsObj:any={}
    if(selectedRecordById?.staff?.firstName) paramsObj["staffId"]=`${selectedRecordById?.staff?._id}`
    if(selectedRecordById?.client?.clientName) paramsObj["careHomeId"]=`${selectedRecordById?.client?._id}`
    const query = "&" + new URLSearchParams(paramsObj).toString();
    const {data ,isSuccess  }=useGetReportsWorkedHistoryQuery({query,pagination})
    let workHistoryData:any
    if(isSuccess){
      workHistoryData=data
    }
console.log(selectedRecordById)
    return (
        <Row gutter={[0, 20]} className='attendance-report-details-filter-wrapper' justify="space-between">
            <Col xs={24}>
                <Row gutter={[0, 20]} className="filter-wrapper">
                    <Col xs={24} sm={8}>
                        <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Staff Name</p>
                        <div className="filter-column">
                            <Select
                                size="large"
                                placeholder="Select staff name"
                                optionFilterProp="children"
                                defaultValue={`${selectedRecordById?.staff?.firstName}${selectedRecordById?.staff?.lastName}`}
                                disabled={true}
                                className="app-select-wrap-class"
                                popupClassName="app-select-popup-wrap-class"
                                // onChange={handleCommonFilterChange}
                                // filterOption={(input: any, option: any) => { (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) }}
                                options={[
                                    { value: "Arsalan Khan", label: "Arsalan Khan" },
                                    { value: "Ali Rehman", label: "Ali Rehman" },
                                    { value: "Kashif", label: "Kashif" },
                                ]}
                            />
                        </div>
                    </Col>

                    <Col xs={24} sm={8}>
                        <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Client Name</p>
                        <div className="filter-column">
                            <Select
                                size="large"
                                placeholder="Select client name"
                               defaultValue={selectedRecordById?.client?.clientName}
                                optionFilterProp="children"
                                disabled={true}
                                className="app-select-wrap-class"
                                popupClassName="app-select-popup-wrap-class"
                                // onChange={handleCommonFilterChange}
                                // filterOption={(input: any, option: any) => { (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) }}
                                options={[
                                    { value: "Usama", label: "Usama" },
                                    { value: "Syed Nizam", label: "Syed Nizam" },
                                    { value: "Dawood Khan", label: "Dawood Khan" },
                                ]}
                            />
                        </div>
                    </Col>

                    {/* <Col xs={24} sm={8}>
                        <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Time Frame</p>
                        <div className="filter-column">
                            <Select
                                size="large"
                                placeholder="Select time frame"
                                // defaultValue="All"
                                optionFilterProp="children"
                                className="app-select-wrap-class"
                                popupClassName="app-select-popup-wrap-class"
                                onChange={(e: any) => {
                                    if (e === "Date Range") {
                                        setIsShowDateRangePicker(true)
                                    }
                                    else if (isShowDateRangePicker) {
                                        setIsShowDateRangePicker(false)
                                    }
                                }}
                                // filterOption={(input: any, option: any) => { (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) }}
                                options={[
                                    { value: "Last Day", label: "Last Day" },
                                    { value: "Last Week", label: "Last Week" },
                                    { value: "Month to Date", label: "Month to Date" },
                                    { value: "Last Month", label: "Last Month" },
                                    { value: "Year to Date", label: "Year to Date" },
                                    { value: "Date Range", label: "Date Range" },
                                ]}
                            />
                        </div>
                    </Col> */}





                </Row>
                {/* {isShowDateRangePicker && ( */}
                <Row gutter={[0, 20]} className={`${isShowDateRangePicker ? "show-transition" : "hide-transition"}  filter-wrapper`} style={{ marginTop: "1.25rem" }}>

                    <Col xs={24} sm={12}>
                        <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Date Range</p>
                        <div className="filter-column">
                            <DatePicker
                                suffixIcon={<img src={datePickerIcon} alt="calander" />}
                                className="date-picker"
                                // onChange={handleChangeFrom}
                                placeholder="Form"
                            />
                        </div>
                    </Col>


                    <Col xs={24} sm={12}>
                        <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>&nbsp;</p>
                        <div className="filter-column">
                            <DatePicker
                                suffixIcon={<img src={datePickerIcon} alt="calander" />}
                                className="date-picker"
                                // onChange={handleChangeTo}
                                placeholder="To"
                            />
                        </div>
                    </Col>
                </Row>
                {/* )} */}

            </Col>
            <p className='fs-18 fw-500 line-height-28 m-0 title-color'>Month To Date</p>
            <Col xs={24}>
                <Row gutter={[30, 30]} className="extra-cards-parent">
                    <Col xs={24} md={12} xl={8}>
                        <Space size={16} className="extra-cards">
                            <div className='extra-cards-bg-div-parent'>
                                <div className='extra-cards-bg-div'>
                                </div>
                                <img src={greeClockIcon} alt="hours worked" style={{ margin: "auto" }} />
                            </div>
                            <div>
                                <p className='fs-20 fw-500 line-height-28 m-0 extra-card-heading' style={{ color: "#00AC4F" }}>{workHistoryData?.data?.totalWorkingHours}</p>
                                <p className='fs-14 fw-400 line-height-22 m-0'>Total Working Hours</p>
                            </div>
                        </Space>
                    </Col>
                    {/* <Col xs={0} md={2} xxl={1} className="text-center">
                        <img src={verticalLineImage} alt="vertical line" />
                    </Col> */}
                    {/* <Col xs={24} md={12} xl={8}>
                        <Space size={16} className="extra-cards">
                            <div className='extra-cards-bg-div-parent'>
                                <div className='extra-cards-bg-div'>
                                </div>
                                <img src={missedCheckoutIcon} alt="hours worked" style={{ margin: "auto" }} />
                            </div>
                            <div>
                                <p className='fs-20 fw-500 line-height-28 m-0 extra-card-heading' style={{ color: "#0073C6" }}>02</p>
                                <p className='fs-14 fw-400 line-height-22 m-0'>Missed Checked In/Out</p>
                            </div>
                        </Space>
                    </Col> */}
                    {/* <Col xs={0} xl={2} xxl={1}>
                        <img src={verticalLineImage} alt="vertical line" />
                    </Col> */}
                    {/* <Col xs={24} md={12} xl={8}>
                        <Space size={16} className="extra-cards">
                            <div className='extra-cards-bg-div-parent'>
                                <div className='extra-cards-bg-div'>
                                </div>
                                <img src={blueCircleCrossIcon} alt="hours worked" style={{ margin: "auto" }} />
                            </div>
                            <div>
                                <p className='fs-20 fw-500 line-height-28 m-0 extra-card-heading' style={{ color: "#6E00FA" }}>01</p>
                                <p className='fs-14 fw-400 line-height-22 m-0'>Unapproved Hours</p>
                            </div>
                        </Space>
                    </Col> */}
                    {/* <Col xs={0} md={2} xl={0} xxl={1} className="text-center">
                        <img src={verticalLineImage} alt="vertical line" />
                    </Col> */}
                    <Col xs={24} md={12} xl={8}>
                        <Space size={16} className="extra-cards">
                            <div className='extra-cards-bg-div-parent'>
                                <div className='extra-cards-bg-div'>
                                </div>
                                <img src={redStockIcon} alt="hours worked" style={{ margin: "auto" }} />
                            </div>
                            <div>
                                <p className='fs-20 fw-500 line-height-28 m-0 extra-card-heading' style={{ color: "#8B44FD" }}>{workHistoryData?.data?.totalWorkingHours/workHistoryData?.data?.shifts?.length}</p>
                                <p className='fs-14 fw-400 line-height-22 m-0'>Average Working Hours</p>
                            </div>
                        </Space>
                    </Col>

                    <Col xs={24} md={12} xl={8}>
                        <Space size={16} className="extra-cards">
                            <div className='extra-cards-bg-div-parent'>
                                <div className='extra-cards-bg-div'>
                                </div>
                                <img src={purpleTimerIcon} alt="hours worked" style={{ margin: "auto" }} />
                            </div>
                            <div>
                                <p className='fs-20 fw-500 line-height-28 m-0 extra-card-heading' style={{ color: "#B50097" }}>{workHistoryData?.data?.lateCommings}</p>
                                <p className='fs-14 fw-400 line-height-22 m-0'>Late Comings</p>
                            </div>
                        </Space>
                    </Col>

                    <Col xs={24} md={12} xl={8}>
                        <Space size={16} className="extra-cards">
                            <div className='extra-cards-bg-div-parent'>
                                <div className='extra-cards-bg-div'>
                                </div>
                                <img src={redDangerIcon} alt="hours worked" style={{ margin: "auto" }} />
                            </div>
                            <div>
                                <p className='fs-20 fw-500 line-height-28 m-0 extra-card-heading' style={{ color: "#FB1D1D" }}>{workHistoryData?.data?.notTaken}</p>
                                <p className='fs-14 fw-400 line-height-22 m-0'>Absents</p>
                            </div>
                        </Space>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default AttendanceReportDetailsFilters