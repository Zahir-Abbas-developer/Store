import { Row, Col, Space, Input } from 'antd';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Search from '../../../../assets/images/OnBoarding/Search.svg';
import ActionArrow from '../../../../assets/images/OnBoarding/ActionArrow.svg';
import "../../../Reports/StaffAvailabilitySheet/StaffAvailabilitySheetCommonFilter/StaffAvailabilitySheetCommonFilter.scss";
import AllocateNewCareHomeModal from './AllocateNewCareHomeModal';
import DiscardModal from './DiscardModal';
import { useState } from 'react';
import { useGetClientsRequestQuery } from '../../../../store/Slices/References';
import { useLocation } from 'react-router-dom';
import { useDeleteClientsRequestMutation } from '../../../../store/Slices/OnBoarding';
import BreadCrumb from '../../../../layout/BreadCrumb/BreadCrumb';
import { debouncedSearch } from '../../../../utils/utils';
import '../../Carer/Carer.scss';
import dayjs from 'dayjs';

interface ICordinatorClientDetails {
  careHome: string,
  firstName: string,
  country: string;
  careCooridatorAssignedDate: string;
  lastName: string,
  phone: string,
  carers: string,
  image: string,
  location: string,
  number: string,
  date: string
}

const CareCordinatorClientDetails = () => {
  const { state }: any = useLocation();
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [pagination, setPagination] = useState({limit:10,page:1});
    //query parameters of search and filter
    const paramsObj: any = {};
    if (searchName) paramsObj["search"] = searchName;

    const query =  "&" + new URLSearchParams(paramsObj).toString();
  const { data, isLoading, isSuccess } = useGetClientsRequestQuery({ id: state?.editProfile?._id ,query})

 

  let clientsData: any;
 
  if (isSuccess) {
    clientsData = data   
  }
  const [discardModal, setDiscardModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState("")
 
  const [deleteClientsRequest] = useDeleteClientsRequestMutation()
  const handleDeleteSubmit = () => {
    deleteClientsRequest({ id: selectedRowData })
    setDiscardModal(false)
  }
  const handleClientsRowData = (record: any) => {

    setSelectedRowData(record?._id)

  }

  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchName);
  };


  const columns: ColumnsType<ICordinatorClientDetails> = [
    {
      title: <span style={{ paddingLeft: "75px" }}>Client Name</span>,
      dataIndex: ' Display Name',
      key: 'name',
      ellipsis: true,
      render: (_, text:any) =>
        <div className="cursor-pointer d-flex align-center "  >
                     <img src={text?.clientName?.userprofile?.profilePhoto  ?  `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${text?.clientName?.userprofile?.profilePhoto?.mediaId}.${ text?.clientName?.userprofile?.profilePhoto?.mediaMeta?.extension}`:`https://ui-avatars.com/api/?rounded=true&name=${text?.clientName}` } height={50} width={50} style={{ borderRadius: "50%" }} alt="profile" />
          <Space size={1} direction='vertical' className='fs-14 fw-400 title-color d-flex align-center ' style={{ marginLeft: "30px" }}>
            {text?.clientName }

            {/* {text?.carers} */}
          </Space>
        </div>
    },

    {
      title: <span>Location </span>,
      dataIndex: 'Contact',
      key: 'Contact',
      width: 300,

      render: (_, text:any) =>
        <Space >
          <span className='fs-14 fw-400 title-color blue-color' >
            {text?.address?.country}
          </span>
        </Space>,
    },



    {
      title: <span> Contact Number </span>,
      dataIndex: 'number',
      key: 'number',


      render: (_, text) =>

        <div className='fs-14 fw-400 title-color '>
          {text?.phone}
        </div>

    },
    {
      title: <span>Allocation Date </span>,
      dataIndex: 'date',
      key: 'date',

      render: (_, text) =>

        <span className='fs-14 fw-400 title-color'>
          {dayjs(text?.careCooridatorAssignedDate).format("YYYY-MM-DD")}
        </span>

    },
    {
      title: <span>Action </span>,
      dataIndex: 'date',
      key: 'date',
      render: (_: any, record: any) =>
        <span className='cursor-pointer' onClick={() => { setDiscardModal(true); handleClientsRowData(record) }} >
          <img src={ActionArrow} alt="arrow" />
        </span>

    },

  ];

  const breadCrumbItems = [
    {
      title: "Client Details",
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
    {
      title: "Carer Coordinator",
      path: "/onboarding/care-coordinator",
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />

      <div className='client-details'>

        <Space>
        <img src={state?.editProfile?.userprofile?.profilePhoto  ?  `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${state?.editProfile?.userprofile?.profilePhoto?.mediaId}.${state?.editProfile?.userprofile?.profilePhoto?.mediaMeta?.extension}`:`https://ui-avatars.com/api/?rounded=true&name=${state?.editProfile?.firstName}${state?.editProfile?.lastName}` } height={50} width={50} style={{ borderRadius: "50%" }} alt="profile" />

          <Space direction='vertical' size={0}>
            <span className='fw-600 fs-14 title-color'>{state?.editProfile?.firstName + " " + state?.editProfile?.lastName }</span>
            <span className='fw-500 fs-12 title-color'>Carer Cordinator</span>
          </Space>
        </Space>
        <Row className="carer-main d-flex justify-end carer-style"   >
          <Col span={24} className="gutter-row" style={{ marginBottom: "20px" }}>
            <div>
              <AllocateNewCareHomeModal IsModalOpen={IsModalOpen} setIsModalOpen={setIsModalOpen} careCordinatorId={state?.editProfile} />
            </div>
          </Col>
          <Col xs={24}>
            <Row
              gutter={[20, 20]}
              className="staff-availability-sheet-common-filter-wrapper"
              justify="space-between"
            >
              <Col xs={24} md={16} xl={14} xxl={12}>
                <Row gutter={[0, 20]} className="filter-wrapper">
                  <>
                    {/* <Col xs={24} sm={8}>
                      <p
                        className="fs-14 fw-600 title-color line-height-17 m-0"
                        style={{ marginBottom: "0.563rem" }}
                      >
                        Carer Home
                      </p>
                      <div className="filter-column">
                        <Select
                          size="large"
                          placeholder="Select Staff Name"
                          defaultValue="All"
                          optionFilterProp="children"
                          className="app-select-wrap-class"
                          popupClassName="app-select-popup-wrap-class"
                          options={[
                            { value: "Tall Tree Care Home", label: "Tall Tree Care Home" },
                            { value: " Tree Care Home", label: " Tree Care Home" },
                            { value: "Ivy Grove Care Home", label: "Ivy Grove Care Home" },
                          ]}
                        />
                      </div>
                    </Col>

                    <Col xs={24} sm={8}>
                      <p
                        className="fs-14 fw-600 title-color line-height-17 m-0"
                        style={{ marginBottom: "0.563rem" }}
                      >
                        Application Date
                      </p>
                      <div className="filter-column">
                        <Select
                          size="large"
                          placeholder="Select Staff Name"
                          defaultValue="Select"
                          optionFilterProp="children"
                          className="app-select-wrap-class"
                          popupClassName="app-select-popup-wrap-class"
                          // onChange={handleCommonFilterChange}
                          // filterOption={(input: any, option: any) => { (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) }}
                          options={[
                            { value: "Arsalan Khan", label: "Arsalan Khan" },
                            { value: "Ali Rehman", label: "Ali Rehman" },
                            { value: "Kashif", label: "Kashif" },
                          ]}
                        />
                      </div>
                    </Col> */}
                  </>
                </Row>
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
                    placeholder="Search By Client Name"
                    onChange={debouncedResults}
                    prefix={<img src={Search} className="icon" />}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className='carer-main'>
          <Col span={24}>

            <Table className="wrapper-table" columns={columns} dataSource={clientsData?.data?.result} scroll={{ x: "max-content" }} pagination={{ pageSize: 10 }} />
          </Col>
        </Row>

        <DiscardModal
          openModal={discardModal}
          setOpenModal={setDiscardModal}
          onSubmit={handleDeleteSubmit}
          setIsModalOpen={setIsModalOpen}
          onCancel={() => { setDiscardModal(false)}}
        />
      </div>
    </>
  )
}

export default CareCordinatorClientDetails