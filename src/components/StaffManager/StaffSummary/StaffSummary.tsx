import { Row, Col } from "antd";
import BackGroundChecks from "./BackGroundChecks/BackGroundChecks";
import EmploymentStatus from "./EmploymentStatus/EmploymentStatus";
import MetricsInfo from "./MetricsInfo/MetricsInfo";
import ShiftStatus from "./ShiftStatus/ShiftStatus";
import StaffContactCard from "./StaffContactCard/StaffContactCard";
import StaffSummaryCard from "./StaffSummaryCard/StaffSummaryCard";
import TraningsCard from "./TraningsCard/TraningsCard";
import Engagements from "./Engagements/Engagements";
import MonthlyJobBooking from "./MonthlyJobBooking/MonthlyJobBooking";
import { useGetStaffSummaryDataQuery, useGetStaffSummaryMetricsInfoQuery, useGetStaffWidgetShiftStatusQuery } from "../../../store/Slices/StaffManager";
import { useLocation, useParams } from "react-router-dom";
import "./StaffSummary.scss";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";

const StaffSummary = () => {
  const { id } = useParams();
  const { state: staffSummaryDetails } = useLocation();
  const { data: staffData } = useGetStaffSummaryDataQuery(id);
  const { data: metricsInfoData } = useGetStaffSummaryMetricsInfoQuery(id);
  const { data: ShiftStatusData } = useGetStaffWidgetShiftStatusQuery(id);
  
  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Staff Summary",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Staff Manager",
      path: "/staff-manager",
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <Row gutter={[30, 30]}>
        <Col xxl={6} xl={8} lg={24} md={12} xs={24} sm={24}>
          <StaffSummaryCard staffData={staffData} staffSummaryDetails={staffSummaryDetails} />
          <StaffContactCard staffData={staffData} />
        </Col>
        <Col xxl={9} xl={16} lg={24} md={12} xs={24} sm={24}>
          <MonthlyJobBooking shiftData={ShiftStatusData} />
          <div>
            <ShiftStatus staffSummaryDetails={staffSummaryDetails} shiftData={ShiftStatusData} shiftId={id} />
          </div>
        </Col>
        <Col xxl={9} xl={24} lg={24} md={24} xs={24} sm={24}>
          <Engagements shiftData={ShiftStatusData} />
          <div>
            <MetricsInfo metricsInfo={metricsInfoData} shiftData={ShiftStatusData} />
          </div>
        </Col>
      </Row>

      <Row gutter={[30, 30]} style={{ marginTop: "25px", marginBottom: "40px" }}>
        <Col xxl={8} xl={12} lg={12} md={12} sm={24} xs={24}>
          <EmploymentStatus staffData={staffData} />
        </Col>
        <Col xxl={8} xl={12} lg={12} md={12} sm={24} xs={24}>
          <BackGroundChecks staffData={staffData} />
        </Col>
        <Col xxl={8} xl={24} lg={24} md={24} sm={24} xs={24}>
          <TraningsCard staffData={staffData} />
        </Col>
      </Row>
    </>
  );
};

export default StaffSummary;