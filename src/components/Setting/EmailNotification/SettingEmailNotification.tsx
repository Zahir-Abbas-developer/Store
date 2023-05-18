
import { Tabs, TabsProps } from "antd";
import EmailNotificationTab from "./EmailNotificationTab/EmailNotificationTab";
import EmailTemplates from "./EmailTemplates/EmailTemplates";
import "./SettingEmailNotification.scss";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";
import { renderDashboard } from "../../../utils/useRenderDashboard";

const SettingEmailNotification = () => {

  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");

  const items: TabsProps['items'] = [
    {
        key: '1',
        label: `Email Notification`,
        children:<EmailNotificationTab/>,
    },
    {
        key: '2',
        label: `Email Templates `,
        children: <EmailTemplates/>,
    },
];

    return (
      <>
        <BreadCrumb breadCrumbItems={[
        {
          title: "Email Settings",
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
      <div className='settings-email-notification'>

      <Tabs defaultActiveKey="1" items={items} type="card" tabPosition="left" />
  </div>
      
      </>
    )
}

export default SettingEmailNotification