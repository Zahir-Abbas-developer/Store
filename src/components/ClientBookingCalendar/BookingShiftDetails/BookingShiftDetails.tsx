import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import ShiftDetailsFilter from '../ShiftDetailsFilter/ShiftDetailsFilter';
import ViewIcon from "../../../assets/icons/ClientBookingCalendar/view-icon.png";
import './BookingShiftDetails.scss';
import ShiftDetailsViewModal from '../ShiftDetailsViewModal/ShiftDetailsViewModal';
import { useGetShiftDetailsDataQuery } from '../../../store/Slices/ClientBookingCalendar';
import { useParams } from 'react-router';
import dayjs from 'dayjs';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';

const BookingShiftDetails = () => {
  const [isShiftInformationModal, setIsShiftInformationModal] = useState(false);
  const [shiftDetailsData, setShiftDetailsData] = useState({});
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [jobRoleFilter, setJobRoleFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  console.log(jobRoleFilter)
  const { id } = useParams();

  const paramsObj: any = {};
  // if (jobRoleFilter) paramsObj["clientName"] = jobRoleFilter;
  if (searchFilter) paramsObj["staffName"] = searchFilter;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  const { data, isLoading: getShiftLoading, isSuccess } = useGetShiftDetailsDataQuery({ userId: id, query, page: pagination });

  let getBookingShiftDetails;
  if (isSuccess) {
    getBookingShiftDetails = data
  }

  console.log(getBookingShiftDetails);
  

  const breadCrumbItems = [
    {
      title: "Booking Calendar",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/client-dashboard",
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: 'Sr #',
      dataIndex: 'no',
      key: 'no',
      render: (_: any, data: any, index: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{index < 9 ? `0${index + 1}` : index + 1}</span>,
    },
    {
      title: 'Carer',
      dataIndex: '',
      key: '',
      render: (text: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{`${text.carer.firstName} ${text.carer.lastName}`}</span>,
    },
    {
      title: 'Job Role',
      dataIndex: '',
      key: '',
      render: (text: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{text?.carer?.userType?.shortForm}</span>,
    },
    {
      title: 'Shift Time',
      dataIndex: '',
      key: '',
      render: (text: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{text?.shift?.shiftType}</span>,
    },
    {
      title: 'Shift  Duration',
      dataIndex: '',
      key: '',
      render: (text: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{`${dayjs(text.shift.startTime).format('hh:mm a')} - ${dayjs(text.shift.endTime).format('hh:mm a')}`}</span>,
    },
    {
      title: 'Department',
      dataIndex: '',
      key: '',
      render: (text: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{text.shift.department}</span>,
    },
    {
      title: 'Action',
      key: '',
      render: (data: any) => (
        <div className='cursor-pointer' onClick={() => setShiftDetailsData(data)}>
          <img src={ViewIcon} alt="" onClick={() => setIsShiftInformationModal(true)} />
        </div >
      ),
    }


  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className='clients-booking-shift-details'>
        <div className='clients-booking-wrap bg-white'>
          <h2 className='fs-20 fw-500 line-height-28 form-heading-color m-0'>Shifts Details </h2>
          <div className='clients-booking-filters'>
            <ShiftDetailsFilter setJobRoleFilter={setJobRoleFilter} setSearchFilter={setSearchFilter} />
          </div>
        </div>
        <div className='shift-booking-table'>
          <Table columns={columns} dataSource={getBookingShiftDetails?.data?.shifts} loading={getShiftLoading} className="booking-shift-table-content" scroll={{ x: "max-content" }}  pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: getBookingShiftDetails?.data?.total,
              onChange: (page, limit) => setPagination({ page, limit }),
            }} />
        </div>
      </div>
      <ShiftDetailsViewModal isShiftInformationModal={isShiftInformationModal} setIsShiftInformationModal={setIsShiftInformationModal} shiftDetailsData={shiftDetailsData} />
    </>
  )
}

export default BookingShiftDetails