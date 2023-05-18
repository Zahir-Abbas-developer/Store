import { Row, Col, Space, Progress, Dropdown, Select, Input } from "antd";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Dots from "../../../assets/images/OnBoarding/dots.png";
import Edit from "../../../assets/icons/OnBoarding/edit.svg";
import View from "../../../assets/images/OnBoarding/View.svg";
import Arrow from "../../../assets/images/OnBoarding/arrow.svg";
import Search from "../../../assets/images/OnBoarding/Search.svg";
import "../../Reports/StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingAddModal from "../Carer/OnboardingAddModal/OnboardingAddModal";
import ViewProfile from "../Carer/ViewProfile/ViewProfile";
import { useGetRequestQuery, useUpdateRequestMutation } from "../../../store/Slices/OnBoarding";
import "../Carer/Carer.scss";
import { debouncedSearch, isNullOrEmpty } from "../../../utils/utils";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";


const TrainingInstructor = () => {
   
    const [pagination, setPagination] = useState({ limit: 10, page: 1 });
    const [searchName, setSearchName] = useState("");
    const [isProfileModal, setIsProfileModal] = useState(false);
    const [isShowInstructor, setIsShowInstructor] = useState(false);
    const [selectedTableData, setSelectedRowData] = useState("")
    const [selectProfileData, setSelectProfileData] = useState<any>(null);
    const [updateRequest]=useUpdateRequestMutation()
    const navigate = useNavigate()
    const paramsObj: any = {};
  if (searchName) paramsObj["search"] = searchName;

  const query = "&" + new URLSearchParams(paramsObj).toString();
  const { data, isLoading, isSuccess, isError } = useGetRequestQuery({
    refetchOnMountOrArgChange: true,
    pagination,
    query,
    role: "training_instructor",
  });

    let trainingInstructorData: any;
    if (isSuccess) {
      trainingInstructorData = data;
    
    } 
    const debouncedResults = (event:any) => {
      const { value } = event.target;
      debouncedSearch(value, setSearchName);
    };
    const handleProfileViewById = (record: any) => {
      setSelectedRowData(record?._id)
      setSelectProfileData(record)
  };
  const handleUserStatus=(userStatus:any,text:any,record:any)=>{
    updateRequest({id:text?._id ,payload:{"status":userStatus}})
  }
  
    const items: any = [
        {
            label: (
                <div onClick={() => { }}>
                    <Space onClick={() => setIsProfileModal(true)}>
                        <img
                            src={View}
                            alt="Edit"
                            className="d-flex align-center"
                            width={24}
                            height={24}
                        />
                        <span>View Profile</span>
                    </Space>
                </div>
            ),
            key: "1",
        },
        {
            label: (
                <Space onClick={() => navigate(`edit-profile`, { state: { editProfile: selectProfileData} })}>
                    <img
                        src={Edit}
                        alt="Delete"
                        className="d-flex align-center"
                        width={24}
                        height={24}
                    />
                    <p>Edit Profile</p>
                </Space>
            ),
            key: "2",
        },
    ];
    const columns: ColumnsType<any> = [
        {
            title: <span style={{ paddingLeft: "75px" }}>Instructor Name</span>,
            dataIndex: " Display Name",
            key: "name",
            ellipsis: true,
            width: 150,
            render: (_, text) => (
              <div className="cursor-pointer d-flex align-center "  >
              <img src={ isNullOrEmpty(text?.profilePhoto)? `https://ui-avatars.com/api/?rounded=true&name=${text.firstName} ${text.lastName}` :  `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${text?.profilePhoto[0]?.mediaId}.${text?.profilePhoto[0]?.mediaMeta?.extension}`} height={30} width={30} alt="avatar" />
              <span className='fs-14 fw-400 title-color' style={{ marginLeft: "30px" }}>
                  {text.firstName + " " + text.lastName}
              </span>
          </div>
            ),
        },

        {
            title: <span>Email </span>,
            dataIndex: "Contact",
            key: "Contact",
            width: 200,
            render: (_, text) => (
                <Space>
                    <span className="fs-14 fw-400 title-color">{text.email}</span>
                </Space>
            ),
        },

        {
            title: "User Status",
            dataIndex: "status",
            key: "status",
            width: 200,
            render: (_:any ,text:any,record:any) => (
                <div>
                    <Select
                        defaultValue={text?.status}
                        className="select-onboarding"
                        onChange={(value:any)=>handleUserStatus(value,text,record)}
                        style={{ width: "180px" }}
                        suffixIcon={<img src={Arrow} />}
                        options={[
                          { value: "active", label: "Active" },
                          { value: "inactive", label: "In Active" },
                        ]}
                    />
                </div>
            ),
        },

        {
            title: <span>No of Courses </span>,
            dataIndex: "days",
            key: "days",
            width: "140px",

            render: (_, text) => (
                <div className="fs-14 fw-400 title-color ">
                    {text.courses}
                </div>
            ),
        },
        {
            title: <span>Availability </span>,
            dataIndex: "days",
            key: "days",
            width: "120px",
            render: (_, text) => (
                <span className="fs-14 fw-400 title-color">{text.status}</span>
            ),
        },
        {
            title: "Profile %",
            dataIndex: "status",
            key: "status",
            width: 200,
            render: (_, text) => (
                <div>
                    <div className="fs-14 fw-400 title-color" style={{ minWidth: "70px" }}>
                        <span className="fw-700 fs-14">{text?.percentageComplete}%</span>{" "}
                        <span style={{ marginLeft: "5px" }} className="fw-600 fs-14">
                            Done
                        </span>
                    </div>
                    <Progress
                        percent={text?.percentageComplete}
                        strokeColor="#F7B923"
                        strokeWidth={9}
                        width={50}
                        showInfo={false}
                    />
                </div>
            ),
        },

        {
            title: "View Details",
            dataIndex: "view",
            key: "view",
            width: 150,
            render: (_: any, record: any) => (
                <Dropdown
                    menu={{ items }}
                    placement="bottomRight"
                    trigger={["click"]}
                    className="actionDropDown"
                >
                    <div className="border-color cursor-pointer d-flex algin-center  justify-center" onClick={() => handleProfileViewById(record)} >
                        <img src={Dots} alt="menu" />
                    </div>
                </Dropdown>
            ),
        },
    ];

    const breadCrumbItems = [
      {
        title: "Training Instructor",
        path: "",
      },
      {
        title: "Dashboard",
        path: "/dashboard",
      },
      {
        title: "Onboarding",
        path: "/onboarding/carer",
      },
    ];


    return (
      <>
        <BreadCrumb breadCrumbItems={breadCrumbItems} />
        <div className="carer-wrapper">
            <Row className="carer-main d-flex justify-end carer-style" >
                <Col span={24} className="gutter-row" style={{ marginBottom: "20px" }}>
                    <div className='candidate-wrapper' >
                        <button onClick={() => setIsShowInstructor(true)} className="candidate-button fw-600 fs-16 cursor-pointer" >
                            Add New Instructor
                        </button>
                        <OnboardingAddModal isOpenModal={isShowInstructor} setIsOpenModal={setIsShowInstructor} title='Add New Instructor' />
                    </div>
                </Col>
                <Col xs={24}>
                    <Row
                        gutter={[20, 20]}
                        className="staff-availability-sheet-common-filter-wrapper"
                        justify="space-between"
                    >
                        <Col xs={24} md={16} xl={14} xxl={12}>
                          
                        </Col>

                        <Col xs={24} md={8} xl={6} className="gutter-row">
                            <div className="input-search-wrapper">
                                <p
                                    className="fs-14 fw-600 title-color line-height-17 m-0"
                                    style={{ marginBottom: "0.563rem" }}
                                >
                                    &nbsp;
                                </p>
                                <Input
                                    placeholder="Search By Instructor Name"
                                    onChange={debouncedResults}
                                    prefix={<img src={Search} className="icon" />}
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row className="carer-main">
                <Col span={24} className='onboarding-table-wrapper'>
                    <Table
                        className="wrapper-table"
                        columns={columns}
                        dataSource={trainingInstructorData?.data?.result}
                        scroll={{ x: "max-content" }}
                        loading={isLoading}
                        pagination={{
                          current: pagination.page,
                          pageSize: pagination.limit,
                          total: trainingInstructorData?.data?.metadata?.total,
                          onChange: (page, limit) => setPagination({ page, limit }),
                        }}
                    />
                </Col>
            </Row>
            <ViewProfile selectedTableData={selectedTableData} IsProfileModal={isProfileModal} setIsProfileModal={setIsProfileModal} />

        </div>
        </>
    );
};

export default TrainingInstructor;
