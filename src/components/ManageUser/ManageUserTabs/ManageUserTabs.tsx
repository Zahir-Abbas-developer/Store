import { Card, Tabs } from "antd";
import type { TabsProps } from "antd";
import { useState } from "react";
import ManageUsersTable from "../ManageUsersTable/ManageUsersTable";
import "./ManageUserTabs.scss";
import RolesAndRights from "../RolesAndRightsTab/RolesAndRightsTable/RolesAndRightsTable";
import "../../../sass/common.scss";
import { useLocation } from "react-router-dom";
import { useGetManageUserRequestQuery } from "../../../store/Slices/ManageUser";
import BreadCrumb from "../../../layout/BreadCrumb/BreadCrumb";



const ManageUserTabs = () => {
  const location = useLocation();
  const [searchName, setSearchName] = useState("");
  const [tabChangeValue, setTabChangeValue] = useState("1");
  const [pagination, setPagination] = useState({ limit: 6, page: 1 });
  const paramsObj: any = {};

  if (searchName) paramsObj["search"] = searchName;
  
  const query = "&" + new URLSearchParams(paramsObj).toString();



  const { isError, isSuccess, isLoading, data } = useGetManageUserRequestQuery({
    roleId: location?.state?._id,
    pagination: pagination,
    query,
  });

  const tabChangeHandler = (key: string) => {
    setTabChangeValue(key)
  };

  let ManageUser: any;
  if (isSuccess) {
    ManageUser = data;
  }
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Manage Users`,
      children: (
        <ManageUsersTable
          name={location?.state?.name}
          ManageUser={ManageUser}
          isLoading={isLoading}
          searchName={searchName}
          setSearchName={setSearchName}
          pagination={pagination}
          setPagination={setPagination}

        />
      ),
    },
    {
      key: "2",
      label: `Roles & Rights`,
      children: (
        <RolesAndRights
          permissions={location?.state.permissions}
          id={location?.state?._id}
          name={location?.state?.name}
          ManageUser={ManageUser}
        />
      ),
    },
  ];


   //BreadCrumb Items 
   const breadCrumbItems = 
   [ 
    tabChangeValue==="1"? { title: "Manage Users", path: "", }:
     { title: "Roles & Rights", path: "", }
   ,
    { title: "Dashboard", path: "/dashboard", }, 
    { title: "userType", path: "/manage-user", }, 
 ];

  return (
    <div>
    <BreadCrumb breadCrumbItems={breadCrumbItems} />
    <Card className="manage-user-tabs-cards">
      <Tabs
        className="custom-tabs-wrapper-style"
        defaultActiveKey="1"
        items={items}
        onChange={tabChangeHandler}
      />
    </Card>
    </div>
  );
};

export default ManageUserTabs;
