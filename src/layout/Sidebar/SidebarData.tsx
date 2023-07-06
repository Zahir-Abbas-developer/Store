import { ReactComponent as Dashboard } from "../../assets/icons/sidebar/dashboard.svg";

import { ReactComponent as Calendar } from "../../assets/icons/sidebar/calendar.svg";

import { ReactComponent as Preferences } from "../../assets/icons/sidebar/preferences.svg";

import { ROLES } from "../../constants/Roles";

export const getSidebarMenues = (role: any, permissions: any) => {
 
console.log(role)
  function formatString(str: string) {
    str = str.replace(/_/g, ' ');
    return str.replace(/\b\w/g, (c) => c.toUpperCase());
  }
 

  const SidebarMenues = [


    // #######################  Sidebar Items #######################  
    {
      label: "HOME",
      link: "/admin-dashboard",
      icon: <Dashboard />,
      role: [ROLES.admin],
    },
    {
      label: "SHOES",
      link: "/dashboard",
      icon: <Dashboard />,
      role: [],
    },
    // {
    //   label: "OUR COLLECTION",
    //   link: "/client-profile",
    //   icon: <Profile />,
    //   role: [ROLES.user],
    // },
    {
      label: "LEATHERS",
      link: "/client-booking-calendar",
      icon: <Calendar />,
      role: [ROLES.user],
    },
   
    // {
    //   label: "STYLE GUIDE",
    //   link: "/client-user-management",
    //   icon: <UserManagement />,
    //   role: [ROLES.user],
    // },
    // {
    //   label: "FITTING GUIDE",
    //   link: "/fitting-guide",
    //   icon: <Preferences />,
    //   role: [ROLES.user],
    // },
    // {
    //   label: "MATERIAL GUIDE",
    //   link: "/material-guide",
    //   icon: <Preferences />,
    //   role: [ROLES.user],
    // },
    // {
    //   label: "SOLE GUIDE",
    //   link: "/sole-guide",
    //   icon: <Preferences />,
    //   role:  [ROLES.user],
    // },
    // {
    //   label: "SHOE CARE",
    //   link: "/shoe-care",
    //   icon: <Preferences />,
    //   role: [ROLES.user],
    // },
    // {
    //   label: "SHIPPING",
    //   link: "/shipping-details",
    //   icon: <Preferences />,
    //   role: [ROLES.user],
    // },
    {
      label: "CONTACT",
      link: "/contact-details",
      icon: <Preferences />,
      role: [ROLES.user],
    },
    {
      label: "CONTACT",
      link: "/contact",
      icon: <Preferences />,
      role: [ROLES.admin],
    },
    {
      label: "PRODUCTS",
      link: "/add-products",
      icon: <Preferences />,
      role: [ROLES.admin],
    },
    {
      label: "CATEGORIES",
      link: "/add-categories",
      icon: <Preferences />,
      role: [ROLES.admin],
    },
    {
      label: "COLORS",
      link: "/add-colors",
      icon: <Preferences />,
      role: [ROLES.admin],
    },
    {
      label: "STYLES",
      link: "/add-styles",
      icon: <Preferences />,
      role: [ROLES.admin],
    },
    {
      label: "ORDERS",
      link: "/add-orders",
      icon: <Preferences />,
      role: [ROLES.admin],
    },
   
  ];
  const updateArray = SidebarMenues?.filter((ele) => {
    if(role==="admin")
   return  ele?.role?.includes(role)
    else return !ele.role?.includes("admin")
  });

  const permissionsValues = updateArray
    ?.filter((obj: any) => permissions?.some((ele: any) => formatString(ele?.name) === obj.label));
  const finalArray = role === 'system_admin' ? updateArray : permissionsValues

  return updateArray
}
