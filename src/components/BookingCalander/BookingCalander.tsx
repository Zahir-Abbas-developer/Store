import { TabsProps, Tabs } from "antd";
import TimeAndAttendance from "./TimeAndAttendance/TimeAndAttendance";
import BookingCalanderTab from "./BookingCalanderTab/BookingCalanderTab";
import TimeSheetCalander from "./TimeSheetCalander/TimeSheetCalander";
import "./BookingCalander.scss";
import BreadCrumb from "../../layout/BreadCrumb/BreadCrumb";

function BookingCalander() {
  const MainTabItems: TabsProps["items"] = [
    {
      key: "1",
      label: `Booking Calendar`,
      children: <BookingCalanderTab />,
    },
    {
      key: "2",
      label: `Time Sheet Calendar`,
      children: <TimeSheetCalander />,
    },
    {
      key: "3",
      label: `Time and Attendance`,
      children: <TimeAndAttendance />,
    },
  ];
  const onTabChange = (key: string) => {
    console.log(key);
  };
  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Booking Calendar",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
  ];
  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className="main-body">
        <Tabs defaultActiveKey="1" items={MainTabItems} onChange={onTabChange} />
      </div>
    </>
  );
}

export default BookingCalander;
