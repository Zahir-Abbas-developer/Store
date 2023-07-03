import React, { useState } from 'react'

import { Row, Col, Rate } from 'antd';
import CommonReportTable from '../../CommonReportTable/CommonReportTable';
import { debouncedSearch } from '../../../../utils/utils';
import { ClientReportMockDataInterface } from '../../../../types/ReportsInterface';

import { ColumnsType } from 'antd/es/table';
import '../RatingReportTabs/RatingReportTabs.scss'
import { useGetReportsClientsRatingsQuery } from '../../../../store/Slices/Reports';
import dayjs from 'dayjs';
import ClientRatingFilter from './ClientRatingFilter/ClientRatingFilter';


const ClientRating = () => {
  const [extraReportsFilter, setExtraReportsFilter] = useState({
    clientName: '',
    userType: ''
  });
  const [filterValues, setFilterValues] = useState({ startDate: "", endDate: "" });
  const [filterClientName, setFilterClientName] = useState("");
  const [carerType, setCarerType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchClientName, setSearchClientName] = useState("")
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const paramsObj: any = {};
  if (searchClientName) paramsObj["search"] = searchClientName;
  if (filterClientName) paramsObj["clientName"] = filterClientName;
  if (extraReportsFilter.userType) paramsObj["userType"] = extraReportsFilter.userType;
  if (filterValues.startDate) paramsObj["startDate"] = filterValues.startDate;
  if (filterValues.endDate) paramsObj["endDate"] = filterValues.endDate;
  if (carerType) paramsObj["carerType"] = carerType;
  const query = "&" + new URLSearchParams(paramsObj).toString();
  const { data, isSuccess } = useGetReportsClientsRatingsQuery({ query, pagination });

  const handleExtraHours = (value: any, type: string) => {
    setExtraReportsFilter({ ...extraReportsFilter, [type]: value })
  }
  
  let clientRatingsData: any
  if (isSuccess) {
    clientRatingsData = data
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
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(currentPage) * 5 + index - 4}</span>,
    },
    {
      title: 'Staff Name',
      dataIndex: 'staffName',
      key: 'staffName',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.staffName}</span>,
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
      dataIndex: 'shiftStartTime',
      key: 'shiftStartTime',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(item?.shiftStartTime).format("DD-MM-YYYY")}</span>,
    },
    {
      title: 'Shift Time',
      dataIndex: 'shiftStartTime',
      key: 'shiftStartTime',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(item?.shiftStartTime).format("hh:mm:ss a")}</span>,
    },
    {
      title: 'Booked By',
      dataIndex: 'bookedBy',
      key: 'bookedBy',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.bookedBy}</span>,
    },

    {
      title: 'Staff Type',
      dataIndex: 'staffType',
      key: 'staffType',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.staffType}</span>,
    },
    {
      title: 'Ratinngs',
      dataIndex: 'rating',
      key: 'rating',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'><Rate defaultValue={item?.rating} style={{ fontSize: "15px" }} /></span>,
    },
  ];
  return (
    <div className='reports-child-wrapper-class'>
      <Row>
        <Col xs={24}>
          <ClientRatingFilter handleExtraHours={handleExtraHours} setFilterValues={setFilterValues} />
        </Col>
        <Col xs={24} style={{ marginTop: "60px" }} className='wraper-report-rating-table'>
      <div className='wrapper-report-carer-and-client-ratings-table'>
        <CommonReportTable total={clientRatingsData?.data?.response?.metadata?.total} setPagination={setPagination} pagination={pagination} placeholder="Search By Staff Name" searchedByClientName={searchedByClientName} tableHeader={ClientReportTableHeader} tableData={clientRatingsData?.data?.response?.result} />
      </div>
    </Col>
  </Row>
    </div >
  )
}

export default ClientRating
