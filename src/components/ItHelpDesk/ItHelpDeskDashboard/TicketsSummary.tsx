import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../../constants/Roles";
import { useGetTicketSummaryRequestQuery } from "../../../store/Slices/ItHelpDesk";
import { ticketsSummaryList } from "../../../mock/ItHelpDesk/ItHelpDashboard";
import "./ItHelpDeskDasboard.scss";
import "../../../sass/common.scss";

const TicketsSummary = () => {
  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");
  const navigate = useNavigate();
  const { data, isSuccess } = useGetTicketSummaryRequestQuery({ refetchOnMountOrArgChange: true });

  let ticketsSummaryData: any;
  if (isSuccess) {
    ticketsSummaryData = data;
  }

  const ticketCount: any = ticketsSummaryData?.data;
  const ticketCountDetail: any = {
    "All Tickets": ticketCount?.totalTickets ?? "0",
    "Unassigned Tickets": ticketCount?.totalTickets ?? "0",
    "Pending Tickets": ticketCount?.pendingTickets ?? "0",
    "Onhold Tickets": ticketCount?.onholdTickets ?? "0",
    "Resolved Tickets": ticketCount?.resolvedTickets ?? "0",
    "Closed Tickets": ticketCount?.closedTickets ?? "0",
  };

  const clientTicketSummaryList = ticketsSummaryList.filter((item: any) => item.ticketStatus !== "Unassigned Tickets");
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginTop: "5rem" }}>
      {(role === ROLES.admin || role === ROLES.superAdmin ? ticketsSummaryList : clientTicketSummaryList).map((item: any) => {
        return (
          <Col key={item.id} className="gutter-row" xxl={12} xl={24} lg={12} md={12} sm={12} xs={24}>
            <div className="d-flex wrap-tickets-summary" onClick={() => navigate(`all-tickets/${item.pathQuery}`)}>
              <div className="ticket-images cursor" style={{ background: item.backgroundColor }}>
                <img src={item.images} alt="" />
              </div>
              <div>
                <p className="fs-16 fw-400 line-height-24 m-0 cursor" style={{ color: "#6F767E" }}>
                  {item.ticketStatus}
                </p>
                <p className="fs-24 fw-500 line-height-32 title-color m-0 cursor">{ticketCountDetail[item.ticketStatus]}</p>
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default TicketsSummary;
