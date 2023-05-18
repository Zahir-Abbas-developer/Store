
import { Col, Row } from 'antd';
import CommonReportChildFilters from '../../../Reports/CommonReportChildFilters/CommonReportChildFilters';
import CommonReportTable from '../../../Reports/CommonReportTable/CommonReportTable';
import { useGetReportsExtraHoursQuery } from '../../../../store/Slices/Reports';
import { extraHoursReportTableMockDataInterface } from '../../../../types/ReportsInterface';
import { ColumnsType } from 'antd/es/table';
import { FinanceReportShiftSummaryDetail } from '../../../../mock/FinanceReportShiftSummaryDetail';
import { ClockCircleFilled } from '@ant-design/icons';
import './ShiftSummaryReportDetail.scss';

const ShiftSummaryReportDetail = () => {

// Extra Hours Report Table Columns
const ExtraHoursReportTableHeader: ColumnsType<extraHoursReportTableMockDataInterface> = [
  {
    title: 'Sr #',
    dataIndex: 'key',
    key: 'key',
    render: (key: React.Key) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{key}</span>,
  },
  {
    title: 'Shift Date',
    dataIndex: 'staffName',
    key: 'staffName',
    align: "center",
    render: (_:any ,staffName: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffName?.carer?.firstName + " " + staffName?.carer?.lastName    }</span>,
  },
  {
    title: 'Client Name',
    dataIndex: 'clientName',
    key: 'clientName',
    align: "center",
    render: (_:any ,clientName: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{clientName?.careHome?.clientName}</span>,
  },
  {
    title: 'Staff Name',
    dataIndex: 'shiftType',
    key: 'shiftType ',
    align: "center",
    render: (_:any,shiftType: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftType?.shift?.shiftType }</span>,
  },
  {
    title: 'Staff Type',
    dataIndex: 'firstCheckIn',
    key: 'checkIn',
    align: "center",
    render: (_:any ,checkIn: any) =>
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{checkIn?.timeTrack[0]?.checkIn}</span>,
  },
  {
    title: 'Checkin',
    dataIndex: 'checkOut',
    key: 'checkOut',
    render: (_:any ,checkOut: any) => (
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{checkOut?.timeTrack?.slice(-1)[0]?.checkOut }</span>
    ),
    align: "center",
  },
  {
    title: 'Checkout',
    dataIndex: 'extraHours',
    key: 'extraHours',
    render: (extraHours: string) => (
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{extraHours}</span>
    ),
    align: "center",
  },
  {
    title: 'Hours',
    dataIndex: 'approvalStatus',
    key: 'approvalStatus',
    render: (approvalStatus: string) => (
      <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{approvalStatus}</span>
    ),
    align: "center",
  },
];

const {data ,isSuccess} =useGetReportsExtraHoursQuery({})
let extraReportsData:any
if(isSuccess){
  extraReportsData=data
}

  return (
         <div className='reports-child-wrapper-class'>
         <Row gutter={12}>
           <Col xs={24} className="filter-div">
             <CommonReportChildFilters filtersArray={FinanceReportShiftSummaryDetail} />
           </Col>
           <Col lg={12} xs={24}>
            <div className='total-hours d-flex justify-between border-radius-8'>
              <div className='d-flex'>
              <ClockCircleFilled className='title-color'/>
                <h6 className='fs-22 fw-500 m-0 title-color'>Total Hours:</h6>
              </div>
              
              <h6 className='fs-24 fw-500 m-0 title-color'>15</h6>
              </div>
           </Col>
           <Col lg={12} xs={24}>
            <div className='total-Shift d-flex justify-between border-radius-8'>
              <div className='d-flex'>
              <ClockCircleFilled className='title-color'/>
                <h6 className='fs-22 fw-500 m-0 title-color'>Total Shift:</h6>
              </div>
              
              <h6 className='fs-24 fw-500 m-0 title-color'>15</h6>
              </div>
           </Col>
           <Col lg={6} xs={24}></Col>
           <Col xs={24}>
             <CommonReportTable tableHeader={ExtraHoursReportTableHeader} tableData={extraReportsData?.data?.shifts} />
           </Col>
         </Row>
       </div>
  )
}

export default ShiftSummaryReportDetail