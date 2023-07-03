import React from "react";
import { Input } from "antd";
import WeekAvailabilityTable from "./WeekAvailabilityTable/WeekAvailabilityTable";
import fileDefault from "../../../../../../assets/icons/StaffAllocation/file-default.svg";
import fileCSV from "../../../../../../assets/icons/StaffAllocation/file-csv.png";
import fileXLS from "../../../../../../assets/icons/StaffAllocation/file-xls.svg";
import searchIcon from "../../../../../../assets/icons/search.svg";
import "./WeekAvailability.scss";

const WeekAvailability = () => {
  return (
    <>
      <div className="availability-search-filter d-flex align-center justify-between">
        {/* <AavailabilityFilters /> */}
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
      </div>
      <div className="input-export-icons ">
        <div
          className="files-icons d-flex align-center"
          style={{ gap: "20px", justifyContent: "flex-end" }}
        >
          <img src={fileDefault} alt="" className="files-export-icons" />
          <img src={fileCSV} alt="" className="files-export-icons" />
          <img src={fileXLS} alt="" className="files-export-icons" />
        </div>
      </div>

      <WeekAvailabilityTable />
    </>
  );
};

export default WeekAvailability;
