import { Card, Col, Input, Row } from "antd";
import Search from "../../assets/images/OnBoarding/Search.svg";
import AddNotifications from "./AddNotifications";
import "./ManageNotification.scss";
import ManageNotificationTable from "./ManageNotificationTable";
import { useState } from "react";
import { debouncedSearch } from "../../utils/utils";
import BreadCrumb from "../../layout/BreadCrumb/BreadCrumb";

const ManageNotification = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };

  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Manage Notification",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/super-admin-dashboard",
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />

      <Card className="main-notifications-wrapper">
        <Row className="carer-main carer-style" style={{ justifyContent: "space-between" }}>
          <Col xs={24} md={16} style={{ marginBottom: "20px" }}>
            <AddNotifications />
          </Col>
          <Col xs={24} md={8} lg={6}>
            <div className="input-search-wrapper" style={{ marginTop: "10px" }}>
              <Input placeholder="search" prefix={<img src={Search} alt="search icon" className="icon" />} onChange={debouncedResults} />
            </div>
          </Col>
          <Col xs={24} style={{ marginTop: "20px" }}>
            <ManageNotificationTable searchValue={searchValue} />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ManageNotification;
