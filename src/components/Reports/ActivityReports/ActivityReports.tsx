import React, { useState } from 'react'

// Ant Components
import { Col, Popover, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';

// Table and Filters Mock Data and Interface
import { activityReportInterface } from '../../../types/ReportsInterface';
import { useGetActivityReportsQuery } from '../../../store/Slices/Reports';
import dayjs from 'dayjs';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';
import { renderDashboard } from '../../../utils/useRenderDashboard';
import ActivityReportsFilter from './ActivityReportsFilter/ActivityReportsFilter';
import { debouncedSearch } from '../../../utils/utils';


const ActivityReports = () => {
  const [extraReportsFilter, setExtraReportsFilter] = useState({
    activityBy: '',
    activityType: ''
  });
  const [filterValues, setFilterValues] = useState({ startDate: "", endDate: "" });
  const [currentPage ,setCurrentPage]=useState(1)
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [searchClientName ,setSearchClientName]=useState("")
  const paramsObj: any = {};
  if (extraReportsFilter.activityBy) paramsObj["activityBy"] = extraReportsFilter.activityBy;
  if (extraReportsFilter.activityType) paramsObj["activityType"] = extraReportsFilter.activityType;
  if (filterValues?.startDate) paramsObj["startDate"] = filterValues?.startDate;
  if (filterValues?.endDate) paramsObj["endDate"] = filterValues?.endDate;
  if (searchClientName) paramsObj["search"] = searchClientName;
  const userData: any = localStorage.getItem("careUserData")
  const {role,id }: any = JSON.parse(userData);
  if(role==="client") paramsObj["activityBy"]=id
  const query = "&" + new URLSearchParams(paramsObj).toString();

  const { data, isSuccess, isLoading } = useGetActivityReportsQuery({query,  pagination });

  const handleExtraHours = (value: any, type: string) => {
    setExtraReportsFilter({ ...extraReportsFilter, [type]: value })
    setPagination({...pagination ,page:1})
  }
  
  let activityReportsData:any
  if(isSuccess){
    activityReportsData=data
  }
  const searchedByClientName = (event:any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchClientName);
      };
  
  //BreadCrumb Items 
  const breadCrumbItems = [ { title: "Activity Report", path: "", }, { title: "Dashboard", path: renderDashboard(role), }, { title: role==="admin"? "Admin Reports":"Reports", path: "/reports", } ];
  
// Activity Report Table Columns
const ActivityReportTableColumnData: ColumnsType<activityReportInterface> = [
  {
      title: 'Sr #',
      dataIndex: 'key',
      key: 'key',
      render: (_: any, item: any, index: number) =>
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(currentPage) * 5 + index-4}</span>,
  },
  {
      title: 'Activity Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: "center",
      render: (createdAt: string) => (
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(createdAt).format("DD-MM-YYYY")}</span>
      )
  },
  {
      title: 'Activity Name',
      dataIndex: 'activityName',
      key: 'activityName',
      width: 150,
      align: "center",
      ellipsis: true,

      render: (activityName: string) => (
          <Popover
              arrow={false}
              overlayInnerStyle={{ margin: "1rem", padding: 0, height:"auto" }}
              trigger="hover"
              placement="top"
              content={
                  <>
                      <span className='fs-14 fw-400 m-0 line-height-22 white-color btn-secondary card-box-shadow common-border border-radius-8' style={{ padding: "0.938rem 1.125rem" }} >{activityName}</span>
                  </>
              }
          >
              <p className='fs-14 fw-400 m-0 line-height-22 title-color'>{activityName}</p>
          </Popover>
      )
  },
  {
      title: 'Activity Type',
      dataIndex: 'activityType',
      key: 'activityType',
      align: "center",
      render: (activityType: string) =>
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{activityType}</span>,
  },
  {
      title: 'Activity By',
      dataIndex: 'activityByName',
      key: 'activityByName',
      align: "center",
      render: (activityByName: string) =>
          <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{activityByName}</span>,
  },
];

    return (
      <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className='reports-child-wrapper-class'>
            <Row>
                <Col xs={24} className="filter-div">
                <ActivityReportsFilter setFilterValues={setFilterValues} handleExtraHours={handleExtraHours} />

                </Col>
                <Col xs={24}>
                    <CommonReportTable downloadFileName="ActivityReport" downLoadCsvEndPoint={`reports/cancel-shift?page=1&limit=${activityReportsData?.metadata?.total}&downloadType=csv`} placeholder="Search By Activity By" total={activityReportsData?.metadata?.total} setPagination={setPagination} pagination={pagination} searchedByClientName={searchedByClientName} loading={isLoading}   isLoading={isLoading} tableHeader={ActivityReportTableColumnData} tableData={activityReportsData?.result} />
                </Col>
            </Row>
        </div>
      </>
        
    )
}

export default ActivityReports