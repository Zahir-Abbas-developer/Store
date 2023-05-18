import { useState } from "react";
// Ant Components
import { Input, Pagination, Space, Table } from "antd";
// SCSS
import "./ApiInventory.scss";
// Assets
import searchIcon from "../../assets/icons/search.svg";
import coloredCopyIcon from "../../assets/icons/Report/colored-copy.png";
import coloredCsvIcon from "../../assets/icons/Report/colored-csv.png";
import coloredXlsIcon from "../../assets/icons/Report/colored-xls.png";
import { ColumnsType } from "antd/es/table";
import { useGetApisListQuery } from "../../store/Slices/ApiInventory";
import { debouncedSearch } from "../../utils/utils";

const ApiInventoryTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };
  const { data, isSuccess, isLoading } = useGetApisListQuery(searchValue);
  let apiInventoryList: any;
  if (isSuccess) {
    apiInventoryList = data?.data;
  }
  const columns: ColumnsType<any> = [
    {
      title: "Sr #",
      dataIndex: "id",
      key: "id",
      render: (_, __, index: number) => (
        <span className="fs-14 fw-400 m-0 line-height-22" style={{ color: "#4E4B66" }}>
          {index + 1}
        </span>
      ),
    },
    {
      title: "API Name",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Response Time",
      dataIndex: "responseTime",
      key: "responseTime",
    },
  ];

  return (
    <div className="api-inventory-table-wrapper">
      <div className="custom-pagination-search">
        <Space className="input-export-icons" size={[30, 0]}>
          <Input onChange={debouncedResults} className="search-input" placeholder="Search" prefix={<img src={searchIcon} alt="searchIcon" width={24} height={24} style={{ marginRight: "0.623rem" }} />} />
          <Space size={[25, 0]} className="download-icons">
            <img src={coloredCopyIcon} alt="csv" className="img-hover" />
            <img src={coloredCsvIcon} alt="csv" className="img-hover" />
            <img src={coloredXlsIcon} alt="csv" className="img-hover" />
          </Space>
        </Space>
      </div>
      <Table loading={isLoading} columns={columns} dataSource={apiInventoryList?.data} pagination={false} className="common-report-table" scroll={{ x: "max-content", scrollToFirstRowOnChange: true }} />
    </div>
  );
};

export default ApiInventoryTable;
