import React from 'react'
import "../../StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";
import { Col, DatePicker, Row, Select, } from 'antd';
import datePicker from "../../../../assets/BookingCalander/images/date-picker.png";
import { useGetStaffNameQuery } from '../../../../store/Slices/Reports';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;


const StaffWorkHistoryFilter = (props: any) => {
  const { handleExtraHours, setFilterValues } = props;
  const { data: staffName } = useGetStaffNameQuery({});

  const getStaffName = staffName?.data?.result?.map((staff: any) => {
    return { value: staff?._id, label: `${staff.firstName} ${staff.lastName}`, id: staff?._id }
  })

  // const getClientName = clientName?.data?.result?.map((staff: any) => {
  //   return { value: staff?._id, label: `${staff.firstName} ${staff.lastName}`, id: staff?._id }
  // })

  return (
    <Row gutter={[20, 20]} className='staff-availability-sheet-common-filter-wrapper' justify="space-between">
      <Col xs={24} md={16} xl={14} xxl={12}>
        <Row gutter={[0, 20]} className="filter-wrapper">
          <Col xs={24} sm={8}>
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
          <Col xs={24} sm={8}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Shift Status</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select shift status"
                defaultValue="All"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                onChange={(e: any) => handleExtraHours(e, 'shiftStatus')}
                options={[
                  { label: "All", value: "" },
                  { label: "SignedOff", value: "SIGNEDOFF" },
                  { label: "Completed", value: "COMPLETED" },
                ]}
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

export default StaffWorkHistoryFilter