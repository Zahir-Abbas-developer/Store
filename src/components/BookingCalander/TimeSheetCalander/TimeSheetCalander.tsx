import { useState } from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { Avatar, Col, Input, Row } from "antd";
import SearchIcon from "../../../assets/BookingCalander/images/search.png";
import BookingCalanderFilters from "../BookingCalanderFilters/BookingCalanderFilters";
import TimeSheetDetailsModal from "../BookingCalanderModals/TimeSheetDetailsModal/TimeSheetDetailsModal";
import UserMock from "../../../assets/BookingCalander/icons/calander-user.svg";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import ResourcePlugin from "@fullcalendar/resource";
import { timeSheetData, timeSheetCalanderEvents } from "../../../mock/BookingCalander/BookingCalanderData";
import Sun from "../../../assets/BookingCalander/images/sun.png";
import Menu from "../../../assets/BookingCalander/images/menu.png";
import "../BookingCalanderTab/BookingCalanderTab.scss";
import { useGetAllClientsListQuery, useGetAllocatedShiftsListQuery } from "../../../store/Slices/BookingCalendar/TimeSheetCalendar";
import utc from 'dayjs/plugin/utc';
import "./TimeSheetCalander.scss";

function TimeSheetCalander() {

  dayjs.extend(utc)

  const [filterValues, setFilterValues] = useState({ clientName: '', staffName: '', startDate: '', endDate: '' })
  const { data: allClientsListData } = useGetAllClientsListQuery({});
  const { data: shiftsListData } = useGetAllocatedShiftsListQuery({ careHomeId: filterValues?.clientName, staffId: filterValues?.staffName, startTime: filterValues?.startDate, endTime: filterValues?.endDate });
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState<any>({});

  const TimeSheetCalanderData = allClientsListData?.data?.map((data: any) => {
    return {
      id: data?.staffId + data?.clientId,
      clientName: data?.clientName,
      title: data?.staffName,
      staffImg: data?.staffProfile,
      clientImg: UserMock,
    };
  });

  const timeSheetCalanderEvents = shiftsListData?.data?.shifts?.map((shiftDetails: any) => {
    return {
      ...shiftDetails,
      id: shiftDetails?._id,
      // resourceId: shiftDetails?.careHome?._id,
      resourceId: shiftDetails?.staffId + shiftDetails?.careHome?._id,
      title: shiftDetails?.carer?.userType?.shortForm,
      status: shiftDetails?.shift?.shiftStatus,
      // start: shiftDetails?.shift?.startTime,
      // end: shiftDetails?.shift?.endTime,
      date:shiftDetails?.shift?.shiftDate,
      shiftStartTime: shiftDetails?.shift?.startTime,
      shiftEndTime: shiftDetails?.shift?.endTime,
    }
  })

  const calanderStatuses = [
    { title: "Signed Off", color: "#2BC155" },
    { title: "Submitted for Sign Off", color: "#FA9359" },
    { title: "Warning", color: "#FF7976" },
  ];
  const eventContentHandler = (eventInfo: any) => {

    
    const event = eventInfo.event._def;
    const { shiftStartTime, shiftStatus, shiftEndTime, staffArrival } = event?.extendedProps;
    const warning = dayjs().isAfter(dayjs(shiftEndTime)) && staffArrival === "NOT_TAKEN";
    const backgroundColor: any = {
      "SIGNEDOFF": "#2BC155",
      "ACCEPTED": "#8D6AB1",
      "PENDING": "#5A8BA8",
      "INPROCESS": "#65CDF0",
      "COMPLETED": "#FA9359",
      "NOT_TAKEN": `#FF7976`,
    };

    return (
      <>
        <div className="event-grid d-flex justify-between h-100">
          <div className="event-grid-item " style={{ backgroundColor: backgroundColor[warning ? staffArrival : shiftStatus] }}>
            <div className="event-grid-content">
              <div className="event-header">
                <img src={Sun} alt="sun" />
                <img src={Menu} alt="menu" />
              </div>
              <div className="inner-content">
                <h2 className="fs-14 fw-400 m-0">{event.title}</h2>
                <p className="fs-10 fw-600 m-0">{dayjs(shiftStartTime)?.utc().format('hh:mm a')} - {dayjs(shiftEndTime)?.utc().format('hh:mm a')}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const handleSlotContent = (slotEvent: any) => {
    return (
      <>
        <div className="slot-event-wrapper">
          <div>
            <p className="fs-14 fw-600 label-color">{dayjs(slotEvent.date).format("dddd")}</p>
            <p className="fs-14 fw-400" style={{ color: "#969BA0" }}>
              {dayjs(slotEvent.date).format("DD/MM/YYYY")}
            </p>
          </div>
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

            <label style={{ paddingLeft: "10px" }} className="grey-color fs-14 fw-400 line-height-20 cursor-pointer" htmlFor={`${resource.id}`}>
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
  const handleEventClick = (eventDetails: any) => {
    setIsDetailsModalOpen(true);
    setEventDetails(eventDetails);
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



  return (
    <div className="time-sheet-calander">
      <Row gutter={[20, 20]}>
        <Col xs={24} md={24} lg={24} xl={18}>
          <BookingCalanderFilters filterValues={filterValues} setFilterValues={setFilterValues} />
        </Col>
        <Col xs={24} md={24} lg={24} xl={6} className="search-wrapper">
          <div className="input-search-wrapper">
            <Input placeholder="search" prefix={<img src={SearchIcon} alt="search icon" className="icon" />} />
          </div>
        </Col>
        {/* Calander section starts here  */}
        <Col xs={24} md={20} className="calander-header-timesheet">
          <div className="status-wrapper d-flex ">
            {calanderStatuses.map((data) => {
              return (
                <div key={uuidv4()} className="d-flex align-items-center">
                  <div className="box-wrapper">
                    <div className="box" style={{ backgroundColor: `${data.color}` }}></div>
                  </div>
                  <div className="status-title">
                    <span className="fs-12 label-color">{data.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
        <Col xs={24} md={24} className="calander-main">
          <FullCalendar
            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
            plugins={[resourceTimelinePlugin, interactionPlugin, dayGridPlugin, ResourcePlugin]}
            headerToolbar={{ left: "", right: "", center: "" }}
            titleFormat={{ month: "short", day: "numeric", weekday: "short" }}
            initialView="resourceTimelineWeek"
            events={timeSheetCalanderEvents}
            editable={false}
            droppable={false}
            slotMinWidth={200}
            timeZone="utc"
            resourceAreaWidth={400}
            eventMinWidth={200}
            eventContent={eventContentHandler}
            resources={TimeSheetCalanderData}
            resourceAreaColumns={resourceAreaColumns}
            resourceLabelContent={handleResourceRender}
            resourceGroupLabelContent={resourceGroupLabelContent}
            slotDuration="24:00:00"
            slotLabelContent={handleSlotContent}
            slotLabelFormat={[{ day: "2-digit", month: "long", year: "numeric", weekday: "long" }]}
            eventClick={(e) => handleEventClick(e)}
          />
        </Col>
        {isDetailsModalOpen && <TimeSheetDetailsModal isDetailsModalOpen={isDetailsModalOpen} setIsDetailsModalOpen={setIsDetailsModalOpen} eventDetailsData={eventDetails} />}
      </Row>
    </div>
  );
}

export default TimeSheetCalander;
