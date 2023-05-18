import { Col, Row } from "antd";
import ShiftCards from "./ClientDashBoardWidgets/ShiftCards/ShiftCards";
import "./ClientDashboard.scss";
import { ClientCardData } from "../../mock/ClientDashboardData";
import CarersGraph from "./ClientDashBoardWidgets/CarersGraph/CarersGraph";
import RecentReviews from "./ClientDashBoardWidgets/RecentReviews/RecentReviews";
import ClientCalendar from "./ClientDashBoardWidgets/ClientCalendar/ClientCalendar";
// import CarerBookingCalendar from './CarerBookingCalendar/CarerBookingCalendar';
import OverAllRating from "./ClientDashBoardWidgets/OverAllRating/OverAllRating";
import { useGetAvailableShiftsListQuery, useGetCarersPerMonthQuery, useGetLastShiftDetailsQuery, useGetOverAllRatingQuery, useGetOverAllReviewsQuery, useGetShiftsListQuery } from "../../store/Slices/ClientDashboard";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../layout/BreadCrumb/BreadCrumb";

const ClientDashboard = () => {
  const currentYear = new Date().getFullYear();

  const navigate = useNavigate();
  const { data: upcomingShiftsList, isLoading: upcomingIsLoading } = useGetShiftsListQuery("ACCEPTED");
  const { data: availableShiftsList, isLoading: availableIsLoading } = useGetAvailableShiftsListQuery({});
  const { data: cancelledShiftsList, isLoading: cancelledIsLoading } = useGetShiftsListQuery("CANCELED");
  const { data: lastShiftDetailsList, isLoading: lastShiftIsLoading } = useGetLastShiftDetailsQuery({});
  const { data: overAllRatingData, isLoading: overallRatingIsLoading } = useGetOverAllRatingQuery({});
  const { data: recentReviewsData, isLoading: recentReviewsIsLoading } = useGetOverAllReviewsQuery({});
  const { data: carersPerMonthData, isLoading: carerGraphIsLoading } = useGetCarersPerMonthQuery(currentYear);


  const upComingList = upcomingShiftsList?.data?.shifts?.slice(0, 4).map((list: any) => {
    return {
      id: list?._id,
      userName: `${list?.carer?.firstName} ${list?.carer?.lastName || ''} - ${list?.carer?.userType?.shortForm || ''}`,
      shiftDate: list?.shift?.shiftDate,
      shiftType: list?.shift?.shiftType,
      shiftRate: `£ ${Number(list?.shiftRate)?.toFixed(2)}` ?? "",
    };
  });


  const availableList = availableShiftsList?.data?.slice(0, 4).map((list: any) => {
    return {
      id: list?._id,
      userName: `${list?.careHomeName?.clientName || ''} - ${list?.careHomeName?.group || ''}`,
      shiftDate: list?.shiftDate,
      shiftType: list?.shiftType,
      shiftRate: `£ ${Number(list?.clientAmount)?.toFixed(2)}` ?? '',
    };
  });

  const lastShiftDetails = lastShiftDetailsList?.data?.slice(0, 4).map((list: any) => {
    return {
      id: list?._id,
      userName: `${list?.shiftData?.client?.clientName || ''} - ${list?.shiftData?.client?.group || ''}`,
      shiftDate: list?.shiftData?.shiftDate,
      shiftType: list?.shiftData?.shiftType,
      shiftRate: `£ ${Number(list?.shiftRate)?.toFixed(2)}` ?? "",
      timeTracked: list?.timeTrack,
    };
  });

  const cancelledList = cancelledShiftsList?.data?.shifts?.slice(0, 4).map((list: any) => {
    return {
      id: list?._id,
      userName: `${list?.carer?.firstName} ${list?.carer?.lastName || ''} - ${list?.carer?.userType?.shortForm || ''}`,
      shiftDate: list?.shift?.shiftDate,
      shiftType: list?.shift?.shiftType,
      shiftRate: `£ ${Number(list?.shiftRate)?.toFixed(2)}` ?? "",
    };
  });

  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Dashboard",
      path: "",
    }
  ]

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />

      <div className="client-dashboard-wrapper">
        <Row gutter={[20, 20]}>
          <Col xl={24} lg={24} md={24}>
            <Row gutter={[20, 20]}>
              <Col className="client-shift-cards-wrap" xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
                <ShiftCards
                  title={"Upcoming Shifts"}
                  buttonName={"More Details"}
                  btnFunc={() => {
                    navigate("/client-requested-shift");
                  }}
                  details={upComingList}
                  isLoading={upcomingIsLoading}
                />
              </Col>
              <Col className="client-shift-cards-wrap" xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
                <ShiftCards
                  title={"Available Shifts"}
                  buttonName={"More Details"}
                  btnFunc={() => {
                    navigate("/client-requested-shift");
                  }}
                  details={availableList}
                  isLoading={availableIsLoading}
                />
              </Col>
              <Col className="client-shift-cards-wrap" xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
                <ShiftCards title={"Last Shift Details"} checkStatus details={lastShiftDetails} isLoading={lastShiftIsLoading} />
              </Col>
              <Col className="client-shift-cards-wrap" xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
                <ShiftCards
                  title={"Cancelled Shifts"}
                  buttonName={"Book Again"}
                  btnFunc={() => {
                    navigate("/client-booking-calendar");
                  }}
                  details={cancelledList}
                  isLoading={cancelledIsLoading}
                />
              </Col>
            </Row>
          </Col>
          <Col xxl={12} xl={18} lg={12} md={12} sm={12} xs={24}>
            <CarersGraph carersGraphData={carersPerMonthData?.data?.carersPerMonths} isLoading={carerGraphIsLoading} />
          </Col>
          <Col xxl={6} xl={6} lg={12} md={12} sm={12} xs={24}>
            <OverAllRating data={overAllRatingData} isLoading={overallRatingIsLoading} />
          </Col>
          <Col xxl={6} xl={6} lg={24} md={24} sm={24} xs={24}>
            <RecentReviews recentReviewsData={recentReviewsData} isLoading={recentReviewsIsLoading} />
          </Col>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <ClientCalendar />
            {/* <CarerBookingCalendar /> */}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ClientDashboard;
