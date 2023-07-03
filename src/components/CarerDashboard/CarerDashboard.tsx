import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Dropdown, MenuProps, Row } from "antd";
import { useGetRequestLastShiftQuery, useGetRequestQuery, useGetRequestUpComingShiftQuery } from "../../store/Slices/ShiftDetails";
import ShiftCards from "./DashBoardWidgets/ShiftsCards/ShiftCards";
import Experience from "./DashBoardWidgets/Experience/Experience";
import Accomplishment from "./DashBoardWidgets/Accomplishment/Accomplishment";
import Skills from "./DashBoardWidgets/Skills/Skills";
import checkInIcon from "../../assets/icons/carerDashboard/check-in.png";
import Requests from "./DashBoardWidgets/Requests/Requests";
import DocumentExpiry from "./DashBoardWidgets/ExpiryDates/DocumentExpiry";
import Rating from "./DashBoardWidgets/Ratings/Rating";
import CheckInDropdown from "./DashBoardWidgets/CheckInDropdown/CheckInDropdown";
import LocationModal from "./DashBoardWidgets/LocationModal/LocationModal";
import CarerCalendar from "./DashBoardWidgets/Calendar/Calendar";
import "./CarerDashboard.scss";
import ViewEventDetailsModal from "../CarerMyCalendar/ViewEventDetailsModal/ViewEventDetailsModal";
import BreadCrumb from "../../layout/BreadCrumb/BreadCrumb";

const items: MenuProps["items"] = [
  {
    label: <CheckInDropdown />,
    key: "0",
  },
];

const CarerDashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [eventClicked, setEventClicked] = useState({});

  const {
    data: availableShiftData,
    isLoading: availableIsLoading,
    isSuccess: availableIsSuccess,
  } = useGetRequestQuery({ refetchOnMountOrArgChange: true });

  const {
    data: upcommingShiftData,
    isSuccess: upCommingIsSuccess,
    isLoading: upCommingIsLoading,
  } = useGetRequestUpComingShiftQuery({ refetchOnMountOrArgChange: true });

  const {
    data: lastShiftData,
    isSuccess: lastShiftIsSuccess,
    isLoading: lastShiftIsLoading,
  } = useGetRequestLastShiftQuery({ refetchOnMountOrArgChange: true });

  let upCommingShifts: any;
  if (upCommingIsSuccess) {
    upCommingShifts = upcommingShiftData;
  }
  let availableShifts: any;
  if (availableIsSuccess) {
    availableShifts = availableShiftData;
  }
  let lastShifts: any;
  if (lastShiftIsSuccess) {
    lastShifts = lastShiftData;
  }

  const upCommingShiftList: any = upCommingShifts?.data?.shifts?.slice(0, 4).map((list: any) => {
    return {
      id: list?._id,
      userName: `${list?.carer?.userType?.name} - ${list?.carer?.userType?.shortForm}`,
      shiftDate: list?.shift?.shiftDate,
      shiftType: list?.shift?.shiftType,
      shiftRate: list?.shiftRate ?? "0",
      location: `${list?.carer?.address?.county} ${list?.carer?.address?.city} ${list?.carer?.address?.country}`,
    };
  });

  const availableShiftList = availableShifts?.data?.shifts?.slice(0, 4).map((list: any) => {
    return {
      id: list?._id,
      userName: `${list?.carerType?.name} - ${list?.carerType?.shortForm}`,
      shiftDate: list?.shiftDate,
      shiftType: list?.shiftType,
      shiftRate: list?.shiftRate ? list?.shiftRate : "",
      location: `${list?.carer?.address?.county} ${list?.carer?.address?.city} ${list?.carer?.address?.country}`,
    };
  });

  const lastShiftDetails = lastShifts?.data?.slice(0, 4).map((list: any) => {
    return {
      id: list?._id,
      userName: `${list?.shiftData?.client?.clientName} - ${list?.shiftData?.client?.group}`,
      shiftDate: list?.shiftData?.shiftDate,
      shiftType: list?.shiftData?.shiftType,
      shiftRate: list?.shiftRate ? `£ ${list?.shiftRate}` : "",
      timeTracked: list?.timeTrack,
    };
  });

  return (
    <>
      <div className="d-flex justify-between align-center">
        <BreadCrumb breadCrumbItems={[{
          title: "Dashboard",
          path: "/dashboard",
        }]} />
        <div className="dropdown">
          <Dropdown menu={{ items }} overlayClassName="carer-dashboard-dropdown" trigger={["click"]}>
            <a href="_" onClick={(e) => e.preventDefault()}>
              <img src={checkInIcon} alt="check-in" />
            </a>
          </Dropdown>
        </div>
      </div>
      <div className="carer-dashboard-wrapper">
        <Row gutter={[20, 20]}>
          <Col xxl={18} lg={24}>
            <Row gutter={[20, 20]}>
              <Col className="shift-cards" md={12} xl={8} xs={24}>
                <ShiftCards
                  title={"Upcoming Shifts"}
                  buttonName={"More Details"}
                  setIsModalOpen={setIsModalOpen}
                  btnFunc={() => {
                    navigate("/shift-details/upcoming-shifts");
                  }}
                  details={upCommingShiftList}
                  loading={upCommingIsLoading}
                />
              </Col>
              <Col className="shift-cards" md={12} xl={8} xs={24}>
                <ShiftCards
                  title={"Available Shifts"}
                  buttonName={"More Details"}
                  setIsModalOpen={setIsModalOpen}
                  btnFunc={() => {
                    navigate("/shift-details/available-shifts");
                  }}
                  details={availableShiftList}
                  loading={availableIsLoading}
                />
              </Col>
              <Col className="shift-cards" md={24} xl={8} xs={24}>
                <ShiftCards title={"Last Shift Details"} loading={lastShiftIsLoading} checkStatus details={lastShiftDetails} />
              </Col>
              <Col xxl={8} lg={12} xs={24}>
                <Rating />
              </Col>
              <Col xxl={8} lg={12} xs={24}>
                <DocumentExpiry />
              </Col>
              <Col xxl={8} lg={24} xs={24}>
                <Requests />
              </Col>
            </Row>
          </Col>
          <Col xxl={6} md={24} lg={24}>
            <Row gutter={[20, 20]}>
              <Col xxl={24} md={12} xs={24}>
                <Experience />
              </Col>
              <Col xxl={24} md={12} xs={24}>
                <Accomplishment />
              </Col>
              <Col xxl={24} md={24} xs={24}>
                <Skills />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <CarerCalendar setEventClicked={setEventClicked} setIsViewModalOpen={setIsViewModalOpen} />
          </Col>
        </Row>
      </div>
      {isModalOpen && <LocationModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
      {isViewModalOpen && <ViewEventDetailsModal isViewModalOpen={isViewModalOpen} setIsViewModalOpen={setIsViewModalOpen} eventClicked={eventClicked} />}
    </>
  );
};

export default CarerDashboard;
