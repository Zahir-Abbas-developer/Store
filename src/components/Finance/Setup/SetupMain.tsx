import { useState } from "react";
import SetupCards from "./SetupCards";
import ClientRateSetup from "./ClientRateSetup/ClientRateSetup";
import StaffCodeSetup from "./StaffCodeSetup/StaffCodeSetup";
import StaffRateSetup from "./StaffRateSetup/StaffRateSetup";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";

const FinanceSetupMain = () => {
  const [setupContent, setSetupContent] = useState("");

  //BreadCrumb Items
  let breadCrumbItems;

  if (setupContent === "") {
    breadCrumbItems = [
      {
        title: "Setup",
        path: "",
      },
      {
        title: "Dashboard",
        path: "/dashboard",
      },
      {
        title: "Finance",
        path: "/finance",
      },
    ];
  } else {
    breadCrumbItems = [
      {
        title: setupContent === "Client Rate Setup" ? "Client Rate Setup" : setupContent === "Staff Rate Setup" ? "Staff Rate Setup" : setupContent === "Staff Code Setup" ? "Staff Code Setup" : "",
        path: "",
      },
      {
        title: "Dashboard",
        path: "/dashboard",
      },
      {
        title: "Finance",
        path: "/finance",
      },
      {
        title: "Setup",
        path: "/finance/setup",
      },
    ];
  }

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />

      <div
        className="finance-setup-main"
        style={{ background: setupContent === "Staff Code Setup" ? "" : "white", padding: !setupContent ? "6rem 5px 2rem 5px" : "2rem 5px" }}
      >
        {!setupContent && <SetupCards setSetupContent={setSetupContent} />}
        {setupContent === "Client Rate Setup" && <ClientRateSetup />}
        {setupContent === "Staff Rate Setup" && <StaffRateSetup />}
        {setupContent === "Staff Code Setup" && <StaffCodeSetup />}
      </div>
    </>
  );
};

export default FinanceSetupMain;
