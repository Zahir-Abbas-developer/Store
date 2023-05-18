import React from 'react'
import "../../StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";
import { Col, Row, Select, } from 'antd'
import { useGetJobRoleQuery } from '../../../../store/Slices/Reports';

const StaffDataReportFilter = (props: any) => {
  const { handleExtraHours } = props;
  const { data: userType } = useGetJobRoleQuery({});

  const getUserTypeName = userType?.data?.result?.map((staff: any, i:number) => {
    return { key: `${i}`,value: staff?._id, label: staff?.name, id: staff?._id }
  })

  const getStaffTypeName = userType?.data?.result?.map((staff: any, i:number) => {
    return { key: `${i}`, value: staff?._id, label: staff?.userRole, id: staff?._id }
  })


  return (
    <Row gutter={[20, 20]} className='staff-availability-sheet-common-filter-wrapper' justify="space-between">

      <Col xs={24} md={16} xl={14} xxl={12}>
        <Row gutter={[0, 20]} className="filter-wrapper">
          <Col xs={24} sm={8}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>User Type</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select user type"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                options={getUserTypeName}
                onChange={(e: any) => handleExtraHours(e, 'userType')}
              />
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Staff Type</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select staff type"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                options={getStaffTypeName}
                onChange={(e: any) => handleExtraHours(e, 'staffType')}
              />
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>User Status</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select staff name"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                options={[
                  { label: "Active", value: "active" },
                  { label: "In-Active", value: "inactive" },
                ]}
                onChange={(e: any) => handleExtraHours(e, 'userStatus')}
              />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default StaffDataReportFilter