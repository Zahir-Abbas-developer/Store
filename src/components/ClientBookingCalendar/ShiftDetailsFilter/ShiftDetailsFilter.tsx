import React from "react";
import { Input } from "antd";
import SelectWrapper from "../../../shared/SelectWrapper/SelectWrapper";
import SearchIcon from "../../../assets/images/OnBoarding/Search.svg";
import "./ShiftDetailsFilter.scss";
import { useGetCarerTypeQuery } from "../../../store/Slices/ClientBookingCalendar";
import { debouncedSearch } from "../../../utils/utils";

const ShiftDetailsFilter = (props: any) => {
  const { setSearchFilter, setJobRoleFilter } = props;
  const { data: getCarerType } = useGetCarerTypeQuery({});
  
  const carerTypeOptions = getCarerType?.data?.result?.map((carerTypeDetails: any) => ({
    key: carerTypeDetails?._id,
    value: carerTypeDetails?._id,
    label: carerTypeDetails?.name,
  }));

  const debouncedResults = (event:any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchFilter);
  };

  return (
    <>
      <div className="shift-details-wrapper d-flex align-center justify-between">
        <div className="shift-details w-100">
          <SelectWrapper name="jobRole" label="Job Role" placeHolder="Selected Option" options={carerTypeOptions} onChange={(e: any) => setJobRoleFilter(e)} />
        </div>
        <div className="shift-details w-100">
          <Input
            className="searchbar"
            placeholder="search"
            prefix={<img src={SearchIcon} alt="search icon" className="icon" width={20} height={20} />}
            style={{ marginTop: "32px" }}
            onChange={debouncedResults}
          />
        </div>
      </div>
    </>
  );
};

export default ShiftDetailsFilter;
