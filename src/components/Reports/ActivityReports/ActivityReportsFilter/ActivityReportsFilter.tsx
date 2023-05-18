import React from 'react'
import { Col, DatePicker, Row, Select, } from 'antd';
import datePicker from "../../../../assets/BookingCalander/images/date-picker.png";
import { useGetActivityTypeQuery, useGetManageUserQuery } from '../../../../store/Slices/Reports';
import dayjs from 'dayjs';
import "../../StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";

const ActivityReportsFilter = (props: any) => {
  const { RangePicker } = DatePicker;
  const { handleExtraHours, setFilterValues } = props;
  const { data: manageUser } = useGetManageUserQuery({});
  const { data: activityType } = useGetActivityTypeQuery({});

  const getActivityType = activityType?.map((staff: any, i:number) => {
    return { key: `${i}`, value: staff?._id, label: staff?._id }
  })

  const getManageUser = manageUser?.data?.result?.map((staff: any, i:number) => {
    return { key: `${i}`, value: staff?._id, label: staff?.clientName }
  })

  return (
    <Row gutter={[20, 20]} className='staff-availability-sheet-common-filter-wrapper' justify="space-between">
      <Col xs={24} md={16} xl={14} xxl={12}>
        <Row gutter={[0, 20]} className="filter-wrapper">
          <Col xs={24} sm={8}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Activity By</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select activity by"
                defaultValue="All"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                options={getManageUser}
                onChange={(e: any) => handleExtraHours(e, 'activityBy')}
              />
            </div>
          </Col>
          {/* <Col xs={24} sm={8}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Activity Type</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select activity type"
                defaultValue="All"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                options={getActivityType}
                onChange={(e: any) => handleExtraHours(e, 'activityType')}
              />
            </div>
          </Col> */}
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

export default ActivityReportsFilter