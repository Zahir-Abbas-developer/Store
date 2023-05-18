import { Row, Col } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { shiftStatusData } from "../../../../mock/StaffManagerMock";
import "./ShiftStatus.scss";

const ShiftStatus = ({ shiftData, staffSummaryDetails }: any) => {
  const navigate = useNavigate();
  const param = useParams()

  const handleCardClick = (id: string, type: string) => {
    switch (type) {
      case "Open shifts":
        navigate(`/staff-manager/${param?.id}/staff-summary/open-shift`, { state: staffSummaryDetails });
        break;
      case "Total Hours Life Time":
        navigate(`/staff-manager/${param?.id}/staff-summary/total-hours-life-time`,{state: staffSummaryDetails});
        break;
      case "Confirmed shifts":
        navigate(`/staff-manager/${param?.id}/staff-summary/confirmed-shift`, { state: staffSummaryDetails });
        break;
      case "Total Hours This Month":
        navigate(`/staff-manager/${param?.id}/staff-summary/total-hours-month`,{ state: staffSummaryDetails });
        break;
      case "Completed shifts":
        navigate(`/staff-manager/${param?.id}/staff-summary/completed-shift`, { state: staffSummaryDetails });
        break;
      default:
        break;
    }
  };
  const shiftStatusData = [
    {
      id: "1",
      title: "Open shifts",
      amount: "0.00",
      shiftNotify: shiftData?.data?.openShift,
    },
    {
      id: "2",
      title: "Total Hours Life Time",
      amount: shiftData?.data?.total_WorkedHoursLifeTime,
    },
    {
      id: "3",
      title: "Confirmed shifts",
      amount: shiftData?.data?.total_ConfirmedEarning,
      shiftNotify: shiftData?.data?.confirmedShift,
    },
    {
      id: "4",
      title: "Total Hours This Month",
      amount: shiftData?.data?.total_HoursLast30Days,
    },
    {
      id: "5",
      title: "Completed shifts",
      amount: shiftData?.data?.total_CompletedEarnings,
      shiftNotify: shiftData?.data?.completedShift,
    },
  ];
  return (
    <>
      <div className="shift-status-card-wrapper">
        <h4 className="fs-20 fw-500 line-height-28 title-color">Shift Status</h4>
        <Row gutter={[20, 20]}>
          {shiftStatusData.map((data: any) => (
            <Col xxl={12} xl={12} lg={12} md={12} xs={24} sm={12} key={data.id}>
              <div className="shift-status-widgets" onClick={() => handleCardClick(data.id, data.title)}>
                <div className="d-flex justify-between align-center">
                  <div className="shift-data">
                    <h5 className="fs-14 fw-400 line-height-22 m-0">{data.title}</h5>
                    <h5 className="fs-14 fw-600 line-height-17 m-0">{`£ ${data.amount}`}</h5>
                  </div>
                  {data.title.includes("shift") && (
                    <h1 className="shift-notify fs-16 fw-500 m-0 d-flex align-center justify-center">{data.shiftNotify < 10 ? `0${data.shiftNotify}` : data.shiftNotify}</h1>
                  )}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
export default ShiftStatus;