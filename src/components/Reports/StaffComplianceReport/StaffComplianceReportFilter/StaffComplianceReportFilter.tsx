import React from 'react'
import { Col, Row, Select, } from 'antd'
import { useGetJobRoleQuery, useGetStaffNameQuery } from '../../../../store/Slices/Reports';
import "../../StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";

const StaffComplianceReportFilter = (props: any) => {
  const { handleExtraHours } = props;
  const { data: staffName } = useGetStaffNameQuery({});
  const { data: userType } = useGetJobRoleQuery({});

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
          <Col xs={24} sm={8}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Staff Name</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select Staff Name"
                // defaultValue="All"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                options={getStaffName}
                onChange={(e:any) => handleExtraHours(e, 'staffName')}
              />
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>User Type</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select User Status"
                // defaultValue="All"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                options={getUserTypeName}
                onChange={(e:any) => handleExtraHours(e, 'userType')}
              />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default StaffComplianceReportFilter