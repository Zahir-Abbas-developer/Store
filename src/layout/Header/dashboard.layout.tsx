import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NavBar from "./navbar.layout";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Layout, Row } from "antd";

import { useContext, useEffect } from "react";


import "../../sass/common.scss";
import "./dashboard-layout.styles.scss";
import { FilterContext } from "../../components/date-picker";
import FooterDetails from "../../components/Footer/Footer";



const { Content } = Layout;

const DashboardLayout = ({ children }: any) => {
    const { role,permissions }: any = JSON.parse(
        localStorage.getItem("careUserData") || "{}"
      );
    

  // const { role }: any = JSON.parse(localStorage.getItem("UserData") || "{}");
  const selectUsersPaths = [
    `${role === "ADMIN" || role === "MANAGER" ? "Dashboard" : ""}`,
    `${role === "ADMIN" || role === "MANAGER" ? "Screencasts" : ""}`,
    `${role === "ADMIN" || role === "MANAGER" ? "Reports web-app-usage" : ""}`,
    `${role === "ADMIN" || role === "MANAGER" ? "Reports activity-log" : ""}`,
    `${role === "ADMIN" || role === "MANAGER" ? "Reports project-task 1" : ""}`,
    `${role === "ADMIN" || role === "MANAGER" ? "Reports timeline" : ""}`,
    `${role === "ADMIN" || role === "MANAGER" ? "Reports customized" : ""}`,
    `${role === "ADMIN" || role === "MANAGER" ? "Reports hours-tracked" : ""}`,
    // `${role === "ADMIN" || role === "MANAGER" ? "Reports attendance" : ""}`,
    `${role === "ADMIN" || role === "MANAGER" ? "Reports workload-balance" : ""
    }`,
    `${role === "ADMIN" || role === "MANAGER" ? "Reports timesheet" : ""}`,
  ];
  // const adWorkSchedulePath = ["Settings work-schedule"];
  const datePickerPaths = [
    "Screencasts",
    "Dashboard",
    "Reports web-app-usage",
    "Reports project-task 1",
    "Reports timeline",
    "Reports customized",
    "hours-tracked",
    "Reports workload-balance",
    "Reports comparison",
    "Reports timesheet",
    "Reports attendance",
    "Reports hours-tracked",
    "Settings web-apps",
    `${role === "ADMIN" || role === "MANAGER" ? "Reports activity-log" : ""}`,
    `${role === "ADMIN" || role === "MANAGER" ? "Reports top-users" : ""}`,
  ];
  const scheduleReportPaths:any = [
    "Reports web-app-usage",
    "Reports project-task 1",
    "Reports timeline",
    "hours-tracked",
    "Reports workload-balance",
    "Reports comparison",
    "Reports attendance",
    "Reports hours-tracked",
    `${role === "ADMIN" || role === "MANAGER" ? "Reports activity-log" : ""}`,
    `${role === "ADMIN" || role === "MANAGER" ? "Reports top-users" : ""}`,
  ];
  const ExportPaths = [
    "Dashboard",
    "Reports project-task 1",
    `${role === "ADMIN" || role === "EMPLOYEE" ? "Reports web-app-usage" : ""}`,
    `${role === "ADMIN" || role === "MANAGER" ? "Reports activity-log" : ""}`,
    "Reports web-app-usage",
    "Reports attendance",
    "Reports timeline",
    "Reports workload-balance",
    "Reports hours-tracked",
    "Settings web-apps",
    "Reports top-users",
    "Reports comparison",
    "Users-management",
    "Reports timesheet",
  ];
  const TimeZonePaths = [
    "Screencasts",
    "Reports timesheet",
    "Reports project-task 1",
    `Reports ${role === "ADMIN" || role === "MANAGER" ? "Reports web-app-usage" : ""
    }`,
    `Reports ${role === "ADMIN" || role === "MANAGER" ? "web-app-usage" : ""}`,
    `${role === "ADMIN" || role === "MANAGER" ? "Reports activity-log" : ""}`,
    "Reports timeline",
    "Work-schedule",
  ];
  // const [addCategory, setAddCategory] = useState<boolean>(false);
  const location = useLocation();
  const reportPath = location?.pathname?.includes("reports");
  const accountPath = location?.pathname?.includes("my-account");
  // const {token: { colorBgContainer }} = theme.useToken();
  const captilizeStrinng = (value: string) => {
    let newValue = value.replace("-", " ");
    newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
    return newValue;
  };

  let path = location?.pathname.slice(1);
  
  path = path.replaceAll("/", " ");
  path = path.charAt(0).toUpperCase() + path.slice(1);
  // path = path.charAt(0).toUpperCase() + path;
  const index = path.indexOf("/");
  console.log("index",index);
  
  // const result = path.slice(0, index);
  const result = path;
  let breadCrumbItems = path.includes("project-task")
    ? result.trim().split(" ")
    : path.trim().split(" ");


    console.log(" breadCrumbItems",breadCrumbItems);
    console.log(" result",result);
    


  breadCrumbItems = breadCrumbItems.map((item: string) =>
    captilizeStrinng(item)
  );

  breadCrumbItems = breadCrumbItems.map((item: string) => {
    if (item === "Web apps") {
      return "Website & App Classification";
    } else if (item === "Web app-usage") {
      return "Website and App Usage";
    } else if (item === "Project task" || item === "Project tasks") {
      return "Project & Tasks";
    } else if (item === "Customized") {
      return "Customized Reports";
    } else {
      return item;
    }
  });

  const { state, dispatch }: any = useContext(FilterContext);
  
  useEffect(() => {
  
  }, []);
//   const { dashboard, screenCasts, activityLog, reports, workSchedule ,dateFilter} = state;

  return (
    <>
      <Layout className="layout">
        <NavBar />
        <Content className="main-content bgLight-color">
          {path !== "Dashboard" && (
            <Breadcrumb
              separator=">"
              className="title-color capitalize"
              style={{ padding: "0.1rem 0 0" }}
            >
              <Breadcrumb.Item>
                <HomeOutlined style={{ color: "#E76F51" }} />
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/dashboard">Dashboard</Link>
              </Breadcrumb.Item>
              {breadCrumbItems.map((breadCrumb: string, index: number) =>
                breadCrumbItems.length - 1 !== index ? (
                  <Breadcrumb.Item key={uuidv4()}>
                    <Link
                      to={
                        breadCrumb === "Reports"
                          ? "/reports/activity-log"
                          : `/${breadCrumb.toLocaleLowerCase()}`
                      }
                    >
                      {breadCrumb}
                    </Link>
                  </Breadcrumb.Item>
                ) : (
                  <Breadcrumb.Item className="title-color" key={uuidv4()}>
                    {breadCrumb}
                  </Breadcrumb.Item>
                )
              )}
            </Breadcrumb>
          )}
          {/* top title and icon section */}
          <Row
            style={{
              padding: `${path === "Dashboard" ? "0.4rem 0 1.25rem" : "0rem 0 1.5rem"
                }`,
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
            className="d-flex justify-between align-items-center"
          >
            <Col>
              <h1
                style={{ display: "inline-block" }}
                className="title-color fs-24 fw-600 capitalize"
              >
                {breadCrumbItems[breadCrumbItems.length - 1] ===
                  "Website and App Usage"
                  ? "Website & App Usage"
                  : breadCrumbItems[breadCrumbItems.length - 1]}
              </h1>
            </Col>
            <Col style={{ display: "block" }}>
              <Row
                style={{
                  gap: 12,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
               
                
               
                {path === "Reports customized" && (
                  <Col>
                    <p
                      style={{
                        textAlign: "center",
                        marginRight: 6,
                        color: "var(--grey-color)",
                      }}
                      className="m-0"
                    >
                      March 16,2022
                    </p>
                  </Col>
                )}
                {selectUsersPaths?.includes(path) && (
                  <Col>
                 
                  </Col>
                )}
               
                
             
               
              </Row>
            </Col>
          </Row>
          {/* pages render */}
          {path === "Dashboard" || path === "My-account" ? (
            <>{children || <Outlet />}</>
          ) : (
            <div
              className={`${result?.includes("Reports")
                  ? "site-layout-reports"
                  : "site-layout-content card-bg-color"
                } common-layout-margin `}
              style={{
                background: reportPath || accountPath ? "transparent" : "",
                minHeight: "80vh",
                borderRadius: "8px",
              }}
            >
              {children || <Outlet />}
            </div>
          )}
        </Content>
        <FooterDetails/>
      </Layout>
    </>
  );
};
export default DashboardLayout;
