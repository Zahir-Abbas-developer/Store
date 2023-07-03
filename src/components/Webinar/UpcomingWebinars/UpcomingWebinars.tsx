import { Button, Dropdown, Input, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import './UpcomingWebinars.scss'
import UpcomingWebinarsFilters from './UpcomingWebinarsFilters/UpcomingWebinarsFilters';

import viewIcon from "../../../assets/icons/view-icon.svg"
import editIcon from "../../../assets/icons/edit-icon-outlined.svg"
import deleteIcon from "../../../assets/icons/delete-icon.svg"
import searchIcon from "../../../assets/icons/search.svg";
import requestedAttendees from "../../../assets/icons/Webinar/requested-attendees.svg";


import threeDots from "../../../assets/icons/three-dots.svg"
import { useNavigate } from 'react-router-dom'
import { UpcomingWebinarsTableData } from '../../../mock/UpcomingWebinarsData'
import DeleteModal from '../../../shared/DeleteModal/DeleteModal';
import { useDeleteUpcomingWebinarMutation, useGetUpcomingWebinarDataQuery } from '../../../store/Slices/Webinar/UpcommingWebinar';
import dayjs from 'dayjs';
import { debouncedSearch } from '../../../utils/utils';
import AppSnackbar from '../../../utils/AppSnackbar';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';

const UpcomingWebinars = () => {
  const navigate = useNavigate()


  const [searchUpcommingWebinar, setsearchUpcommingWebinar] = useState()
  const [filterAttendees ,setFilterAttendees]=useState("")
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setsearchUpcommingWebinar);
  };


  const paramsObj: any = {};
  if (searchUpcommingWebinar) paramsObj["search"] = searchUpcommingWebinar;
  if(filterAttendees) paramsObj["attendees"]=filterAttendees;
  const query = "&" + new URLSearchParams(paramsObj).toString();


  const [tableID, settableID] = useState(null)
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const [deleteUpcomingWebinar]= useDeleteUpcomingWebinarMutation()

  const handleDeleteSubmit = () => {
    setIsDeleteModal(false);
    // AppSnackbar({ type: "success", messageHeading: "Congratulation!", message: "Record Deleted Successfully" });
  };
  const handleCancelSubmit = async() => {
    // setIsDeleteModal(false);
    // deleteUpcomingWebinar(tableID)
    try {
      const { error }: any = await deleteUpcomingWebinar(tableID)
      if (error) {
        console.log("Unexpected error:", error);
      }
    } catch (error) {
      console.log("Unexpected error:", error);
    }
    AppSnackbar({
      type: "success",
      messageHeading: "Sucessfull",
      message: "record deleted successfully"
    });
    setIsDeleteModal(false);

  };



  const [searchName, setsearchName] = useState(null)


  const { data, isLoading, isError, isSuccess } = useGetUpcomingWebinarDataQuery({ query })

  let upcomingWebinarData: any;
  if (isLoading) {
    upcomingWebinarData = <p>Loading...</p>
  }
  else if (isSuccess) {
    upcomingWebinarData = data
  }
  else if (isError) {
    upcomingWebinarData = <p>Error...</p>
  }
  console.log("upcomingWebinarData", upcomingWebinarData?.data?.result)


  const filteredArray = upcomingWebinarData?.data?.result && upcomingWebinarData?.data?.result.filter((obj: any) => obj._id === tableID);
  console.log("filteredArray", filteredArray)

  // onClick={() => navigate(`/client-manager/client-registration/${tableID}`)}
  const items: any = [
    {
      label: (
        <div>
          <Space onClick={() => navigate(`/webinar/view-webinar/${tableID}`, { state: { editDetails: filteredArray } })}>
            <img src={viewIcon} alt="Edit" className="d-flex align-center" width={24} height={24} />
            <span >View</span>
          </Space>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <Space onClick={() => navigate(`/webinar/edit-webinar/${tableID}`, { state: { editDetails: filteredArray } })}>
          <img src={editIcon} alt="Delete" className="d-flex align-center" width={24} height={24} />
          <span>Edit</span>
        </Space>
      ),
      key: "2",
    },
    {
      label: (
        <Space onClick={() => navigate(`/webinar/upcoming-webninar/requested-attendees/${tableID}`)}>
          <img src={requestedAttendees} alt="Delete" className="d-flex align-center" width={24} height={24} />
          <span>Requested Attendees</span>
        </Space>
      ),
      key: "3",
    },
    {
      label: (
        <Space onClick={() => setIsDeleteModal(true)}>
          <img src={deleteIcon} alt="Delete" className="d-flex align-center" width={24} height={24} />
          <span>Delete</span>
        </Space>
      ),
      key: "4",
    },

  ];
 


  const columns: ColumnsType<any> = [
    {
      title: <span>Sr.No#</span>,
      dataIndex: 'sNo',
      key: 'sNo',
      render: (text, record, index) => index + 1,
    },
    {
      title: <span>Webinar Title</span>,
      dataIndex: 'title',
      key: 'title',
      render: (_, text) =>
        <Space >
          <span className='fs-14 fw-400 title-color'>
            {text.title}
          </span>
        </Space>,
    },
    {
      title: <span>Date</span>,
      dataIndex: 'date',
      key: 'date',
      render: (_, text) =>
        <Space >
          <span className='fs-14 fw-400 title-color'>
            {dayjs(text.date).format('D/M/YYYY')}
          </span>
        </Space>,
    },
    {
      title: <span>Duration</span>,
      dataIndex: 'duration',
      key: 'duration',
      render: (_, text) =>
        <Space >
          <span className='fs-14 fw-400 title-color'>
            {text.duration}
          </span>
        </Space>,
    },
    {
      title: <span>Venue </span>,
      dataIndex: 'venue',
      key: 'venue',
      render: (_, text) =>
        <Space >
          <span className='fs-14 fw-400 title-color'>
            {text.venue}
          </span>
        </Space>,
    },
    {
      title: <span>Attendees</span>,
      dataIndex: 'attendees',
      key: 'attendees',
      render: (_, text) =>
        <Space >
          <span className='fs-14 fw-400 title-color'>
            {text.attendees}
          </span>
        </Space>,
    },


    {
      title: <div className='equal--width-tb'>Actions</div>,
      dataIndex: "actions",
      key: "actions",
      width: 150,
      render: (_, text) => (
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          trigger={["click"]}
          className="actionDropDown"
        >
          <div className="equal--width-tb">
            <img src={threeDots} alt="menu" onClick={() => settableID(text._id)} />
          </div>
        </Dropdown>
      ),
    },
  ];

  useEffect(() => {
    
  }, [data, upcomingWebinarData])
  

    //BreadCrumb Items
    const breadCrumbItems = [
      {
        title: "Upcoming Webinars",
        path: "",
      },
      {
        title: "Dashboard",
        path: "/instructor-dashboard",
      },
    ];
  return (
    <>
    <BreadCrumb breadCrumbItems={breadCrumbItems} />
    <div className='trainee-info-main-wrapper'>

      <div className="wrapper-head">
        <Button className='schedule-webinar-btn' onClick={() => navigate(`/webinar/add-webinar`)}><span className='fs-16 fw-600'>Schedule Webinar</span></Button>
        <div className="inner-main-head">
          <div className="search-and-filters">
            <UpcomingWebinarsFilters setFilterAttendees={setFilterAttendees} />
          </div>
          <Input
            className="search-input"
            placeholder="Search"
            prefix={<img src={searchIcon} alt="searchIcon" width={24} height={24} style={{ marginRight: '0.623rem' }} />}
            onChange={debouncedResults}
          />
        </div>
      </div>

      <div className="trainee-info-table-wrapper">
        <Table className="wrapper-table" columns={columns} dataSource={upcomingWebinarData?.data?.result} scroll={{ x: "max-content" }} pagination={{ pageSize: 7 }} />
      </div>
      <DeleteModal
        setDeleteModal={setIsDeleteModal}
        deleteModal={isDeleteModal}
        submitTitle='Cancel'
        cancelTitle='Yes, Discard'
        btnReverse="btn-reverse"
        title='Do you want to discard this Webinar'
        onSubmit={handleDeleteSubmit}
        onCancel={handleCancelSubmit}
      />
    </div>
    </>
  )
}

export default UpcomingWebinars