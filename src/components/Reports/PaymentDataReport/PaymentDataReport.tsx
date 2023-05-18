import { useState } from 'react'
// Ant Components
import { Col, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';
// Table and Filters Mock Data and Interface
import { paymentDataReportMockDataInterface } from '../../../types/ReportsInterface';
import { useGetReportsPaymentDataQuery } from '../../../store/Slices/Reports';
import dayjs from 'dayjs';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';
import { renderDashboard } from '../../../utils/useRenderDashboard';
import { debouncedSearch } from '../../../utils/utils';
import PaymentDataReportFilter from './PaymentDataReportFilter/PaymentDataReportFilter';


const PaymentDataReport = () => {
  const [currentPage ,setCurrentPage]=useState(1)
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [searchClientName ,setSearchClientName]=useState("")
  const [extraReportsFilter, setExtraReportsFilter] = useState({
    staffName: '',
    clientName: ''
  });
  const [filterValues, setFilterValues] = useState({ startDate: "", endDate: "" });
  const paramsObj: any = {};
  if (searchClientName) paramsObj["search"] = searchClientName;
  if (extraReportsFilter.staffName) paramsObj["staffId"] = extraReportsFilter.staffName;
  if (extraReportsFilter.clientName) paramsObj["careHomeId"] = extraReportsFilter.clientName;
  if (filterValues?.startDate) paramsObj["startTime"] = filterValues?.startDate;
  if (filterValues?.endDate) paramsObj["endTime"] = filterValues?.endDate;
  const userData: any = localStorage.getItem("careUserData")
  const { role ,id}: any = JSON.parse(userData)
  if(role==="client") paramsObj["careHomeId"]=id
  const query = "&" + new URLSearchParams(paramsObj).toString();
 
   
  const {data ,isSuccess,isLoading}= useGetReportsPaymentDataQuery({query,pagination})
 
  let paymentData:any
  if(isSuccess){
    paymentData=data
  }
  const searchedByClientName = (event:any) => {
    const { value } = event.target;
   debouncedSearch(value, setSearchClientName);
 };
 const handleExtraHours = (value: any, type: string) => {
  setExtraReportsFilter({ ...extraReportsFilter, [type]: value })
}

 
  //BreadCrumb Items 
  const breadCrumbItems = [{ title: "Payment Data", path: "", }, { title: "Dashboard", path: renderDashboard(role), }, { title: role==="admin"? "Admin Reports":"Reports", path: "/reports", }];
  // Payment Data Report Table Columns
  const PaymentDataReportTableColumnData: ColumnsType<paymentDataReportMockDataInterface> = [
    {
      title: 'Sr #',
      dataIndex: 'key',
      key: 'key',
      render: (_: any, item: any, index: number) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(currentPage) * 5 + index - 4}</span>,
    },
    {
      title: 'Shift Date',
      dataIndex: 'shiftDate',
      key: 'shiftDate',
      align: "center",
      render: (_: any, shiftDate: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(shiftDate?.shift?.shiftDate).format("DD-MM-YYYY")}</span>,
    },
    {
        title: 'Shift Day',
        dataIndex: 'shiftDate',
        key: 'shiftDate',
        align: "center",
        render: (_: any, shiftDate: any) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(shiftDate?.shift?.shiftDate).format("dddd")}</span>,
    },
    {
      title: 'Staff Name',
      dataIndex: 'shiftType',
      key: 'shiftType',
      align: "center",
      render: (_: any, shiftType: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftType?.carer?.firstName + " " + shiftType?.carer?.lastName}</span>,
   },
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      key: 'clientName',
      align: "center",
      render: (_: any, clientName: any) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{clientName?.careHome?.clientName}</span>
      )
    },
    // {
    //     title: 'Shift Type',
    //     dataIndex: 'shiftType',
    //     key: 'shiftType',
    //     align: "center",
    //     render: (shiftType: string) =>
    //         <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftType}</span>,
    // },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      align: "center",
      render: (_: any, designation: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{designation?.carer?.personalInformation?.designation}</span>,
    },
    {
      title: 'Employee Status',
      dataIndex: 'status',
      key: 'status',
      align: "center",
      render: (_: any, status: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>Payroll</span>,
    },
    {
      title: 'Total Hours',
      dataIndex: 'totalWorkingHours',
      key: 'totalWorkingHours',
      align: "center",
      render: (_: any, totalWorkingHours: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{Math.round(totalWorkingHours?.totalHours)}</span>,
    },
    {
      title: 'Pay Rate',
      dataIndex: 'perHours',
      key: 'perHours',
      align: "center",
      render: (_:any,perHours: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{perHours?.perHour}</span>,
    },
    {
      title: 'Total Payable',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      align: "center",
      render: (totalAmount: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{totalAmount}</span>,
    },
    {
      title: 'Client Rate',
      dataIndex: 'clientRate',
      key: 'clientRate',
      align: "center",
      render: (_: any, clientRate: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(clientRate?.careHome?.clientRate[`${clientRate?.rateDay}`])}</span>,
    },
    {
      title: 'Total Receivable',
      dataIndex: 'totalReceivable',
      key: 'totalReceivable',
      align: "center",
      render: (_: any, totalReceivable: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{Math.round((totalReceivable?.careHome?.clientRate[`${totalReceivable?.rateDay}`]) * totalReceivable?.totalHours)}</span>,
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className='reports-child-wrapper-class'>
            <Row>
                <Col xs={24} className="filter-div">
                  <PaymentDataReportFilter handleExtraHours={handleExtraHours} setFilterValues={setFilterValues}  />
                </Col>
                <Col xs={24}>
                    <CommonReportTable 
                      downloadFileName="VaccinationReport" downLoadCsvEndPoint={`reports/payment-data?page=1&limit=${paymentData?.data?. total}&downloadType=csv`} downLoadXlsEndPoint={`reports/payment-data?page=1&limit=${paymentData?.data?.total}&downloadType=csv`}
                     total={paymentData?.data?.total
              } setPagination={setPagination} pagination={pagination} placeholder="Search By Client Name" searchedByClientName={searchedByClientName} loading={isLoading} tableHeader={PaymentDataReportTableColumnData} tableData={paymentData?.data?.shifts} />
                </Col>
            </Row>
        </div>
      </>
        
    )
}

export default PaymentDataReport