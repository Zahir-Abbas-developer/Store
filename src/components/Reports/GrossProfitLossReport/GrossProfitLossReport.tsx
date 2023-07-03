import { useState } from "react";

// Ant Components
import { Col, Row } from "antd";
import type { ColumnsType } from "antd/es/table";

// Components
import CommonReportTable from "../CommonReportTable/CommonReportTable";
import CommonReportChildFilters from "../CommonReportChildFilters/CommonReportChildFilters";
import GrossProfitLossTopFilters from "./GrossProfitLossTopFilters/GrossProfitLossTopFilters";

// Table and Filters Mock Data and Interface
import { GrossProfitLossReportFilters } from "../../../mock/ReportMockData/GrossProfitLossReport";
import { grossProfitLossReportMockDataInterface } from "../../../types/ReportsInterface";
import { useGetReportsProftGrossProfitQuery } from "../../../store/Slices/Reports";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";
import { renderDashboard } from "../../../utils/useRenderDashboard";
import { debouncedSearch } from "../../../utils/utils";

const GrossProfitLossReport = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [extraReportsFilter, setExtraReportsFilter] = useState();
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [searchClientName, setSearchClientName] = useState("");
  const [filterValues, setFilterValues] = useState({ startDate: "", endDate: "" });
  const paramsObj: any = {};
  if (searchClientName) paramsObj["clientName"] = searchClientName;
  if (extraReportsFilter) paramsObj["careHomeId"] = extraReportsFilter;
  if (filterValues?.startDate) paramsObj["startTime"] = filterValues?.startDate;
  if (filterValues?.endDate) paramsObj["endTime"] = filterValues?.endDate;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  const { data, isSuccess, isLoading } = useGetReportsProftGrossProfitQuery({query,pagination});

  let profitGrossLoss: any
  if (isSuccess) {
    profitGrossLoss = data
  }

  const searchedByClientName = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchClientName);
  };

  const userData: any = localStorage.getItem("careUserData")
  const { role }: any = JSON.parse(userData);

  //BreadCrumb Items
  const breadCrumbItems = [{ title: "Gross Profit & Loss", path: "", }, { title: "Dashboard", path: renderDashboard(role), }, { title: role==="admin"? "Admin Reports":"Reports", path: "/reports", }];
  // Gross Profit Loss Report Table Columns
  const GrossProfileLossReportTableHeader: ColumnsType<grossProfitLossReportMockDataInterface> = [
    {
      title: 'Sr #',
      dataIndex: 'key',
      key: 'key',
      render: (_: any, item: any, index: number) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(currentPage) * 5 + index - 4}</span>,
    },
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      key: 'clientName',
      align: "left",
      render: (clientName: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{clientName}</span>
      )
    },
    {
      title: 'Worked Hours',
      dataIndex: 'totalWorkingHours',
      key: 'totalWorkingHours',
      align: "center",
      render: (totalWorkingHours: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>${Math.round(totalWorkingHours)}</span>,
    },
    {
      title: 'Client Amount',
      dataIndex: 'clientAmount',
      key: 'clientAmount',
      align: "center",
      render: (clientAmount: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>${clientAmount}</span>,
    },
    {
      title: 'Staff Amount',
      dataIndex: 'staffAmount',
      key: 'staffAmount',
      align: "center",
      render: (staffAmount: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>${staffAmount}</span>,
    },
    {
      title: 'Diff. |£|',
      dataIndex: 'diff',
      key: 'diff',
      align: "center",
      render: (_:any ,diff: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>${ diff?.staffAmount-diff?.clientAmount}</span>,
    },
  ];
  const extraCardsData: any = {
    totalHoursWorked: profitGrossLoss?.data?.totalHoursWorked,
    totalClientAmount: profitGrossLoss?.data?.totalClientAmount,
    totalStaffAmount: profitGrossLoss?.data?.totalStaffAmount,
    diff:profitGrossLoss?.data?.totalStaffAmount-profitGrossLoss?.data?.totalClientAmount
  }

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className='reports-child-wrapper-class'>
        <Row gutter={[0, 20]}>
          <Col xs={24} className="filter-div">
            <GrossProfitLossTopFilters setFilterValues={setFilterValues} setExtraReportsFilter={setExtraReportsFilter} />
          </Col>
          <Col xs={24} className="filter-div">
            <CommonReportChildFilters filtersArray={GrossProfitLossReportFilters} extraCards={true} extraCardsData={extraCardsData} />
          </Col>
          <Col xs={24}>
            <CommonReportTable
              searchedByClientName={searchedByClientName}
              loading={isLoading}
              downloadFileName="GrossProfitLoss" downLoadCsvEndPoint={`reports/gross-profit-loss?page=1&limit=${profitGrossLoss?.data?.total}&downloadType=csv`} downLoadXlsEndPoint={`reports/gross-profit-loss?page=1&limit=${profitGrossLoss?.data?.total}&downloadType=csv`}
              placeholder="Search By Client Name"
              total={profitGrossLoss?.data?.total} setPagination={setPagination} pagination={pagination}
              tableHeader={GrossProfileLossReportTableHeader}
              tableData={profitGrossLoss?.data?.shifts}
            />
          </Col>
        </Row>
      </div>
    </>

  )
}

export default GrossProfitLossReport;
