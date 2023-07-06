import { useState } from "react";
import dayjs from "dayjs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Col, DatePicker, Input, Row, Select, Space } from "antd";
import { optionsPrioritymock, ticketsSummaryAdminlList, ticketsSummaryDetailList } from "../../../../mock/ItHelpDesk/ItHelpDashboard";
import ItHelpTicketSummaryCommonTable from "./ItHelpTicketSummaryCommonTable/ItHelpTicketSummaryCommonTable";
import AddTicketModal from "./AddTicketCommonModal/AddTicketModal";
import AssignToCommonModal from "./AssignToCommonModal/AssignToCommonModal";
import {
  useGetAssignToRequestQuery,
  useGetHelpDeskDetailsRequestQuery,
  usePatchAssignToRequestMutation,
  usePostTicketRequestMutation,
} from "../../../../store/Slices/ItHelpDesk";
import { ROLES } from "../../../../constants/Roles";
import { debouncedSearch } from "../../../../utils/utils";
import { handleDownloadData } from "../../../../utils/DownloadData";
import AppSnackbar from "../../../../utils/AppSnackbar";
import BreadCrumb from "../../../../layout/BreadCrumb/BreadCrumb";

// Assets
import Search from "../../../../assets/images/OnBoarding/Search.svg";
import searchIcon from "../../../../assets/icons/search.svg";
import coloredCopyIcon from "../../../../assets/icons/Report/colored-copy.png";
import coloredCsvIcon from "../../../../assets/icons/Report/colored-csv.png";
import coloredXlsIcon from "../../../../assets/icons/Report/colored-xls.png";

import "./ItHelpTicketSummaryDetail.scss";

const { RangePicker } = DatePicker;

const ItHelpTicketSummaryDetails = () => {
  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");
  let { id: stepperId }: any = useParams();
  const navigate = useNavigate();

  const stepperIdValue: any = {
    "my-ticket": "true",
    all: "",
    pending: "pending",
    closed: "closed",
    onhold: "onhold",
    resolved: "resolved",
  };
  const itemLocation = useLocation();
  const words = itemLocation?.pathname.split("/");
  const [stepperValue, setStepperValue] = useState<any>(stepperIdValue[stepperId ?? "all"]);
  const [addTicketModal, setAddTicketModal] = useState({ isToggle: false, data: {} });
  const [assignToModal, setAssignToModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [assignList, setAssignList] = useState<any>();
  const [selectedTableRows, setSelectedTableRows] = useState<any>([]);
  const [filterValues, setFilterValues] = useState<any>({
    assignTo: undefined,
    timeFrame: [],
    reportedBy: undefined,
    status: "",
    priority: undefined,
  });

  // param object to pass get API
  const paramsObj: any = {
    page: 1,
    limit: 100,
  };

  if (searchValue) {
    paramsObj["search"] = searchValue;
  }
  if (stepperValue === "true") {
    paramsObj["myTickets"] = "true";
  }
  if (stepperValue !== "true" && stepperValue !== "") {
    paramsObj["status"] = stepperValue;
  }
  if (filterValues?.reportedBy) {
    paramsObj["reportedBy"] = filterValues.reportedBy;
  }
  if (filterValues?.assignTo) {
    paramsObj["assignedTo"] = filterValues.assignTo;
  }
  if (filterValues?.timeFrame[0]) {
    paramsObj["date"] = dayjs(filterValues?.timeFrame[0]).format("YYYY-MM-DD");
  }
  if (filterValues?.timeFrame[1]) {
    paramsObj["endDate"] = dayjs(filterValues?.timeFrame[1]).format("YYYY-MM-DD");
  }
  if (filterValues?.priority) {
    paramsObj["priority"] = filterValues.priority;
  }

  const getHelpDeskDetailsQuery = "?" + new URLSearchParams(paramsObj).toString();

  // Get HelpDesk Details Api Request **********************************
  const { data, isLoading, isSuccess } = useGetHelpDeskDetailsRequestQuery({
    refetchOnMountOrArgChange: true,
    getHelpDeskDetailsQuery,
  });

  let helpDeskDetailsData: any;
  if (isSuccess) {
    helpDeskDetailsData = data;
  }


  // get  ReportedBy api request  **********************************
  const [getReportedByRequest, { data: reportedByData, isSuccess: isSuccessReportedBy }] =
    usePatchAssignToRequestMutation();

  let reportedByFilterData: any;
  if (isSuccessReportedBy) {
    reportedByFilterData = reportedByData;
  } 

  //  **********************************
  const ticketCount: any = helpDeskDetailsData?.data?.ticketCounts;
  const ticketCountDetail: any = {
    "All Tickets": ticketCount?.allTickets ?? "0",
    "My Tickets": ticketCount?.myTickets ?? "0",
    Pending: ticketCount?.pendingTickets ?? "0",
    Onhold: ticketCount?.onholdTickets ?? "0",
    Resolved: ticketCount?.resolvedTickets ?? "0",
    Closed: ticketCount?.closedTickets ?? "0",
  };

  // Get assign to list  api request  **********************************
  const {
    data: assignToData,
    isSuccess: isSuccessAssignTo,
  } = useGetAssignToRequestQuery({ refetchOnMountOrArgChange: true });

  let assignToListData: any;
  if (isSuccessAssignTo) {
    assignToListData = assignToData;
  }

  //  **********************************
  const handleData = (list: any) => {
    if (list === "all") {
      setStepperValue("");
    } else if (list === "my-ticket") {
      setStepperValue("true");
    } else {
      setStepperValue(list);
    }
  };

  // patch assign to api request  **********************************
  const [patchAssignToRequest] = usePatchAssignToRequestMutation();
  const [addTicketPostRequest] = usePostTicketRequestMutation();

  // **********************************
  const onChange = (itemId: any) => {
    setFilterValues({ ...filterValues, reportedBy: itemId });
  };

  const onSearch = (value: string) => {
    getReportedByRequest({ query: value });
  };

  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };

  const clearFilerHandler = () => {
    setFilterValues({ ...filterValues, timeFrame: [] });
  };

  //handle assign to modal submit ********************** */

  const handleAssignTo = async () => {
    let { data: assignToData, error }: any = await patchAssignToRequest({ userId: assignList?._id, ticketId: selectedTableRows[0]?._id });

    if (assignToData) {
      AppSnackbar({ type: "success", message: "Assigned Successfully" });
    }
    if (error) {
      AppSnackbar({ type: "error", message: "Not Successfully Assigned" });
    }
    setAssignToModal(false);
    setSelectedTableRows([]);
  };

  //**************************** */
  const breadCrumbValue: any = {
    "my-ticket": "My Tickets",
    all: "All Tickets",
    pending: "Pending Tickets",
    closed: "Closed Tickets",
    onhold: "Onhold  Tickets",
    resolved: "Resolved Tickets",
  };
  const breadCrumbItems = [
    {
      title: breadCrumbValue[stepperId],
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "IT Help Desk",
      path: "/help/it-help-desk",
    },
  ];
  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="wrap-ticket-summary-details">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row " span={24}>
            <div className="bg-white card-box-shadow padding-30 border-radius-8" style={{ border: "1px solid #D9DBE9 " }}>
              <div className="add-new-ticket">
                {(role === ROLES.superAdmin || role === ROLES.admin) && (
                  <Button
                    type="primary"
                    className="bg-orange-color"
                    disabled={selectedTableRows.length === 0}
                    style={{ marginRight: "1px" }}
                    onClick={() => {
                      setAssignToModal(true);
                    }}
                  >
                    Assign To
                  </Button>
                )}
                {assignToModal && (
                  <AssignToCommonModal
                    assignToModal={assignToModal}
                    assignList={assignList}
                    setAssignList={setAssignList}
                    handleAssignTo={handleAssignTo}
                    setAssignToModal={setAssignToModal}
                    assignToListData={assignToListData}
                  />
                )}

                <Button
                  type="primary"
                  className="add-btn"
                  onClick={() => {
                    setAddTicketModal({ isToggle: true, data: {} });
                  }}
                >
                  Add New Ticket
                </Button>
                {addTicketModal.isToggle && (
                  <AddTicketModal
                    addTicketPostRequest={addTicketPostRequest}
                    type="Add"
                    title="Add New ticket"
                    addTicketModal={addTicketModal}
                    setAddTicketModal={setAddTicketModal}
                  />
                )}
                {filterValues.timeFrame.length !== 0 && (
                  <Button type="primary" className="bg-orange-color" onClick={clearFilerHandler}>
                    Reset
                  </Button>
                )}
              </div>
              <Row className="d-flex justify-between align-center wrap-filterss">
                <Col xs={24} md={24} lg={24} xl={24} xxl={17}>
                  <Row className="common-report-child-filter-wrapper">
                    <Col xs={24} md={12} lg={6} xl={6} xxl={5} className="wrap-filter">
                      <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
                        Assigned To
                      </p>
                      <div className="filter-column">
                        <Select
                          size="large"
                          placeholder="All"
                          optionFilterProp="children"
                          className="app-select-wrap-class"
                          popupClassName="app-select-popup-wrap-class"
                          style={{ width: "100%" }}
                          value={filterValues.assignTo}
                          onChange={(values) => setFilterValues({ ...filterValues, assignTo: values })}
                        >
                          <Select.Option value="">All</Select.Option>
                          {assignToListData?.data?.map((item: any) => (
                            <Select.Option value={item?._id}>
                              {item?.firstName} {item?.lastName}
                            </Select.Option>
                          ))}
                        </Select>
                      </div>
                    </Col>

                    {(role === ROLES.superAdmin || role === ROLES.instructor || role === ROLES.coordinator || role === ROLES.admin) && (
                      <Col xs={24} md={12} lg={6} xl={6} xxl={7} className="wrap-filter">
                        <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
                          {role === ROLES.carer || role === ROLES.client ? "Date" : "Time Frame"}
                        </p>
                        <div className="filter-column">
                          <RangePicker
                            size="large"
                            value={filterValues.timeFrame}
                            className="app-select-wrap-class"
                            separator={<span>to</span>}
                            popupClassName="app-select-popup-wrap-class"
                            onChange={(value: any) => setFilterValues({ ...filterValues, timeFrame: value })}
                            allowClear={false}
                            style={{
                              width: "100%",
                              borderLeft: "0PX",
                              borderRight: "0px",
                              borderRadius: "0px",
                            }}
                          />
                        </div>
                      </Col>
                    )}
                    {(role === ROLES.admin || role === ROLES.carer || role === ROLES.client || role === ROLES.superAdmin) && (
                      <Col xs={24} md={12} lg={6} xl={6} xxl={5} className="wrap-filter">
                        <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
                          Reported by
                        </p>
                        <div className="filter-column">
                          <Select
                            showSearch
                            size="large"
                            placeholder="All user"
                            style={{ width: "100%" }}
                            className="app-select-wrap-class"
                            popupClassName="app-select-popup-wrap-class"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            value={filterValues.reportedBy}
                            // filterOption={(input: any, option: any) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                          >
                            <Select.Option value="">All</Select.Option>
                            {reportedByFilterData?.data?.map((item: any) => (
                              <Select.Option value={item?._id}>
                                {item?.firstName} {item?.lastName}
                              </Select.Option>
                            ))}
                          </Select>
                        </div>
                      </Col>
                    )}
                    {(role === ROLES.carer || role === ROLES.client) && (
                      <Col xs={24} md={12} lg={5} xl={5} xxl={5} className="wrap-filter">
                        <p className="fs-14 fw-600 title-color line-height-17 m-0" style={{ marginBottom: "0.563rem" }}>
                          Priority
                        </p>
                        <div className="filter-column">
                          <Select
                            size="large"
                            placeholder="High"
                            optionFilterProp="children"
                            value={filterValues.priority}
                            className="app-select-wrap-class"
                            popupClassName="app-select-popup-wrap-class"
                            style={{ width: "100%" }}
                            onChange={(values) => setFilterValues({ ...filterValues, priority: values })}
                          >
                            <Select.Option value="">All</Select.Option>
                            {optionsPrioritymock?.map((item: any) => (
                              <Select.Option value={item?.value}>{item?.label}</Select.Option>
                            ))}
                          </Select>
                        </div>
                      </Col>
                    )}
                  </Row>
                </Col>
                {(role === ROLES.carer || role === ROLES.client) && (
                  <Col xs={24} md={12} lg={8} xl={6} xxl={5} className="wrap-filter">
                    <div className="input-search-wrapper" style={{ marginTop: "25px" }}>
                      <Input placeholder="search" onChange={debouncedResults} prefix={<img src={Search} alt="search icon" className="icon" />} />
                    </div>
                  </Col>
                )}
              </Row>
            </div>
          </Col>

          {(role === ROLES.superAdmin || role === ROLES.instructor || role === ROLES.admin) && (
            <Col className="gutter-row " span={24}>
              <div className="custom-pagination-search">
                <Space className="input-export-icons" size={[30, 0]}>
                  <Input
                    className="search-input"
                    placeholder="Search Schedule"
                    onChange={debouncedResults}
                    prefix={<img src={searchIcon} alt="searchIcon" width={24} height={24} style={{ marginRight: "0.623rem" }} />}
                  />
                  <Space size={[25, 0]}>
                    <img src={coloredCopyIcon} alt="copy" className="img-hover" />
                    <img src={coloredCsvIcon} alt="csv" onClick={() => handleDownloadData(`helpdesk/download?type=csv`, 'csv','helpDesk')} className="img-hover" />
                    <img src={coloredXlsIcon} alt="xls" onClick={() => handleDownloadData(`helpdesk/download?type=xls`, 'xls','helpDesk')} className="img-hover" />
                  </Space>
                </Space>
              </div>
            </Col>
          )}

          <Col className="gutter-row" xs={24} sm={12} md={11} lg={10} xl={9} xxl={6}>
            <div className="bg-white ticket-summary-list card-box-shadow">
              {(role === ROLES.client || role === ROLES.carer) && (
                <ul>
                  {ticketsSummaryAdminlList.map((list) => {
                    return (
                      <li
                        className="cursor"
                        key={list.list}
                        style={{
                          color: words[4] === list.queryName ? "#52C41A" : "#A0A3BD",
                        }}
                        onClick={() => {
                          handleData(list.queryName);
                          navigate(`/help/it-help-desk/all-tickets/${list.queryName}`);
                        }}
                      >
                        {list.list}
                        <span>_____________</span>
                        <span
                          className="count"
                          style={{
                            color: words[4] === list.queryName ? "#52C41A" : "#A0A3BD",
                          }}
                        >
                          {ticketCountDetail[list.list]}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}

              {(role === ROLES.superAdmin || role === ROLES.instructor || role === ROLES.admin) && (
                <div className="content-card side-bar-steps">
                  <div className="bg-inner-shadow title-color fw-600 fs-14" style={{ padding: "10px", marginBottom: "10px" }}>
                    Tickets Count
                  </div>
                  {ticketsSummaryDetailList.map((item: any, index: any) => {
                    return (
                      <div
                        className="steps-flex"
                        key={index}
                        onClick={() => {
                          handleData(item.queryName);
                          navigate(`/help/it-help-desk/all-tickets/${item.queryName}`);
                        }}
                      >
                        <div className="rounded" style={{ cursor: "pointer" }}>
                          {stepperId === item.queryName && <div className="inner--selected"></div>}
                        </div>
                        <div className="steps-content">
                          <span className="list-title">{item.list}</span>
                        </div>
                        <span className="count-super-admin">{ticketCountDetail[item.list]}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </Col>

          <Col className="gutter-row" xs={24} sm={12} md={13} lg={14} xl={15} xxl={18}>
            <div className="bg-white ticket-summary-list card-box-shadow">
              {(role === ROLES.superAdmin ||
                role === ROLES.instructor ||
                ROLES.admin ||
                role === ROLES.carer ||
                role === ROLES.client ||
                role === ROLES.coordinator) && (
                  <ItHelpTicketSummaryCommonTable
                    helpDeskDetailsData={helpDeskDetailsData}
                    selectedTableRows={selectedTableRows}
                    setSelectedTableRows={setSelectedTableRows}
                    ticketsSummaryDetailList={ticketsSummaryDetailList}
                    stepperValue={stepperValue}
                    isLoading={isLoading}
                  />
                )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ItHelpTicketSummaryDetails;
