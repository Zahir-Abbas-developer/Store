import { DatePicker, Input, Popover, Select, Space, Table, Tooltip } from "antd";
import Search from "../../assets/images/OnBoarding/Search.svg";
// import { LogsData, ColumnsData } from "../../mock/AuditLogsMock";
import coloredCopyIcon from "../../assets/icons/Report/colored-copy.png";
import coloredCsvIcon from "../../assets/icons/Report/colored-csv.png";
import coloredXlsIcon from "../../assets/icons/Report/colored-xls.png";
import LogsSelection from "./LogsSelection";
import "./AuditLogs.scss";
import { debouncedSearch } from "../../utils/utils";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { data } from "../../mock/SettingJobRole.ts";
import { useGetAuditLogsRequestQuery } from "../../store/Slices/AuditLogs";
import BreadCrumb from "../../layout/BreadCrumb/BreadCrumb";
const { RangePicker } = DatePicker;

const LogsTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filterValues, setFilterValues] = useState({ startDate: "", endData: "" });
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });


  const paramsObj: any = {};
  if (searchValue) paramsObj["search"] = searchValue;
  if (filterValues?.startDate) paramsObj["startDate"] = filterValues?.startDate;
  if (filterValues?.endData) paramsObj["endDate"] = filterValues?.endData;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  const { data, isLoading }: any = useGetAuditLogsRequestQuery({ page: pagination?.page, limit: pagination?.limit, query });

  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };

  console.log(filterValues);

  const ColumnsData: ColumnsType<any> = [
    {
      title: "Sr #",
      dataIndex: "no",
      key: "no",
      render: (_: any, __: any, index: any) => { return <span>{(index + pagination?.limit * pagination?.page) - pagination?.limit + 1}</span>; },
    },
    {
      title: "Name",
      dataIndex: "activityByName",
      key: "activityByName",
    },
    {
      title: "Event Name",
      dataIndex: "activityName",
      key: "activityName",
      render: (_, record) => (
        <span>
          <Tooltip placement="topLeft" title={record?.activityName}>
            {record?.activityName.length > 50 ? `${record?.activityName.substring(0, 50)}...` : `${record?.activityName}`}
          </Tooltip>
        </span>
      ),
    },
    {
      title: "Event Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => <span>{dayjs(record?.createdAt).format("DD/MM/YYYY")}</span>,
    },
    // {
    //   title: "IP Address",
    //   dataIndex: "ipAddress",
    //   key: "ipAddress",
    // },
    {
      title: "Event Type",
      dataIndex: "activityType",
      key: "activityType",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    // },
  ];

  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Audit Logs",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/super-admin-dashboard",
    },
  ];

  return (
    <div className="audit-logs-wrapper">
      <BreadCrumb breadCrumbItems={breadCrumbItems} />

      {/* <LogsSelection /> */}
      <div className="logs-wrapper-fliters">
        <div className="flex-filters">
          <div className="inner-flex-filters">
            <div className="col-box">
              <div className="area-fliters">
                <div className="filters-label fw-600 fs-14 title-color">Date Range</div>
                <RangePicker bordered={false} onChange={(values: any) => { !values ? setFilterValues({ startDate: "", endData: "" }) : setFilterValues({ startDate: dayjs(values[0]).toISOString(), endData: dayjs(values[1]).toISOString() }) }} />
              </div>
            </div>
          </div>
        </div>
        <div className="selector">
          <div className="search-download-section d-flex" style={{ gap: "30px", flexWrap: "wrap" }}>
            <div className="input-search-wrapper">
              <Input onChange={debouncedResults} placeholder="search" prefix={<img src={Search} alt="search icon" className="icon" />} />
            </div>
            <Space size={[25, 0]} className="download-icons">
              <img src={coloredCopyIcon} alt="csv" className="img-hover" />
              <img src={coloredCsvIcon} alt="csv" className="img-hover" />
              <img src={coloredXlsIcon} alt="csv" className="img-hover" />
            </Space>
          </div>
        </div>
      </div>
      <div className="searchbox">
        <Table className="logs-wrapper-table" loading={isLoading} columns={ColumnsData} dataSource={data?.result} scroll={{ x: "max-content" }} pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: data?.metadata?.total,
              onChange: (page, limit) => setPagination({ page, limit }),
            }}/>
      </div>
    </div>
  );
};

export default LogsTable;
