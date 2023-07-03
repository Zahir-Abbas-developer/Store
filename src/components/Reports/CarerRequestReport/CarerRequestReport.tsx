import { useState } from 'react'

// Ant Components
import { Button, Col, Dropdown, Form, Modal, Row, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import TextArea from 'antd/es/input/TextArea';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable'
import Dots from "../../../assets/images/OnBoarding/dots.png";
import CommonReportChildFilters from '../CommonReportChildFilters/CommonReportChildFilters';
import DatePickerWrapper from '../../../shared/DatePickerWrapper/DatePickerWrapper';
import SelectWrapper from '../../../shared/SelectWrapper/SelectWrapper';
import InputWrapper from '../../../shared/InputWrapper/InputWrapper';
import Edit from "../../../assets/images/OnBoarding/edit.svg";
import View from "../../../assets/images/OnBoarding/View.svg";
// Table and Filters Mock Data and Intterface
import { CarerRequestReportFilters } from '../../../mock/ReportMockData/CarerRequestReportMockData';
import { carerRequestReportMockDataInterface } from '../../../types/ReportsInterface';

// Assets
import blueEyeIcon from "../../../assets/icons/Report/blue-eye.png";

// SCSS
import "./CarerRequestReport.scss";
import { useGetReportsCarerRequestQuery } from '../../../store/Slices/Reports';
import ApiLoader from '../../ApiLoader/ApiLoader';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';
import { renderDashboard } from '../../../utils/useRenderDashboard';
import { debouncedSearch } from '../../../utils/utils';
import dayjs from 'dayjs';
import { useUpdateCarerRequestDashboardMutation } from '../../../store/Slices/CarerRequestDashboard';


const CarerRequestReport = () => {
    const [openDetailsModal, setOpenDetailsModal] = useState<any>(false);
    const [currentPage ,setCurrentPage]=useState(1)
    const [selectedRowData ,setSelectedRowData]=useState<any>({})
    const [selectedStatus ,setSelectedStatus]=useState("")
    const [selectedDropdownOption ,setSelectedDropdownOption]=useState("")
    const [pagination, setPagination] = useState({ limit: 10, page: 1 });
    const [searchClientName ,setSearchClientName]=useState("")
    const paramsObj:any={}
    if (searchClientName) paramsObj["search"] = searchClientName;
    const userData: any = localStorage.getItem("careUserData")
    const { role,id }: any = JSON.parse(userData)
    if(role==="client") paramsObj["careHomeId"] = id;
    const query = "&" + new URLSearchParams(paramsObj).toString();
    const {data ,isSuccess,isLoading}=useGetReportsCarerRequestQuery({query,pagination})
    const [updateCarerRequestDashboard]=useUpdateCarerRequestDashboardMutation()
    const [form] = Form.useForm();
  
    const searchedByClientName = (event:any) => {
       const { value } = event.target;
      debouncedSearch(value, setSearchClientName);
      };
    let carerRequestReportData:any
if(isSuccess){
  carerRequestReportData=data
}
const showModal = () => {
  setOpenDetailsModal(true);
};
console.log(selectedDropdownOption)
const onFinish=(value:any)=>{
  const updatePayload={
    status:selectedStatus,
    comment:value?.comment
  }
  updateCarerRequestDashboard({payload:updatePayload ,id:selectedRowData?._id})
}

const handleWorkExperienceRowData = (record: any) => {
      
  setSelectedRowData(record)
  
}
const actionDropDowns = [
  {
      dropDownOption: "View",
      key: "1",
      openModals:  showModal,
      icon:View,
  },
  {
      dropDownOption:"Add Comments",
      key: "2",
      openModals:  showModal,
      icon:Edit,
  },
  // {
  //     dropDownOption: "Delete",
  //     key: "3",
  //     openModals: () => setIsDeleteModal(true),
  //     icon:Delete,
  // }
]
const items = actionDropDowns.map((action) => {
  return {
    label: (
      <div >
        <Space size={15} onClick={()=>{setSelectedDropdownOption(action?.dropDownOption);action?.openModals();}} >
          <img src={action.icon} alt={action.dropDownOption} className="d-flex align-center" width={24} height={24} />
          <span className='fw-400 fs-14'>{action.dropDownOption} </span>
        </Space>
      </div>
    ),
    key: action.key,
  }
})


//BreadCrumb Items
 const breadCrumbItems = [ { title: "Carer Request", path: "", }, { title: "Dashboard", path: renderDashboard(role), }, { title: role==="admin"? "Admin Reports":"Reports", path: "/reports", } ];
    // Carer Request Report Table Columns
    const CarerRequestReportTableHeader: ColumnsType<carerRequestReportMockDataInterface> = [
        {
            title: 'Sr #',
            dataIndex: 'key',
            key: 'key',
            render: (_: any, item: any, index: number) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(currentPage) * 5 + index-4}</span>,
        },
        {
            title: 'Care Home',
            dataIndex: 'careHome',
            key: 'careHome',
            align: "center",
            render: (careHome: string) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{careHome}</span>,
        },
        {
            title: 'Requested By',
            dataIndex: 'requestedBy',
            key: 'requestedBy',
            align: "center",
            render: (_, { profileImage, requestedBy }: any) => (
                <div style={{ marginLeft: "auto", textAlign: "center", width: "80%" }}>
                    <Space size={16} style={{ width: "100%" }}>
                        <img src={profileImage} alt={profileImage} />
                        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{requestedBy}</span>
                    </Space>
                </div>
            )
        },
        {
            title: 'Request Type',
            dataIndex: 'requestType',
            key: 'requestType',
            align: "center",
            render: (requestType: string) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{requestType}</span>,
        },
        {
            title: 'Requested At',
            dataIndex: 'requestedAt',
            key: 'requestedAt',
            align: "center",
            render: (_:any,requestedAt: any) =>
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(requestedAt?.createdAt).format("DD-MM-YYYY")}</span>,
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
            render: (reason: string) => (
                <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{reason}</span>
            ),
            align: "center",
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <span className={`${status === "APPROVED" ? "approved-color" : status === "PENDING" ? "secondary-color" : "error-color"}   fs-14 fw-400 m-0 line-height-22 `}>{status}</span>
            ),
            align: "center",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: 'action',
            render: role!=="client" ? (_, { profileImage, requestedBy, careHome, requestType, createdAt, status, reason }) => (
                <div className="fs-12 fw-400 line-height-22">
                  <img src={blueEyeIcon} alt='Delete' className='cursor-pointer' onClick={(e: any) => {setOpenDetailsModal({ profileImage, requestedBy, careHome, requestType, createdAt, status, reason });setSelectedDropdownOption("View")}} />
               
                </div>
            ) :(_: any, record: any) => (
              <Dropdown
                menu={{ items }}
                placement="bottomRight"
                trigger={["click"]}
                className="actionDropDown"
                overlayStyle={{ width: "150px" }}
              >
                <div className="border-color cursor-pointer d-flex algin-center  justify-center" onClick={() => handleWorkExperienceRowData(record)}>
                  <img src={Dots} alt="menu" />
                </div>
              </Dropdown>
            ),
            
        },
    ];

    return (
      <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
    <div className='reports-child-wrapper-class'>
            <Row>
                <Col xs={24} className="filter-div">
                    <CommonReportChildFilters filtersArray={CarerRequestReportFilters} />
                </Col>
                <Col xs={24}>
                    <CommonReportTable downloadFileName="CarerRequestReport" downLoadXlsEndPoint={`carer-request/download?type=xls&page=1&limit=${carerRequestReportData?.data?.metadata?.total}&careHomeId=${id}`} downLoadCsvEndPoint={`carer-request/download?type=csv&page=1&limit=${carerRequestReportData?.data?.metadata?.total}&careHomeId=${id}`}  total={carerRequestReportData?.data?.metadata?.total
              } setPagination={setPagination} pagination={pagination} placeholder="Search By Reason" searchedByClientName={searchedByClientName} loading={isLoading} tableHeader={CarerRequestReportTableHeader} tableData={carerRequestReportData?.data?.result} />
                </Col>
            </Row>

            <Modal
                centered
                wrapClassName="care-request-report-details-modal"
                open={openDetailsModal}
                footer={false}
                onCancel={() => setOpenDetailsModal(false)}
            >
                <p className="fs-16 fw-400 form-heading-color line-height-32 m-0" style={{ paddingBottom: "1.063rem" }}>
                    Requests
                </p>
                <Space size={25} wrap className='name-email-wrapper'>
                    <img src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${openDetailsModal?.profileImage}`} alt="user" width={94} height={94} />
                    <div className='name-wrapper'>
                        <h2 className='fs-16 fw-500 line-height-24 title-color m-0'>{openDetailsModal?.requestedBy}</h2>
                        <p className='fs-14 fw-400 line-height-22 light-grey-color m-0'>{openDetailsModal?.careHome}</p>
                    </div>
                    <div className='email-wrapper'>
                        <p className='fs-14 fw-400 line-height-22 title-color m-0'>carelibrary@orcalo.co.uk</p>
                        <p className='fs-14 fw-400 line-height-22 title-color m-0'>41 333 222 1100</p>
                    </div>
                </Space>
                <Form layout="vertical"   onFinish={onFinish} form={form} style={{ marginTop: '1.25rem' }}>
                    <Row gutter={[20, { xs: 16, md: 0 }]}>
                        <Col xs={24} md={12}>
                            <DatePickerWrapper
                                name="shiftDate"
                                label="Requested At"
                                placeholder={dayjs(openDetailsModal?.createdAt).format("DD-MM-YYYY")}
                                required={false}
                                disabled={selectedDropdownOption === "View"}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <InputWrapper
                                name="requestType"
                                label='Request Type'
                                size="large"
                                type="number"
                                disabled={selectedDropdownOption === "View"}
                                placeHolder={openDetailsModal?.requestType}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <SelectWrapper
                                label="Status"
                                disabled={selectedDropdownOption === "View"}
                                onChange={(value:any)=>setSelectedStatus(value)}
                                name="status"
                                options={[
                                  { value: "PENDING", label: "Pending" },
                                  { value: "APPROVED", label: "Approved" },
                                  { value: "REJECTED", label: "Rejected" },
                                ]}
                                required={false}
                                placeHolder={openDetailsModal?.status}
                                
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <InputWrapper
                                name="reason"
                                label="Reason"
                                size="large"
                                
                                type="number"
                                disabled={selectedDropdownOption === "View"}
                                placeHolder={openDetailsModal?.reason}
                            />
                        </Col>
                        <Col xs={24} style={{ marginTop: '1.5rem' }}>
                            <Form.Item label={'Comment Details'} name={['commentDetails']} rules={[{ required: false }]}>
                                <TextArea  disabled={selectedDropdownOption === "View"} rows={4} placeholder={openDetailsModal?.reason} maxLength={6} />
                            </Form.Item>
                        </Col>
                        {selectedDropdownOption==="Add Comments" &&      <Col xs={24}>
              <Space className='modal-buttons'>
                <Button className='modal-button btn-cancel  ' >Cancel</Button>
                <Button className='modal-button btn-secondary' htmlType='submit'>Save</Button>
              </Space>

            </Col>}
                    </Row>
                </Form>
            </Modal>
        </div >
      </>
       
    )
}

export default CarerRequestReport