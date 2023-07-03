import React from 'react'
import { Col, Row, Select, DatePicker } from 'antd'
import { useGetClientNameQuery, useGetJobRoleQuery, } from '../../../../../store/Slices/Reports';
import "../../../StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";
import datePicker from "../../../../../assets/BookingCalander/images/date-picker.png";
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

const ClientRatingFilter = (props: any) => {
  const { handleExtraHours, setFilterValues } = props;
  const { data: userType } = useGetJobRoleQuery({});
  const { data: clientName } = useGetClientNameQuery({});

  const getClientName = clientName?.data?.result?.map((staff: any) => {
    return { value: staff?._id, label: staff?.clientName, id: staff?._id }
  })

  const getUserTypeName = userType?.data?.result?.map((staff: any) => {
    return { value: staff?._id, label: staff?.name, id: staff?._id }
  })

  return (
    <Row gutter={[20, 20]} className='staff-availability-sheet-common-filter-wrapper' justify="space-between" style={{ paddingLeft: "25px", paddingRight: "25px" }}>
      <Col xs={24} md={16} xl={14} xxl={12}>
        <Row gutter={[0, 20]} className="filter-wrapper">
          <Col xs={24} sm={8}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Client Name</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select Client Name"
                // defaultValue="All"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                options={getClientName}
                onChange={(e: any) => handleExtraHours(e, 'clientName')}
              />
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>User Type</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select User Type"
                // defaultValue="All"
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

export default ClientRatingFilter