import { Col, Row } from 'antd'
import { useState } from 'react'
import { WebinarsReportTable } from '../../../mock/ReportMockData/WebinarsMockData'
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import { ColumnsType } from 'rc-table/lib/interface';
import { useGetReportsWebinarInfoQuery } from '../../../store/Slices/Reports';
import dayjs from 'dayjs';
import { debouncedSearch } from '../../../utils/utils';
import WebinarsReportsFilter from './WebinarsReportsFilter/WebinarsReportsFilter';



const WebinarsReports = () => {
  const [extraReportsFilter, setExtraReportsFilter] = useState('All');
  const [filterValues, setFilterValues] = useState({ startDate: "", endDate: "" });
  const [searchClientName, setSearchClientName] = useState("")
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const paramsObj: any = {};
  if (extraReportsFilter) paramsObj["webinarStatus"] = extraReportsFilter;
  if (filterValues.startDate) paramsObj["startDate"] = filterValues.startDate;
  if (filterValues.endDate) paramsObj["endDate"] = filterValues.endDate;
  if (searchClientName) paramsObj["search"] = searchClientName;
 
  const query = "&" + new URLSearchParams(paramsObj).toString();
  
  const searchedByClientName = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchClientName);
  }
    const {data ,isSuccess}=useGetReportsWebinarInfoQuery({query,pagination})
    const [currentPage ,setCurrentPage]=useState(1)
    let webinarInfoReportsData:any
    if(isSuccess){
        webinarInfoReportsData=data
    }
    const ActivityReportTableColumnData: ColumnsType<WebinarsReportTable> = [
        {
            title: 'Sr #',
            dataIndex: 'key',
            key: 'key',
            width:100,
            render: (_: any, item: any, index: number) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(currentPage) * 5 + index-4}</span>,
        },
        {
            title: 'Webinar Title',
            dataIndex: 'WebinarTitle',
            key: 'WebinarTitle',
            width:330,
            align: "center",
            render: (_:any,WebinarTitle: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{WebinarTitle?.title}</span>,
           
        },
        {
            title: 'Date',
            dataIndex: 'Date',
            key: 'Date',
            width:280,
            align: "center",
            render: (_:any,Date: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(Date?.date).format("DD-MM-YYYY")}</span>,
           
        },
        {
            title: 'Venue ',
            dataIndex: 'Venue',
            key: 'Venue',
            width:290,
            align: "center",
            render: (_:any,Venue: any) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{Venue?.venue}</span>,
        },
        {
            title: 'No. of Attendees',
            dataIndex: 'NoOfAttendees',
            key: 'NoOfAttendees',
            width:290,
            align: "center",
            render: (_:any, NoOfAttendees: any) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{NoOfAttendees?.attendees}</span>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width:160,
            align: "center",
            render: (status: string) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{status}</span>,
        },
      ];
  return (
    <div className='reports-child-wrapper-class'>
      <Row>
        <Col xs={24} className="filter-div">
          <WebinarsReportsFilter setExtraReportsFilter={setExtraReportsFilter} setFilterValues={setFilterValues} />
        </Col>
        <Col xs={24}>
            <CommonReportTable total={webinarInfoReportsData?.data?.metadata?.total} setPagination={setPagination} pagination={pagination} placeholder="Search By Webinar Title"  searchedByClientName={searchedByClientName} tableHeader={ActivityReportTableColumnData}  tableData={webinarInfoReportsData?.data?.result}/>
            
        </Col>
      </Row>
    </div>
  )
}

export default WebinarsReports