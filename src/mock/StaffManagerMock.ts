import Manager1 from "../assets/images/MockImages/user-lg-2.png";
import Manager2 from "../assets/images/MockImages/girl-lg-1.png";
import callIcon from "../assets/images/staffManager/phoneContact.png";
import mailIcon from "../assets/images/staffManager/mailContact.png";
import mapIcon from "../assets/images/staffManager/locationContact.png";
import shiftCompensation from "../assets/icons/Dashboard/shifts-comprehension.svg";
import PersonImg from "../assets/images/staffManager/person.png";
import HomeIcon from "../assets/images/staffManager/homeBlue.png";
import Calander from "../assets/images/staffManager/calendar.png";
import ClockIcon from "../assets/images/staffManager/clock.png";
import SunIcon from "../assets/images/staffManager/sun.png";
import PoundSign from "../assets/images/staffManager/pound.png";
import CrossImg from "../assets/images/staffManager/crossImg.png";
import DepartmentIcon from "../assets/icons/ClientManageShift/department-icon.png";
import dayjs from "dayjs";

export const totalHoursCount = [
  {
    text: "Total Hrs Worked",
    borderStyle: "solid",
    borderColor: "#65CDF0",
    img: shiftCompensation,
    shiftComprehensionText: "55.25",
  },
  {
    text: "Hours this month",
    borderStyle: "solid",
    borderColor: "#FAAD14",
    img: shiftCompensation,
    shiftComprehensionText: "22",
  },
  {
    text: "Settled Invoice",
    borderStyle: "solid",
    borderColor: "#52C41A",
    img: shiftCompensation,
    shiftComprehensionText: "297",
  },
  {
    text: "Pending Invoice",
    borderStyle: "solid",
    borderColor: "#4E132C",
    img: shiftCompensation,
    shiftComprehensionText: "1,139",
  },
];

export const staffWidgetsData = [
  {
    id: "1",
    title: "DOM",
    amount: "00",
  },
  {
    id: "2",
    title: "HCA",
    amount: "388",
  },
  {
    id: "3",
    title: "RGN",
    amount: "05",
  },
  {
    id: "4",
    title: "SHCA",
    amount: "05",
  },
  {
    id: "5",
    title: "SW",
    amount: "01",
  },
];

export const StaffManagerData = [
  {
    id: "1",
    img: Manager1,
    heading: "Nassira Boateng",
    profileCategory: "Registered General Nurse",
    contact: {
      email: "akosua101@gmail.com",
      phoneNumber: "+0787121212121212",
    },
    status: "Active",
    staffBand: "HCA Band",
    employmentType: "PAYE",
    progress: "Progress:90%",
    postCode: "E6 3BL",
  },
  {
    id: "2",
    img: Manager2,
    heading: "Alina Ashley",
    profileCategory: "Health Care Assistant",
    contact: {
      email: "alina@email.com",
      phoneNumber: "+123457789543",
    },
    status: "Active",
    staffBand: "HCA Band",
    employmentType: "PAYE",
    progress: "Progress:90%",
    postCode: "E6 3BL",
  },
  {
    id: "3",
    img: Manager1,
    heading: "John Dhoe",
    profileCategory: "Registered General Nurse",
    contact: {
      email: "akosua101@gmail.com",
      phoneNumber: "+0787121212121212",
    },
    status: "Active",
    staffBand: "HCA Band",
    employmentType: "PAYE",
    progress: "Progress:90%",
    postCode: "E6 3BL",
  },
];

export const staffSummaryBtn = [
  { id: "1", btnText: "Download Profile PDF" },
  { id: "2", btnText: "Availability Calendar" },
  { id: "3", btnText: "Time Sheet History" },
  { id: "4", btnText: "Payslips History" },
];

// export const staffContacts = [
//   {
//     id: "1",
//     icon: callIcon,
//     title: "0787121212121212",
//   },
//   {
//     id: "2",
//     icon: mailIcon,
//     title: "akosua101@gmail.com",
//   },
//   {
//     id: "3",
//     icon: mapIcon,
//     title: "Colchester ,United Kingdom",
//   },
// ];

export const staffContacts = {
  phone: callIcon,
  email: mailIcon,
  address: mapIcon,
};

export const shiftStatusData = [
  {
    id: "1",
    title: "Open shifts",
    amount: "£ 0.00",
    shiftNotify: "02",
  },
  {
    id: "2",
    title: "Total Hours Life Time",
    amount: "£ 0.00",
    shiftNotify: "02",
  },
  {
    id: "3",
    title: "Confirmed shifts",
    amount: "£ 0.00",
    shiftNotify: "02",
  },
  {
    id: "4",
    title: "Total Hours This Month",
    amount: "£ 0.00",
    shiftNotify: "02",
  },
  {
    id: "5",
    title: "Completed shifts",
    amount: "£ 0.00",
    shiftNotify: "02",
  },
];

export const metricsInfoData = [
  {
    id: "1",
    title: "Assigned Clients",
    metricsNotify: "15",
  },
  {
    id: "2",
    title: "Clients Removed",
    metricsNotify: "00",
  },
  {
    id: "3",
    title: "Cancellations From Clients",
    metricsNotify: "00",
  },
  {
    id: "4",
    title: "Cancellations From  Staffs",
    metricsNotify: "05",
  },
  {
    id: "5",
    title: "Lifetime Earnings",
    amount: "£ 0.00",
  },
  {
    id: "6",
    title: "Payment Pending",
    amount: "£ 4549.25",
  },
];

export const openShiftDetails = [
  { src: DepartmentIcon, text: (item: any) => `Department: ${item?.department}` },
  {
    src: Calander,
    text: (item: any) => dayjs(item?.shiftDate).format("ddd, MMMM DD YYYY"),
  },
  {
    src: ClockIcon,
    text: (item: any) => `${dayjs(item?.startTime).format("h:mm A")} TO ${dayjs(item?.endTime).format("h:mm A")}`,
  },
  { src: SunIcon, text: (item: any) => item?.shiftType },
  { src: PoundSign, text: (item: any) => `Shift Rate:£${item?.rate}` },
];

export const confirmedShiftDetails = [
  {
    src: PersonImg,
    text: (item: any) => `${item?.carer?.firstName} ${item?.carer?.lastName}`,
  },
  { src: DepartmentIcon, text: (item: any) => `Department: ${item?.shift?.department}` },
  {
    src: Calander,
    text: (item: any) => dayjs(item.shift?.shiftDate).format("ddd, MMMM DD YYYY"),
  },
  {
    src: ClockIcon,
    text: (item: any) => `${dayjs(item.shift?.startTime).format("h:mm A")} TO ${dayjs(item.shift?.endTime).format("h:mm A")}`,
  },
  { src: SunIcon, text: (item: any) => item?.shift?.shiftType },
  { src: PoundSign, text: (item: any) => `Shift Rate:£${item?.shiftRate}` },
];

export const upComingShiftDetails = [
  // {
  //   src: PersonImg,
  //   text: (item: any) => `${item?.carer?.firstName} ${item?.carer?.lastName}`,
  // },
  // { src: DepartmentIcon, text: (item: any) => `Department: ${item?.shift?.department}` },
  {
    src: Calander,
    text: (item: any) => dayjs(item.shift?.shiftDate).format("ddd, MMMM DD YYYY"),
  },
  {
    src: ClockIcon,
    text: (item: any) => `${dayjs(item.shift?.startTime).format("h:mm A")} TO ${dayjs(item.shift?.endTime).format("h:mm A")}`,
  },
  { src: SunIcon, text: (item: any) => item?.shift?.shiftType },
  { src: PoundSign, text: (item: any) => `Shift Rate:£${item?.shiftRate}` },
];

export const confirmShiftData = [
  {
    id: "1",
    shiftTitle: "Tall Tree Care Home",
    staffName: "David Khan ( HCA )",
    homeImg: HomeIcon,
    address: "Elderly Care Unit",
    calanderIcon: Calander,
    date: "May 18, Tuesday ",
    clockIcon: ClockIcon,
    time: "8:00 PM  TO  4:00 AM",
    sunIcon: SunIcon,
    weather: "Longday",
    poundSign: PoundSign,
    shiftRate: "Shift Rate:£275.00",
  },
  {
    id: "2",
    shiftTitle: "Tall Tree Care Home",
    homeImg: HomeIcon,
    address: "Elderly Care Unit",
    calanderIcon: Calander,
    date: "May 18, Tuesday ",
    clockIcon: ClockIcon,
    time: "8:00 PM  TO  4:00 AM",
    sunIcon: SunIcon,
    weather: "Longday",
    poundSign: PoundSign,
    shiftRate: "Shift Rate:£275.00",
  },
  {
    id: "3",
    shiftTitle: "Tall Tree Care Home",
    homeImg: HomeIcon,
    address: "Elderly Care Unit",
    calanderIcon: Calander,
    date: "May 18, Tuesday ",
    clockIcon: ClockIcon,
    time: "8:00 PM  TO  4:00 AM",
    sunIcon: SunIcon,
    weather: "Longday",
    poundSign: PoundSign,
    shiftRate: "Shift Rate:£275.00",
  },
  {
    id: "4",
    shiftTitle: "Tall Tree Care Home",
    homeImg: HomeIcon,
    address: "Elderly Care Unit",
    calanderIcon: Calander,
    date: "May 18, Tuesday ",
    clockIcon: ClockIcon,
    time: "8:00 PM  TO  4:00 AM",
    sunIcon: SunIcon,
    weather: "Longday",
    poundSign: PoundSign,
    shiftRate: "Shift Rate:£275.00",
  },
];

interface DataType {
  key: string;
  sno: string;
  shiftName: string;
  clientName: string;
  shiftDate: string;
  shiftHours: string;
  shiftRate: string;
  shiftAmount: string;
  invoiceNumber: string;
  shiftStatus: string;
  paymentStatus: string;
  paymentDate: string;
}

export const totalHoursTableData: DataType[] = [
  {
    key: "1",
    sno: "1",
    shiftName: "Night Shift",
    clientName: "Bondcare Care Home",
    shiftDate: "15/08/2022",
    shiftHours: "11:00",
    shiftRate: "27:00",
    shiftAmount: "297:00",
    invoiceNumber: "-",
    shiftStatus: "Confirmed Shift",
    paymentStatus: "Not Paid",
    paymentDate: "-",
  },
  {
    key: "2",
    sno: "2",
    shiftName: "Long Day",
    clientName: "Bondcare Care Home",
    shiftDate: "10/08/2022 ",
    shiftHours: "11:00",
    shiftRate: "27:00",
    shiftAmount: "297:00",
    invoiceNumber: "2021-004",
    shiftStatus: "Signed Off",
    paymentStatus: "Paid",
    paymentDate: "10/04/2022 ",
  },
  {
    key: "3",
    sno: "3",
    shiftName: "Night Shift",
    clientName: "Laurel Dene Care Home",
    shiftDate: "26/03/2022 ",
    shiftHours: "11:00",
    shiftRate: "25:00",
    shiftAmount: "275:00",
    invoiceNumber: "-",
    shiftStatus: "Confirmed Shift",
    paymentStatus: "Not Paid",
    paymentDate: "-",
  },
  {
    key: "4",
    sno: "4",
    shiftName: "Long Day",
    clientName: "Bondcare Care Home",
    shiftDate: "15/08/2022",
    shiftHours: "11:00",
    shiftRate: "27:00",
    shiftAmount: "297:00",
    invoiceNumber: "2021-004",
    shiftStatus: "Confirmed Shift",
    paymentStatus: "Not Paid",
    paymentDate: "11/02/2022 ",
  },
];

export const confirmedShiftData = [
  {
    id: "1",
    shiftTitle: "Tall Tree Care Home",
    homeImg: HomeIcon,
    address: "Elderly Care Unit",
    calanderIcon: Calander,
    date: "May 18, Tuesday ",
    clockIcon: ClockIcon,
    time: "8:00 PM  TO  4:00 AM",
    sunIcon: SunIcon,
    weather: "Longday",
    poundSign: PoundSign,
    shiftRate: "Shift Rate:£275.00",
  },
  {
    id: "2",
    shiftTitle: "Tall Tree Care Home",
    homeImg: HomeIcon,
    address: "Elderly Care Unit",
    calanderIcon: Calander,
    date: "May 18, Tuesday ",
    clockIcon: ClockIcon,
    time: "8:00 PM  TO  4:00 AM",
    sunIcon: SunIcon,
    weather: "Longday",
    poundSign: PoundSign,
    shiftRate: "Shift Rate:£275.00",
  },
  {
    id: "3",
    shiftTitle: "Tall Tree Care Home",
    homeImg: HomeIcon,
    address: "Elderly Care Unit",
    calanderIcon: Calander,
    date: "May 18, Tuesday ",
    clockIcon: ClockIcon,
    time: "8:00 PM  TO  4:00 AM",
    sunIcon: SunIcon,
    weather: "Longday",
    poundSign: PoundSign,
    shiftRate: "Shift Rate:£275.00",
  },
  {
    id: "4",
    shiftTitle: "Tall Tree Care Home",
    homeImg: HomeIcon,
    address: "Elderly Care Unit",
    calanderIcon: Calander,
    date: "May 18, Tuesday ",
    clockIcon: ClockIcon,
    time: "8:00 PM  TO  4:00 AM",
    sunIcon: SunIcon,
    weather: "Longday",
    poundSign: PoundSign,
    shiftRate: "Shift Rate:£275.00",
  },
];

export const WeekAvailabliyiyData = [
  {
    key: "1",
    displayName: "Aarathi Sabu",
    designation: "HCA",
    mobileNumber: "+447825585541",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  },
  {
    key: "2",
    displayName: "Abhishek",
    designation: "HCA",
    mobileNumber: "+447825585541",
    monday: "Night",
    tuesday: "Day",
    wednesday: "",
    thursday: "",
    friday: "Night",
    saturday: "Day",
    sunday: "Day",
  },
  {
    key: "3",
    displayName: "Abitjith",
    designation: "HCA",
    mobileNumber: "+447825585541",
    monday: "Night",
    tuesday: "Day",
    wednesday: "Night",
    thursday: "Day",
    friday: "Night",
    saturday: "Day",
    sunday: "",
  },
  {
    key: "4",
    displayName: "Dinu",
    designation: "HCA",
    mobileNumber: "+447825585541",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  },
  {
    key: "5",
    displayName: "Nassira Boateng",
    designation: "HCA",
    mobileNumber: "+447825585541",
    monday: "Night",
    tuesday: "Day",
    wednesday: "Night",
    thursday: "Day",
    friday: "Night",
    saturday: "Day",
    sunday: "",
  },
  {
    key: "6",
    displayName: "Aarathi Sabu",
    designation: "HCA",
    mobileNumber: "+447825585541",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  },
  {
    key: "7",
    displayName: "Aarathi Sabu",
    designation: "HCA",
    mobileNumber: "+447825585541",
    monday: "Night",
    tuesday: "Day",
    wednesday: "Night",
    thursday: "Day",
    friday: "Night",
    saturday: "Day",
    sunday: "Day",
  },
];

export const dayAvailabliyiyData = [
  {
    key: "1",
    displayName: "Aarathi Sabu",
    designation: "HCA",
    mobileNumber: "+447825585541",
    monday: "",
  },
  {
    key: "2",
    displayName: "Abhishek",
    designation: "HCA",
    mobileNumber: "+447825585541",
    monday: "Night",
  },
  {
    key: "3",
    displayName: "Abitjith",
    designation: "HCA",
    mobileNumber: "+447825585541",
    monday: "Night",
  },
  {
    key: "4",
    displayName: "Dinu",
    designation: "HCA",
    mobileNumber: "+447825585541",
    monday: "",
  },
  {
    key: "5",
    displayName: "Nassira Boateng",
    designation: "HCA",
    mobileNumber: "+447825585541",
    monday: "Night",
  },
  {
    key: "6",
    displayName: "Aarathi Sabu",
    designation: "HCA",
    mobileNumber: "+447825585541",
    monday: "",
  },
  {
    key: "7",
    displayName: "Aarathi Sabu",
    designation: "HCA",
    mobileNumber: "+447825585541",
    monday: "Night",
  },
];

export const allocateStaffData = [
  {
    sr: "01",
    careHome: "Bondcare Care Home",
    allocatedOn: "Tuseday Nov 30,2021 10:03",
    actions: CrossImg,
  },
  {
    sr: "02",
    careHome: "Bondcare Care Home",
    allocatedOn: "Tuseday Nov 30,2021 10:03",
    actions: CrossImg,
  },
  {
    sr: "03",
    careHome: "Laurel Dene Care Home",
    allocatedOn: "Tuseday Nov 30,2021 10:03",
    actions: CrossImg,
  },
];

export const completedShiftData = [
  {
    key: 1,
    shiftTitle: "Tall Tree Care Home",
    careHome: [
      { id: "1", icon: PersonImg, value: "David Khan" },
      { id: "2", icon: SunIcon, value: "Longday" },
      { id: "3", icon: Calander, value: "May 18, Tue - 8:00 PM  TO  4:00 AM" },
      { id: "4", icon: PoundSign, value: "£275.00" },
    ],
    staffCalculations: [
      {
        id: "01",
        startShiftHours: "Start Shift Hours",
        startShiftHoursValue: "04:00",
        startShiftRate: "Start Shift Rate",
        startShiftRateValue: "27.00",
        endShiftHours: "End Shift Hours:",
        endShiftHoursValue: "05:00",
        endShiftRate: "End Shift Rate",
        endShiftRateValue: "27.00",
        shiftDatelabel: "Shift Date:",
        shiftDate: "Sun, 03 Apr 22,",
        totalShiftAmountlabel: "Total Shift Amount:",
        totalShiftAmountValue: "£283.00",
      },
      {
        id: "01",
        startShiftHours: "Start Shift Hours",
        startShiftHoursValue: "04:00",
        startShiftRate: "Start Shift Rate",
        startShiftRateValue: "27.00",
        endShiftHours: "End Shift Hours:",
        endShiftHoursValue: "05:00",
        endShiftRate: "End Shift Rate",
        endShiftRateValue: "27.00",
        shiftDatelabel: "Shift Date:",
        shiftDate: "Sun, 03 Apr 22,",
        totalShiftAmountlabel: "Total Shift Amount:",
        totalShiftAmountValue: "£283.00",
      },
    ],
    signOff: {
      signOffBy: "malcomlmy",
      signOffByDate: "date",
      modificationsReason: "The shift timings were modified as the carer arived later to the care home, than the time that was mentioned n the  timesheet",
    },
  },
];

export const availabilitySheetData = [
  {
    key: "1",
    name: "Aarathi Sabu",
    monday: "",
    tuesday: "",
    "2023-03-19": "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  },
];

export const assignedClientsData = [
  {
    id: "1",
    clientName: "Hazel Court",
    approvedOn: "Sunday April 10 2022",
  },
  {
    id: "2",
    clientName: "Cedrus House Care Home",
    approvedOn: "Wednesday March 30 2022",
  },
  {
    id: "3",
    clientName: "Canterbury House",
    approvedOn: "Friday April 1 2022",
  },
  {
    id: "4",
    clientName: "Wings, Accomplish Group",
    approvedOn: "Wednesday April 6 2022",
  },
];

export const clientsRemovedData = [
  {
    id: "1",
    clientName: "",
    approvedOn: "",
  },
];
////////

//////////////////////////////////////////////////////////////////////////
export const staffManagerCompleted = [
  {
    src: PersonImg,
    text: (item: any) => `${item?.carer?.firstName} ${item?.carer?.lastName}`,
  },
  { src: SunIcon, text: (item: any) => `${item?.shift?.shiftType}` },
  {
    src: Calander,
    text: (item: any) => `${dayjs(item?.shift?.shiftDate).format("ddd, MMMM DD YYYY")}`,
  },
  { src: PoundSign, text: (item: any) => `Shift Rate:£${item?.rate}` },
  {
    src: ClockIcon,
    text: (item: any) => `${dayjs(item.shift?.startTime).format("h:mm A")} TO ${dayjs(item.shift?.endTime).format("h:mm A")}`,
  },
  {
    src: ClockIcon,
    text: (item: any) => `Department: ${item?.shift?.department}`,
  },
];

export const shiftCalculation = [
  { heading: "Start Shift Hours", text: (item: any) => `22` },
  { heading: "Start Shift Rate", text: (item: any) => `22` },
  { heading: "End Shift Hours:", text: (item: any) => `22` },
  { heading: "End Shift Rate", text: (item: any) => `12` },
  {
    heading: "Shift Date:",
    text: (item: any) => `${dayjs(item.shift.shiftDate).format("ddd, MMMM DD YYYY")}`,
  },
  {
    heading: "Total Shift Amount:",
    text: (item: any) => `${item?.totalAmount}`,
  },
];

export const signedOffBy = [
  {
    heading: "Signed-off by",
    name: (item: any) => `${item.signedOffBy?.firstName} ${item.signedOffBy?.lastName}`,
    text: (item: any) => `${dayjs(item.signedOffDate).format("ddd, DD-MMM-YY - H:mm A")}`,
  },
  {
    heading: "Modified By",
    name: (item: any) => `${item.modifiedBy?.firstName} ${item.modifiedBy?.lastName}`,
    text: (item: any) => `${dayjs(item.modifiedDate).format("ddd, DD-MMM-YY - H:mm A")}`,
  },
  {
    heading: "Modification Reason",
    name: (item: any) => ``,
    text: (item: any) => ``,
  },
];
