import React from "react";

// Ant Components
import { Input, Space, Table } from "antd";

// SCSS
import "./StaffAllocationTable.scss";

// Assets
import searchIcon from "../../../assets/icons/search.svg";
import fileDefault from "../../../assets/icons/StaffAllocation/file-default.svg";
import fileCSV from "../../../assets/icons/StaffAllocation/file-csv.png";
import fileXLS from "../../../assets/icons/StaffAllocation/file-xls.svg";
import { debouncedSearch } from "../../../utils/utils";
import { handleDownloadData } from "../../../utils/DownloadData";

const StaffAllocationTable = (props: any) => {
  const { tableHeader, tableData, loading, setSearchTerm, setSelectedRows,pagination } = props;
  const {setSelectedRowKeys,selectedRowKeys,careHomeId} = props

  const userData: any = localStorage.getItem("careUserData");

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    const selectedRecords = tableData.filter((item: any, index: number) =>
      selectedRowKeys.includes(String(index))
    );
    let selectedIds = selectedRecords.map(({ _id }: any) => _id);
    setSelectedRows(selectedIds);

    setSelectedRowKeys(selectedRowKeys as number[]);
  };

  const debouncedResults: any = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchTerm);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const downloadData = (type:string) => {
    const url:string = `staff/download?downloadType=${type}&clientId=${careHomeId}`
    handleDownloadData(url, type, 'staffData')
  }

  return (
    <div className="common-staff-allocation-table-wrapper">
      <div className="custom-pagination-search">
        <Space className="input-export-icons" size={[30, 0]}>
          <Input
            className="search-input"
            onChange={debouncedResults}
            placeholder="Search"
            prefix={
              <img
                src={searchIcon}
                alt="searchIcon"
                width={24}
                height={24}
                style={{ marginRight: "0.623rem" }}
              />
            }
          />
          <Space size={[25, 0]} className="files-icons">
            <img src={fileDefault} alt="" className="files-export-icons" />
            <img src={fileCSV} onClick={() => downloadData("csv")} alt="" className="files-export-icons" />
            <img src={fileXLS} onClick={() => downloadData("xls")} alt="" className="files-export-icons" />
          </Space>
        </Space>
      </div>
      <Table
        loading={loading}
        rowSelection={rowSelection}
        columns={tableHeader}
        pagination={pagination}
        rowKey={(record, index: any) => index.toString()}
        dataSource={tableData}
        className="common-staff-allocation-table"
        scroll={{ x: "max-content", scrollToFirstRowOnChange: true }}
      />
    </div>
  );
};

export default StaffAllocationTable;
