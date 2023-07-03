import { useState } from "react";
import { Button, Col, DatePicker, Dropdown, Input, MenuProps, Row, Select } from "antd";
import PaymentDetailsTable from "../PaymentDetailsTable/PaymentDetailsTable";
import ButtonArrow from "../../../assets/icons/arrow_down_white.svg";
import DownloadIcon from "../../../assets/icons/download_icon.svg";
import CopyIcon from "../../../assets/icons/CopyIcon.svg";
import XLSIcon from "../../../assets/icons/XLSIcon.svg";
import CSVIcon from "../../../assets/icons/CSVIcon.svg";
import SearchIcon from "../../../assets/images/OnBoarding/Search.svg";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import "./PaymentHistory.scss";
import { useGetPaymentHistoryWeeksQuery } from "../../../store/Slices/PaymentDetails";
import { useGetClientPaymentDetailsQuery } from "../../../store/Slices/PaymentDetails/ClientPaymentDetails";
import { useGetStaffPaymentDetailsQuery } from "../../../store/Slices/PaymentDetails/StaffPaymentDetails";
import { debouncedSearch } from "../../../utils/utils";
import { useGetClientsListQuery, useGetStaffListQuery } from "../../../store/Slices/BookingCalendar";

const PaymentHistory = (props: any) => {
  const { selectedRowKeys, setSelectedRowKeys, PaymentDetailsType } = props;
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [skip, setSkip] = useState<boolean>(true);
  const [id, setId] = useState<number>(0);
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [searchValue, setSearchValue] = useState("");
  const [staffValue, setStaffValue] = useState("");
  const [clientValue, setClientValue] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<any>("");
  dayjs.extend(weekOfYear);
  const handleChange = (values: any) => {
    setSelectedWeek(
      `Week ${dayjs(values).week()}, ${dayjs(values).startOf("week").format("DD-MM-YYYY")} to ${dayjs(values).endOf("week").format("DD-MM-YYYY")}`
    );
  };

  const { data: clientsList } = useGetClientsListQuery({})
  const { data: staffList } = useGetStaffListQuery({})

  const { data: weeksData } = useGetPaymentHistoryWeeksQuery({});
  const { data: clientPaymentHistory, isLoading: clientPaymentHistoryLoading } = useGetClientPaymentDetailsQuery(
    { startDate: dates?.startDate, endDate: dates?.endDate, status: "COMPLETED", searchValue, clientValue },
    { skip }
  );
  const { data: staffPaymentHistory, isLoading: staffPaymentHistoryLoading } = useGetStaffPaymentDetailsQuery(
    { startDate: dates?.startDate, endDate: dates?.endDate, status: "COMPLETED", searchValue, staffValue },
    { skip }
  );

  const CollpaseArrow = (props: any) => (
    <svg
      style={{ transform: isOpenDropdown ? "rotate(90deg)" : "" }}
      width="8"
      height="16"
      viewBox="0 0 8 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.293388 15.5185C-0.128851 14.9214 -0.0908185 14.0017 0.378335 13.4643L5.14875 8L0.378335 2.53571C-0.090819 1.99832 -0.128851 1.07862 0.293387 0.481518C0.715625 -0.115587 1.43824 -0.163992 1.9074 0.373403L7.62167 6.91885C7.86249 7.19469 8 7.58766 8 8C8 8.41234 7.86249 8.80531 7.62167 9.08115L1.9074 15.6266C1.43824 16.164 0.715626 16.1156 0.293388 15.5185Z"
        fill={props.fill}
      />
    </svg>
  );
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };

  const items: MenuProps["items"] = [
    {
      label: <span style={{ color: "#EE2E7E", fontWeight: "400" }}>Copy This File</span>,
      key: "1",
      icon: <img src={CopyIcon} alt="" />,
    },
    {
      label: <span style={{ color: "#7D67FF", fontWeight: "400" }}>Download as XLS</span>,
      key: "2",
      icon: <img src={XLSIcon} alt="" />,
    },
    {
      label: <span style={{ color: "#52C41A", fontWeight: "400" }}>Download as CSV</span>,
      key: "3",
      icon: <img src={CSVIcon} alt="" />,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };
  return (
    <div className="payment-history-wrapper">
      <Row className="filters-wrapper" style={{ margin: "30px 0 10px 0" }}>
        <Col lg={18} md={24} style={{ marginBottom: "20px" }}>
          <span style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {/* <Button className="pink-hover-effect" type="primary" style={{ background: "#65CDF0" }}>
              Select Staff{" "}
              <span style={{ marginLeft: "10px" }}>
                <img src={ButtonArrow} alt="" />
              </span>
            </Button> */}
            {PaymentDetailsType === "Staff" ?
              <Select
                placeholder="Select Staff"
                suffixIcon={<img style={{ paddingRight: "20px" }} src={ButtonArrow} alt="" />}
                onChange={(e: any) => setStaffValue(e)}
              >
                <Select.Option value="" className=" title-color">All</Select.Option>
                {staffList?.data?.result?.map((staffDetails: any) => (
                  <Select.Option value={staffDetails?._id}>{staffDetails?.firstName} {staffDetails?.lastName}</Select.Option>
                ))}
              </Select> : <Select
                placeholder="Select Client"
                suffixIcon={<img style={{ paddingRight: "20px" }} src={ButtonArrow} alt="" />}
                onChange={(e: any) => setClientValue(e)}
              >
                <Select.Option value="" className=" title-color">All</Select.Option>
                {clientsList?.data?.result?.map((clientDetails: any) => (
                  <Select.Option value={clientDetails?._id}>{clientDetails?.clientName}</Select.Option>
                ))}
              </Select>

            }
            <button
              className="fs-16 fw-500"
              onClick={() => setOpen(!open)}
              style={{
                background: "#4E132C",
                position: "relative",
                padding: "8px 35px",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "3px",
              }}
            >
              {!selectedWeek ? "Select Week" : selectedWeek}{" "}
              <span style={{ marginLeft: "10px" }}>
                <img src={ButtonArrow} alt="" />
              </span>
            </button>

            {/* <Button onClick={() => setOpen(!open)} style={{ background: "#EE2E7E", color: "white", borderRadius: "2px", border: "none", height: "38px" }}>{!selectedWeek ? "Time Frame" : selectedWeek} <span style={{ marginLeft: "10px" }}><img src={ButtonArrow} alt="" /></span></Button> */}

            <DatePicker
              className="payment-history-datepicker"
              onOpenChange={(val) => setOpen(val)}
              open={open}
              onChange={handleChange}
              picker="week"
            />

            <Dropdown menu={menuProps} trigger={["click"]} overlayClassName="custom-download-dropdown">
              <Button type="primary" style={{ background: "#52C41A" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <img src={DownloadIcon} alt="" />
                  Download
                  <img src={ButtonArrow} alt="" />
                </span>
              </Button>
            </Dropdown>
          </span>
        </Col>
        <Col lg={6} xs={24}>
          <div className="input-search-wrapper">
            <Input onChange={debouncedResults} placeholder="search" prefix={<img src={SearchIcon} alt="search icon" className="icon" />} />
          </div>
        </Col>
      </Row>
      {weeksData?.data?.map((item: any, index: number) => (
        <>
          <Row
            key={index}
            className={isOpenDropdown && id === index ? "transition-ease" : "collapse-closed"}
            style={{ marginBottom: "30px", borderLeft: !isOpenDropdown ? "15px solid #F7B923" : "" }}
            onClick={() => {
              setIsOpenDropdown(!isOpenDropdown);
              setDates({ startDate: item?.startDate, endDate: item?.endDate });
              setSkip((prev) => !prev);
              setId(index);
            }}
          >
            <Col span={24}>
              <div className="d-flex" style={{ alignItems: "baseline" }}>
                <span style={{ marginRight: "16px" }}>
                  <CollpaseArrow fill="#F7B923" />
                </span>
                <div>
                  <span style={{ color: "#F7B923", fontSize: "20px", fontWeight: 500, cursor: "pointer" }}>
                    Week {item?.weekNumber}, {item?.startDate} to {item?.endDate}
                  </span>
                  <br />
                  {isOpenDropdown && id === index ? null : <span style={{ fontSize: "14px" }}>No items</span>}
                </div>
              </div>
            </Col>
          </Row>
          {isOpenDropdown && id === index && (
            <PaymentDetailsTable
              PaymentHistory={true}
              PaymentDetailsType={PaymentDetailsType}
              selectedRowKeys={selectedRowKeys}
              setSelectedRowKeys={setSelectedRowKeys}
              clientsData={PaymentDetailsType === "Staff" ? staffPaymentHistory?.data : clientPaymentHistory?.data}
              isLoading={staffPaymentHistoryLoading || clientPaymentHistoryLoading}
            />
          )}
        </>
      ))}
    </div>
  );
};

export default PaymentHistory;
