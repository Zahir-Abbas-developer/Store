import { Col, Row } from 'antd'
import React, { useState } from 'react'
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters'
import CommonReportTable from '../CommonReportTable/CommonReportTable'
import { CertificateReportFilters, CertificateReportTable } from '../../../mock/ReportMockData/CertificateMockData';
import { ColumnsType } from 'rc-table/lib/interface';
import { useGetReportsCertificateInfoQuery } from '../../../store/Slices/Reports';
import { debouncedSearch } from '../../../utils/utils';
import CertificateReportFilter from './CertificateReportFilter/CertificateReportFilter';

const CertificateReport = () => {
  const [extraReportsFilter, setExtraReportsFilter] = useState({
    courseStatus: 'All',
    certificate: ''
  });
  const paramsObj: any = {};
  if (extraReportsFilter.courseStatus) paramsObj["courseStatus"] = extraReportsFilter.courseStatus;
  if (extraReportsFilter.certificate) paramsObj["certificateStatus"] = extraReportsFilter.certificate;
  const query = "&" + new URLSearchParams(paramsObj).toString();
  const [searchClientName, setSearchClientName] = useState("")
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  if (searchClientName) paramsObj["search"] = searchClientName;
   
  const searchedByClientName = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchClientName);
  }

  const handleExtraHours = (value: any, type: string) => {
    setExtraReportsFilter({ ...extraReportsFilter, [type]: value })
  }
  
    const {data ,isLoading ,isSuccess}=useGetReportsCertificateInfoQuery({query,pagination})
    const [currentPage ,setCurrentPage]=useState(1)
    let certificateInfoData:any
    if(isSuccess){
        certificateInfoData=data
    }
    const ActivityReportTableColumnData: ColumnsType<CertificateReportTable> = [
        {
            title: 'Sr #',
            dataIndex: 'key',
            key: 'key',
            width:90,
            render: (_: any, item: any, index: number) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(currentPage) * 5 + index-4}</span>,
        },
        {
            title: 'Trainee Name',
            dataIndex: 'TraineeName',
            key: 'TraineeName',
            width:350,
            align: "center",
            render: (_:any,TraineeName: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{TraineeName?.traineeName}</span>,
           
        },
        {
            title: 'Course Name',
            dataIndex: 'CourseName',
            key: 'CourseName',
            width:450,
            align: "center",
            render: (_:any,CourseName: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{CourseName?.courseName}</span>,
           
        },
        {
            title: 'Course Status',
            dataIndex: 'CourseStatus',
            key: 'CourseStatus',
            width:350,
            align: "center",
            render: (_:any,CourseStatus: any) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{CourseStatus?.courseStatus}</span>,
        },
        {
            title: 'Certificate Status',
            dataIndex: 'Certificate',
            key: 'Certificate',
            align: "center",
            render: (_:any,Certificate: any) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{Certificate?.certificateStatus}</span>,
        },
      ];
  return (
    <div className='reports-child-wrapper-class'>
      <Row>
        <Col xs={24} className="filter-div">
          <CertificateReportFilter handleExtraHours={handleExtraHours} />
        </Col>
        <Col xs={24}>
            <CommonReportTable  total={certificateInfoData?.data?.metadata?.total} setPagination={setPagination} pagination={pagination} placeholder="Search By Trainee Name"  searchedByClientName={searchedByClientName} loading={isLoading} tableHeader={ActivityReportTableColumnData}  tableData={certificateInfoData?.data?.result}/>
        </Col>
      </Row>
    </div>
  )
}

export default CertificateReport