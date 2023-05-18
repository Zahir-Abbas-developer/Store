import React, { useState } from 'react'

// Ant Components
import { Col, Modal, Row } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../CommonReportTable/CommonReportTable';
import AppSnackbar from '../../../utils/AppSnackbar';

// Table and Filters Mock Data and Interface
import { terminatedStaffMockDataInterface } from '../../../types/ReportsInterface';

// SCSS
import "./TerminatedStaffList.scss";

// Assets
import modalBgImage from "../../../assets/images/Reports/modal-bg.png";
import { useGetReportsTerminatedQuery, useReactivateTerminatedReportMutation } from '../../../store/Slices/Reports';
import dayjs from 'dayjs';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';
import { renderDashboard } from '../../../utils/useRenderDashboard';

import TerminatedStaffListFilter from './TerminatedStaffListFilter/TerminatedStaffListFilter';
import { debouncedSearch } from '../../../utils/utils';


const TerminatedStaffList = () => {
  const [extraReportsFilter, setExtraReportsFilter] = useState({
    staffName: '',
    userRole: '',
    terminatedBy: '',
  });
  const [filterValues, setFilterValues] = useState({ startDate: "", endDate: "" });
  const [searchClientName ,setSearchClientName]=useState("")
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [currentPage ,setCurrentPage]=useState(1)
  const paramsObj: any = {};
  if (extraReportsFilter.staffName) paramsObj["staffId"] = extraReportsFilter.staffName;
  if (extraReportsFilter.userRole) paramsObj["userType"] = extraReportsFilter.userRole;
  if (extraReportsFilter?.terminatedBy) paramsObj["deletedBy"] = extraReportsFilter?.terminatedBy;
  if (filterValues?.startDate) paramsObj["start"] = filterValues?.startDate;
  if (filterValues?.endDate) paramsObj["end"] = filterValues?.endDate;
  if (searchClientName) paramsObj["search"] = searchClientName;
  const query = "?" + new URLSearchParams(paramsObj).toString();

  const { data, isSuccess } = useGetReportsTerminatedQuery({query,pagination});
  const [isOpenReActivateModal, setIsOpenReActivateModal] = useState<boolean>(false);

  const handleReactive = () => {
    
    setIsOpenReActivateModal(false); AppSnackbar({ type: "success", messageHeading: "Staff Reactivated!", message: "The staff member has been reactivated" })
  }

  const userData: any = localStorage.getItem("careUserData")
  const { role }: any = JSON.parse(userData);
  //BreadCrumb Items
  const breadCrumbItems = [{ title: "Terminated Staff List", path: "", }, { title: "Dashboard", path: renderDashboard(role), }, { title: role==="admin"? "Admin Reports":"Reports", path: "/reports", }];

  const handleExtraHours = (value: any, type: string) => {
    setExtraReportsFilter({ ...extraReportsFilter, [type]: value })
  }
  const searchedByClientName = (event:any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchClientName);
     };
 

  let terminatedReportsData: any
  if (isSuccess) {
    terminatedReportsData = data
  }

  const TerminatedStaffTableColumnData: ColumnsType<terminatedStaffMockDataInterface> = [
    {
      title: 'Sr #',
      dataIndex: 'key',
      key: 'key',
      render: (_: any, item: any, index: number) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{(currentPage) * 5 + index-4}</span>,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      align: "center",
      render: (firstName: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{firstName}</span>
      )
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      align: "center",
      render: (lastName: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{lastName}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: "center",
      render: (email: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{email}</span>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      align: "center",
      render: (phone: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{phone}</span>,
    },
    {
      title: 'User Role',
      dataIndex: 'userRole',
      key: 'userRole',
      align: "center",
      render: (userRole: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{userRole}</span>,
    },
    {
      title: 'DOJ',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: "center",
      render: (createdAt: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(createdAt).format("DD-MM-YYYY")}</span>,
    },
    {
      title: 'Reason For Leaving',
      dataIndex: 'reasonForLeaving',
      key: 'reasonForLeaving',
      align: "center",
      render: (reasonForLeaving: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>-----</span>,
    },
    {
      title: 'Terminated At',
      dataIndex: 'deletedA',
      key: 'deletedA',
      align: "center",
      render: (deletedA: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{dayjs(deletedA).format("DD-MM-YYYY")}</span>,
    },
    {
      title: 'Terminated By',
      dataIndex: 'terminatedBy',
      key: 'terminatedBy',
      align: "center",
      render: (_: any, terminatedBy: any) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{terminatedBy?.deletedBy?.firstName + " " + terminatedBy?.deletedBy?.lastName}</span>,
    },
   
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className='reports-child-wrapper-class'>
        <Row>
          <Col xs={24} className="filter-div">
            <TerminatedStaffListFilter setFilterValues={setFilterValues} handleExtraHours={handleExtraHours} />
          </Col>
          <Col xs={24}>
            <CommonReportTable total={terminatedReportsData?.data?.total} setPagination={setPagination} pagination={pagination} placeholder="Search By Email" searchedByClientName={searchedByClientName} tableHeader={TerminatedStaffTableColumnData} tableData={terminatedReportsData?.data?.staff} />
          </Col>
        </Row>
        <Modal
          centered
          wrapClassName="terminated-staff-reactivate-modal"
          closeIcon={false}
          closable={false}
          open={isOpenReActivateModal}
          footer={false}
        >
          <div className="position-relative">
            <p className="fs-24 fw-500 form-heading-color text-center line-height-32 m-0" style={{ paddingBottom: "1.063rem", paddingTop: "2.688rem" }}>
              Status Confirmation
            </p>
            <p className='fs-14 fw-400 title-color line-height-22 m-0'>Are you sure you want to reactivate this user?</p>
            <img src={modalBgImage} alt="modal bg" style={{ position: "absolute", bottom: "-16%", right: "-5%" }} />
            <button className="btn-secondary" onClick={handleReactive} style={{ margin: "3rem auto 2.688rem auto" }}>Submit</button>

          </div>
        </Modal>
      </div>
    </>
  )

}


export default TerminatedStaffList