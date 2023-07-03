import React from 'react'

// Ant Components
import { Col, DatePicker, Row, Select } from 'antd'
import type { DatePickerProps } from 'antd';

// Day Js
import dayjs from 'dayjs';

// SCSS
import "./CommonFilters.scss";

// Assets
import DatePickerIcon from "../../../../assets/icons/ShiftManger/date-picker-icon.png";

const CommonFilters = (props: any) => {
    
    const { staffHours } = props;

    const dateFormat = 'YYYY/MM/DD';
    // const weekFormat = 'MM/DD';
    // const monthFormat = 'YYYY/MM';

    const customWeekStartEndFormat: DatePickerProps['format'] = (value) =>
        `${dayjs(value).startOf('week').format(dateFormat)} ~ ${dayjs(value)
            .endOf('week')
            .format(dateFormat)}`;


    return (
        <Row gutter={[0, 20]} className='finance-common-filters-wrapper'>
            <Col xs={24} md={12} lg={8} xl={6} xxl={4}>
                <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Staff Name</p>
                <div className="filter-column">
                    <Select
                        size="large"
                        placeholder="Select staff name"
                        optionFilterProp="children"
                        className="app-select-wrap-class"
                        popupClassName="app-select-popup-wrap-class"
                        style={{ width: "100%" }}
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

            <Col xs={24} md={12} lg={8} xl={6} xxl={4}>
                <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Staff Type</p>
                <div className="filter-column">
                    <Select
                        size="large"
                        placeholder="Select staff type"
                        optionFilterProp="children"
                        className="app-select-wrap-class"
                        popupClassName="app-select-popup-wrap-class"
                        style={{ width: "100%" }}
                        // onChange={handleCommonFilterChange}
                        // filterOption={(input: any, option: any) => { (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) }}
                        options={[
                            {
                                value: "HCA",
                                label: "HCA",
                            },
                        ]}
                    />
                </div>
            </Col>

            {staffHours && (
                <Col xs={24} md={12} lg={8} xl={6} xxl={4}>
                    <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Staff Category</p>
                    <div className="filter-column">
                        <Select
                            size="large"
                            placeholder="Select staff category"
                            optionFilterProp="children"
                            className="app-select-wrap-class"
                            popupClassName="app-select-popup-wrap-class"
                            style={{ width: "100%" }}
                            // onChange={handleCommonFilterChange}
                            // filterOption={(input: any, option: any) => { (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) }}
                            options={[
                                {
                                    value: "Payroll",
                                    label: "Payroll",
                                },
                            ]}
                        />
                    </div>
                </Col>
            )}

            <Col xs={24} md={12} lg={8} xl={6} xxl={5}>
                <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Time Frame</p>
                <div className="filter-column">
                    <DatePicker defaultValue={dayjs()} format={customWeekStartEndFormat} picker="week"
                        suffixIcon={<img src={DatePickerIcon} alt="datePicker" />}
                        popupClassName='date-picker' rootClassName='date-picker' clearIcon={false} />
                </div>
            </Col>
        </Row>
    )
}

export default CommonFilters