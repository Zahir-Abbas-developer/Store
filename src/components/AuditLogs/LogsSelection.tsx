import { DatePicker, Select, TimePicker } from "antd";
import arrowDownSmall from "../../assets/icons/arrow-small-down.svg";

const { RangePicker } = DatePicker;

const LogsSelection = () => {
  const handleChange = () => {
    console.log(`selected `);
  };

  return (
    <div className="logs-wrapper-fliters">
      <div className="flex-filters">
        <div className="inner-flex-filters">
          <div className="col-box">
            <div className="area-fliters">
              <div className="filters-label fw-600 fs-14 title-color">Date</div>
              <RangePicker bordered={false} />
              {/* <TimePicker onChange={handleChange} placeholder="Select Time" className="w-100" bordered={false} suffixIcon={<img src={arrowDownSmall} alt="arrowDownSmall" />} /> */}
            </div>
          </div>
          {/* <div className="col-box">
            <div className="area-fliters">
              <div className="filters-label fw-600 fs-14 title-color">Event Date</div>
              <DatePicker bordered={false} onChange={handleChange} placeholder="Select Date" className="w-100" suffixIcon={<img src={arrowDownSmall} alt="arrowDownSmall" />} />
            </div>
          </div>
          <div className="col-box">
            <div className="area-fliters">
              <div className="filters-label fw-600 fs-14 title-color">Event Name</div>
              <Select
                placeholder="Select Event Name"
                bordered={false}
                className="w-100"
                onChange={handleChange}
                suffixIcon={<img src={arrowDownSmall} alt="arrowDownSmall" />}
                options={[
                  { value: "Option One", label: "Option One" },
                  { value: "Option Two", label: "Option Two" },
                ]}
              />
            </div>
          </div> */}
        </div>
      </div>
      {/* <div className="account-type">
        <div className="col-box">
          <div className="filters-label fw-600 fs-14 title-color">Account Type</div>
          <Select
            placeholder="Select Account Type"
            size="large"
            onChange={handleChange}
            suffixIcon={<img src={arrowDownSmall} alt="arrowDownSmall" />}
            options={[
              { value: "Option One", label: "Option One" },
              { value: "Option Two", label: "Option Two" },
            ]}
          />
        </div>
      </div> */}
    </div>
  );
};

export default LogsSelection;
