import React, { useState } from 'react'
// Ant Components
import { Col, DatePicker, DatePickerProps, Row, Select } from 'antd'
// SCSS
import "../../StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";
// Assets
import datePicker from "../../../../assets/BookingCalander/images/date-picker.png";
import AddModal from '../IncidentReportModal/AddModal.tsx/AddModal';
import { useGetJobRoleQuery } from '../../../../store/Slices/Reports';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

const IncidentReportFilter = (props: any) => {
  const { dayAvailability, handleExtraHours, setFilterValues } = props;
  const [IsOpenIncidentAddModal, setIsOpenIncidentAddModal] = useState(false);
  const { data: userType } = useGetJobRoleQuery({});

  const getUserTypeName = userType?.data?.result?.map((staff: any, i:number) => {
    return { key: `${i}`, value: staff?._id, label: staff?.name, id: staff?._id }
  })

  return (
    <Row gutter={[20, 20]} className='staff-availability-sheet-common-filter-wrapper' justify="space-between">
      <Col xs={24} md={24} xl={24} xxl={24}>  <button className='fs-16 fw-600 line-height-22 white-color cursor-pointer border-radius-6 d-flex align-items-center justify-center'
        style={{ boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)", backgroundColor: "#65CDF0", width: "104px", height: "46px", padding: " 12px 35px", border: "none" }}
        onClick={() => setIsOpenIncidentAddModal(true)}>Add</button>
      </Col>
      <Col xs={24} md={16} xl={14} xxl={12}>
        <Row gutter={[0, 20]} className="filter-wrapper">
          {!dayAvailability && (
            <>
              <Col xs={24} sm={8}>
                <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>User Type</p>
                <div className="filter-column">
                  <Select
                    size="large"
                    placeholder="All"
                    defaultValue="All"
                    optionFilterProp="children"
                    className="app-select-wrap-class"
                    popupClassName="app-select-popup-wrap-class"
                    onChange={(e:any) => handleExtraHours(e, 'userType')}
                    // filterOption={(input: any, option: any) => { (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) }}
                    options={getUserTypeName}
                  />
                </div>
              </Col>

              <Col xs={24} sm={8}>
                <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}> Incident Date </p>
                <div className="filter-column">
               <RangePicker onChange={(values: any) => { !values ? setFilterValues({ startDate: "", endDate: "" }) : setFilterValues({ startDate: dayjs(values[0]).toISOString(), endDate: dayjs(values[1]).toISOString() }) }} className='date-picker ' suffixIcon={<img src={datePicker} alt="calander" />} />
            </div>
              </Col>

              <Col xs={24} sm={8}>
                <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Status</p>
                <div className="filter-column">
                  <Select
                    size="large"
                    placeholder="All"
                    defaultValue="All"
                    optionFilterProp="children"
                    className="app-select-wrap-class"
                    popupClassName="app-select-popup-wrap-class"
                    onChange={(e:any) => handleExtraHours(e, 'status')}
                    // filterOption={(input: any, option: any) => { (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) }}
                    options={[
                      { value: "NEW", label: "New" },
                      { value: "PINDING", label: "Pending" },
                      { value: "RESOLVED", label: "Resolved" },
                      { value: "REOPENED", label: "Reopened" },
                    ]}
                  />
                </div>
              </Col>
            </>
          )}


        </Row>
      </Col>
      <AddModal title={<span className='fw-500 fs-20 titile-color'>Incident Report</span>} IsOpenIncidentAddModal={IsOpenIncidentAddModal} IsCancelIncidentAddModal={() => setIsOpenIncidentAddModal(false)} />

    </Row>
  )
}

export default IncidentReportFilter