import { useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

import CoursesList from "./CoursesCards/CardsList";
import "./MyCourses.scss";

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState("INPROGRESS");
  const items: TabsProps["items"] = [
    {
      key: "INPROGRESS",
      label: `INPROGRESS`,
      children: <CoursesList activeTab={activeTab} />,
    },
    {
      key: "ENROLLED",
      label: `ENROLLED`,
      children: <CoursesList activeTab={activeTab} />,
    },
  ];
  const onChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="my-courses-wrapper">
      <Tabs defaultActiveKey="INPROGRESS" items={items} onChange={onChange} />
    </div>
  );
};

export default MyCourses;
