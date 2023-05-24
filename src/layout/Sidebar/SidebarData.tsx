import { ReactComponent as Dashboard } from "../../assets/icons/sidebar/dashboard.svg";
import { ReactComponent as Client } from "../../assets/icons/sidebar/client.svg";
import { ReactComponent as OnBoarding } from "../../assets/icons/sidebar/onBoarding.svg";
import { ReactComponent as Manager } from "../../assets/icons/sidebar/manager.svg";
import { ReactComponent as Allocation } from "../../assets/icons/sidebar/allocation.svg";
import { ReactComponent as Booking } from "../../assets/icons/sidebar/booking.svg";
import { ReactComponent as Calendar } from "../../assets/icons/sidebar/calendar.svg";
import { ReactComponent as Time } from "../../assets/icons/sidebar/time.svg";
import { ReactComponent as Users } from "../../assets/icons/sidebar/users.svg";
import { ReactComponent as Finance } from "../../assets/icons/sidebar/finance.svg";
import { ReactComponent as Reports } from "../../assets/icons/sidebar/reports.svg";
import { ReactComponent as Setting } from "../../assets/icons/sidebar/setting.svg";
import { ReactComponent as Help } from "../../assets/icons/sidebar/help.svg";
import { ReactComponent as ManageUser } from "../../assets/icons/sidebar/manage-user.svg";
import { ReactComponent as Inventory } from "../../assets/icons/sidebar/inventory.svg";
import { ReactComponent as System } from "../../assets/icons/sidebar/system.svg";
import { ReactComponent as Ratings } from "../../assets/icons/sidebar/ratings.svg";
import { ReactComponent as Backup } from "../../assets/icons/sidebar/backup.svg";
import { ReactComponent as Notifications } from "../../assets/icons/sidebar/notifications.svg";
import { ReactComponent as Logs } from "../../assets/icons/sidebar/logs.svg";
import { ReactComponent as Preferences } from "../../assets/icons/sidebar/preferences.svg";
import { ReactComponent as ShiftDetails } from "../../assets/icons/sidebar/shiftDetails.svg";
import { ReactComponent as Profile } from "../../assets/icons/sidebar/profile.svg";
import { ReactComponent as UserManagement } from "../../assets/icons/sidebar/user-management.svg";
import { ReactComponent as ManageCourse } from "../../assets/icons/sidebar/manage-courses.svg";
import { ReactComponent as TranieeInfo } from "../../assets/icons/sidebar/trainee-info.svg";
import { ReactComponent as Webinar } from "../../assets/icons/sidebar/webinar.svg";
import { ROLES } from "../../constants/Roles";

export const getSidebarMenues = (role: any, permissions: any) => {
 

  function formatString(str: string) {
    str = str.replace(/_/g, ' ');
    return str.replace(/\b\w/g, (c) => c.toUpperCase());
  }
 

  const SidebarMenues = [


    // #######################  Sidebar Items #######################  
    {
      label: "HOME",
      link: "/client-dashboard",
      icon: <Dashboard />,
      role: [ROLES.client],
    },
    {
      label: "OUR COLLECTION",
      link: "/client-profile",
      icon: <Profile />,
      role: [ROLES.client],
    },
    {
      label: "CUSTOM ORDER",
      link: "/client-booking-calendar",
      icon: <Calendar />,
      role: [ROLES.client],
    },
   
    {
      label: "STYLE GUIDE",
      link: "/client-user-management",
      icon: <UserManagement />,
      role: [ROLES.client],
    },
    {
      label: "FITTING GUIDE",
      link: "/client-preferences",
      icon: <Preferences />,
      role: [ROLES.client],
    },
    {
      label: "MATERIAL GUIDE",
      link: "/client-preferences",
      icon: <Preferences />,
      role: [ROLES.client],
    },
    {
      label: "SOLE GUIDE",
      link: "/client-preferences",
      icon: <Preferences />,
      role: [ROLES.client],
    },
    {
      label: "SHOE CARE",
      link: "/client-preferences",
      icon: <Preferences />,
      role: [ROLES.client],
    },
    {
      label: "SHOPPING",
      link: "/client-preferences",
      icon: <Preferences />,
      role: [ROLES.client],
    },
    {
      label: "CONTACT",
      link: "/client-preferences",
      icon: <Preferences />,
      role: [ROLES.client],
    },
   
  ];
  const updateArray = SidebarMenues?.filter((ele) => ele?.role?.includes(role));

  const permissionsValues = updateArray
    ?.filter((obj: any) => permissions?.some((ele: any) => formatString(ele?.name) === obj.label));
  const finalArray = role === 'system_admin' ? updateArray : permissionsValues

  return SidebarMenues
}
