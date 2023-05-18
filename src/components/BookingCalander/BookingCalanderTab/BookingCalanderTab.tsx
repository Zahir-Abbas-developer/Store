import { useState } from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { Row, Col, Input, Button } from "antd";
import SearchIcon from "../../../assets/BookingCalander/images/search.png";
import AddModal from "../BookingCalanderModals/AddModal/AddModal";
import BookingCalanderFilters from "../BookingCalanderFilters/BookingCalanderFilters";
import { PlusOutlined } from "@ant-design/icons";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import ResourcePlugin from "@fullcalendar/resource";
import ShiftInfo from "../BookingCalanderModals/ShiftInfoModal/ShiftInfo";
import Sun from "../../../assets/BookingCalander/images/sun.png";
import Menu from "../../../assets/BookingCalander/images/menu.png";
import FirstUser from "../../../assets/BookingCalander/images/first-user.png";
import { useGetClientsListQuery, useGetShiftListsQuery } from "../../../store/Slices/BookingCalendar";
import utc from 'dayjs/plugin/utc';
import "./BookingCalanderTab.scss";

function BookingCalanderTab() {

  dayjs.extend(utc)

  const [filterValues, setFilterValues] = useState({ clientName: "", startDate: "", endDate: "" });
  const { data: shiftsList } = useGetShiftListsQuery({ careHomeId: filterValues?.clientName, startTime: filterValues?.startDate, endTime: filterValues?.endDate });
  const { data: clientsList } = useGetClientsListQuery({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState({
    isToggle: false,
    data: {},
  });


  const clientData = clientsList?.data?.result?.map((clientDetails: any) => {
    return {
      id: clientDetails?._id,
      title: clientDetails?.clientName,
      userImg: FirstUser,
    };
  });

  const shiftsData = shiftsList?.data?.shifts?.map((shiftDetails: any) => {
    return {
      ...shiftDetails,
      id: shiftDetails?._id,
      resourceId: shiftDetails?.careHomeId,
      title: shiftDetails?.carerType?.shortForm,
      status: shiftDetails?.shiftStatus,
      // start: shiftDetails?.startTime.split('.')[0],
      // end: shiftDetails?.endTime.split('.')[0],
      // start: shiftDetails?.startTime,
      // end: shiftDetails?.endTime,
      date: shiftDetails?.shiftDate,
      shiftStartTime: shiftDetails?.startTime,
      shiftEndTime: shiftDetails?.endTime,
    };
  });
  const calanderStatuses = [
    { title: "Unpublished Shifts", color: "#FA9359" },
    { title: "Confirmed by Staff", color: "#2BC155" },
    { title: "Completed by Staff", color: "#969BA0" },
    { title: "Directly Booked and Confirmed", color: "#65CDF0" },
    { title: "Directly Booked and Awaiting", color: "#8D6AB1" },
    { title: "Open and Unconfirmed", color: "#5A8BA8" },
  ];
  const eventContentHandler = (eventInfo: any) => {
    const { shiftStatus, shiftStartTime, shiftEndTime, directBooked } = eventInfo?.event?._def?.extendedProps;
    const backgroundColor: any = {
      ...(!directBooked && { PUBLISHED: "#5A8BA8", UNPUBLISHED: "#FA9359", ACCEPTED: "#2BC155" }),
      BOOKED: "#2BC155",
      COMPLETED: "#969BA0",
      PARTIALLY: "#5A8BA8",
      ...(directBooked && {
        PUBLISHED: "#8D6AB1",
        BOOKED: "#65CDF0",
      }),
    
    };
    return (
      <div className="event-grid">
        <div className="event-grid-item " style={{ backgroundColor: backgroundColor[shiftStatus] }}>
          <div className="event-grid-content">
            <div className="event-header">
              <img src={Sun} alt="sun" />
              <img src={Menu} alt="menu" />
            </div>
            <div className="inner-content">
              <h2 className="fs-14 fw-400 m-0">{eventInfo?.event?._def?.title}</h2>
              <p className="fs-10 fw-600 m-0">
                {dayjs(shiftStartTime)?.utc().format("hh:mm a")} - {dayjs(shiftEndTime)?.utc().format("hh:mm a")}
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
          <div className="resource-render-content d-flex align-center cursor-pointer" style={{ marginLeft: "25px" }}>
            <img src={resource.extendedProps.userImg} alt="user_mock" />
            <label className="grey-color fs-14 fw-400 line-height-20 cursor-pointer" htmlFor={`${resource.id}`}>
              {resource.title}
            </label>
          </div>
        </div>
      </>
    );
  };
  const handleResourceHeaderContent = (info: any) => {
    return (
      <>
        <div className="resource-user">
          <div>
            <p className="fs-14 fw-600">Client Name</p>
          </div>
        </div>
      </>
    );
  };
  const handleEventClick = (e: any) => {
    setIsInfoModalOpen({ isToggle: true, data: e });
    console.log(e?.event?._def?.extendedProps?.shiftStatus, 'e')
  };

  return (
    <div className="booking-calander-main">
      <Row gutter={[20, 20]}>
        {/* Calander Filters section starts here  */}
        <Col xs={24} lg={24} xl={14}>
          <BookingCalanderFilters bookingCalendar setFilterValues={setFilterValues} filterValues={filterValues} />
        </Col>
        <Col xs={24} lg={10} xl={10} className="search-wrapper">
          <div className="input-search-wrapper">
            <Input placeholder="search" prefix={<img src={SearchIcon} alt="search icon" className="icon" />} />
          </div>
        </Col>
        {/* Calander Header starts here  */}
        <Col md={24}>
          <Row className="header-main-row">
            <Col xs={24} lg={3}>
              <div className="btn-wrapper">
                <Button
                  style={{ paddingInline: "15px" }}
                  type="primary"
                  onClick={() => {
                    setIsAddModalOpen(true);
                  }}
                  icon={<PlusOutlined />}
                >
                  Post New Shift
                </Button>
              </div>
            </Col>
            <Col xs={24} lg={20} className="calander-header">
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
          </Row>
        </Col>
        {/* Calander section starts here  */}
        <Col xs={24} md={24} className="calander-main">
          <FullCalendar
            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
            plugins={[resourceTimelinePlugin, interactionPlugin, dayGridPlugin, ResourcePlugin]}
            headerToolbar={{ left: "", right: "", center: "" }}
            initialView="resourceTimelineWeek"
            resources={clientData}
            events={shiftsData}
            editable={false}
            droppable={false}
            timeZone="utc"
            slotMinWidth={200}
            resourceAreaWidth={200}
            eventMinWidth={200}
            eventContent={eventContentHandler}
            resourceAreaHeaderContent={handleResourceHeaderContent}
            resourceLabelContent={handleResourceRender}
            slotDuration="24:00:00"
            slotLabelContent={handleSlotContent}
            slotLabelFormat={[{ day: "2-digit", month: "long", year: "numeric", weekday: "long" }]}
            eventClick={(e) => handleEventClick(e)}
            dateClick={(e: any) => setIsAddModalOpen(true)}
          />
        </Col>
      </Row>
      {/* OnClick Modals starts here  */}
      {isInfoModalOpen.isToggle && <ShiftInfo isInfoModalOpen={isInfoModalOpen} setIsInfoModalOpen={setIsInfoModalOpen} />}
      {isAddModalOpen && <AddModal isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} />}
    </div>
  );
}

export default BookingCalanderTab;
