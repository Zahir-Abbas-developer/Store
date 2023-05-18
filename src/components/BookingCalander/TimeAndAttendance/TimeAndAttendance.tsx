import { useState } from "react";
import { Avatar, Col, DatePicker, Input, Row, TimePicker } from "antd";
import { v4 as uuidv4 } from "uuid";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import ResourcePlugin from "@fullcalendar/resource";
import SearchIcon from "../../../assets/BookingCalander/images/search.png";
import Sun from "../../../assets/BookingCalander/images/sun.png";
import Menu from "../../../assets/BookingCalander/images/menu.png";
import UserMock from "../../../assets/BookingCalander/icons/calander-user.svg";
import { timeAndAttendance, timeAttendanceCalanderEvents, } from "../../../mock/BookingCalander/BookingCalanderData";
import TimeAndAttendanceFilters from "./TimeAndAttendenceFilters/TimeAndAttendanceFilters";
import TimeAndAttendanceDetailsModal from "../BookingCalanderModals/TimeAndAttendanceDetails/TimeAndAttendanceDetailsModal";
import "./TimeAndAttendance.scss";
import { useGetAllClientsListQuery, useGetAllocatedShiftsListQuery } from "../../../store/Slices/BookingCalendar/TimeSheetCalendar";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

function TimeAndAttendance() {

  dayjs.extend(utc)

  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState<any>({});

  const [filterValues, setFilterValues] = useState({ startDate: '', endDate: '' })
  const { data: allClientsListData } = useGetAllClientsListQuery({});
  const { data: shiftsListData } = useGetAllocatedShiftsListQuery({ careHomeId: '', staffId: '', startTime: filterValues?.startDate, endTime: filterValues?.endDate });

  const timeAndAttendance = allClientsListData?.data?.map((data: any) => {
    return {
      id: data?.staffId + data?.clientId,
      clientName: data?.clientName,
      title: data?.staffName,
      staffImg: data?.staffProfile,
      clientImg: UserMock,
    };
  });

  const timeAttendanceCalanderEvents = shiftsListData?.data?.shifts?.map((shiftDetails: any) => {
    return {
      ...shiftDetails,
      id: shiftDetails?._id,
      // resourceId: shiftDetails?.careHome?._id,
      resourceId: shiftDetails?.staffId + shiftDetails?.careHome?._id,
      title: shiftDetails?.carer?.userType?.shortForm,
      status: shiftDetails?.shift?.shiftStatus,
      start: shiftDetails?.shift?.startTime,
      end: shiftDetails?.shift?.endTime,
      shiftStartTime: shiftDetails?.shift?.startTime,
      shiftEndTime: shiftDetails?.shift?.endTime,
    }
  })

  const calanderStatuses = [
    { title: "Not Token", color: "#98B7C9" },
    { title: "Early", color: "#FA9359" },
    { title: "On Time", color: "#65CDF0" },
    { title: "Late", color: "#FF7976" },
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
        <div className="resource-render-wrapper d-flex align-center">
          <div className="resource-render-content d-flex align-center cursor-pointer">
            {/* <Avatar src={resource.extendedProps.staffImg} alt="user_mock" /> */}
            <img style={{borderRadius:"50px",objectFit:"cover"}} width={32} height={32} src={resource?.extendedProps?.staffImg ? `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${resource?.extendedProps?.staffImg?.mediaId}.${resource?.extendedProps?.staffImg?.mediaMeta?.extension}` : `https://ui-avatars.com/api/?name=${resource?.title}`} alt={"img"} />
            <label style={{ paddingLeft: '10px' }}
              className="grey-color fs-14 fw-400 line-height-20 cursor-pointer"
              htmlFor={`${resource.id}`} >
              {resource?.title}
            </label>
          </div>
        </div>
      </>
    );
  };

  const resourceGroupLabelContent = (info: any) => {
    return (
      <div className="resource-render-wrapper d-flex align-center">
        <div className="resource-render-content d-flex align-center cursor-pointer">
          <Avatar src={UserMock} alt="user_mock" />
          <label className="grey-color fs-14 fw-400 line-height-20 cursor-pointer" style={{ paddingLeft: "8px" }}>
            {info?.resource?._resource?.extendedProps?.clientName || info?.groupValue}
          </label>
        </div>
      </div>
    );
  };

  const eventContentHandler = (eventInfo: any) => {
    const { staffArrival, shiftStartTime, shiftEndTime } = eventInfo.event._def?.extendedProps;
    const calanderStatuses: any = {
      "NOT_TAKEN": "#98B7C9",
      "EARLY": "#FA9359",
      "ON_TIME": "#65CDF0",
      "LATE": "#FF7976",
    };
    return (
      <>
        <div className="event-grid">
          <div className="event-grid-item" style={{ backgroundColor: calanderStatuses[staffArrival] }}>
            <div className="event-grid-content">
              <div className="event-header">
                <img src={Sun} alt="sun" />
                <img src={Menu} alt="menu" />
              </div>
              <div className="inner-content">
                <h2 className="fs-14 fw-400 m-0">{eventInfo?.event?._def?.title}</h2>
                <p className="fs-10 fw-600 m-0">{dayjs(shiftStartTime)?.utc().format('hh:mm a')} - {dayjs(shiftEndTime)?.utc().format('hh:mm a')}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const handleEventClick = (eventDetails: any) => {
    setEventDetails(eventDetails)
    setIsAttendanceModalOpen(true);
  };
  const resourceAreaColumns = [
    {
      group: true,
      field: "clientName",
      headerContent: "Client Name",
    },
    {
      field: "staffName",
      headerContent: "Staff Name",
    },
  ];

  console.log(filterValues, 'filterValues');

  return (
    <div className="time-and-attendance">
      <Row gutter={[20, 20]} className="d-flex" style={{ justifyContent: "space-between" }}>
        <Col xs={24} md={24} xl={10}>
          <div className="wrapper-fliters">
            <div className="flex-filters">
              <div className="inner-flex-filters">
                <div className="col-box">
                  <div className="area-fliters">
                    <div className="filters-label fw-600 fs-14 title-color">Start Time</div>
                    <TimePicker style={{ width: "100%", border: "none", borderRadius: "0px" }} className="staff-filters-select" format={'HH:mm'} onChange={(value) => { setFilterValues({ ...filterValues, startDate: dayjs(value).toISOString() }) }} />
                  </div>
                </div>
                <div className="col-box">
                  <div className="area-fliters">
                    <div className="filters-label fw-600 fs-14 title-color">End Time</div>
                    <TimePicker style={{ width: "100%", border: "none", borderRadius: "0px" }} className="staff-filters-select" format={'HH:mm'} onChange={(value) => { setFilterValues({ ...filterValues, endDate: dayjs(value).toISOString() }) }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} md={24} xl={6}>
          <div className="input-search-wrapper">
            <Input placeholder="search" prefix={<img src={SearchIcon} alt="search icon" className="icon" />} />
          </div>
        </Col>
        {/* Calander section starts here  */}
        <Col xs={24} md={20} className="calander-header-attendance" >
          <div className="status-wrapper d-flex">
            {calanderStatuses.map((data) => {
              return (
                <div key={uuidv4()} className='d-flex align-center box-wrapper'>
                  <div className="box" style={{ backgroundColor: `${data.color}` }} ></div>
                  <div className="status-title">
                    <span className="fs-12 label-color">{data.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
        {isAttendanceModalOpen && (
          <TimeAndAttendanceDetailsModal
            isAttendanceModalOpen={isAttendanceModalOpen}
            setIsAttendanceModalOpen={setIsAttendanceModalOpen}
            eventDetailsData={eventDetails}
          />
        )}
        <Col xs={24} md={24} className="calander-main">
          <FullCalendar
            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
            plugins={[resourceTimelinePlugin, interactionPlugin, dayGridPlugin, ResourcePlugin]}
            headerToolbar={{ left: "", right: "", center: "" }}
            timeZone="utc"
            initialView="resourceTimelineDay"
            resources={timeAndAttendance}
            events={timeAttendanceCalanderEvents}
            editable={false}
            droppable={false}
            slotMinWidth={50}
            resourceAreaWidth={350}
            eventContent={eventContentHandler}
            resourceAreaColumns={resourceAreaColumns}
            resourceLabelContent={handleResourceRender}
            resourceGroupLabelContent={resourceGroupLabelContent}
            slotDuration="01:00:00"
            slotLabelInterval="02:00:00"
            slotLabelContent={handleSlotContent}
            slotLabelFormat={[{ hour: "numeric", minute: "2-digit", omitZeroMinute: false, meridiem: "short" }]}
            eventClick={(e) => handleEventClick(e)}
          />
        </Col>
      </Row>
    </div>
  );
}

export default TimeAndAttendance;
