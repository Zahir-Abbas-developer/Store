import React from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import ResourcePlugin from "@fullcalendar/resource";
import {
  CarerBookingCalendarData,
  CarerBookingCalendarEventType,
  CarerBookingCalendarResources,
} from "../../../mock/CarerBookingCalendar";
import dayjs from "dayjs";
import SunIcon from "../../../assets/icons/ClientBookingCalendar/sun-icon.png";
import ActionIcon from "../../../assets/icons/ClientBookingCalendar/action-icon.png";
import "./CarerBookingCalendar.scss";

const CarerBookingCalendar = () => {
  const handleEventContent = (eventInfo: any) => {
    const events = eventInfo?.event?._def?.extendedProps;
    const backgroundColor =
      events.eventType === "Unpublished Shifts"
        ? "#FA9359"
        : events.eventType === "Confirmed by Staff"
        ? "#2BC155"
        : events.eventType === "Completed by Staff"
        ? "#969BA0"
        : events.eventType === "Directly Booked and Confirmed"
        ? "#65CDF0"
        : events.eventType === "Directly Booked and Awaiting"
        ? "#8D6AB1"
        : events.eventType === "Directly Booked"
        ? "#4E132C"
        : events.eventType === "Open and Unconfirmed"
        ? "#5A8BA8"
        : "";
    return (
      <div
        className="care-booking-event-wrap"
        style={{ backgroundColor: backgroundColor }}
      >
        <div className="event-icon d-flex align-center justify-between">
          <img src={SunIcon} alt="" />
          <img src={ActionIcon} alt="" />
        </div>
        <div
          className="event-content d-flex flex-column w-100 snow-white-color"
          style={{ gap: "5px" }}
        >
          <h2 className="fs-14 fw-600 m-0 line-height-18">
            {eventInfo?.event?._def?.title}
          </h2>
          <p className="fs-12 fw-600 m-0 line-height-18">7:15 am - 11:30 am</p>
        </div>
      </div>
    );
  };

  const handleSlotContent = (slotEvent: any) => {
    return (
      <>
        <div className="slot-event-wrapper">
          <div className="d-flex align-center" style={{ gap: "5px" }}>
            <h2 className="title-color m-0 fs-14 fw-600 line-height-18">
              {dayjs(slotEvent.date).format("h a")}
            </h2>
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
          <p className="title-color fs-14 fw-400 line-height-20 cursor-pointer m-0">
            {resource.title}
          </p>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="carer-booking-calendar-wrapper bg-white">
        <div className="booking-header d-flex justify-between ">
          <h2 className="m-0 fs-20 fw-500 title-color">Calendar</h2>
          <div className="calander-header d-flex">
            <div className="calendar-header-wrap d-flex align-center">
              {CarerBookingCalendarEventType.map((item, i:number) => (
                <div
                  className="calendar-header d-flex align-center"
                  key={i}
                >
                  <span style={{ background: item.color }}></span>
                  <p className="m-0">{item.eventType}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="carer-booking-content">
          <FullCalendar
            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
            initialView="resourceTimelineWeek"
            plugins={[
              resourceTimelinePlugin,
              interactionPlugin,
              dayGridPlugin,
              ResourcePlugin,
            ]}
            headerToolbar={false}
            editable={true}
            events={CarerBookingCalendarData}
            resources={CarerBookingCalendarResources}
            eventContent={handleEventContent}
            resourceLabelContent={handleResourceRender}
            resourceAreaWidth={140}
            height="85vh"
            resourceAreaHeaderContent="Day"
            slotLabelContent={handleSlotContent}
            // slotDuration="00:24:00"
            droppable={true}
            slotMinWidth={100}
            eventMinWidth={100}
            eventBorderColor="1px solid #DBE4EF !important"
            slotLabelFormat={[
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
                weekday: "long",
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default CarerBookingCalendar;
