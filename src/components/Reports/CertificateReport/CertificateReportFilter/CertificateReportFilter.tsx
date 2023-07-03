import React from 'react'
import "../../StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";
import { Col, DatePicker, Row, Select, } from 'antd'
import datePicker from "../../../../assets/BookingCalander/images/date-picker.png";
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

const CertificateReportFilter = (props: any) => {
  const { handleExtraHours } = props;

  return (
    <Row gutter={[20, 20]} className='staff-availability-sheet-common-filter-wrapper' justify="space-between">

      <Col xs={24} md={16} xl={14} xxl={12}>
        <Row gutter={[0, 20]} className="filter-wrapper">
          <Col xs={24} sm={8}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Course Status</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select a course status"
                defaultValue="All"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                options={[
                  { value: "ALL", label: "All" },
                  { value: "ENROLLED", label: "Enrolled" },
                  { value: "INPROGRESS", label: "InProgress" },
                  { value: "COMPLETED", label: "Completed" },
                ]}
                onChange={(e: any) => handleExtraHours(e, 'courseStatus')}
              />
            </div>
          </Col>
          <Col xs={24} sm={8}>
              <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Certificate</p>
              <div className="filter-column">
              <Select
                size="large"
                placeholder="Select a certificate"
                defaultValue="All"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                options={[
                  { value: "All", label: "All" },
                  { value: "N/A", label: "N/A" },
                  { value: "Available", label: "Available" },
                  { value: "Not Available", label: "Not Available" },
                ]}
                onChange={(e: any) => handleExtraHours(e, 'certificate')}
              />
              </div>
            </Col>
        </Row>
      </Col>


    </Row>
  )
}

export default CertificateReportFilter