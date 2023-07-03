import { Button, Card, Col, Divider, Row } from "antd";
import ShiftRequestedGraph from "./ShiftRequestedGraph";
import CarerStatusGraph from "./CarerStatusGraph";
import ShiftInsightTabs from "./ShiftInsightTabs";
import TopRatedCarers from "./TopRatedCarers";
import { useNavigate } from "react-router-dom";
import CarerBookingCalendar from "./CarerBookingCalendar/CarerBookingCalendar";
import { useGetCoordinatorShiftBookingQuery, useGetCoordinatorShiftQuery, useGetCoordinatorWhistleBlowsingQuery } from "../../store/Slices/CoordinatorDashboard";
import CustomCarousel from "./CustomCarousel/CustomCarousel";
import "./CordinatorDashboard.scss";

const CordinatorDashboardPage = () => {
  const navigate = useNavigate();


  const { data, isSuccess } = useGetCoordinatorShiftBookingQuery({ refetchOnMountOrArgChange: true });
  const { data: shiftsData, isLoading: isShiftsDataLoading, isSuccess: isShiftsDataSuccess } = useGetCoordinatorShiftQuery({ refetchOnMountOrArgChange: true });
  const { data: whistleBlowingData, isLoading: isWhistleBlowingDataLoading, isSuccess: isWhistleBlowingDataSuccess } = useGetCoordinatorWhistleBlowsingQuery({ refetchOnMountOrArgChange: true });


  let coordinatorShiftBookingData: any;
  let coordinatorShiftData: any;
  let coordinatorWhistleBlowingData: any;

  if (isSuccess) {
    coordinatorShiftBookingData = data;
  }

  if (isShiftsDataSuccess) {
    coordinatorShiftData = shiftsData;
  }

  if (isWhistleBlowingDataSuccess) {
    coordinatorWhistleBlowingData = whistleBlowingData;
  }


  return (
    <div className="cordinator-dashboard">
      <Row gutter={[25, 25]}>
        <Col xs={24} xl={18}>
          <Row gutter={[25, 25]}>

            <Col xs={24} md={12} xl={8} style={{ height: "100%" }}>
              <Card className="detailed-card">
                <Button
                  className="btn fs-20 fw-500 line-height-28 cursor-pointer d-flex align-center"
                  style={{ backgroundColor: "#65CDF0" }}
                  onClick={() => navigate("/shift-manager")}
                  type="primary"
                >
                  <span style={{ marginTop: '2px' }}>Shift Requests</span>
                </Button>
                {/* {!isShiftsDataLoading && ( */}
                <CustomCarousel isShiftsDataLoading={isShiftsDataLoading} items={coordinatorShiftData?.data?.shifts?.map((item: any) => item)} type="shift_request" />
                {/* )} */}
              </Card>
            </Col>

            <Col xs={24} md={12} xl={8}>
              <Card className="detailed-card">
                <Button
                  className="btn fs-20 fw-500 line-height-28 cursor-pointer d-flex align-center"
                  style={{ backgroundColor: "#EE2E7E" }}
                  onClick={() => navigate("/shift-manager")}
                  type="primary"
                >
                  <span style={{ marginTop: '2px' }}>Shift Bookings</span>
                </Button>
                {/* {!isLoading && ( */}
                <CustomCarousel isShiftsDataLoading={isShiftsDataLoading} items={coordinatorShiftBookingData?.data?.map((item: any) => item)} type="shift_booking" />
                {/* )} */}
              </Card>
            </Col>

            <Col xs={24} md={12} xl={8}>
              <Card className="detailed-card">
                <Button
                  className="btn fs-20 fw-500 line-height-28 cursor-pointer d-flex align-center"
                  style={{ backgroundColor: "#4E132C" }}
                  onClick={() => navigate("/shift-manager")}
                  type="primary"
                >
                  <span style={{ marginTop: '2px' }}>Whistle Blowing</span>
                </Button>
                {/* {!isLoading && ( */}
                <CustomCarousel isShiftsDataLoading={isWhistleBlowingDataLoading} items={!!coordinatorWhistleBlowingData?.data?.length && coordinatorWhistleBlowingData?.data?.map((item: any) => item)} type="whistle_blowing" />
                {/* )} */}
              </Card>
            </Col>

            <Col xs={24} md={12} xl={16}>
              <ShiftRequestedGraph />
            </Col>
            <Col xs={24} md={12} xl={8}>
              <CarerStatusGraph />
            </Col>
          </Row>
        </Col>
        <Col xs={24} xl={6}>
          <Card className="insight">
            <div className="shiftInsights d-flex">
              <ShiftInsightTabs />
              <Divider />
              <TopRatedCarers />
            </div>
          </Card>
        </Col>
        <Col xs={24}>
          <CarerBookingCalendar />
        </Col>
      </Row>
    </div>
  );
};

export default CordinatorDashboardPage;
