import { DatePicker, Select } from "antd";
import datePicker, { DatePickerProps } from "antd/es/date-picker";
import React from "react";
import arrowDownSmall from '../../../../../../assets/icons/arrow-small-down.svg';
import datePickerICON from "../../../../../../assets/BookingCalander/images/date-picker.png";


const DayAvailabilityFilter = () => {
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    }
    const onChangeFrom: DatePickerProps["onChange"] = (date, dateString) => {
        console.log(date, dateString);
      };
  return (
    <>
      <div className="wrapper-fliters">
        <div className="flex-filters">
          <div className="inner-flex-filters">
            <div className="col-box">
              <div className="area-fliters">
                <div className="filters-label fw-600 fs-14">Staff Name</div>
                <Select
                  placeholder="Select Name"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  suffixIcon={<img src={arrowDownSmall} alt="" />}
                  options={[
                    { value: "Option One", label: "Option One" },
                    { value: "Option Two", label: "Option Two" },
                  ]}
                />
              </div>
            </div>
            <div className="col-box">
              <div className="area-fliters">
                <div className="filters-label fw-600 fs-14">Date Range</div>
                <DatePicker
                  suffixIcon={<img src={datePickerICON} alt="calander" />}
                  className="staff-filters-select"
                  style={{ width: "100%", border: "none", borderRadius: "0px" }}
                  onChange={onChangeFrom}
                  placeholder="Date"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DayAvailabilityFilter;
