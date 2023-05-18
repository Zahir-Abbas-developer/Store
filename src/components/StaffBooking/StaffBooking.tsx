import { useState } from "react";
import { Col, Input, Row, Select } from "antd";
import searchIcon from "../../assets/icons/search.svg";
import StaffBookingTable from "./StaffBookingTable/StaffBookingTable";
import "./StaffBooking.scss";
import "../Reports/StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";
import { debouncedSearch } from "../../utils/utils";
import { useGetStaffBookingQuery, useGetUserTypeQuery } from "../../store/Slices/StaffBooking";
import BreadCrumb from "../../layout/BreadCrumb/BreadCrumb";

const StaffBooking = () => {
  const [searchValue, setSearchValue] = useState("");
  const [userTypeValue, setUserTypeValue] = useState('');
  const [pagination, setPagination] = useState({ limit: 6, page: 1 });

  const { data, isLoading, isSuccess, isError } = useGetStaffBookingQuery({
    search: searchValue,
    filter: userTypeValue,
    pagination: (searchValue || userTypeValue) ? '1' : pagination?.page,
    limit: pagination?.limit,
  });

  const { data: userType } = useGetUserTypeQuery();

  let staffBookingList: any;
  let totalRecords: any = 0;
  if (isLoading) {
    staffBookingList = <p>Loading...</p>;
  } else if (isSuccess) {
    staffBookingList = data;
    totalRecords = data;
  } else if (isError) {
  }
  const total = totalRecords?.data?.metadata?.total;

  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };

  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Staff Booking",
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
      <Row className="staff-availability-sheet-common-filter-wrapper staff-booking-search-filter bg-white" justify="space-between">
        <Col xs={24} md={16} xl={14} xxl={12}>
          <Row gutter={[0, 20]} className="filter-wrapper">
            <>
              <Col xs={24} sm={8}>
                <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
                  User Type
                </p>
                <div className="filter-column">
                  <Select
                    size="large"
                    placeholder=""
                    defaultValue="All"
                    optionFilterProp="children"
                    className="app-select-wrap-class"
                    popupClassName="app-select-popup-wrap-class"
                    onChange={(e: any) => { setUserTypeValue(e) }}>
                    <Select.Option value="" className=" title-color">All</Select.Option>
                    {userType?.data?.result?.map((userType: any) => (
                      <Select.Option value={userType?._id}>{userType?.shortForm}</Select.Option>
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
            <Input placeholder="search by user name" onChange={debouncedResults} prefix={<img src={searchIcon} className="icon" />} />
          </div>
        </Col>
      </Row>

      <StaffBookingTable data={staffBookingList?.data?.result} pagination={pagination} setPagination={setPagination} total={total} isLoading={isLoading} />
    </>
  );
};
export default StaffBooking;