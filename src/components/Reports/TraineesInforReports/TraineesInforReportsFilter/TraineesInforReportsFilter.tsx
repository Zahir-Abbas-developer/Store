import React from 'react'
import "../../StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";
import { Col, Row, Select, } from 'antd'

const TraineesInforReportsFilter = (props: any) => {
  const { setExtraReportsFilter } = props;

  return (
    <Row gutter={[20, 20]} className='staff-availability-sheet-common-filter-wrapper' justify="space-between">

      <Col xs={24} md={16} xl={14} xxl={12}>
        <Row gutter={[0, 20]} className="filter-wrapper">
          <Col xs={24} sm={12}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Course Status</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select a course status"
                defaultValue="All"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                options={[
                  { value: "ALL", label: "All" },
                  { value: "ENROLLED", label: "Enrolled" },
                  { value: "INPROGRESS", label: "InProgress" },
                  { value: "COMPLETED", label: "Completed" },
                ]}
                onChange={(e: any) => setExtraReportsFilter(e)}
              />
            </div>
          </Col>
        </Row>
      </Col>


    </Row>
  )
}

export default TraineesInforReportsFilter