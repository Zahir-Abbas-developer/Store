import React from 'react'
import "../../StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";
import { Col, DatePicker, Row, Select, } from 'antd'
import datePicker from "../../../../assets/BookingCalander/images/date-picker.png";
import dayjs from 'dayjs';
import { useGetClientNameQuery } from '../../../../store/Slices/Reports';
const { RangePicker } = DatePicker;

const GrossProfitLossTopFilters = (props: any) => {
  const { setExtraReportsFilter, setFilterValues } = props;
  const { data: clientName } = useGetClientNameQuery({});

  const getClientName = clientName?.data?.result?.map((staff: any, i:number) => {
    return { key: `${i}`, value: staff?._id, label: staff?.clientName }
  })

  return (
    <Row gutter={[20, 20]} className='staff-availability-sheet-common-filter-wrapper' justify="space-between">
      <Col xs={24} md={18} xl={16} xxl={14}>
        <Row gutter={[0, 20]} className="filter-wrapper">
          <Col xs={24} sm={8}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Search Client Name</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select staff name"
                defaultValue="All"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                options={getClientName}
                onChange={(e: any) => setExtraReportsFilter(e)}
              />
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Time Frame</p>
            <div className="filter-column">
              <RangePicker onChange={(values: any) => { !values ? setFilterValues({ startDate: "", endDate: "" }) : setFilterValues({ startDate: dayjs(values[0]).toISOString(), endDate: dayjs(values[1]).toISOString() }) }} className='date-picker ' suffixIcon={<img src={datePicker} alt="calander" />} />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default GrossProfitLossTopFilters