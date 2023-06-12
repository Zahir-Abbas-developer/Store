import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";

import DrawerComponent from "../components/ClientTabs/ProductDetails/Drawer";

const DashboardLayout = () => {
  return (
    <>
      <Sidebar outlet={<Outlet />} />
      <DrawerComponent/>
      <Footer />
    </>
  );
};

export default DashboardLayout;
