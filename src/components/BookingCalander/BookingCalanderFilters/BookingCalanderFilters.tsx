import { DatePicker, Select } from "antd";
import type { DatePickerProps } from "antd";
import arrowDownSmall from '../../../assets/icons/arrow-small-down.svg';
import datePicker from "../../../assets/BookingCalander/images/date-picker.png";
import { useGetClientsListQuery, useGetStaffListQuery } from "../../../store/Slices/BookingCalendar";
import "./BookingCalanderFilters.scss"
import dayjs from "dayjs";


function BookingCalanderFilters({ bookingCalendar, setFilterValues, filterValues, timeAndAttendance }: any) {

  const { data: clientsList } = useGetClientsListQuery({})
  const { data: staffList } = useGetStaffListQuery({})


  return (
    <div className="wrapper-fliters">
      <div className="flex-filters">
        <div className="inner-flex-filters">
          <div className="col-box">
            <div className="area-fliters">
              <div className="filters-label fw-600 fs-14 title-color">Client Name</div>
              <Select
                suffixIcon={<img src={arrowDownSmall} alt="down-arrow" />}
                bordered={false}
                className="staff-filters-select"
                style={{ width: "100%" }}
                defaultValue="All"
                onChange={(value) => { setFilterValues({ ...filterValues, clientName: value }) }}
              >
                <Select.Option value="" className=" title-color">All</Select.Option>
                {clientsList?.data?.result?.map((clientDetails: any) => (
                  <Select.Option value={clientDetails?._id}>{clientDetails?.clientName}</Select.Option>
                ))}
              </Select>
            </div>
          </div>
          {!bookingCalendar && <div className="col-box">
            <div className="area-fliters">
              <div className="filters-label fw-600 fs-14 title-color">Staff Name</div>
              <Select
                suffixIcon={<img src={arrowDownSmall} alt="down-arrow" />}
                bordered={false}
                className="staff-filters-select"
                style={{ width: "100%" }}
                defaultValue="All"
                onChange={(value) => { setFilterValues({ ...filterValues, staffName: value }) }}
              >
                <Select.Option value="" className=" title-color">All</Select.Option>
                {staffList?.data?.result?.map((staffDetails: any) => (
                  <Select.Option value={staffDetails?._id}>{staffDetails?.firstName} {staffDetails?.lastName}</Select.Option>
                ))}
              </Select>
            </div>
          </div>}
          <div className="col-box">
            <div className="area-fliters">
              <div className="filters-label fw-600 fs-14 title-color">Date Range</div>
              <DatePicker
                suffixIcon={<img src={datePicker} alt="calander" />}
                className="staff-filters-select title-color"
                style={{ width: "100%", border: "none", borderRadius: "0px" }}
                onChange={(value) => { setFilterValues({ ...filterValues, startDate: dayjs(value).toISOString() }) }}
                placeholder="From"
              />
            </div>
          </div>
          <div className="col-box">
            <div className="area-fliters">
              {/* <div className='filters-label fw-600 fs-14'>Type</div> */}
              <DatePicker
                suffixIcon={<img src={datePicker} alt="calander" />}
                style={{ width: "100%", border: "none", borderRadius: "0px", marginTop: ".5rem" }}
                onChange={(value) => { setFilterValues({ ...filterValues, endDate: dayjs(value).toISOString() }) }}
                placeholder="To"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingCalanderFilters;
