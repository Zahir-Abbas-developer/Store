import { Avatar, Col, Input, Row, Select } from "antd";
import CountWedgits from "./CountWedgits/CountWedgits";
import WorkHistoryTable from "./workHistoryTable/WorkHistoryTable";
import searchIcon from "../../../assets/icons/search.svg";
import { useLocation } from "react-router-dom";
import { useGetStaffWorkHistoryQuery } from "../../../store/Slices/StaffBooking";
import "./WorkHistory.scss";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";
import { useState } from "react";
import { useGetClientsListQuery } from "../../../store/Slices/BookingCalendar";
import { debouncedSearch } from "../../../utils/utils";


const WorkHistory = () => {
  const { state: staffSummaryDetails } = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const { data: clientsList } = useGetClientsListQuery({});
  const [pagination, setPagination] = useState({ limit: 6, page: 1 });

  const [filterValues, setFilterValues] = useState({
    shiftName: undefined,
    shiftStatus: "",
    clientName: "",
  });

  const { data, isLoading, isSuccess, isError } = useGetStaffWorkHistoryQuery({
    staffId: staffSummaryDetails?._id,
    filterValues,
    search: filterValues?.shiftName ?? searchValue,
    pagination: (searchValue || filterValues) ? '1' : pagination?.page,
    limit: pagination?.limit,
  });

  let staffworkHistory: any;
  if (isLoading) {
    staffworkHistory = <p>Loading...</p>;
  } else if (isSuccess) {
    staffworkHistory = data;
  } else if (isError) {
    staffworkHistory = <p>Error...</p>;
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
      title: "Work History",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Staff Booking",
      path: "/staff-booking",
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div style={{ paddingBlock: "30px" }}>
        <div>
          <Avatar style={{ backgroundColor: "#4E132C", color: "#FFFFFF" }} size="large">
            {`${staffSummaryDetails?.firstName?.charAt(0)?.toUpperCase()}${staffSummaryDetails?.lastName?.charAt(0)?.toUpperCase()}`}
          </Avatar>
          <span className="fs-14 fw-600 line-height-17" style={{ marginLeft: "10px" }}>
            {`${staffSummaryDetails?.firstName} ${staffSummaryDetails?.lastName}`}
          </span>
        </div>
      </div>
      <Row className="staff-availability-sheet-common-filter-wrapper work-histor-search-filter bg-white" justify="space-between">
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
      <CountWedgits data={staffworkHistory?.data} />
      <WorkHistoryTable data={staffworkHistory?.data} isLoading={isLoading} pagination={pagination} setPagination={setPagination} />
    </>
  );
};
export default WorkHistory;