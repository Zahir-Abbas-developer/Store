import { useState } from "react";
import { Button, Col, DatePicker, Input, Row, Tooltip } from "antd";
import PaymentDetailsTable from "../PaymentDetailsTable/PaymentDetailsTable";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import ArrowDown from "../../../assets/icons/arrow_down.svg";
import ButtonArrow from "../../../assets/icons/arrow_down_white.svg";
import { ReactComponent as DownloadIcon } from "../../../assets/icons/download_icon_grey.svg";
import SearchIcon from "../../../assets/images/OnBoarding/Search.svg";
import ImportStaffRecordModal from "../ImportStaffRecord/ImportStaffRecord";
import "./PendingPaymentDetails.scss";
import { useGetClientPaymentDetailsQuery } from "../../../store/Slices/PaymentDetails/ClientPaymentDetails";
import { data } from "../../../mock/SettingJobRole.ts";
import { useGetStaffPaymentDetailsQuery } from "../../../store/Slices/PaymentDetails/StaffPaymentDetails";
import { debouncedSearch } from "../../../utils/utils";

const PendingPaymentDetails = (props: any) => {
  const { selectedRowKeys, setSelectedRowKeys, PaymentDetailsType } = props;
  const [open, setOpen] = useState(false);
  const [importStaffModal, setImportStaffModal] = useState(false);
  const [timeFrameFilterValues, setTimeFrameFilterValues] = useState({ startDate: "", endDate: "" });
  const [selectedWeek, setSelectedWeek] = useState<any>("");
  const [searchValue, setSearchValue] = useState("");

  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };

  dayjs.extend(weekOfYear);
  const handleChange = (values: any) => {
    setTimeFrameFilterValues({
      startDate: dayjs(values).startOf("week").format("YYYY-MM-DD"),
      endDate: dayjs(values).endOf("week").format("YYYY-MM-DD"),
    });
    setSelectedWeek(
      `Week ${dayjs(values).week()}, ${dayjs(values).startOf("week").format("DD-MM-YYYY")} to ${dayjs(values).endOf("week").format("DD-MM-YYYY")}`
    );
  };

  let clientsPendingPaymentData: any;
  let staffPendingPaymentData: any;

  const { data: clientsData, isLoading: clientsDataLoading } = useGetClientPaymentDetailsQuery({
    startDate: timeFrameFilterValues?.startDate ? timeFrameFilterValues?.startDate : dayjs().subtract(1, "week").startOf("week").format("YYYY-MM-DD"),
    endDate: timeFrameFilterValues?.endDate ? timeFrameFilterValues?.endDate : dayjs().subtract(1, "week").endOf("week").format("YYYY-MM-DD"),
    // endDate: dayjs().day(0).format("YYYY-MM-DD"),
    status: "PENDING",
    search: searchValue,
  });

  const { data, isLoading: staffDataLoading } = useGetStaffPaymentDetailsQuery({
    startDate: timeFrameFilterValues?.startDate ? timeFrameFilterValues?.startDate : dayjs().subtract(1, "week").startOf("week").format("YYYY-MM-DD"),
    endDate: timeFrameFilterValues?.endDate ? timeFrameFilterValues?.endDate : dayjs().subtract(1, "week").endOf("week").format("YYYY-MM-DD"),
    status: "PENDING",
    search: searchValue,
  });

  if (PaymentDetailsType === "Client" && clientsData) {
    clientsPendingPaymentData = clientsData?.data;
  }

  if (PaymentDetailsType === "Staff") {
    staffPendingPaymentData = data?.data;
  }

  return (
    <div className="pending-payment-details-wrapper">
      <Row className="filters-wrapper" style={{ margin: "30px 0 15px 0" }}>
        <Col sm={24} md={12} style={{ marginBottom: "15px" }}>
          <span style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <button className="blue-hover-effect fs-16 fw-500" onClick={() => setOpen(!open)} style={{ background: "#EE2E7E" }}>
              {!selectedWeek ? "Time Frame" : selectedWeek}{" "}
              <span style={{ marginLeft: "10px" }}>
                <img src={ButtonArrow} alt="" />
              </span>
            </button>
            <DatePicker className="custom-datepicker" onOpenChange={(val) => setOpen(val)} open={open} onChange={handleChange} picker="week" />
            <Button type="primary" style={{ background: "#65CDF0" }} onClick={() => setImportStaffModal(true)}>
              Import Staff Record
            </Button>
          </span>
        </Col>
        <Col sm={24} md={12} style={{ width: "100%" }}>
          <span className="flex-column-media-query" style={{ float: "right", display: "flex", gap: "10px" }}>
            <div className="input-search-wrapper">
              <Input onChange={debouncedResults} placeholder="search" prefix={<img src={SearchIcon} alt="search icon" className="icon" />} />
            </div>
            <Button type="primary" className="download-btn" style={{ background: "#65CDF0" }}>
              <span style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <DownloadIcon /> Download
              </span>
            </Button>
            {/* <Tooltip placement="bottom" title="Download as Template" color="rgb(101, 205, 240)"> */}
            {/* <button className='download-icon-btn' style={{ backgroundColor: "transparent", color: "#4E4B66", borderRadius: "2px", border: "none", height: "38px", boxShadow: "none" }}>
                                <span style={{ display: "flex", gap: "10px", alignItems: "center" }}><DownloadIcon /> Download</span>
                            </button> */}
            {/* </Tooltip> */}
          </span>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div style={{ display: "flex", alignItems: "baseline", marginBottom: "30px" }}>
            <span style={{ marginRight: "16px" }}>
              <img src={ArrowDown} alt="" />
            </span>
            <div>
              <span style={{ color: "#F7B923", fontSize: "20px", fontWeight: 500 }}>
                Week {timeFrameFilterValues?.startDate ? timeFrameFilterValues?.startDate : dayjs().subtract(1, "week").startOf("week").format("YYYY-MM-DD")} to
                {timeFrameFilterValues?.endDate ? timeFrameFilterValues?.endDate : dayjs().subtract(1, "week").endOf("week").format("YYYY-MM-DD")}
              </span>
              <br />
            </div>
          </div>
          <PaymentDetailsTable
            clientsData={PaymentDetailsType === "Staff" ? staffPendingPaymentData : clientsPendingPaymentData}
            PaymentDetailsType={PaymentDetailsType}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            isLoading={clientsDataLoading || staffDataLoading}
            timeFrameFilterValues={timeFrameFilterValues}
          />
        </Col>
      </Row>
      {importStaffModal && <ImportStaffRecordModal isModalOpen={importStaffModal} setIsModalOpen={setImportStaffModal} />}
    </div>
  );
};

export default PendingPaymentDetails;
