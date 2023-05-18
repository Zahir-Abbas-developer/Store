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

    // ######################### Admin Sidebar Items  #########################
    {
      label: "Dashboard",
      link: "/dashboard",
      icon: <Dashboard />,
      role: [ROLES.admin],
    },
    {
      label: "Client Manager",
      link: "/client-manager",
      icon: <Client />,
      role: [ROLES.admin],
    },
    {
      label: "Onboarding",
      link: "/onboarding/carer",
      icon: <OnBoarding />,
      role: [ROLES.admin],
      children: [
        {
          label: "Carer",
          link: "/onboarding/carer",
          icon: "",
        },
        {
          label: "Care Cordinator",
          link: "/onboarding/care-coordinator",
          icon: "",
        },
        {
          label: "Training Instructor",
          link: "/onboarding/training-instructor",
          icon: "",
        },
      ],
    },
    {
      label: "Staff Manager",
      link: "/staff-manager",
      icon: <Manager />,
      role: [ROLES.admin],
    },
    {
      label: "Staff Allocation",
      link: "/staff-allocation",
      icon: <Allocation />,
      role: [ROLES.admin],
    },
    {
      label: "Staff Booking",
      link: "/staff-booking",
      icon: <Booking />,
      role: [ROLES.admin],
    },
    {
      label: "Booking Calendar",
      link: "/booking-calendar",
      icon: <Calendar />,
      role: [ROLES.admin],
    },
    {
      label: "Shift Manager",
      link: "/shift-manager",
      icon: <Time />,
      role: [ROLES.admin],
    },
    {
      label: "Unpublished Shift",
      link: "/unpublished-shift",
      icon: <Users />,
      role: [ROLES.admin],
    },
    {
      label: "Finance",
      link: "/finance",
      icon: <Finance />,
      role: [ROLES.admin],
      children: [
        {
          label: "Setup",
          link: "/finance/setup",
          icon: "",
        },
        {
          label: "Invoice",
          link: "/finance/invoice",
          icon: "",
        },
        {
          label: "Staff Payment Details",
          link: "/finance/staff-payment-details",
          icon: "",
        },
        {
          label: "Client Payment Details",
          link: "/finance/client-payment-details",
          icon: "",
        },
        {
          label: "Reports",
          link: "/finance/reports",
          icon: "",
        },
      ],
    },

    // ######################### Carer Sidebar Items #########################
    {
      label: "Dashboard",
      link: "/carer-dashboard",
      icon: <Dashboard />,
      role: [ROLES.carer],
    },
    {
      label: "Profile",
      link: "/carer-profile",
      icon: <Profile />,
      role: [ROLES.carer],
    },
    {
      label: "Shift Details",
      link: "/shift-details/available-shifts",
      icon: <ShiftDetails />,
      role: [ROLES.carer],
      children: [
        {
          label: "Available Shifts",
          link: "/shift-details/available-shifts",
          icon: "",
        },
        {
          label: "Upcoming Shifts",
          link: "/shift-details/upcoming-shifts",
          icon: "",
        },
        {
          label: "Completed Shifts",
          link: "/shift-details/completed-shifts",
          icon: "",
        },
        {
          label: "Cancelled Shifts",
          link: "/shift-details/cancelled-shifts",
          icon: "",
        },
      ],
    },
    {
      label: "My Calendar",
      link: "/carer-my-calendar",
      icon: <Calendar />,
      role: [ROLES.carer],
    },
    // {
    //   label: "Booking Calendar",
    //   link: "/booking-calendar",
    //   icon: <Calendar />,
    //   role: [ROLES.carer],
    // },
    // {
    //   label: "Staff Allocation",
    //   link: "/staff-allocation",
    //   icon: <Allocation />,
    //   role: [ROLES.coordinator],
    // },

    // {
    //   label: "Training",
    //   link: "/training",
    //   icon: <TranieeInfo />,
    //   role: [ROLES.coordinator],
    // },
    // {
    //   label: "Settings",
    //   link: "/settings",
    //   icon: <Setting />,
    //   role:"coordinator",
    // },


    // ####################### Care Coordinator Sidebar Items #######################
    {
      label: "Dashboard",
      link: "/coordinator-dashboard",
      icon: <Dashboard />,
      role: [ROLES.coordinator],
    },
    {
      label: "Profile",
      link: "/care-coordinator-profile",
      icon: <Profile />,
      role: [ROLES.coordinator],
    },
    {
      label: "Manage Shift",
      link: "/shift-manager",
      icon: <ShiftDetails />,
      role: [ROLES.coordinator],
    },
    {
      label: "Booking Calendar",
      link: "/booking-calendar",
      icon: <Calendar />,
      role: [ROLES.coordinator],
    },
    {
      label: "Staff Allocation",
      link: "/staff-allocation",
      icon: <Allocation />,
      role: [ROLES.coordinator],
    },
    {
      label: "Finance",
      link: "/finance",
      icon: <Finance />,
      role: [ROLES.coordinator],
      children: [
        {
          label: "Invoice",
          link: "/finance/invoice",
          icon: "",
        },
        {
          label: "Staff Payment Details",
          link: "/finance/staff-payment-details",
          icon: "",
        },
        {
          label: "Client Payment Details",
          link: "/finance/client-payment-details",
          icon: "",
        },
        {
          label: "Reports",
          link: "/finance/reports",
          icon: "",
        },
      ],
    },


    // ####################### Client Sidebar Items #######################  
    {
      label: "Dashboard",
      link: "/client-dashboard",
      icon: <Dashboard />,
      role: [ROLES.client],
    },
    {
      label: "Profile",
      link: "/client-profile",
      icon: <Profile />,
      role: [ROLES.client],
    },
    {
      label: "Booking Calendar",
      link: "/client-booking-calendar",
      icon: <Calendar />,
      role: [ROLES.client],
    },
    {
      label: "Manage Shift",
      link: "/client-requested-shift",
      icon: <Time />,
      role: [ROLES.client],
      children: [
        {
          label: "Requested Shifts",
          link: "/client-requested-shift",
          icon: "",
        },
        {
          label: "Upcoming Shifts",
          link: "/client-upcoming-shift",
          icon: "",
        },
        {
          label: "Completed Shifts",
          link: "/client-completed-shift",
          icon: "",
        },
        {
          label: "Sign Off Shifts",
          link: "/client-signoff-shift",
          icon: "",
        },
      ],
    },
    {
      label: "User Management",
      link: "/client-user-management",
      icon: <UserManagement />,
      role: [ROLES.client],
    },
    {
      label: "Preferences",
      link: "/client-preferences",
      icon: <Preferences />,
      role: [ROLES.client],
    },


    // ####################### Super Admin Sidebar Items #######################
    {
      label: "Dashboard",
      link: "/super-admin-dashboard",
      icon: <Dashboard />,
      role: [ROLES.superAdmin],
    },
    {
      label: "Manage User",
      link: "/manage-user",
      icon: <ManageUser />,
      role: [ROLES.superAdmin],
    },
    {
      label: "Api Inventory",
      link: "/api-inventory",
      icon: <Inventory />,
      role: [ROLES.superAdmin],
    },
    {
      label: "System Performance",
      link: "/performance",
      icon: <System />,
      role: [ROLES.superAdmin],
    },
    {
      label: "Back Up",
      link: "/backup",
      icon: <Backup />,
      role: [ROLES.superAdmin],
    },
    {
      label: "Manage Notification",
      link: "/notifications",
      icon: <Notifications />,
      role: [ROLES.superAdmin],
    },
    {
      label: "Audit Logs",
      link: "/audit-logs",
      icon: <Logs />,
      role: [ROLES.superAdmin],
    },


    // ####################### Instructor Sidebar Items #######################
    {
      label: "Dashboard",
      link: "/instructor-dashboard",
      icon: <Dashboard />,
      role: [ROLES.instructor],
    },
    {
      label: "Profile",
      link: "/instructor-profile",
      icon: <Profile />,
      role: [ROLES.instructor],
    },
    {
      label: "Manage Courses",
      link: "/manage-courses",
      icon: <ManageCourse />,
      role: [ROLES.instructor],
    },
    {
      label: "Trainee Info",
      link: "/trainee-info",
      icon: <TranieeInfo />,
      role: [ROLES.instructor],
    },
    {
      label: "Webinar",
      link: "/webinar/upcomming-webinar",
      icon: <Webinar />,
      role: [ROLES.instructor],
      children: [
        {
          label: "Upcoming Webinar",
          link: "/webinar/upcomming-webinar",
          icon: "",
        },
        {
          label: "Webinar History",
          link: "/webinar/webinar-history",
          icon: "",
        },
      ],
    },


    // ############################# Common Sidebar Items in Different Roles  #############################
    {
      label: "Training",
      link: "/training",
      icon: <TranieeInfo />,
      role: [ROLES.carer, ROLES.coordinator],
    },

    {
      label: "Reports",
      link: "/reports",
      icon: <Reports />,
      role: [ROLES.carer, ROLES.coordinator, ROLES.instructor, ROLES.client, ROLES.admin, ROLES.superAdmin],
    },

    // to keep sidebar items in a order thats why kept here
    {
      label: "Ratings",
      link: "/ratings/reviewed",
      icon: <Ratings />,
      role: [ROLES.carer, ROLES.coordinator, ROLES.client],
      children: [
        {
          label: "Overall Ratings",
          link: "/ratings/reviewed",
          icon: "",
        },
        {
          label: "Review Carers",
          link: "/ratings/review-care-homes",
          icon: "",
        },
      ],
    },
    {
      label: "Rating & Feedback",
      link: "/ratings",
      icon: <Ratings />,
      role: [ROLES.superAdmin],
    },



    {
      label: "Settings",
      link: "/settings",
      icon: <Setting />,
      role: [ROLES.admin, ROLES.coordinator, ROLES.client],
    },

    {
      label: "Help",
      link: "/help/FAQs",
      icon: <Help />,
      role: [ROLES.carer, ROLES.coordinator, ROLES.instructor, ROLES.client, ROLES.admin, ROLES.superAdmin],
      children: [
        {
          label: "FAQs",
          link: "/help/FAQs",
          icon: "",
        },
        {
          label: "IT Help Desk",
          link: "/help/it-help-desk",
          icon: "",
        },
      ],
    },
  ];
  const updateArray = SidebarMenues?.filter((ele) => ele?.role?.includes(role));
  const permissionsValues = updateArray
    ?.filter((obj: any) => permissions?.some((ele: any) => formatString(ele?.name) === obj.label));
  const finalArray = role === 'system_admin' ? updateArray : permissionsValues

  return finalArray
}
