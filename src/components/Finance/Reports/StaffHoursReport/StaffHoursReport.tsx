import React from 'react'

// Ant Components
import { Col, Row, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table';

// Components
import CommonReportTable from '../../../Reports/CommonReportTable/CommonReportTable';
import CommonFilters from '../CommonFilters/CommonFilters';

// Table and Filters Mock Data and Intterface
import { niPaymentMockDataInterface } from '../../../../types/FinanceInterface';
import { ShiftDetailsHoursReportMockData, ShiftHoursReportMockData } from '../../../../mock/FinanceMockData/ShiftHoursReportMockData';

// Assets
import blueEyeIcon from "../../../../assets/icons/Report/blue-eye.png";
import { useLocation, useNavigate } from 'react-router';
import BreadCrumb from '../../../../layout/BreadCrumb/BreadCrumb';

const StaffHoursReport = () => {
  const navigate = useNavigate();
  const { search, state } = useLocation();

  console.log("search +++++++++++", search);
  let staffName = search.split("?")[1];



  // Shift Hours Report Table Columns
  const ShiftHoursReportTableHeader: ColumnsType<niPaymentMockDataInterface> = [
    {
      title: 'Sr #',
      dataIndex: 'key',
      key: 'key',
      render: (key: React.Key) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{key}</span>,
    },
    {
      title: 'Staff Name',
      dataIndex: 'staffName',
      key: 'staffName',
      render: (staffName: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffName}</span>,
    },
    {
      title: 'Staff Type',
      dataIndex: 'staffType',
      key: 'staffType',
      render: (staffType: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffType}</span>
      )
    },
    {
      title: 'Staff Category',
      dataIndex: 'staffCategory',
      key: 'staffCategory',
      render: (staffCategory: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffCategory}</span>,
    },
    {
      title: 'No of Clients',
      dataIndex: 'noOfClients',
      key: 'noOfClients',
      align: "center",
      render: (noOfClients: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{noOfClients}</span>,
    },
    {
      title: 'Client Rate',
      dataIndex: 'clientRate',
      key: 'clientRate',
      align: "center",

      render: (clientRate: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{clientRate}</span>
      ),
    },
    {
      title: 'Staff Hours',
      dataIndex: 'staffHours',
      key: 'staffHours',
      align: "center",

      render: (staffHours: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{staffHours}</span>
      ),
    },
    {
      title: 'No of Shift',
      dataIndex: 'noOfShift',
      key: 'noOfShift',
      align: "center",

      render: (noOfShift: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{noOfShift}</span>
      ),
    },
    {
      title: 'Salary Hours',
      dataIndex: 'salaryHours',
      key: 'salaryHours',
      align: "center",

      render: (salaryHours: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{salaryHours}</span>
      ),
    },
    {
      title: 'Ni Hours',
      dataIndex: 'niHours',
      key: 'niHours',
      align: "center",

      render: (niHours: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{niHours}</span>
      ),
    },
    {
      title: 'Non Ni Hours',
      dataIndex: 'nonNiHours',
      key: 'nonNiHours',
      align: "center",

      render: (nonNiHours: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{nonNiHours}</span>
      ),
    },
    {
      title: 'Millage Allowance Hours',
      dataIndex: 'millageAllowanceHours',
      key: 'millageAllowanceHours',
      align: 'center',
      render: (millageAllowanceHours: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{millageAllowanceHours}</span>
      ),
    },
    {
      title: 'Pay Rate',
      dataIndex: 'payRate',
      key: 'payRate',
      align: "center",

      render: (payRate: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{payRate}</span>
      ),
    },
    {
      title: 'Ni Payable',
      dataIndex: 'niPayable',
      key: 'niPayable',
      align: "center",

      render: (niPayable: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{niPayable}</span>
      ),
    },
    {
      title: 'Non Ni Payable',
      dataIndex: 'nonNiPayable',
      key: 'nonNiPayable',
      align: "center",

      render: (nonNiPayable: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{nonNiPayable}</span>
      ),
    },
    {
      title: 'Total Payable',
      dataIndex: 'totalPayable',
      key: 'totalPayable',
      align: "center",
      render: (totalPayable: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{totalPayable}</span>
      ),
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      align: "center",
      render: (paymentStatus: string) => (
        <span className={` ${paymentStatus === "Paid" ? "approved-color" : "orange-color"}   fs-14 fw-400 m-0 line-height-22`}>{paymentStatus}</span>
      ),
    },
    {
      title: "View",
      dataIndex: "View",
      key: 'View',
      render: (_, { staffName, staffType, noOfShift }: any) => (
        <div className="fs-12 fw-400 line-height-22">
          <img src={blueEyeIcon} alt='Delete' className='cursor-pointer' onClick={(e: any) => navigate(`/finance/reports/staff-hours-report?${staffName.replace(/\s+/g, "-")}`, { state: { staffType, noOfShift } })} />
        </div>
      ),
    },
  ];

  // Shift Details Hours Report Table Columns
  const ShiftDetailsHoursReportTableHeader: ColumnsType<any> = [
    {
      title: 'Sr #',
      dataIndex: 'key',
      key: 'key',
      render: (key: React.Key) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{key}</span>,
    },
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      key: 'clientName',
      render: (clientName: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{clientName}</span>,
    },
    {
      title: 'Care Coordinator',
      dataIndex: 'careCoordinator',
      key: 'careCoordinator',
      render: (careCoordinator: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{careCoordinator}</span>
      )
    },
    {
      title: 'Shift Type',
      dataIndex: 'shiftType',
      key: 'shiftType',
      align: "center",
      render: (shiftType: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftType}</span>,
    },
    {
      title: 'Shift Date',
      dataIndex: 'shiftDate',
      key: 'shiftDate',
      align: "center",
      render: (shiftDate: string) =>
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftDate}</span>,
    },
    {
      title: 'Shift Hours',
      dataIndex: 'shiftHours',
      key: 'shiftHours',
      align: "center",
      render: (shiftHours: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{shiftHours}</span>
      ),
    },
    {
      title: 'Check In',
      dataIndex: 'checkIn',
      key: 'checkIn',
      align: "center",

      render: (checkIn: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{checkIn}</span>
      ),
    },
    {
      title: 'Check Out',
      dataIndex: 'checkOut',
      key: 'checkOut',
      align: "center",

      render: (checkOut: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{checkOut}</span>
      ),
    },
    {
      title: 'Pay Rate',
      dataIndex: 'payRate',
      key: 'payRate',
      align: "center",

      render: (payRate: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{payRate}</span>
      ),
    },
    {
      title: 'Total Payable',
      dataIndex: 'totalPayable',
      key: 'totalPayable',
      align: "center",

      render: (totalPayable: string) => (
        <span className='fs-14 fw-400 m-0 line-height-22 title-color'>{totalPayable}</span>
      ),
    },
  ];

  const breadCrumbItems = [
    {
      title: "Staff Hours Report",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Finance Reports",
      path: "/finance/reports",
    },
  ];

  return (


    !!search ? (
      <div className='reports-child-wrapper-class'>
        <Row>
          <Col xs={24} className="filter-div">
            <Row gutter={[20, 20]} align="middle" justify="space-between">
              <Col xs={12}>
                <Space size={16}>
                  <div style={{ background: "#4E132C", boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)", width: "50px", height: "50px", borderRadius: "50%", padding: "1rem", color: "#fff", textAlign: "center" }}>
                    {staffName.split("")[0]}
                  </div>
                  <div>
                    <p className='fs-14 fw-600 line-height-17 title-color m-0' style={{ marginBottom: "0.313rem" }}>{staffName.replace("-", " ")}</p>
                    <p className='fs-12 fw-400 line-height-20 title-color m-0'>{state?.staffType}</p>
                  </div>
                </Space>
              </Col>
              <Col xs={6}>
                <p className='line-height-17 title-color m-0' style={{ textAlign: "end" }}><span className='fs-14 fw-600' style={{ color: "#4E132C" }}>Total No Of Shifts : </span>{state?.noOfShift < 10 ? "0" + state?.noOfShift : state?.noOfShift}</p>
              </Col>
            </Row>
          </Col>
          <Col xs={24}>
            <CommonReportTable tableHeader={ShiftDetailsHoursReportTableHeader} tableData={ShiftDetailsHoursReportMockData} />
          </Col>
        </Row>
      </div>
    ) : (
      <>
        <BreadCrumb breadCrumbItems={breadCrumbItems} />

        <div className='reports-child-wrapper-class'>
          <Row>
            <Col xs={24} className="filter-div">
              <CommonFilters staffHours={true} />
            </Col >
            <Col xs={24}>
              <CommonReportTable tableHeader={ShiftHoursReportTableHeader} tableData={ShiftHoursReportMockData} />
            </Col>
          </Row >
        </div >
      </>
    )



  )
}

export default StaffHoursReport