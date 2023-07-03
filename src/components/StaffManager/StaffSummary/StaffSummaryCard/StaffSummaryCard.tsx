import { Avatar } from "antd";
import { staffSummaryBtn } from "../../../../mock/StaffManagerMock";
import { useNavigate, useParams } from "react-router-dom";
import "./StaffSummaryCard.scss";
import BreadCrumb from "../../../../layout/BreadCrumb/BreadCrumb";

const StaffSummaryCard = ({ staffData, staffSummaryDetails }: any) => {
  const param = useParams()
  const navigate = useNavigate();
  const handleStaffWidgits = (id: string, type: string) => {
    switch (type) {
      case "Availability Calendar":
        navigate(`/staff-manager/${param?.id}/staff-summary/availability-calendar`, { state: staffSummaryDetails });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="staff-summary-card-wrapper">
        <div className="d-flex align-center justify-center staff-avatar">
          <Avatar
            src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${staffData?.data?.result[0].profilePhoto?.mediaId}.${staffData?.data?.result[0].profilePhoto?.mediaMeta?.extension}`}
            // icon={<p className="m-0 fs-20 fw-600" style={{textTransform:'capitalize'}}>{item?.fullName.slice(0, 2)}</p>}
            className="user-img"
            style={{
              height: 100,
              width: 100,
            }}
          />
        </div>
        <div
          className="d-flex"
          style={{
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <span className="fs-20 fw-600 line-height-28">
            {`${staffData?.data?.result[0].fullName.split(" ")[0]?.charAt(0).toUpperCase()}${staffData?.data?.result[0].fullName
              .split(" ")[0]
              ?.slice(1)
              .toLowerCase()} ${staffData?.data?.result[0].fullName.split(" ")[1]?.charAt(0).toUpperCase()}${staffData?.data?.result[0].fullName.split(" ")[1]?.slice(1).toLowerCase()}`}
          </span>
          <span className="fs-14 fw-400 line-height-22">{staffData?.data?.result[0].userType}</span>
        </div>
        <div className="staff-summary-btn d-flex flex-column align-items-center">
          {staffSummaryBtn.map((item: any) => (
            <div className="booking-btn-content" key={item.id}>
              <button
                onClick={() => handleStaffWidgits(item.id, item.btnText)}
                type="button"
                className="white-color fs-14 fw-600 line-height-22"
                style={{
                  backgroundColor: item.id === "1" ? "#65CDF0" : item.id === "2" ? "#F7B923" : item.id === "3" || item.id === "4" ? "#fff" : "",
                  border: item.id === "3" || item.id === "4" ? "1px solid #6E7191" : "none",
                  color: item.id === "3" || item.id === "4" ? "#6E7191" : "#fff",
                }}
              >
                {item.btnText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default StaffSummaryCard;