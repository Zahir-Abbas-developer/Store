import React, { useState } from 'react'

// Ant Components
import { Input, Pagination, Space, Table } from 'antd'

// SCSS
import "./CommonReportTable.scss";

// Assets
import searchIcon from "../../../assets/icons/search.svg";
import coloredCopyIcon from "../../../assets/icons/Report/colored-copy.png";
import coloredCsvIcon from "../../../assets/icons/Report/colored-csv.png";
import coloredXlsIcon from "../../../assets/icons/Report/colored-xls.png";
import { handleDownloadData } from '../../../utils/DownloadData';



const CommonReportTable = (props: any) => {
    const { tableHeader, tableData,searchedByClientName ,isLoading,placeholder,pagination,setPagination,total,downLoadCsvEndPoint,downloadFileName,downLoadXlsEndPoint,setCurrentPage} = props;
  

    return (
        <div className='common-report-table-wrapper'>
            <div className='custom-pagination-search' style={{justifyContent:"end"}}>
                
                <Space className='input-export-icons' size={[30, 0]} >
                    <Input
                    onChange={searchedByClientName}
                        className="search-input"
                        placeholder={placeholder}
                        prefix={<img src={searchIcon} alt="searchIcon" width={24} height={24} style={{ marginRight: '0.623rem' }} />}
                    />
                    <Space size={[25, 0]}>
                        <img src={coloredCopyIcon} alt="csv" className='img-hover'  />
                        <img src={coloredCsvIcon} alt="csv" className='img-hover' onClick={() => handleDownloadData(downLoadCsvEndPoint, 'csv',downloadFileName)} />
                        <img src={coloredXlsIcon} alt="csv" className='img-hover' onClick={() => handleDownloadData(downLoadXlsEndPoint, 'xls',downloadFileName)} />
                    </Space>
                </Space>

            </div>
            <Table 
            pagination={{
                current: pagination?.page,
                pageSize: pagination?.limit,
                total: total,
                onChange: (page, limit) => setPagination({ page, limit },setCurrentPage((page-1 )* 10 + 1)),
              }} 
              tableLayout="fixed" loading={isLoading} columns={tableHeader} dataSource={tableData} className="common-report-table" scroll={{ x: "max-content", scrollToFirstRowOnChange: true }} />
        </div>
    )
}

export default CommonReportTable