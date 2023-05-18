import { Row, Col, Select, Rate, Progress, DatePicker } from 'antd'
import React, { useState } from 'react';
import datePicker from "../../../../../assets/BookingCalander/images/date-picker.png";
import './CarerRatingCommonFilter.scss';
import dayjs from 'dayjs';
import { useGetStaffNameQuery } from '../../../../../store/Slices/Reports';
const { RangePicker } = DatePicker;

const CarerRatingCommonFilters = (props: any) => {
  const { IsProgressClient, IsProgressCarer, setFilterValues, setExtraReportsFilter } = props;
  const { data: staffName } = useGetStaffNameQuery({});
  const [ClientNameFilterValue, setClientNameFilterValue] = useState<string | undefined>();
  const [UserTypeFilterValue, setUserTypeFilterValue] = useState<string | undefined>();
  const [TimeFrameFilterValue, setTimeFrameFilterValue] = useState<string | undefined>();

  const getStaffName = staffName?.data?.result?.map((staff: any) => {
    return { value: staff?._id, label: `${staff.firstName} ${staff.lastName}`, id: staff?._id }
  })


  return (
    <Row gutter={[0, 20]} className='wrapper-report-rating-common-filters' justify="space-between" style={{ padding: "0px 31px" }}>
      <Col xs={24} md={24} lg={24} xl={16} xxl={14}>

        <Row gutter={[0, 20]} className="filter-wrapper">
          <Col xs={24} md={8} lg={8} xl={8} xxl={8}>
            <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>Carer Name</p>
            <div className="filter-column">
              <Select
                size="large"
                placeholder="Select client name"
                optionFilterProp="children"
                className="app-select-wrap-class"
                defaultValue="All"
                popupClassName="app-select-popup-wrap-class"
                style={{ width: "100%" }}
                value={ClientNameFilterValue}
                onChange={(val: any) => setExtraReportsFilter(val)}
                options={getStaffName}
              />
            </div>
          </Col>

          {/* {!IsShownUserTypeFilter &&
            <Col xs={24} md={8} lg={8} xl={8} xxl={8}>
              <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>User Type</p>
              <div className="filter-column">
                <Select
                  size="large"
                  placeholder="Select user type"
                  optionFilterProp="children"
                  defaultValue="All"
                  className="app-select-wrap-class"
                  popupClassName="app-select-popup-wrap-class"
                  style={{ width: "100%" }}
                  onChange={(value: string) =>
                    value
                      ? setUserTypeFilterValue(value)
                      : setUserTypeFilterValue("")
                  }
                  value={UserTypeFilterValue}
                  options={[
                    { value: "Arsalan Khan", label: "Arsalan Khan" },
                    { value: "Ali Rehman", label: "Ali Rehman" },
                    { value: "Kashif", label: "Kashif" },
                  ]}
                />
              </div>
            </Col>
          } */}
          <Col xs={24} md={8} lg={8} xl={8} xxl={8}>
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
              {/* <Select
                size="large"
                placeholder="Select time frame"
                optionFilterProp="children"
                defaultValue="All"
                className="app-select-wrap-class"
                popupClassName="app-select-popup-wrap-class"
                style={{ width: "100%" }}
                onChange={(value: string) =>
                  value
                    ? setTimeFrameFilterValue(value)
                    : setTimeFrameFilterValue("")
                }
                value={TimeFrameFilterValue}
                options={[
                  { value: "Arsalan Khan", label: "Arsalan Khan" },
                  { value: "Ali Rehman", label: "Ali Rehman" },
                  { value: "Kashif", label: "Kashif" },
                ]}
              /> */}
            </div>
          </Col>
        </Row>
      </Col>
      <Col xs={24} md={24} lg={24} xl={7} xxl={7} className='d-flex align-items-center align-center justify-end'>
        <div className="search-input-row" >
          <p className='fs-20fw-500 title-color line-height-28 m-0' style={{ marginBottom: "0.163rem" }}>Overall Rating</p>

          <div className='' >
            <Rate allowHalf defaultValue={4} style={{ fontSize: "17px" }} />
            {!IsProgressClient &&
              <Progress
                strokeColor={{ from: '#52C41A', to: '#52C41A' }}
                percent={50} style={{ marginLeft: "10px" }} />
            }
            {!IsProgressCarer &&
              <Progress
                strokeColor={{ from: '#EE2E7E', to: '#EE2E7E' }}
                percent={50} style={{ marginLeft: "10px", height: "13px", width: "130px" }} />
            }
          </div>

        </div>
      </Col>
    </Row>
  )
}

export default CarerRatingCommonFilters