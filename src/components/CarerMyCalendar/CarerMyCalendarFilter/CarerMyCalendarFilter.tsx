import { Input } from "antd";
import SelectWrapper from "../../../shared/SelectWrapper/SelectWrapper";
import SearchIcon from "../../../assets/images/OnBoarding/Search.svg";
import "../CarerMyCalendar.scss";
import { debouncedSearch } from "../../../utils/utils";

const CarerMyCalendarFilter = (props: any) => {
  const { setSearchFilter, setShiftTimeFilter } = props;

  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchFilter);
  };

  return (
    <div className="carer-calendar-filter-wrap d-flex align-center justify-between" style={{ flexWrap: "wrap", margin: "30px 0", gap: "10px", width: "100%" }}>
      <div className="carer-calendar-filter w-100" >
        <SelectWrapper
          name="shiftTime"
          label="Shift Time"
          placeHolder="Select Option"
          onChange={(e: any) => setShiftTimeFilter(e)}
          options={[
            { label: "Morning", value: "MORNING" },
            { label: "Afternoon", value: "AFTERNOON" },
            { label: "Longday", value: "LONGDAY" },
            { label: "Night", value: "NIGHT" },
          ]}
        />
      </div>
      <div className="input-search-wrapper search" style={{ maxWidth: "100%", }}>
        <Input
          placeholder="search"
          style={{ width: "100%" }}
          onChange={debouncedResults}
          prefix={<img src={SearchIcon} alt="search icon" className="icon" />}
        />
      </div>
    </div>
  );
};

export default CarerMyCalendarFilter;
