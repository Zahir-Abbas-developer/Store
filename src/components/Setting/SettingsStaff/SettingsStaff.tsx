import { Tabs, TabsProps } from "antd";
import RegistrationConfiguration from "./RegistrationConfiguration/RegistrationConfiguration";
import "./SettingsStaff.scss";
import ProfileMetrics from "./ProfileMetrics/ProfileMetrics";
import VisaManagement from "./VisaManagement/VisaManagement";
import StaffStatus from "./StaffStatus/StaffStatus";
import { useState } from "react";
import { renderDashboard } from "../../../utils/useRenderDashboard";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";

function SettingsStaff() {

  const [rowData, setRowData] = useState<any>(Array().fill("")); // state to track row values
  const [switchState, setSwitchState] = useState<any>(Array().fill(false)); // state to track switch values

  const handleSwitchToggle = (index: any, value: any) => {

    const newSwitchState = [...switchState];
    newSwitchState[index] = !newSwitchState[index];
    setSwitchState(newSwitchState);

    const newRowData = [...rowData];
    if (newSwitchState[index]) {
      newRowData[index] = `${value}`;
    } else {
      newRowData[index] = ''; // remove row value from array
    }

    const filteredRowData = newRowData.filter(val => val !== ''); // remove empty strings
    setRowData(filteredRowData);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Registration Configuration`,
      children: <RegistrationConfiguration switchState={switchState} onSwitchToggle={handleSwitchToggle} />,
    },
    {
      key: '2',
      label: `Profile Metrics`,
      children: <ProfileMetrics rowData={rowData} />,
    },
    {
      key: '3',
      label: `Visa Management`,
      children: <VisaManagement />,
    },
    {
      key: '4',
      label: `Staff Status`,
      children: <StaffStatus />,
    },
  ];

  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");

  return (
    <>
    <BreadCrumb breadCrumbItems={[
          {
          title: "Staff Settings",
          path: "",
          },
          {
            title: "Dashboard",
            path: renderDashboard(role),
        },
        {
          title: "Settings",
          path: "/settings",
        }
        ]} />
    <div className='settings-staff'>

      <Tabs defaultActiveKey="1" items={items} type="card" tabPosition="left" />
    </div>
    
    </>

  );
}

export default SettingsStaff;
