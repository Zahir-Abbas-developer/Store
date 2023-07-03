import { Button, Input, Space } from 'antd'
import React, { useState } from 'react'
import './RequestedAttendees.scss'
import RequestedAttendeesFilters from './TraineeInfoFilters/RequestedAttendeesFilters'
import searchIcon from "../../../../assets/icons/search.svg";
import Table, { ColumnsType } from 'antd/es/table';
import { RequestedAttendeesTableData } from '../../../../mock/Webinar/UpcomingWebinar/RequestedAttendeesMockData';

import pdfFileIcon from '../../../../assets/icons/Webinar/pdf-file-icon.svg'
import BirthDayModal from '../../../../shared/BirthDayModal/BirthDayModal';
import iconRoundedCheck from '../../../../assets/icons/Webinar/check-rounded-icon.svg'
import { useLocation } from 'react-router';
import { useGetRequestedAttendeesQuery } from '../../../../store/Slices/Webinar/UpcommingWebinar';
import { debouncedSearch } from '../../../../utils/utils';
import BreadCrumb from '../../../../layout/BreadCrumb/BreadCrumb';

const RequestedAttendees = () => {


  const { pathname } = useLocation()
  const route = pathname.split('/')
  console.log("route loc", route[4])

  const [requestedAttendee, setrequestedAttendee] = useState()
  
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setrequestedAttendee);
  };
  const paramsObj: any = {};
  if(requestedAttendee) paramsObj["search"]=requestedAttendee;
  const query = "&" + new URLSearchParams(paramsObj).toString();


  const { data, isLoading, isError, isSuccess } = useGetRequestedAttendeesQuery({ id: [route[4]], query:query })

  let getRequestedAttendee: any;
  if (isLoading) {
    getRequestedAttendee = <p>Loading...</p>
  }
  else if (isSuccess) {
    getRequestedAttendee = data
  }
  else if (isError) {
    getRequestedAttendee = <p>Error...</p>
  }
  console.log("getRequestedAttendee", getRequestedAttendee?.data?.result)

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [isSendInvitationModal, setIsSendInvidationModal] = useState(false)

  const columns: ColumnsType<any> = [
    {
      title: <span>S.No#</span>,
      dataIndex: "_id",
      key: "_id",
      render: (value: any, record: any, index: any) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: <span>Attendee Email</span>,
      dataIndex: 'attendeeEmail',
      key: 'attendeeEmail',
      render: (_, text) =>
        <Space >
          <span className='fs-14 fw-400 title-color'>
            {text.attendeeEmail}
          </span>
        </Space>,
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

    //BreadCrumb Items
    const breadCrumbItems = [
      {
        title: "Requested Attendees",
        path: "",
      },
      {
        title: "Dashboard",
        path: "/instructor-dashboard",
      },
      {
        title: "Upcoming Webinar ",
        path: "/webinar/upcomming-webinar",
      },
    ];
  return (
    <>
    <BreadCrumb breadCrumbItems={breadCrumbItems} />
    <div className='requested-attendees-main-wrapper'>

      <div className="wrapper-inner-main-head">
        {/* <Button className='send-invitation-btn' onClick={() => setIsSendInvidationModal(true)}>Send Invitation</Button> */}
        <div className="inner-main-head">
          <div className="search-and-filters">
            {/* <RequestedAttendeesFilters /> */}
          </div>
          <Input
            className="search-input"
            placeholder="Search"
            prefix={<img src={searchIcon} alt="searchIcon" width={24} height={24} style={{ marginRight: '0.623rem' }} />}
            onChange={debouncedResults}
          />
        </div>
      </div>

      <div className="requested-attendees-table-wrapper">
        <Table className="wrapper-table"  columns={columns} dataSource={getRequestedAttendee?.data?.result} scroll={{ x: "max-content" }} pagination={{ pageSize: 7 }} />
      </div>

      <BirthDayModal iconImage={iconRoundedCheck} isModalOpen={isSendInvitationModal} setIsOpenModal={setIsSendInvidationModal} birthDayMessage="Invitation email Successfully send to David williams " wishButtonText={<span style={{ padding: "0px 34px" }}>OK</span>} backgroundColor="#F7B923" />
    </div>
    </>
  )
}

export default RequestedAttendees