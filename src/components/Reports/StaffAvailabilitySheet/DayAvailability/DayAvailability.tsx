import React,{useState} from 'react'

// Ant Components
import { Col, Row, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import StaffAvailabilitySheetCommonFilter from '../StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter';

// Mock Data and Interface
import { DailyAvaialabilityTableMockData } from '../../../../mock/ReportMockData/StaffAvailabilitySheetMockData';
import { dailyAvaialabilityTableMockDataInterface } from '../../../../types/ReportsInterface';
import { useGetStaffDayAvailabilityQuery } from '../../../../store/Slices/Reports';
import { isNullOrEmpty } from '../../../../utils/utils';
import dayjs from 'dayjs';

// Staff Daily Availability Report Table Columns

const DayAvailability = () => {
  const [pagination, setPagination] = useState({ limit: 6, page: 1 });
  const [changeDayKey ,setChangeDayKey]=useState(dayjs().format('YYYY-MM-DD'))
  const { data, isLoading, isSuccess } = useGetStaffDayAvailabilityQuery({ refetchOnMountOrArgChange: true, pagination: pagination?.page, limit: pagination?.limit,dayDate:dayjs(changeDayKey).format("YYYY-MM-DD")})
  let staffDayAvailability: any;

   if (isSuccess) {
    staffDayAvailability = data
  }
 

  const removeDuplicate = (shifts: any) => {
    let arr = shifts.split(",");
    return arr.filter((value:string, index:number) => arr.indexOf(value) === index).join(", ");
  }
  const total=staffDayAvailability?.data?.metadata?.total;
  const StaffDailyAvaialabilityTableHeader: ColumnsType<dailyAvaialabilityTableMockDataInterface> = [
    {
        title: 'Staff Name',
        dataIndex: 'userName',
        key: 'userName ',
  
    render: (_, text:any) => (
      <div className="cursor-pointer d-flex align-center">       
      <img src={ isNullOrEmpty(text?.profilePhoto?.profilepic)? `https://ui-avatars.com/api/?rounded=true&name=${text?.userName}` : `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${text?.profilePhoto?.profilepic}`} height={34} width={34} alt="avatar" style={{borderRadius:"50%"}}
       onError={(e:any) => {
        e.target.onerror = null; 
         e.target.src = `https://ui-avatars.com/api/?rounded=true&name=${text?.userName}`;
        }}/>
      <span className='fs-14 fw-400 title-color' style={{ marginLeft: "10px" }}>
      {text?.userName}
      </span>
    </div>
  )
    },
    {
        title: 'Designation',
        dataIndex: 'userTypeshortForm',
        key: 'userTypeshortForm',
       
        render: (userTypeshortForm: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{userTypeshortForm}</span>,
    },
    {
        title: 'Mobile Number',
        dataIndex: 'phone',
        key: 'phone',
       
        render: (phone: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{phone}</span>,
    },
    {
        title: <div className='d-flex flex-column'>{dayjs(changeDayKey).format("dddd")}
        {/* <span className='fs-12 fw-400'>16/05/2022</span> */}
        </div>,
        dataIndex: 'shifts',
        key: 'shifts',
       
        render: (shifts: string) =>
            <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{removeDuplicate(shifts)}</span>,
    },
];

    return (
        <div className='reports-child-wrapper-class' style={{ padding: "1.25rem" }}>
            <Row>
                <Col xs={24}>
                    <StaffAvailabilitySheetCommonFilter setChangeDayKey={setChangeDayKey} dayAvailability={true} />
                </Col>
                <Col xs={24}>
                    <Table tableLayout="fixed" loading={isLoading}
            columns={StaffDailyAvaialabilityTableHeader}
            dataSource={staffDayAvailability?.data} pagination={{
              current: pagination?.page,
              pageSize: pagination?.limit,
              total: total,
              onChange: (page, limit) => setPagination({ page, limit }),
            }} className="staff-availability-sheet-table" style={{ marginTop: '1rem' }} scroll={{ x: "max-content", scrollToFirstRowOnChange: true }} />
                </Col>
            </Row>
        </div>
    )
}

export default DayAvailability