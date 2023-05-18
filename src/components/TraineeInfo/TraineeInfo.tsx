import { Input, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useState } from 'react'
import { TraineeInfoTableData } from '../../mock/TraineeInfoData'
import "./TraineeInfo.scss"
import TraineeInfoFilters from './TraineeInfoFilters/TraineeInfoFilters'
import viewIcon from "../../assets/icons/view-icon.svg"
import searchIcon from "../../assets/icons/search.svg";
import { useNavigate } from 'react-router-dom'
import { useGetTraineeInfoDataQuery } from '../../store/Slices/TraineeInfo'
import { debouncedSearch, isNullOrEmpty } from '../../utils/utils'
import BreadCrumb from '../../layout/BreadCrumb/BreadCrumb'

const TraineeInfo = () => {
  
  
  const [searchDesignation, setsearchDesignation] = useState()
  const [searchTraineeInfo, setsearchTraineeInfo] = useState()
  const debouncedResults = (event:any) => {
    const { value } = event.target;
    debouncedSearch(value, setsearchTraineeInfo);
  };
  

  const paramsObj: any = {};
  if (searchTraineeInfo) paramsObj["search"] = searchTraineeInfo;
  if (searchDesignation) paramsObj["designation"] = searchDesignation;
  const query =  "&" + new URLSearchParams(paramsObj).toString();


  
  const { data, isLoading, isError, isSuccess } = useGetTraineeInfoDataQuery({query})

  let traineeInfoData: any;
  if (isLoading) {
    traineeInfoData = <p>Loading...</p>
  }
  else if (isSuccess) {
    traineeInfoData = data
  }
  else if (isError) {
    traineeInfoData = <p>Error...</p>
  }
  console.log("traineeInfoData",traineeInfoData?.data?.result)


  const navigate = useNavigate()
  const columns: ColumnsType<any> = [
    {
      title: <span style={{ paddingLeft: "75px" }}>Trainee ID</span>,
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,
      render: (_, text) =>
        <div className="cursor-pointer d-flex align-center " >
          {/* <img 
          // src={text.avatar}
          src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${text?.profileImage?.mediaId}.${text?.profileImage?.mediaMeta?.extension}`}
           alt="avatar" style={{ width: "45px", height: "45px", borderRadius: "50%" }} /> */}

<img  src={ isNullOrEmpty(text?.profileImage)? `https://ui-avatars.com/api/?rounded=true&name=${text.firstName}` :  `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${text?.profileImage?.mediaId}.${text?.profileImage?.mediaMeta?.extension}`} height={45} width={45} style={{borderRadius:"50%"}} alt="img"
          onError={(e:any) => {
          e.target.onerror = null; 
           e.target.src = `https://ui-avatars.com/api/?rounded=true&name=${text.firstName}${text.lastName}`;
          }}
        />

          <span className='fs-14 fw-400 title-color' style={{ marginLeft: "30px" }}>
            {text._id}
          </span>
        </div>
    },
    {
      title: <span>Trainee Name</span>,
      dataIndex: 'firstName',
      key: 'firstName',
      render: (_, text) =>
        <Space >
          <span className='fs-14 fw-400 title-color'>
            {text.firstName}
            {text.lastName}
          </span>
        </Space>,
    },
    {
      title: <span>Email</span>,
      dataIndex: 'email',
      key: 'email',
      render: (_, text) =>
        <Space >
          <span className='fs-14 fw-400 title-color'>
            {text.email}
          </span>
        </Space>,
    },
    {
      title: <span>Designation</span>,
      dataIndex: 'designation',
      key: 'designation',
      render: (_, text) =>
        <Space >
          <span className='fs-14 fw-400 title-color'>
            {text.designation}
          </span>
        </Space>,
    },
    {
      title: <span>No of Courses</span>,
      dataIndex: 'registeredCourses',
      key: 'registeredCourses',
      render: (_, text) =>
        <Space >
          <span className='fs-14 fw-400 title-color'>
            {text.registeredCourses}
          </span>
        </Space>,
    },
    {
      title: <div className='equal--width-tb'>Actions</div>,
      dataIndex: "actions",
      key: "actions",
      width: 150,
      render: (_, text) => (
        <img src={viewIcon} alt="" onClick={() => navigate(`/trainee-info/trainee-courses/${text._id}`)}/>
      ),
    },
  ];

     //BreadCrumb Items
     const breadCrumbItems = [
      {
        title: "Trainee Info",
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
      <div className="inner-main-head">
        <div className="search-and-filters">
          <TraineeInfoFilters setsearchDesignation={setsearchDesignation}/>
        </div>
        <Input
          className="search-input"
          placeholder="Search"
          onChange={debouncedResults}
          prefix={<img src={searchIcon} alt="searchIcon" width={24} height={24} style={{ marginRight: '0.623rem' }} />}
        />
      </div>

      <div className="trainee-info-table-wrapper">
        <Table  className="wrapper-table" columns={columns} dataSource={traineeInfoData?.data?.result} scroll={{ x: "max-content" }} pagination={{ pageSize: 7 }} />
      </div>
    </div>
    </>
  )
}

export default TraineeInfo