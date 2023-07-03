import { Rate,Row,Col } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React,{useState} from 'react'
import { ClientReportMockDataInterface } from '../../../../types/ReportsInterface';
import CommonReportTable from '../../CommonReportTable/CommonReportTable';
import CarerRatingCommonFilters from './CarerRatingCommonFilters/CarerRatingCommonFilters';
import '../RatingReportTabs/RatingReportTabs.scss'
import { useGetReportsCarersRatingsQuery } from '../../../../store/Slices/Reports';
import dayjs from 'dayjs';
import { debouncedSearch } from '../../../../utils/utils';

const CarerRating = () => {
  const [extraReportsFilter, setExtraReportsFilter] = useState('');
  const [searchClientName, setSearchClientName] = useState("")
  const [filterValues, setFilterValues] = useState({ startDate: "", endDate: "" });
  const paramsObj: any = {};
  if (extraReportsFilter) paramsObj["carerId"] = extraReportsFilter;
  if (filterValues.startDate) paramsObj["startDate"] = filterValues.startDate;
  if (filterValues.endDate) paramsObj["endDate"] = filterValues.endDate;
  if (searchClientName) paramsObj["search"] = searchClientName;
  const [currentPage ,setCurrentPage]=useState(1)
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const query = "&" + new URLSearchParams(paramsObj).toString();
  const {data ,isSuccess}=useGetReportsCarersRatingsQuery({query,pagination})
  let clientRatingsData:any
  if(isSuccess){
   clientRatingsData=data
  }
  const searchedByClientName = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchClientName);
  }
  const ClientReportTableHeader: ColumnsType<ClientReportMockDataInterface> = [
    {
      title: 'Sr #',
      dataIndex: 'key',
      key: 'key',
      render: (_: any, item: any, index: number) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(currentPage) * 5 + index-4}</span>,
    },
    {
      title: 'Care Home Name',
      dataIndex: 'shiftType',
      key: 'shiftType',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.shiftType}</span>,
    },
    {
      title: 'Shift Name',
      dataIndex: 'shiftType',
      key: 'shiftType',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.shiftType}</span>,
    },
  
    {
      title: 'Shift Date',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(item?.startTime).format("DD-MM-YYYY")}</span>,
    },
    {
      title: 'Shift Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(item?.startTime).format("hh:mm:ss a")}</span>,
    },
    {
      title: 'Booked By',
      dataIndex: 'bookedBy',
      key: 'bookedBy',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.bookedBy?.clientName}</span>,
    },
  
    {
      title: 'Staff Type',
      dataIndex: 'staffType',
      key: 'staffType',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.staffType?.shortForm}</span>,
    },
    {
      title: 'Ratinngs',
      dataIndex: 'rating',
      key: 'rating',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'><Rate defaultValue={item?.ratings?.rating} style={{ fontSize: "15px" }} /></span>,
    },
  ];
  
  return (
    <div>
    <Row>
        <Col xs={24}>
          <CarerRatingCommonFilters IsProgressClient={true} IsShownUserTypeFilter={true} setExtraReportsFilter={setExtraReportsFilter} setFilterValues={setFilterValues} />
        </Col>
        <Col xs={24}  style={{marginTop:"60px"}}>
          <div className='wrapper-report-carer-and-client-ratings-table-style'>
          <CommonReportTable  total={clientRatingsData?.data?.response?.metadata?.total} setPagination={setPagination} pagination={pagination} placeholder="Search By Booked By"  searchedByClientName={searchedByClientName} tableHeader={ClientReportTableHeader} tableData={clientRatingsData?.data?.response?.result} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default CarerRating
