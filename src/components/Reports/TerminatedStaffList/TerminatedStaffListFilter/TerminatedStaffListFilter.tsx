import React from 'react'
import "../../StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";
import { Col, DatePicker, Row, Select, } from 'antd'
import datePicker from "../../../../assets/BookingCalander/images/date-picker.png";
import dayjs from 'dayjs';
import { useGetJobRoleQuery, useGetManageUserAdminQuery, useGetStaffNameQuery } from '../../../../store/Slices/Reports';
const { RangePicker } = DatePicker;

const TerminatedStaffListFilter = (props: any) => {
  const { handleExtraHours, setFilterValues } = props;
  const { data: staffName } = useGetStaffNameQuery({});
  const { data: jobRole } = useGetJobRoleQuery({});
  const { data: adminUser } = useGetManageUserAdminQuery({})


  const getStaffName = staffName?.data?.result?.map((staff: any, i:number) => {
    return { key: `${i}` ,value: staff?._id, label: `${staff.firstName} ${staff.lastName}` }
  })

  const getJobRole = jobRole?.data?.result?.map((staff: any, i:number) => {
    return { key: `${i}`, value: staff?._id, label: staff?.name }
  })

  const getAdminUser = adminUser?.data?.result?.map((staff: any, i:number) => {
    return { key: `${i}` ,value: staff?._id, label: `${staff.firstName} ${staff.lastName}` }
  })

  return (
    <Row gutter={[20, 20]} className='staff-availability-sheet-common-filter-wrapper' justify="space-between">

      <Col xs={24} md={16} xl={16} xxl={18}>
        <Row gutter={[0, 20]} className="filter-wrapper">
          <Col xs={24} sm={6}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Staff Name</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select staff name"
                defaultValue="All"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                options={getStaffName}
                onChange={(e: any) => handleExtraHours(e, 'staffName')}
              />
            </div>
          </Col>
          <Col xs={24} sm={6}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>User Role</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select staff name"
                defaultValue="All"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                options={getJobRole}
                onChange={(e: any) => handleExtraHours(e, 'userRole')}
              />
            </div>
          </Col>
          <Col xs={24} sm={6}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Terminated By</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select staff name"
                defaultValue="All"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                options={getAdminUser}
                onChange={(e: any) => handleExtraHours(e, 'terminatedBy')}
              />
            </div>
          </Col>
          <Col xs={24} sm={6}>
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

export default TerminatedStaffListFilter