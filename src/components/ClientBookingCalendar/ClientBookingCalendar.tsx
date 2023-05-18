import FullCalendar from "@fullcalendar/react";
import React, { useState } from "react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import ResourcePlugin from "@fullcalendar/resource";
import RequestShift from "./RequestShift/RequestShift";
import SunIcon from "../../assets/icons/ClientBookingCalendar/sun-icon.png";
import ActionIcon from "../../assets/icons/ClientBookingCalendar/action-icon.png";
import CareBookingCalendarFilters from "./ClientBookingCalendarFilters/ClientBookingCalendarFilters";
import SearchIcon from "../../assets/images/OnBoarding/Search.svg";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { useGetShiftCalendarDataQuery } from "../../store/Slices/ClientBookingCalendar";
import dayjs from "dayjs";
import { CarerBookingCalendarEventType } from "../../mock/CarerBookingCalendar";
import { debouncedSearch } from "../../utils/utils";
import "./ClientBookingCalendar.scss";
import BreadCrumb from "../../layout/BreadCrumb/BreadCrumb";
import utc from 'dayjs/plugin/utc';

const CareBookingCalendar = () => {
  const navigate = useNavigate();
  const [isRequestShiftModalOpen, setIsRequestShiftModalOpen] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [calendarFilter, setCalendarFilter] = useState({
    jobRole: "",
    department: "",
    shiftTime: "",
  });
  
  dayjs.extend(utc)


  //query parameters of search and filter
  const paramsObj: any = {};
  if (searchFilter) paramsObj["clientName"] = searchFilter;
  if (calendarFilter?.jobRole) paramsObj["carerType"] = calendarFilter?.jobRole;
  if (calendarFilter?.department) paramsObj["department"] = calendarFilter?.department;
  if (calendarFilter?.shiftTime) paramsObj["shiftType"] = calendarFilter?.shiftTime;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  const { data: getCalendarData } = useGetShiftCalendarDataQuery(query);

  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchFilter);
  };

  let curr = new Date();
  let currntWeek = [];
  const locale = "en-US";
  for (let i = 1; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let completeDate = new Date(curr.setDate(first));
    let date = completeDate.toISOString().slice(0, 10);
    const dayName = completeDate.toLocaleString(locale, { weekday: "long" });
    currntWeek.push({ id: date, title: dayName });
  }


  const shiftDetails = getCalendarData?.data?.shifts?.map((shift: any) => {
    return {
      ...shift,
      id: shift?._id,
      resourceId: dayjs(shift?.shiftDate).format("YYYY-MM-DD"),
      title: shift?.carerType?.shortForm,
      start: shift?.startTime,
      end: shift?.endTime,
      eventType: shift?.shiftStatus,
      shiftStartTime: shift?.startTime,
      shiftEndTime: shift?.endTime
    };
  });
  

  const breadCrumbItems = [
    {
      title: "Booking Calendar",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/client-dashboard",
    },
  ];


  const handleEventContent = (eventInfo: any) => {
    const { shiftStatus, shiftStartTime, shiftEndTime, directBooked } = eventInfo?.event?._def?.extendedProps;
    const backgroundColor: any = {
      ...(!directBooked && { PUBLISHED: "#5A8BA8", UNPUBLISHED: "#FA9359", ACCEPTED: "#2BC155" }),
      BOOKED: "#2BC155",
      COMPLETED: "#969BA0",
      ...(directBooked && {
        PUBLISHED: "#65CDF0",
        UNPUBLISHED: "#8D6AB1",
      }),
    };
    return (
      <div className="event-grid">
        <div className="event-grid-item " style={{ backgroundColor: backgroundColor[shiftStatus] }}>
          <div className="event-grid-content">
            <div className="event-header">
              <img src={SunIcon} alt="sun" />
              <img src={ActionIcon} alt="menu" />
            </div>
            <div className="inner-content">
              <h2 className="fs-14 fw-400 m-0">{eventInfo?.event?._def?.title}</h2>
              <p className="fs-10 fw-600 m-0">
               { `${dayjs(shiftStartTime).utc().format("hh:mm a")} to ${dayjs(shiftEndTime).utc().format("hh:mm a")}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleSlotContent = (slotEvent: any) => {
    return (
      <>
        <div className="slot-event-wrapper">
          <div className="d-flex align-center" style={{ gap: "5px" }}>
            <h2 className="title-color m-0 fs-14 fw-600 line-height-18">{dayjs(slotEvent.date).utc().format("h a")}</h2>
          </div>
        </div>
      </>
    );
  };

  const handleResourceRender = (info: any) => {
    const resource = info?.resource?._resource;
    return (
      <>
        <div className="resource-render-wrapper d-flex align-center">
          <p className="title-color fs-14 fw-400 line-height-20 cursor-pointer m-0">{resource.title}</p>
        </div>
      </>
    );
  };

  const handleEventClick = (eventInfo: any) => {
    const events = eventInfo?.event?._def?.publicId;
    navigate(`/client-booking-calendar/${events}`);
  };

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />

      <div className="client-booking-calendar">
        <div className="care-booking-wrap bg-white">
          <div className="care-booking-btn" onClick={() => setIsRequestShiftModalOpen(true)}>
            <button type="button" className="cursor-pointer fs-16 line-height-22 white-color fw-600">
              Request a Shift
            </button>
          </div>
          <div className="care-booking-filters d-flex align-center justify-between">
            <CareBookingCalendarFilters setCalendarFilter={setCalendarFilter} calendarFilter={calendarFilter} />
            <div className="input-search-wrapper d-flex w-100" style={{ justifyContent: "flex-end", maxWidth: "250px" }}>
              <Input className="w-100" placeholder="search" prefix={<img src={SearchIcon} alt="search icon" className="icon" width={20} height={20} />} onChange={debouncedResults} />
            </div>
          </div>
        </div>
        <div className="booking-calendar-wrap bg-white">
          <div className="calendar-header-wrap d-flex align-center">
            {CarerBookingCalendarEventType.map((item, i: number) => (
              <div className="calendar-header d-flex align-center" key={i}>
                <span style={{ background: item.color }}></span>
                <p className="m-0">{item.eventType}</p>
              </div>
            ))}
          </div>
          <div className="calendar-wrap">
            <FullCalendar
              schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
              plugins={[interactionPlugin, dayGridPlugin, ResourcePlugin, resourceTimelinePlugin,]}
              initialView="resourceTimelineWeek"
              titleFormat={{ month: "short", day: "numeric", weekday: "short" }}
              headerToolbar={false}
              height="90vh"
              resources={currntWeek}
              events={shiftDetails}
              eventContent={handleEventContent}
              slotLabelContent={handleSlotContent}
              resourceLabelContent={handleResourceRender}
              dayMaxEventRows={3}
              dayMaxEvents={true}
              editable={true}
              droppable={true}
              slotMinWidth={100}
              resourceAreaWidth={140}
              eventMinWidth={100}
              eventBorderColor="1px solid #DBE4EF !important"
              resourceAreaHeaderContent="Days"
              slotDuration="24:00:00"
              slotLabelInterval="02:00:00"
              dateClick={() => setIsRequestShiftModalOpen(true)}
              slotLabelFormat={[{ day: "2-digit", month: "long", year: "numeric", weekday: "long" }]}
              eventClick={handleEventClick}
              timeZone="utc"
            />
          </div>
        </div>
      </div>
      <RequestShift isRequestShiftModalOpen={isRequestShiftModalOpen} setIsRequestShiftModalOpen={setIsRequestShiftModalOpen} />
    </>
  );
};
export default CareBookingCalendar;
