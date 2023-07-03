import React, { useState } from "react";

// Ant Components
import {
  Col,
  DatePicker,
  DatePickerProps,
  Input,
  Row,
  Select,
  Space,
} from "antd";

// SCSS
import "./StaffAvailabilitySheetCommonFilter.scss";
import "../../../Finance/Reports/CommonFilters/CommonFilters.scss";
// Assets
import searchIcon from "../../../../assets/icons/search.svg";
import datePicker from "../../../../assets/BookingCalander/images/date-picker.png";
import coloredCopyIcon from "../../../../assets/icons/Report/colored-copy.png";
import coloredCsvIcon from "../../../../assets/icons/Report/colored-csv.png";
import coloredXlsIcon from "../../../../assets/icons/Report/colored-xls.png";
import { useGetStaffNameQuery } from "../../../../store/Slices/Reports";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
const { RangePicker } = DatePicker;
const StaffAvailabilitySheetCommonFilter = (props: any) => {
  const {
    dayAvailability,
    setFilterValues,
    setChangeDayKey,
    setFilterStaffName,
  } = props;
  const { data: staffName } = useGetStaffNameQuery({});
  const [selectDay, setSelectDay] = useState("");
  const location = useLocation();
  const getStaffName = staffName?.data?.result?.map((staff: any, i: number) => {
    return {
      key: i,
      value: `${staff.firstName} ${staff.lastName}`,
      label: `${staff.firstName} ${staff.lastName}`,
      id: staff?._id,
    };
  });

  const handleCommonFilterChange = (staffNameValue: any) => {
    setFilterStaffName(staffNameValue);
  };
  const handleChangeFrom: DatePickerProps["onChange"] = (date, dateString) => {
    setSelectDay(dateString);
    setChangeDayKey(date);
  };

  const handleChangeTo: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  const handleDateChange = (values: any) => {
    if (!values) {
      setFilterValues({ startDate: "", endDate: "" });
    } else {
      const startDate = dayjs(values[0]).toISOString();
      const endDate = dayjs(values[0]).add(1, "week").toISOString();
      setFilterValues({ startDate, endDate });
    }
  };
  const handleChangeWeekRange = (values: any) => {
    setFilterValues({
      startDate: dayjs(values).startOf("week").toISOString(),

      endDate: dayjs(values).endOf("week").toISOString(),
    });
  };

  const customWeekStartEndFormat: DatePickerProps["format"] = (value) =>
    `${dayjs(value).startOf("week").format("DD/MM/YYYY")} - ${dayjs(value)
      .endOf("week")

      .format("DD/MM/YYYY")}`;

  return (
    <Row
      gutter={[20, 20]}
      className="staff-availability-sheet-common-filter-wrapper"
      justify="space-between"
    >
      <Col xs={24} md={16} xl={14} xxl={12}>
        <Row gutter={[0, 20]} className="filter-wrapper">
          {!dayAvailability && (
            <>
              <Col xs={24} sm={8}>
                <p
                  className="fs-14 fw-600 title-color line-height-17 m-0"
                  style={{ marginBottom: "0.563rem" }}
                >
                  Staff Name
                </p>
                <div className="filter-column">
                  <Select
                    size="large"
                    placeholder="Select staff name"
                    defaultValue="All"
                    optionFilterProp="children"
                    className="app-select-wrap-class"
                    popupClassName="app-select-popup-wrap-class"
                    onChange={handleCommonFilterChange}
                    // filterOption={(input: any, option: any) => { (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) }}
                    options={getStaffName}
                  />
                </div>
              </Col>
              { location?.pathname==="/reports/weekly-availability-sheet"&&
              <Col xs={24} sm={8}>
                <p
                  className="fs-14 fw-600 title-color line-height-17 m-0"
                  style={{ marginBottom: "0.563rem" }}
                >
                  Date Range
                </p>
                <div className="filter-column">
                   {" "}
                  <DatePicker
                    onChange={handleChangeWeekRange}
                    picker="week"
                    format={customWeekStartEndFormat}
                  />
                </div>
              </Col>
}
              {location?.pathname!=="/reports/weekly-availability-sheet"&&
              <Col xs={24} sm={8}>
                <p
                  className="fs-14 fw-600 title-color line-height-17 m-0"
                  style={{ marginBottom: "0.563rem" }}
                >
                  Time Frame
                </p>
                <div className="filter-column">
                  <RangePicker
                    onChange={handleDateChange}
                    className="date-picker "
                    suffixIcon={<img src={datePicker} alt="calander" />}
                  />
                </div>
              </Col>}
              {/* <Col xs={24} sm={8}>
                <p className='fs-14 fw-600 title-color line-height-17 m-0' style={{ marginBottom: "0.563rem" }}>&nbsp;</p>
                <div className="filter-column">
                  <DatePicker
                    suffixIcon={<img src={datePicker} alt="calander" />}
                    className="date-picker"
                    onChange={handleChangeTo}
                    placeholder="To"
                  />
                </div>
              </Col> */}
            </>
          )}

          {dayAvailability && (
            <Col xs={24} md={16} lg={12}>
              <p
                className="fs-14 fw-600 title-color line-height-17 m-0"
                style={{ marginBottom: "0.563rem" }}
              >
                Select Day
              </p>
              <div className="filter-column">
                <DatePicker
                  suffixIcon={<img src={datePicker} alt="calander" />}
                  className="date-picker"
                  onChange={handleChangeFrom}
                  placeholder="Select day"
                />
              </div>
            </Col>
          )}
        </Row>
      </Col>

      <Col xs={24} md={8} xl={6} xxl={5}>
        <Row className="search-input-row" style={{ marginLeft: "auto" }}>
          <Col xs={24} style={{ width: "100%" }}>
            <p
              className="fs-14 fw-600 title-color line-height-17 m-0"
              style={{ marginBottom: "0.563rem" }}
            >
              &nbsp;
            </p>
            <Input
              className="search-input"
              placeholder="Search"
              prefix={
                <img
                  src={searchIcon}
                  alt="searchIcon"
                  width={24}
                  height={24}
                  style={{ marginRight: "0.623rem" }}
                />
              }
            />
          </Col>
          <Col xs={24} style={{ marginLeft: "auto" }}>
            <p
              className="fs-14 fw-600 title-color line-height-17 m-0"
              style={{ marginBottom: "0.563rem" }}
            >
              &nbsp;
            </p>
            <Space size={[16, 0]} style={{ marginLeft: "auto" }}>
              <img src={coloredCopyIcon} alt="csv" className="img-hover" />
              <img src={coloredCsvIcon} alt="csv" className="img-hover" />
              <img src={coloredXlsIcon} alt="csv" className="img-hover" />
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default StaffAvailabilitySheetCommonFilter;
