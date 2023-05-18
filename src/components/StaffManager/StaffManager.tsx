import React, { useState } from "react";
import StaffManagerInfo from "./StaffManagerInfo/StaffManagerInfo";
import StaffManagerWidgets from "./StaffManagerWidgets/StaffManagerWidgets";
import { Col, Input, Row, Select } from "antd";
import searchIcon from "../../assets/icons/search.svg";
import { useGetStaffManagerQuery, useGetUserTypeQuery } from "../../store/Slices/StaffManager";
import { debouncedSearch } from "../../utils/utils";
import "./StaffManager.scss";
import '../Reports/StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss'
import BreadCrumb from "../../layout/BreadCrumb/BreadCrumb";

const StaffManager = () => {
  const [searchValue, setSearchValue] = useState("");
  const [userTypeValue, setUserTypeValue] = useState('');
  const [pagination, setPagination] = useState({ limit: 5, page: 1 });

  const { data, isLoading, isSuccess, isError } = useGetStaffManagerQuery({
    search: searchValue,
    filter: userTypeValue,
    pagination: (searchValue || userTypeValue) ? '1' : pagination?.page,
    limit: pagination?.limit,
  });

  const { data: userType } = useGetUserTypeQuery();
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };


  let staffManagerLists: any;
  let totalRecords: any = 0;
  if (isLoading) {
    staffManagerLists = <p>Loading...</p>;
  } else if (isSuccess) {
    staffManagerLists = data;
  } else if (isError) {
    staffManagerLists = <p>Error...</p>;
  }
  const total = totalRecords?.data?.metadata?.total;


  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Staff Manager",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <StaffManagerWidgets />
      <Row className="staff-availability-sheet-common-filter-wrapper staff-main-search-filter bg-white" justify="space-between">
        <Col xs={24} md={16} xl={14} xxl={12}>
          <Row gutter={[0, 20]} className="filter-wrapper">
            <Col xs={24} sm={8}>
              <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
                Choose by job Role
              </p>
              <div className="filter-column">
                <Select
                  size="large"
                  placeholder="Choose by job Role"
                  defaultValue="All"
                  optionFilterProp="children"
                  className="app-select-wrap-class"
                  popupClassName="app-select-popup-wrap-class"
                  onChange={(e: any) => setUserTypeValue(e)}>
                  <Select.Option value="" className=" title-color">All</Select.Option>
                  {userType?.data?.result?.map((userType: any) => (
                    <Select.Option value={userType?._id}>{userType?.shortForm}</Select.Option>
                  ))}
                </Select>
              </div>
            </Col>
          </Row>
        </Col>

        <Col xs={24} md={8} xl={6} className="gutter-row">
          <div className="input-search-wrapper">
            <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
              &nbsp;
            </p>
            <Input placeholder="search by name" onChange={debouncedResults} prefix={<img src={searchIcon} className="icon" />} />
          </div>
        </Col>
      </Row>
      <StaffManagerInfo data={staffManagerLists?.data} pagination={pagination} setPagination={setPagination} total={total} />
    </>
  );
};

export default StaffManager;