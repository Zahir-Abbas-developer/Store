import React from 'react'
import "../../StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";
import { Col, DatePicker, Row, Select, } from 'antd'
import datePicker from "../../../../assets/BookingCalander/images/date-picker.png";
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

const StaffShiftHoursReportFilter = (props: any) => {
  const { setExtraReportsFilter, setFilterValues } = props;

  return (
    <Row gutter={[20, 20]} className='staff-availability-sheet-common-filter-wrapper' justify="space-between">

      <Col xs={24} md={16} xl={20} xxl={18}>
        <Row gutter={[0, 20]} className="filter-wrapper">
          <Col xs={24} sm={12}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Available Options</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select staff name"
                defaultValue="All"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                options={[
                  { value: "staffReport", label: "Staff Report" },
                  { value: "clientReport", label: "Client Report" },
                ]}
                onChange={(e: any) => setExtraReportsFilter(e)}
              />
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Time Frame</p>
            <div className="filter-column">
              <RangePicker 
              onChange={(values: any) => {
                !values ? setFilterValues({ startDate: '', endDate: "" }) :
                  setFilterValues({
                    startDate: dayjs(values[0])?.toISOString(),
                    endDate: dayjs(values[1])?.toISOString()
                  })
              }}
                className='date-picker '
                suffixIcon={<img src={datePicker} alt="calander" />} />
            </div>
          </Col>

        </Row>
      </Col>


    </Row>
  )
}

export default StaffShiftHoursReportFilter