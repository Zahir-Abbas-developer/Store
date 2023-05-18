import Admin from "../assets/icons/ManageUser/admin-type.svg";
import Carer from "../assets/icons/ManageUser/carer-type.svg";
import CarerCordinator from "../assets/icons/ManageUser/carer-cordinator.svg";
import Client from "../assets/icons/ManageUser/client-type.png";
import AgencyAdmin from "../assets/icons/ManageUser/agency-admin.svg";
import AddUserType from "../assets/icons/ManageUser/add-user-type.svg";
import Users from "../assets/icons/SuperAdminDashboard/users-icon.svg";
import ManageThirdParty from "../assets/icons/SuperAdminDashboard/multiple-avatars.svg";

export const ManageUsersCards = [
  {
    id: 1,
    cardIcon: ManageThirdParty,
    cardTitle: "Manage Users",
    linkText: "View User Groups",
    link: "/manage-user",
  },
  {
    id: 2,
    cardIcon: Users,
    cardTitle: "Manage Third Party Licenses",
    linkText: "View Third Party License",
    link: "/manage-user",
  },
];
export const managerShiftCard = [
  {
    id: "1",
    heading: "Arlington Manor",
    requested: "04",
    booked: "02",
    days: ["Fri, 10", "Sat, 11", "Sun, 12"],
  },
  {
    id: "2",
    heading: "Barking Hall",
    requested: "00",
    booked: "00",
    days: ["Fri, 10", "Sat, 11", "Sun, 12"],
  },
  {
    id: "3",
    heading: "Baylham Care ",
    requested: "03",
    booked: "02",
    days: ["Fri, 10", "Sat, 11", "Sun, 12"],
  },
  {
    id: "4",
    heading: "Baylham Care ",
    requested: "03",
    booked: "02",
    days: ["Fri, 10", "Sat, 11", "Sun, 12"],
  },
  {
    id: "5",
    heading: "Arlington Manor",
    requested: "04",
    booked: "04",
    days: ["Fri, 10", "Sat, 11", "Sun, 12"],
  },
  {
    id: "6",
    heading: "Barking Hall",
    requested: "00",
    booked: "00",
    days: ["Fri, 10", "Sat, 11", "Sun, 12"],
  },
  {
    id: "7",
    heading: "Baylham Care ",
    requested: "03",
    booked: "02",
    days: ["Fri, 10", "Sat, 11", "Sun, 12"],
  },
  {
    id: "8",
    heading: "Baylham Care ",
    requested: "03",
    booked: "02",
    days: ["Fri, 10", "Sat, 11", "Sun, 12"],
  },
];
export const checkboxes = [
  { label: "Access Management", value: "AccessManagement" },
  { label: "Settings", value: "Settings" },
  { label: "Recruitment", value: "Recruitment" },
  { label: "Staff Member", value: "StaffMember" },
  { label: "Staff Allocation", value: "StaffAllocation" },
  { label: "Staff Booking", value: "StaffBooking" },
  { label: "Booking Calendar", value: "BookingCalendar" },
  { label: "Shift Management", value: "ShiftManagement" },
  { label: "Invoice Management", value: "InvoiceManagement" },
  { label: "Natural Vendors Management", value: "NaturalVendorsManagement" },
];

export const ShiftBookingBtn = [
  { id: "1", btnText: "Post New Shift", color: "#65CDF0" },
  { id: "2", btnText: "Book Staff Direct", color: "#1890FF" },
  { id: "3", btnText: "Confirmed Shift", color: "#52C41A" },
  { id: "4", btnText: "Unfilled Shifts", color: "#F7B923" },
  { id: "5", btnText: "Shift Calendar", color: "#4E4B66" },
];

export const ManageUsersTableData = [
  {
    id: "01",
    userId: "UID-S8910",
    name: "Abid Mustafa",
    email: "Faisal Naeem7@gmail.com",
    createdDate: "01 / 11 / 2021",
    resetPassword: "Reset",
    status: "true",
  },
  {
    id: "02",
    userId: "UID-S8910",
    name: "Abid Mustafa",
    email: "Faisal Naeem7@gmail.com",
    createdDate: "01 / 11 / 2021",
    resetPassword: "Reset",
    status: "true",
  },
  {
    id: "03",
    userId: "UID-S8910",
    name: "Abid Mustafa",
    email: "Faisal Naeem7@gmail.com",
    createdDate: "01 / 11 / 2021",
    resetPassword: "Reset",
    status: "true",
  },
];

export const ManageUsersData = [
  {
    id: "1",
    title: "Admin",
    description: "Admin User monitors the application and its users.",
    icon: Admin,
    cardBorder: "1px solid #E3E3E3",
    iconBackground: "#F1F7FF",
    path: "/manage-user/admin",
  },
  {
    id: "2",
    title: "Carer",
    description: "A member that provide services",
    icon: Carer,
    cardBorder: "1px solid #E3E3E3",
    iconBackground: "#FFF2F8",
    path: "/manage-user/agency-admin",
  },
  {
    id: "3",
    title: "Carer Cordinator",
    icon: CarerCordinator,
    iconBackground: "#F1E8FF",
    cardBorder: "1px solid #E3E3E3",
    description: "A collaborative member that manage carer and care homes requests.",
    path: "/manage-user/admin",
  },
  {
    id: "4",
    title: "Client",
    iconBackground: "#FFF7E3",
    cardBorder: "1px solid #E3E3E3",
    icon: Client,
    description: "A member that request services",
    path: "/manage-user/admin",
  },
  {
    id: "5",
    title: "Agency Admin",
    iconBackground: "#E4FFF6",
    cardBorder: "1px solid #E3E3E3",
    icon: AgencyAdmin,
    description: "Clorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    path: "/manage-user/admin",
  },
  {
    id: "6",
    title: "Add User Type",
    cardBorder: "1px dashed #A0A3BD",
    iconBackground: "",
    icon: AddUserType,
    description: "",
    isOpenUserTypeModal: false,
    // path:"/manage-user/admin",
  },
];
