import React from "react";
import arrowDownSmall from "../../../assets/icons/arrow-small-down.svg";
import { Select } from "antd";
import "../../ClientManager/ClientManagerFilters/ClientManagerFilters.scss";
import { useGetCarerTypeQuery, useGetShiftDepartmentQuery } from "../../../store/Slices/ClientBookingCalendar";

const CareBookingCalendarFilters = (props: any) => {
  const { calendarFilter, setCalendarFilter } = props;
 
  const { data: getCarerType } = useGetCarerTypeQuery({});
  const { data: getDepartment } = useGetShiftDepartmentQuery({});

  const departmentListOptions = getDepartment?.data?.map((departmentDetails: any) => ({
    key: departmentDetails?._id,
    value: departmentDetails?._id,
    label: departmentDetails?.name,
  }));

  const carerTypeOptions = getCarerType?.data?.result?.map((carerTypeDetails: any) => ({
    key: carerTypeDetails?._id,
    value: carerTypeDetails?._id,
    label: carerTypeDetails?.name,
  }));
  
  const handleCalendarFilter = (value: any, type: string) => {
    setCalendarFilter({ ...calendarFilter, [type]: value });
  };

  return (
    <div className="wrapper-fliters">
      <div className="flex-filters">
        <div className="inner-flex-filters">
          <div className="col-box">
            <div className="area-fliters">
              <div className="filters-label fw-600 fs-14">Job Role</div>
              <Select
                placeholder="Select Option"
                style={{ width: "100%" }}
                onChange={(e: any) => handleCalendarFilter(e, 'jobRole')}
                suffixIcon={<img src={arrowDownSmall} alt="" />}
                options={carerTypeOptions}
              />
            </div>
          </div>
          <div className="col-box">
            <div className="area-fliters">
              <div className="filters-label fw-600 fs-14">Department</div>
              <Select placeholder="Select Option" style={{ width: "100%" }} onChange={(e: any) => handleCalendarFilter(e, 'department')} suffixIcon={<img src={arrowDownSmall} alt="" />} options={departmentListOptions} />
            </div>
          </div>
          <div className="col-box">
            <div className="area-fliters">
              <div className="filters-label fw-600 fs-14">Shift Time</div>
              <Select
                placeholder="Select Option"
                style={{ width: "100%" }}
                onChange={(e: any) => handleCalendarFilter(e, 'shiftTime')}
                suffixIcon={<img src={arrowDownSmall} alt="" />}
                options={[
                  { label: "Morning", value: "MORNING" },
                  { label: "Afternoon", value: "AFTERNOON" },
                  { label: "Longday", value: "LONGDAY" },
                  { label: "Night", value: "NIGHT" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareBookingCalendarFilters;
