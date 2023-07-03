import React, { useState } from "react";

// Ant Components
import { Col, Progress, Row, Space } from "antd";
import type { ColumnsType } from "antd/es/table";

// Components
import CommonReportTable from "../CommonReportTable/CommonReportTable";

// Assets
import circularIcon from "../../../assets/icons/Report/circular-arrows.png";
import blackClockIcon from "../../../assets/icons/Report/black-clock-icon.png";

// Table and Filters Mock Data and Interface
import { staffShiftHoursReportMockDataInterface } from "../../../types/ReportsInterface";
import { useGetReportsShiftHoursQuery } from "../../../store/Slices/Reports";
import StaffShiftHoursReportFilter from "./StaffShiftHoursReportFilter/StaffShiftHoursReportFilter";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";
import { renderDashboard } from "../../../utils/useRenderDashboard";
import { debouncedSearch } from "../../../utils/utils";
import path from "path";

const StaffShiftHoursReport = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [extraReportsFilter, setExtraReportsFilter] = useState('staffReport');
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [searchClientName ,setSearchClientName]=useState("")
  const [filterValues, setFilterValues] = useState<any>({ startDate: "", endDate: "" });
  const paramsObj: any = {};
  if (extraReportsFilter) paramsObj["userType"] = extraReportsFilter;
  if (filterValues?.startDate) paramsObj["startDate"] = filterValues?.startDate;
  if (filterValues?.endDate) paramsObj["endDate"] = filterValues?.endDate;
  if (searchClientName) paramsObj["search"] = searchClientName;
  const userData: any = localStorage.getItem("careUserData");
  const { role ,id}: any = JSON.parse(userData);
  // if(role==="client") paramsObj["staffId"]=id
  const query = "&" + new URLSearchParams(paramsObj).toString();
  const { data, isSuccess, isLoading } = useGetReportsShiftHoursQuery({query,pagination});
  let staffShiftHoursData: any;
  if (isSuccess) {
    staffShiftHoursData = data;
  }
  const searchedByClientName = (event:any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchClientName);
     };

  //BreadCrumb Items
  const breadCrumbItems = [
    { title: "Staff Report", path: "" },
    { title: "Dashboard", path: renderDashboard(role) },
    { title: role==="admin"? "Admin Reports":"Reports", path: "/reports" },
  ];
  // Staff Shift Hours Report Table Columns
  const StaffShiftHoursReportTableColumnData: ColumnsType<staffShiftHoursReportMockDataInterface> =
    [
      {
        title: "Sr #",
        dataIndex: "key",
        key: "key",
        render: (_: any, item: any, index: number) => (
          <span className="fs-14 fw-400 m-0 line-height-22 title-color">
            {currentPage * 5 + index - 4}
          </span>
        ),
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        align: "center",
        render: (_: any, name: any) => (
          <span className="fs-14 fw-400 m-0 line-height-22 title-color">
            {name?.firstName + " " + name?.lastName}
          </span>
        ),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        align: "center",
        render: (email: string) => (
          <span className="fs-14 fw-400 m-0 line-height-22 title-color">
            {email}
          </span>
        ),
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        align: "center",
        render: (phone: string) => (
          <span className="fs-14 fw-400 m-0 line-height-22 title-color">
            {phone}
          </span>
        ),
      },
      {
        title: "No. of Shifts",
        dataIndex: "noOfShift",
        key: "noOfShift",
        align: "center",
        render: (noOfShift: string) => (
          <span className="fs-14 fw-400 m-0 line-height-22 title-color">
            {noOfShift}
          </span>
        ),
      },
      {
        title: "Worked Hours",
        dataIndex: "workedHours",
        key: "workedHours",
        align: "center",
        render: (_: any, workedHours: any) => (
          <span className="fs-14 fw-400 m-0 line-height-22 title-color">
            {Math.round(workedHours?.totalHours)}
          </span>
        ),
      },
    ];
  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="reports-child-wrapper-class">
        <Row gutter={[0, 0]}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} className="filter-div">
            <StaffShiftHoursReportFilter
              setExtraReportsFilter={setExtraReportsFilter}
              setFilterValue={setFilterValues}
            />
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 11 }}
            lg={{ span: 5, offset: 1 }}
            className="filter-div"
          >
            <Space size={16} wrap>
              <Progress
                type="circle"
                strokeColor="#F9896B"
                size={78}
                percent={65}
                format={(percent: any) => (
                  <img src={circularIcon} alt="circular arrows" />
                )}
              />
              <div>
                <p
                  className="fs-26 fw-500 line-height-45 m-0 right-card-heading"
                  style={{ color: "#F9896B" }}
                >
                  {staffShiftHoursData?.data?.totalShift}
                </p>
                <p className="fs-20 fw-400 label-color line-height-28 m-0">
                  No. of Shifts
                </p>
              </div>
            </Space>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 11, offset: 2 }}
            lg={{ span: 5, offset: 1 }}
            className="filter-div"
          >
            <Space size={16} wrap>
              <Progress
                type="circle"
                strokeColor="#51459E"
                size={78}
                percent={85}
                format={(percent: any) => (
                  <img src={blackClockIcon} alt="black clock" />
                )}
              />
              <div>
                <p
                  className="fs-26 fw-500 line-height-45 m-0 right-card-heading"
                  style={{ color: "#51459E" }}
                >
                  {Math.round(staffShiftHoursData?.data?.totalHours)}
                </p>
                <p className="fs-20 fw-400 label-color line-height-28 m-0">
                  Worked Hours
                </p>
              </div>
            </Space>
          </Col>
          <Col xs={24}>
            <CommonReportTable
              total={staffShiftHoursData?.data?.totalShift
              } setPagination={setPagination} pagination={pagination} placeholder="Search By Email" searchedByClientName={searchedByClientName}
              loading={isLoading}
              tableHeader={StaffShiftHoursReportTableColumnData}
              tableData={staffShiftHoursData?.data?.getReport?.result}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default StaffShiftHoursReport;
