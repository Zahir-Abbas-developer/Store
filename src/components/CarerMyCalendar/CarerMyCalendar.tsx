import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import ResourcePlugin from "@fullcalendar/resource";
import { Card } from "antd";
import Sun from "../../assets/BookingCalander/images/sun.png";
import Menu from "../../assets/BookingCalander/images/menu.png";
import CarerMyCalendarFilter from "./CarerMyCalendarFilter/CarerMyCalendarFilter";
import ViewEventDetailsModal from "./ViewEventDetailsModal/ViewEventDetailsModal";
import dayjs from "dayjs";
import { useGetCarerCalendarDataQuery } from "../../store/Slices/CarerMyCalendar";
import './CarerMyCalendar.scss';
import BreadCrumb from "../../layout/BreadCrumb/BreadCrumb";

const CarerMyCalendar = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [eventClicked, setEventClicked] = useState({});
  const [searchFilter, setSearchFilter] = useState('');
  const [shiftTimeFilter, setShiftTimeFilter] = useState('');
  const paramsObj: any = {};
  if (searchFilter) paramsObj["staffName"] = searchFilter;
  if (shiftTimeFilter) paramsObj["shiftType"] = shiftTimeFilter;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  const { data: getCalendarData } = useGetCarerCalendarDataQuery(query);

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
      resourceId: dayjs(shift?.shift.shiftDate).format("YYYY-MM-DD"),
      title: shift?.carer?.userType?.shortForm,
      start: shift?.shift.startTime,
      end: shift?.shift.endTime,
      eventType: shift?.shiftStatus,
      shiftStartTime: shift?.shift.startTime,
      shiftEndTime: shift?.shift.endTime
    };
  });

  const breadCrumbItems = [
    {
      title: "My Calendar",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/client-dashboard",
    },
  ];


  const handleSlotContent = (slotEvent: any) => {
    return (
      <>
        <div className="slot-event-wrapper">
          <p className="fs-14 fw-600 label-color">{slotEvent.text}</p>
        </div>
      </>
    );
  };

  const handleResourceRender = (info: any) => {
    const resource = info.resource._resource;
    return (
      <>
        <div className="resource-render-content">
          <label className="fs-14 fw-600 line-height-20" style={{ color: "#4E4B66" }}>{resource?.title}</label>
          <p className="fs-14 fw-400 m-0" style={{ color: "#969BA0" }}>{dayjs(resource?.id).format('DD/MM/YYYY')}</p>
        </div>
      </>
    );
  };

  const eventContentHandler = (eventInfo: any) => {
    const rangeDiff = dayjs(eventInfo.event._instance.range.end).diff(dayjs(eventInfo.event._instance.range.start), "hour", true);
    const { title, extendedProps } = eventInfo.event._def;
    return (
      <>
        <div className="carer-event-wrapper">
          <div className="event-icon d-flex align-center justify-between">
            <img src={Sun} alt="" />
            <img src={Menu} alt="" />
          </div>
          <div className="event-content">
            <h2 className={`m-0 ${rangeDiff <= 1 ? 'fs-12' : 'fs-14'}`}>{title}</h2>
            <p className="m-0 fs-10">{`${dayjs(extendedProps.shiftStartTime).format('hh:mm: a')} - ${dayjs(extendedProps.shiftEndTime).format('hh:mm: a')}`}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="carer-my-calendar-wrapper">
        <Card>
          <CarerMyCalendarFilter setSearchFilter={setSearchFilter} setShiftTimeFilter={setShiftTimeFilter} />
          <FullCalendar
            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
            plugins={[interactionPlugin, dayGridPlugin, ResourcePlugin, resourceTimelinePlugin,]}
            initialView="resourceTimelineWeek"
            titleFormat={{ month: "short", day: "numeric", weekday: "short" }}
            headerToolbar={false}
            height="68vh"
            resources={currntWeek}
            events={shiftDetails}
            eventContent={eventContentHandler}
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
            slotLabelFormat={[
              {
                hour: "numeric",
                omitZeroMinute: false,
                meridiem: "short",
              },
            ]}
            eventClick={(e) => { setIsViewModalOpen(true); setEventClicked(e) }}
          />
        </Card>
        {isViewModalOpen && <ViewEventDetailsModal isViewModalOpen={isViewModalOpen} setIsViewModalOpen={setIsViewModalOpen} eventClicked={eventClicked} />}
      </div>
    </>
  )
}

export default CarerMyCalendar