import React, { useState } from "react";
import CountWedgits from "./CountWedgits/CountWedgits";
import TotalHoursMonthTable from "./TotalHoursMonthTable/TotalHoursMonthTable";
import searchIcon from "../../../../../assets/icons/search.svg";
import { Avatar, Col, Input, Row, Select } from "antd";
import "../ShiftStatus.scss";
import BreadCrumb from "../../../../../layout/BreadCrumb/BreadCrumb";
import { useLocation, useParams } from "react-router-dom";
import { useGetWorkHistoryQuery } from "../../../../../store/Slices/StaffManager";

import { useGetClientsListQuery } from "../../../../../store/Slices/BookingCalendar";
import { debouncedSearch } from "../../../../../utils/utils";


const TotalHoursMonth = () => {
  const { id } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [pagination, setPagination] = useState({ limit: 6, page: 1 });

  const { state: staffSummaryDetails } = useLocation();

  const { data: clientsList } = useGetClientsListQuery({})
  const [filterValues, setFilterValues] = useState({
    shiftName: undefined,
    shiftStatus: "",
    clientName: "",
  });


  const { data, isLoading, isSuccess } = useGetWorkHistoryQuery({
    staffId: staffSummaryDetails?._id,
    filterValues,
    search: filterValues?.shiftName ?? searchValue,
    pagination: (searchValue || filterValues) ? '1' : pagination?.page,
    limit: pagination?.limit,
  })

  let staffworkHistory: any;
  if (isSuccess) {
    staffworkHistory = data;
  }

  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };

  const shiftTypesList = [
    { value: 'MORNING', label: 'MORNING' },
    { value: 'AFTERNOON', label: 'AFTERNOON' },
    { value: 'NIGHT', label: 'NIGHT' },
    { value: 'LONGDAY', label: 'LONGDAY' }
  ]

  const shiftStatusList = [
    { value: 'PENDING', label: 'Pending' },
    { value: 'ACCEPTED', label: 'Accepted' },
    { value: 'INPROCESS', label: 'Inprocess' },
    { value: 'REJECTED', label: 'Rejected' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'SIGNEDOFF', label: 'Signedoff' },
  ]

  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Total Hours this Month",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Staff Manager",
      path: "/staff-manager",
    },
    {
      title: "Staff Summary",
      path: `/staff-manager/${id}/staff-summary`,
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div>
        <div style={{ paddingBlock: "30px" }}>
          <div>
            <Avatar style={{ backgroundColor: "#4E132C", color: "#FFFFFF" }} size="large">
              {`${staffSummaryDetails?.fullName.charAt(0).toUpperCase()}${staffSummaryDetails?.fullName.split(" ")[1]?.charAt(0).toUpperCase()}`}
            </Avatar>
            <span className="fs-14 fw-600 line-height-17" style={{ marginLeft: "10px" }}>
              {`${staffSummaryDetails?.fullName.split(" ")[0]?.charAt(0).toUpperCase()}${staffSummaryDetails?.fullName.split(" ")[0]?.slice(1).toLowerCase()} ${staffSummaryDetails?.fullName
                .split(" ")[1]
                ?.charAt(0)
                .toUpperCase()}${staffSummaryDetails?.fullName.split(" ")[1]?.slice(1).toLowerCase()}`}
            </span>
          </div>
        </div>
        <Row className="staff-availability-sheet-common-filter-wrapper staff-search-filter bg-white" justify="space-between">
          <Col xs={24} md={16} xl={14} xxl={12}>
            <Row gutter={[0, 20]} className="filter-wrapper">
              <>
                <Col xs={24} sm={8}>
                  <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
                    Shift Name
                  </p>
                  <div className="filter-column">
                    <Select
                      size="large"
                      placeholder=""
                      defaultValue="All"
                      optionFilterProp="children"
                      className="app-select-wrap-class"
                      popupClassName="app-select-popup-wrap-class"
                      onChange={(e: any) => setFilterValues({ ...filterValues, shiftName: e })}
                    >
                      <Select.Option value="" className=" title-color">All</Select.Option>
                      {shiftTypesList?.map((item: any) => (
                        <Select.Option value={item?.value}>{item?.label}</Select.Option>
                      ))}
                    </Select>
                  </div>
                </Col>
                <Col xs={24} sm={8}>
                  <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
                    Shift Status
                  </p>
                  <div className="filter-column">
                    <Select
                      size="large"
                      placeholder=""
                      defaultValue="All"
                      optionFilterProp="children"
                      className="app-select-wrap-class"
                      popupClassName="app-select-popup-wrap-class"
                      onChange={(e: any) => setFilterValues({ ...filterValues, shiftStatus: e })}
                    >
                      <Select.Option value="" className=" title-color">All</Select.Option>
                      {shiftStatusList?.map((item: any) => (
                        <Select.Option value={item?.value}>{item?.label}</Select.Option>
                      ))}
                    </Select>
                  </div>
                </Col>
                <Col xs={24} sm={8}>
                  <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
                    Client Name
                  </p>
                  <div className="filter-column">
                    <Select
                      size="large"
                      placeholder=""
                      defaultValue="All"
                      optionFilterProp="children"
                      className="app-select-wrap-class"
                      popupClassName="app-select-popup-wrap-class"
                      onChange={(e: any) => setFilterValues({ ...filterValues, clientName: e })}
                    >
                      <Select.Option value="" className=" title-color">All</Select.Option>
                      {clientsList?.data?.result?.map((clientDetails: any) => (
                        <Select.Option value={clientDetails?._id}>{clientDetails?.clientName}</Select.Option>
                      ))}
                    </Select>
                  </div>
                </Col>
              </>
            </Row>
          </Col>

          <Col xs={24} md={8} xl={6} className="gutter-row">
            <div className="input-search-wrapper">
              <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
                &nbsp;
              </p>
              <Input placeholder="search by shift name" onChange={debouncedResults} prefix={<img src={searchIcon} className="icon" />} />
            </div>
          </Col>
        </Row>
        <div style={{ marginBottom: "20px" }}>
          <CountWedgits data={staffworkHistory?.data} />
        </div>
        <TotalHoursMonthTable data={staffworkHistory?.data} isLoading={isLoading} pagination={pagination} setPagination={setPagination} />
      </div>
    </>
  );
};
export default TotalHoursMonth;