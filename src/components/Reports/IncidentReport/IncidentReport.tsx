import React, { useState } from "react";

// Ant Components
import { Col, Row, Dropdown, Button, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { MenuProps } from "antd";
import CommonReportTable from "../CommonReportTable/CommonReportTable";
import Arrow from "../../../assets/images/OnBoarding/arrow.svg";
import blueEyeIcon from "../../../assets/icons/Report/blue-eye.png";
import { ClientWorkHistoryReportFilters } from "../../../mock/ReportMockData/IncidentReportMockData";
import { incidentReportMockDataInterface } from "../../../types/ReportsInterface";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";
import IncidentReportFilter from "./IncidentReportFilter/IncidentFilter";
import AddModal from "./IncidentReportModal/AddModal.tsx/AddModal";
import { useChangeStatusIncedentMutation, useGetIncidentReportsQuery } from "../../../store/Slices/Reports";
import { debouncedSearch } from "../../../utils/utils";
import index from "../../../pages/ShiftManager/ShiftBooking";
import dayjs from "dayjs";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <div className=" d-flex align-items-center justify-center border-radius-4 " style={{ backgroundColor: "#FF4D4F", width: "100px", height: "30px" }}>
        <span className="fw-500 fs-14 line-height-22 d-flex align-items-center text-center white-color ">New</span>
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <div className=" d-flex align-items-center justify-center border-radius-4 " style={{ backgroundColor: "#1890FF", width: "100px", height: "30px" }}>
        <span className="fw-500 fs-14 line-height-22  d-flex align-items-center  text-center white-color ">Pending</span>
      </div>
    ),
  },
  {
    key: "3",
    label: (
      <div className=" d-flex align-items-center justify-center border-radius-4 " style={{ backgroundColor: "#52C41A", width: "100px", height: "30px" }}>
        <span className="fw-500 fs-14 line-height-22  d-flex align-items-center text-center white-color ">Resolved</span>
      </div>
    ),
  },
  {
    key: "3",
    label: (
      <div className=" d-flex align-items-center justify-center border-radius-4 " style={{ backgroundColor: "#FAAD14", width: "100px", height: "30px" }}>
        <span className="fw-500 fs-14 line-height-22  d-flex align-items-center text-center white-color ">Reopened</span>
      </div>
    ),
  },
];

const IncidentReport = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [tableSearch, setTableSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [incidentRecord, setSelectedIncidentRecord] = useState<any>({
    natureOfIncident: "",
    dateOfOccurence: "",
    reportedDate: "",
    reviewDate: "",
    actionTaken: "",
    followUpPlan: "",
    outComeOfIncident: "",
    closureDate: "",
    fileUrl:""
  });
  const paramsObj: any = {};
  if (tableSearch) paramsObj["search"] = tableSearch;
  const [extraReportsFilter, setExtraReportsFilter] = useState({
    userType: "",
    status: "",
  });
  const [filterValues, setFilterValues] = useState({ startDate: "", endDate: "" });
  const [IsOpenIncidentAddModal, setIsOpenIncidentAddModal] = useState(false);
  if (filterValues.startDate) paramsObj["startDate"] = filterValues.startDate;
  if (filterValues.endDate) paramsObj["endDate"] = filterValues.endDate;
  if (extraReportsFilter.userType) paramsObj["userType"] = extraReportsFilter.userType;
  if (extraReportsFilter.status) paramsObj["status"] = extraReportsFilter.status;
  const query = "&" + new URLSearchParams(paramsObj).toString();
  const { data, isSuccess } = useGetIncidentReportsQuery({ query, pagination });
  const [changeStatusIncedent] = useChangeStatusIncedentMutation();
  let incidentReportsData: any;
  if (isSuccess) {
    incidentReportsData = data;
  }

  const handleStatusBackgroundColor = (status: any) => {
    if (status === "NEW") {
      return "rgb(255, 77, 79)";
    }
  };

  const handleExtraHours = (value: any, type: string) => {
    setExtraReportsFilter({ ...extraReportsFilter, [type]: value });
  };

  const handleChangeStatus = (value: any, text: any, record: any) => {
    changeStatusIncedent({ payload: { status: value }, id: text?._id });
  };

  const handleViewIncedents = (item: any) => {

    setSelectedIncidentRecord({
      ...incidentRecord,
      natureOfIncident: item?.natureOfIncident,
      dateOfOccurence: dayjs(item?.dateOfOccurence),
      reportedDate: dayjs(item?.reportedDate),
      reviewDate: dayjs(item?.reviewDate),
      actionTaken: item?.actionTaken,
      followUpPlan: item?.followUpPlan,
      outComeOfIncident: item?.outComeOfIncident,
      closureDate: dayjs(item?.closureDate),
      fileUrl:item?.document?item?.document:""
    });
  };

  const searchedByClientName = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setTableSearch);
  };
  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Incidents Reports",
      path: "",
    },
    {
      title: "Carer Coordinator Reports",
      path: "/reports",
    },
  ];
  const IncidentReportTableHeader: ColumnsType<incidentReportMockDataInterface> = [
    {
      title: "Sr #",
      dataIndex: "key",
      key: "key",
      render: (_: any, item: any, index: number) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{currentPage * 5 + index - 4}</span>,
    },
    {
      title: "Nature of Incident",
      dataIndex: "natureOfIncident",
      key: "natureOfIncident",
      // align: "center",
      render: (_, item: any) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{item?.natureOfIncident}</span>,
    },
    {
      title: "Date of Incident",
      dataIndex: "dateOfOccurence",
      key: "dateOfOccurence",
      // align: "center",
      render: (_, item: any) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{dayjs(item?.dateOfOccurence).format("DD-MM-YYYY")}</span>,
    },

    {
      title: "User Role",
      dataIndex: "userRole",
      key: "userRole",
      // align: "center",
      render: (_, item: any) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{item?.userRole}</span>,
    },

    {
      title: "Reported by",
      dataIndex: "reportedBy",
      key: "reportedBy",
      render: (_, item: any) => <span className="fs-14 fw-400 m-0 line-height-22 title-color">{item?.reportedBy}</span>,
      // align: "center",
    },
    // {
    //     title: 'Attachment',
    //     dataIndex: 'Attachment',
    //     key: 'Attachment',
    //     render: (_,item: any) => (
    //         <div className='fs-14 fw-400 m-0 line-height-22 title-color'><img src={item?.Attachment} alt ="attachment" width="29px" height="37px"/></div>
    //     ),
    //     // align: "center",
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 300,
      render: (_: any, text: any, record: any) => (
        <div>
          <Select
            defaultValue={text?.status}
            className="select-onboarding"
            onChange={(value: any) => {
              handleChangeStatus(value, text, record);
              handleStatusBackgroundColor(value);
            }}
            style={{ width: "180px" }}
            suffixIcon={<img src={Arrow} />}
            options={[
              { value: "New", label: "New" },
              { value: "Pending", label: "Pending" },
              { value: "Resolved", label: "Resolved" },
              { value: "Reopened", label: "Reopened" },
            ]}
          />
        </div>
      ),
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record: any) => (
        <div className="fs-12 fw-400 line-height-22">
          <img
            src={blueEyeIcon}
            alt="Delete"
            className="cursor-pointer"
            onClick={() => {
              setIsOpenIncidentAddModal(true);
              handleViewIncedents(record);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="reports-child-wrapper-class">
        <Row>
          <Col xs={24} className="filter-div">
            <IncidentReportFilter handleExtraHours={handleExtraHours} setFilterValues={setFilterValues} />
          </Col>
          <Col xs={24}>
            <CommonReportTable
              total={incidentReportsData?.data?.metadata?. total}
              setPagination={setPagination}
              pagination={pagination}
              placeholder="Search By Nature of Incident"
              searchedByClientName={searchedByClientName}
              tableHeader={IncidentReportTableHeader}
              tableData={incidentReportsData?.data?.result}
            />
          </Col>
        </Row>
        <AddModal
          onFinish={(e: any) => {
            setIsOpenIncidentAddModal(false);
          }}
          IsOpenIncidentAddModal={IsOpenIncidentAddModal}
          IsCancelIncidentAddModal={() => {
            setIsOpenIncidentAddModal(false);
            setSelectedIncidentRecord({});
          }}
          incidentRecord={incidentRecord}
          setSelectedIncidentRecord={setSelectedIncidentRecord}
          disabled={true}
        />
      </div>
    </>
  );
};

export default IncidentReport;
