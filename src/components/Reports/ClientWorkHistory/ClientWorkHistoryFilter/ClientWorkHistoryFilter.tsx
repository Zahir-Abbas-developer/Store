import React from 'react'
import "../../StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";
import { Col, Row, Select, } from 'antd'
import { useGetClientNameQuery, useGetStaffNameQuery } from '../../../../store/Slices/Reports';

const ClientWorkHistoryFilter = (props: any) => {
  const { handleExtraHours } = props;
  const { data: staffName } = useGetStaffNameQuery({});
  const { data: clientName } = useGetClientNameQuery({});

  const getStaffName = staffName?.data?.result?.map((staff: any, i:number) => {
    return { key: i, value: staff?._id, label: `${staff.firstName} ${staff.lastName}`, id: staff?._id }
  })

  const getClientName = clientName?.data?.result?.map((staff: any, i:number) => {
    return { key: i, value: staff?._id, label: staff?.clientName, id: staff?._id }
  })

  return (
    <Row gutter={[20, 20]} className='staff-availability-sheet-common-filter-wrapper' justify="space-between">

      <Col xs={24} md={16} xl={14} xxl={12}>
        <Row gutter={[0, 20]} className="filter-wrapper">
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
                options={getClientName}
                onChange={(e: any) => handleExtraHours(e, 'clientName')}
              />
            </div>
          </Col>
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
                placeholder="Select Shift Status"
                defaultValue="All"
                optionFilterProp="children"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                options={[
                  {label: "All", value: ""},
                  {label: "SignedOff", value: "SIGNEDOFF"},
                  {label: "Completed", value: "COMPLETED"},
                ]}
                onChange={(e: any) => handleExtraHours(e, 'shiftStatus')}
              />
            </div>
          </Col>

        </Row>
      </Col>


    </Row>
  )
}

export default ClientWorkHistoryFilter