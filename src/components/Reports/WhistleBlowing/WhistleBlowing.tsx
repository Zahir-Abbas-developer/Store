import { useState } from 'react'

// Ant Components
import { Col, Row, Dropdown, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import blueEyeIcon from "../../../assets/icons/Report/blue-eye.png";
import deleteIcon from "../../../assets/icons/delete-icon-outlined.svg";
import addRemarks from "../../../assets/icons/add-remarks.svg";
import actionImg from "../../../assets/icons/Setting/actionImg.svg";
import { whistleblowingReportMockDataInterface } from '../../../types/ReportsInterface';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';
import WhistleBlowingReportFilter from './WhistleBlowingReportFilter/WhistleBlowingFilter';
import AddModal from './WhistleBlowingReportModal/AddModal/AddModal';
import DeleteModal from "../../../shared/DeleteModal/DeleteModal";
import { useDeleteWhistleBlowingReportsMutation, useGetWhistleBlowingReportsQuery } from '../../../store/Slices/Reports';
import dayjs from 'dayjs';
import AddRemarksModal from './WhistleBlowingReportModal/AddModal/AddRemarksModal';
import { renderDashboard } from '../../../utils/useRenderDashboard';
import { debouncedSearch } from '../../../utils/utils';
import { isConstructorDeclaration } from 'typescript';



const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <div className=' d-flex align-items-center justify-center border-radius-4 ' style={{ backgroundColor: "#FF4D4F", width: "100px", height: "30px" }}>
        <span className='fw-500 fs-14 line-height-22 d-flex align-items-center text-center white-color '>New</span>
      </div>
    ),



  },
  {
    key: '2',
    label: (
      <div className=' d-flex align-items-center justify-center border-radius-4 ' style={{ backgroundColor: "#1890FF", width: "100px", height: "30px" }}>
        <span className='fw-500 fs-14 line-height-22  d-flex align-items-center  text-center white-color '>Pending</span>
      </div>
    ),
  },
  {
    key: '3',
    label: (
      <div className=' d-flex align-items-center justify-center border-radius-4 ' style={{ backgroundColor: "#52C41A", width: "100px", height: "30px" }}>
        <span className='fw-500 fs-14 line-height-22  d-flex align-items-center text-center white-color '>Resolved</span>
      </div>
    ),
  },
  {
    key: '3',
    label: (
      <div className=' d-flex align-items-center justify-center border-radius-4 ' style={{ backgroundColor: "#FAAD14", width: "100px", height: "30px" }}>
        <span className='fw-500 fs-14 line-height-22  d-flex align-items-center text-center white-color '>Reopened</span>
      </div>
    ),
  },
];

const WhistleBlowingReport = () => {
  const [IsOpenIncidentAddModal, setIsOpenIncidentAddModal] = useState(false);
  const [isAddOpenRemarksModal, setIsAddOpenRemarksModal] = useState(false);
  const [currentPage ,setCurrentPage]=useState(1)
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [extraReportsFilter, setExtraReportsFilter] = useState({
    userType: '',
    status: ''
  });
  const [filterValues, setFilterValues] = useState({ startDate: "", endDate: "" });
  const [pageLimit ,setPageLimit]=useState(10)
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isOpenMeetingDetailsModal, setIsOpenMeetingDetailsModal] = useState(false);
  const [selectedRowRecord ,setSelectedRowRecord]=useState({})
  const [selectedRowRecordId ,setSelectedRowRecordId]=useState("")
 const[search ,setSearch]=useState("")
 const paramsObj:any={}
if (search) paramsObj["search"] = search;
  if (extraReportsFilter.status) paramsObj["status"] = extraReportsFilter.status;
  if (filterValues.startDate) paramsObj["startDate"] = filterValues.startDate;
  if (filterValues.endDate) paramsObj["endDate"] = filterValues.endDate;
const query = "&" + new URLSearchParams(paramsObj).toString();
  const {data ,isSuccess}=useGetWhistleBlowingReportsQuery({query,pagination})
  const [deleteWhistleBlowingReports]=useDeleteWhistleBlowingReportsMutation()
  let whistleBlowingReportsData:any
  if(isSuccess){
    whistleBlowingReportsData=data
  }

  const handleExtraHours = (value: any, type: string) => {
    setExtraReportsFilter({ ...extraReportsFilter, [type]: value })
  }
  const searchedByClientName = (event:any) => {
   const { value } = event.target;
    debouncedSearch(value, setSearch);
     };
  const handleSelectedRecord=(record:any)=>{    
    setSelectedRowRecord({...record ,dateOfOccurance:dayjs(record?.dateOfOccurance),timeOfOcuurance:dayjs(record?.timeOfOcuurance) })
    setSelectedRowRecordId(record?._id)
  }
  const userData: any = localStorage.getItem("careUserData")
  const { role }: any = JSON.parse(userData)
  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Whistle Blowing",
      path: "",
    },
    {
      title: "Dashboard",
      path: renderDashboard(role),
    },
    {
      title: "Reports",
      path: "/reports",
    },
  ];

  const items: MenuProps["items"] = [
    {
      label: (
        <Space
          onClick={() => {
            setIsOpenIncidentAddModal(true)
            // setModalType("Edit");
          }}
        >
          <img
            src={blueEyeIcon}
            alt="edit"
            className="d-flex align-center"
            height={18}
            width={16}
          />
          <span className="m-0">View Details</span>
        </Space>
      ),
      key: "1",
    },
    {
      label: (
        <Space
          onClick={() => {
            setIsAddOpenRemarksModal(true);
            // setIsOpenIncidentAddModal(true)
          }}
        >
          <img
            src={addRemarks}
            className="d-flex align-center"
            alt="delete"
            height={18}
            width={16}
          />
          <span>Add Remarks</span>
        </Space>
      ),
      key: "2",
    },
    {
      label: (
        <Space
          onClick={() => {
            setIsDeleteModal(true);
            // setIsOpenIncidentAddModal(true)
          }}
        >
          <img
            src={deleteIcon}
            className="d-flex align-center"
            alt="delete"
            height={18}
            width={16}
          />
          <span>Delete</span>
        </Space>
      ),
      key: "2",
    },
  ];

  const IncidentReportTableHeader: ColumnsType<whistleblowingReportMockDataInterface> = [
    {
      title: 'Sr #',
      dataIndex: 'key',
      key: 'key',
      render: (_: any, item: any, index: number) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{currentPage + index }</span>,
    },
    // {
    //     title: 'Complaint ID',
    //     dataIndex: 'ComplaintID',
    //     key: 'ComplaintID',
    //     render: (_,item: any) =>
    //         <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.ComplaintID}</span>,
    // },
    {
      title: 'Date of Occurance',
      dataIndex: 'dateOfOccurance',
      key: 'dateOfOccurance',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(item?.dateOfOccurance).format("DD-MM-YYYY")}</span>,
    },

    {
      title: 'Complaint Type',
      dataIndex: 'complaintType',
      key: 'complaintType',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.complaintType}</span>,
    },
    // {
    //     title: 'Attachment',
    //     dataIndex: 'Attachment',
    //     key: 'Attachment',
    //     render: (_,item: any) => (
    //         <div className='fs-14 fw-400 m-0 line-height-22 title-color'><img src={item?.Attachment} alt ="attachment" width="29px" height="37px"/></div>
    //     ),
    // },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, item: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{item?.status}</span>,
    },

    {
      title: "Action",
      dataIndex: "action",
      key: 'action',
      render: (_: any, text: any) => (
        <div>
          <Dropdown
            menu={{ items }}
            placement="bottom"
            trigger={["click"]}
            overlayClassName="actionDropDownBlocking my-dropdown-blocking"
            overlayStyle={{ borderRadius: "4px" }}
          >
            <Space onClick={() => { handleSelectedRecord(text); setIsOpenMeetingDetailsModal(false) }}>
              <div
                className="border-color cursor-pointer"
              // onClick={() => {
              //   setJobID(text.id);
              //   setGetFieldValues(text);
              // }}
              >
                <img src={actionImg} alt="ElpiseIcon" />
              </div>
            </Space>
          </Dropdown>
        </div>
      ),
      // render: (_, {  }) => (
      //     <div className="fs-12 fw-400 line-height-22">
      //         <img src={blueEyeIcon} alt='Delete' className='cursor-pointer'  onClick={() => setIsOpenIncidentAddModal(true)}/>
      //     </div>
      // ),
    },
  ];

  const handleDeleteSubmit = async () => {
    deleteWhistleBlowingReports({ id: selectedRowRecordId })
    setIsDeleteModal(false);
   if(whistleBlowingReportsData?.data?.result?.length===0){
 setPagination({...pagination ,page:currentPage-1})
   }
   

  };
  console.log( whistleBlowingReportsData?.data?.result?.length)
  const handleCancelSubmit = () => {
    setIsDeleteModal(false);
  };
    return (
      <>
       <BreadCrumb breadCrumbItems={breadCrumbItems} />
        <div className='reports-child-wrapper-class'>
            <Row>

                <Col xs={24} className="filter-div">
                <WhistleBlowingReportFilter setFilterValues={setFilterValues} handleExtraHours={handleExtraHours} />
                </Col>
                <Col xs={24}>
                <CommonReportTable setCurrentPage={setCurrentPage}
              downloadFileName="GrossProfitLoss" downLoadCsvEndPoint={`whistle-blowing/all?page=1&limit=${whistleBlowingReportsData?.data?.metadata
?. total}&downloadType=csv`} downLoadXlsEndPoint={`whistle-blowing/all?page=1&limit=${whistleBlowingReportsData?.data?.metadata?.total}&downloadType=csv`}

                total={whistleBlowingReportsData?.data?.metadata?. total} setPagination={setPagination} pagination={pagination} placeholder="Search By Complaint Type" searchedByClientName={searchedByClientName} tableHeader={IncidentReportTableHeader} tableData={whistleBlowingReportsData?.data?.result} />
                </Col>
            </Row>
            <AddModal setIsOpenIncidentAddModal={setIsOpenIncidentAddModal} isOpenMeetingDetailsModal={isOpenMeetingDetailsModal} setIsOpenMeetingDetailsModal={setIsOpenMeetingDetailsModal} selectedRowRecord={selectedRowRecord} title={<span className='fw-500 fs-20 titile-color'>Whistle Blowing</span>} onFinish={(e:any) => { setIsOpenIncidentAddModal(false)}} IsOpenIncidentAddModal={IsOpenIncidentAddModal} IsCancelIncidentAddModal={() => {setIsOpenIncidentAddModal(false);setSelectedRowRecord({})}} disabled={true}/>
            <AddRemarksModal id={selectedRowRecordId} selectedRowRecord={selectedRowRecord} isAddOpenRemarksModal={isAddOpenRemarksModal} setIsAddOpenRemarksModal={setIsAddOpenRemarksModal} />
            <DeleteModal
              setDeleteModal={setIsDeleteModal}
              deleteModal={isDeleteModal}
              submitTitle="Yes"
              cancelTitle="No"
              title="Do you want to discard this Details?"
              onSubmit={handleDeleteSubmit}
              onCancel={handleCancelSubmit}
            />
        </div>
        </>
    )
}

export default WhistleBlowingReport