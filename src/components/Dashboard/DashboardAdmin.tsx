import { Col, Layout, Row } from "antd";
import { ClientCard } from "./RecruitmentDetails/ClientCard/ClientCard";
import { StaffCard } from "./RecruitmentDetails/StaffCard/StaffCard";
import { RecruitmentCard } from "./RecruitmentDetails/RecruitmentCard/RecruitmentCard";
import { TopCandidates } from "./ComprehensionCandidates/TopCandidates/TopCandidates";
import { StaffBirthDay } from "./StaffBirthDay/BirthDay/BirthDay";
import { ShiftComprehension } from "./ComprehensionCandidates/ShiftComprehension/ShiftComprehension";
import { ShiftsCard } from "./ShiftsInvoiceSheet/ShiftsCard/ShiftsCard";
import { InvoiceCard } from "./ShiftsInvoiceSheet/InvoiceCard/InvoiceCard";
import { TimeSheetCard } from "./ShiftsInvoiceSheet/TimeSheetCard/TimeSheetCard";
import { StaffStatusCard } from "./StaffBirthDay/StaffStatusCard/StaffCard";
import { v4 as uuidv4 } from "uuid";
import { useGetAllCardsDataQuery } from "../../store/Slices/AdminDashboard";
import "../../sass/common.scss";
import BreadCrumb from "../../layout/BreadCrumb/BreadCrumb";
import OurCollectionTab from "../ClientTabs/OurCollectionTab/OurCollection";


const DashboardAdmin = () => {
  const { data, isLoading } = useGetAllCardsDataQuery({})
  const shiftInvoiceTimeSheet = ["Shifts", "Invoice", "TimeSheet"];
  const recruitmentStaffClientCard = ["Recruitment", "Staff", "Client"];
  const comprehensionCandidates = ["shiftComprehension", "topCandidates"];
  const birthDayStaffStatus = ["BirthDay", "staffStatus"];

  const renderSelectedShiftInvoiceTimeSheetCard = (item: string) => {
    if (item === "Shifts") {
      return <ShiftsCard shiftsGraphStats={data?.data?.shiftChart} />;
    } else if (item === "Invoice") {
      return <InvoiceCard isLoading={isLoading} />;
    } else if (item === "TimeSheet") {
      return <TimeSheetCard timesheetGraphStats={data?.data?.timesheetChart} />;
    }
  };

  const renderRecruitmentStaffClientCard = (item: string) => {
    if (item === "Recruitment") {
      return <ClientCard recruitmentStats={data?.data?.recruitment} />;
    } else if (item === "Staff") {
      return <StaffCard staffStats={data?.data?.staff} />;
    } else if (item === "Client") {
      return <RecruitmentCard clientsStats={data?.data?.client} />;
    }
  };

  const renderSelectedComprehensionCandidates = (item: string) => {
    if (item === "shiftComprehension") {
      return <ShiftComprehension />;
    } else if (item === "topCandidates") {
      return <TopCandidates topCandidatesData={data?.data?.topCandidate} />;
    }
  };

  const renderBirthDayStaffStatus = (item: string) => {
    if (item === "BirthDay") {
      return <StaffBirthDay isLoading={isLoading} birthDaysData={data?.data?.birthdayUsers} />;
    } else if (item === "staffStatus") {
      return <StaffStatusCard isLoading={isLoading} staffStatusStats={data?.data?.staffStatus} />;
    }
  };


  return (
    <>

      <Layout className=" dashboard" style={{ backgroundColor: "transparent" }}>
        <Row gutter={[29, 29]} style={{ paddingBottom: "30px" }}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <OurCollectionTab />
          </Col>
        </Row>

        <Row>
         
        </Row>
      </Layout>
    </>
  );
};

export default DashboardAdmin;
