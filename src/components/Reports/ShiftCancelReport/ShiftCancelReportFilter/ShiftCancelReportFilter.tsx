import React from 'react'
import "../../StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";
import { Col, DatePicker, Row, Select, } from 'antd'
import datePicker from "../../../../assets/BookingCalander/images/date-picker.png";
import dayjs from 'dayjs';
import { useGetClientNameQuery, useGetJobRoleQuery, useGetStaffNameQuery } from '../../../../store/Slices/Reports';
const { RangePicker } = DatePicker;

const ShiftCancelReportFilter = (props: any) => {
  const { handleExtraHours, setFilterValues } = props;
  const { data: staffName } = useGetStaffNameQuery({});
  const { data: userType } = useGetJobRoleQuery({});
  const userData: any = localStorage.getItem("careUserData")
  const { role }: any = JSON.parse(userData)
  const getStaffName = staffName?.data?.result?.map((staff: any) => {
    return { value: staff?._id, label: `${staff.firstName} ${staff.lastName}`, id: staff?._id }
  })

  const getUserTypeName = userType?.data?.result?.map((staff: any) => {
    return { value: staff?._id, label: staff?.name, id: staff?._id }
  })

  return (
    <Row gutter={[20, 20]} className='staff-availability-sheet-common-filter-wrapper' justify="space-between">

      <Col xs={24} md={16} xl={14} xxl={12}>
        <Row gutter={[0, 20]} className="filter-wrapper">
          {role!=="client" &&
          <Col xs={24} sm={8}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Client Name</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select staff name"
                defaultValue="All"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                options={getStaffName}
                onChange={(e: any) => handleExtraHours(e, 'clientName')}
              />
            </div>
          </Col>}

          <Col xs={24} sm={8}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>User Type</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select staff name"
                defaultValue="All"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                options={getUserTypeName}
                onChange={(e: any) => handleExtraHours(e, 'userType')}
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

export default ShiftCancelReportFilter