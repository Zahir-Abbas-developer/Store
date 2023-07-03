import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar/Sidebar";

import DrawerComponent from "../components/ClientTabs/ProductDetails/Drawer";

const DashboardLayout = () => {
  return (
    <>
      <Sidebar outlet={<Outlet />} />
      <DrawerComponent/>

    </>
  );
};

export default DashboardLayout;
