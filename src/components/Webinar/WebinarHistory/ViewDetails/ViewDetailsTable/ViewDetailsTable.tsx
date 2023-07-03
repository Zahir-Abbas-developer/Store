import React, { useState } from 'react'

// Ant Components
import { Input, Pagination, Space, Table } from 'antd'

// SCSS
import "./ViewDetailsTable.scss";

// Assets
import searchIcon from "../../../../../assets/icons/search.svg";
const ViewDetailsTable = (props: any) => {
  const { tableHeader, tableData, handelSelectedRowChange } = props;
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });

  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const onSelectChange = (selectedRowKeys: React.Key[]) => {

    const selectedRecords = tableData.filter((item: any, index: number) =>
      selectedRowKeys.includes(String(index))
    );
    let selectedIds = selectedRecords.map(({ _id }: any) => _id);
    setSelectedRowKeys(selectedIds);
    setSelectedRowKeys(selectedRowKeys as number[]);
    handelSelectedRowChange(selectedRowKeys)
  };



  const rowSelection = {
    onChange: onSelectChange,
    selectedRowKeys,
  };

  console.log("selectedRowKeys", selectedRowKeys)


  return (
    <div className='common-staff-allocation-table-wrapper'>
      <div className='custom-pagination-search'>
        <Pagination
          current={pagination?.current}
          // responsive={true}
          showSizeChanger={true}
          defaultPageSize={5}
          pageSize={pagination?.pageSize}
          rootClassName="custom-pagination-wrapper-class"
          total={tableData?.length}
          // showTotal={(total) => `Total ${total} items`}
          onChange={(current, pageSize) =>
            setPagination({ current, pageSize })
          }
        />
      </div>
      <Table
        rowSelection={rowSelection}
        columns={tableHeader}
        rowKey={(record) => record._id}
        dataSource={tableData}
        pagination={pagination}
        onChange={(pagination: any) => setPagination(pagination)}
        className="common-staff-allocation-table" scroll={{ x: "max-content", scrollToFirstRowOnChange: true }} />

    </div>
  )
}

export default ViewDetailsTable