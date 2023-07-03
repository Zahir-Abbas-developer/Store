import { useState } from "react";
import { Drawer, Layout, theme } from "antd";
import SideIcon from "../../assets/images/sidebar/collaps-icon.png";
import LogoImg from "../../assets/icons/logo.jpg";
import TopHeader from "../Header/Header";
import Sider from "./Sider";
import "./Sidebar.scss";

import { v4 as uuidv4 } from "uuid";
import { Timeline } from "antd";

import LogoIcon from "../../assets/images/sidebar/logoIcon.png";
import SearchImg from "../../assets/images/sidebar/Search.png";
import { getSidebarMenues } from "./SidebarData";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import TimelineIcon from "../../assets/icons/timeline.png";
import "./Sidebar.scss";

interface OutletProps {
  outlet: any;
}

const Sidebar = ({ outlet }: OutletProps) => {
  const [iscollapsed, setIsCollapsed] = useState(false);
  const [isopen, setIsOpen] = useState(false);
  const [location, setLocation] = useState(window.location.pathname);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { Header, Content } = Layout;
  
  const [title, setTitle] = useState("Dashboard");
  const [isActiveChild, setIsActiveChild] = useState("");
  const [isShowSubNav, setIsShowSubNav] = useState(false);

  const { Sider } = Layout;
  const { role,permissions }: any = JSON.parse(
    localStorage.getItem("careUserData") || "{}"
  );

  return (
    <>
      <Drawer
        rootClassName="Drawer"
        placement="left"
        onClose={() => setIsOpen(false)}
        open={isopen}
      >
        <Sider />
      </Drawer>
      <Layout className="layout" onClick={()=> setLocation(window.location.pathname)}>

        <Layout >
  
          <Header style={{ padding: 0, background: "linear-gradient(250deg, rgba(68,68,68,1) 6%, rgba(45,45,45,1) 100%)" }}>
            <div className="responsive-header">
              <img src={LogoImg} alt="logo" />
            </div>
            <TopHeader setIsOpen={setIsOpen} />
            {iscollapsed ? (
              <img
                src={SideIcon}
                alt="sideicon"
                onClick={() => setIsCollapsed(!iscollapsed)}
                className="sideicon cursor-pointer"
              />
            ) : (
              <img
                src={SideIcon}
                alt="sideicon"
                onClick={() => setIsCollapsed(!iscollapsed)}
                className="sideicon cursor-pointer"
              />
            )}
          </Header>
          <Content
            style={{
              padding: 30,
              height: "90vh",
              overflow: "auto",
              background: "#444444",
              opacity:0.9
            }}
          >
            {outlet}
          </Content>
        </Layout>
      </Layout>
      
    </>
  );
};
export default Sidebar;
