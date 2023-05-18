import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <Sidebar outlet={<Outlet />} />
      <Footer />
    </>
  );
};

export default DashboardLayout;
