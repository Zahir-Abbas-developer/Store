import { Col, Row } from 'antd'
import { useState } from 'react'
import { TraineesInfoTable, TraineesInforFilters } from '../../../mock/ReportMockData/TraineesInfoMockData'
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters'
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import { ColumnsType } from 'rc-table/lib/interface';
import { useGetReportsTraineeInfoQuery } from '../../../store/Slices/Reports';
import ApiLoader from '../../ApiLoader/ApiLoader';
import { debouncedSearch } from '../../../utils/utils';
import TraineesInforReportsFilter from './TraineesInforReportsFilter/TraineesInforReportsFilter';


const TraineesInforReports = () => {
  const [searchClientName, setSearchClientName] = useState("")
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [extraReportsFilter, setExtraReportsFilter] = useState('ALL');
  const paramsObj: any = {};
  if (extraReportsFilter) paramsObj["courseStatus"] = extraReportsFilter;
  if (searchClientName) paramsObj["search"] = searchClientName;
 
  const query = "&" + new URLSearchParams(paramsObj).toString();
  
  const searchedByClientName = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchClientName);
  }
    const {data,isLoading,isSuccess}=useGetReportsTraineeInfoQuery({query,pagination})
    const [currentPage ,setCurrentPage]=useState(1)
    let trainingInfoReportsData:any
    if(isSuccess){
        trainingInfoReportsData=data
    }
    
const ActivityReportTableColumnData: ColumnsType<TraineesInfoTable> = [
    {
      title: 'Sr #',
      dataIndex: 'key',
      key: 'key',
      width: 90,
      render: (_: any, item: any, index: number) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(currentPage) * 5 + index - 4}</span>,
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
      width: 450,
      align: "center",
      render: (_: any, CourseName: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{CourseName?.courseName}</span>,

    },
    {
      title: 'Course Status',
      dataIndex: 'CourseStatus',
      key: 'CourseStatus',
      width: 350,
      align: "center",
      render: (_: any, CourseStatus: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{CourseStatus?.courseStatus}</span>,
    },
    {
      title: 'Training Name',
      dataIndex: 'AssesmentStatus',
      key: 'AssesmentStatus',
      align: "center",
      render: (_: any, AssesmentStatus: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{AssesmentStatus?.traineeName}</span>,
    },
  ];

  return (
    <div className='reports-child-wrapper-class'>
    <Row>
        <Col xs={24} className="filter-div">
          <TraineesInforReportsFilter setExtraReportsFilter={setExtraReportsFilter}  />
        </Col>
        <Col xs={24}>
            <CommonReportTable   total={trainingInfoReportsData?.data?.metadata?.total} setPagination={setPagination} pagination={pagination} placeholder="Search By Trainee Name"  searchedByClientName={searchedByClientName} loading={isLoading} tableHeader={ActivityReportTableColumnData}  tableData={trainingInfoReportsData?.data?.result}/>
            
        </Col>
    </Row>
</div>
  )
}

export default TraineesInforReports