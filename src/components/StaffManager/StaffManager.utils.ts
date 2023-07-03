import HomeIcon from "../../assets/images/staffManager/homeBlue.png";
import Calander from "../../assets/images/staffManager/calendar.png";
import ClockIcon from "../../assets/images/staffManager/clock.png";
import SunIcon from "../../assets/images/staffManager/sun.png";
import PoundSign from "../../assets/images/staffManager/pound.png";
import DepartmentIcon from "../../assets/icons/ClientManageShift/department-icon.png";
import ShiftIcon from "../../assets/icons/ClientBookingCalendar/shift-timing-icon.png";
import DateIcon from "../../assets/icons/ClientBookingCalendar/date-icon.png";
import TotalShiftHoursIcon from "../../assets/icons/ClientBookingCalendar/hours-icon.png";
import TotalShiftPayIcon from "../../assets/icons/ClientBookingCalendar/pay-icon.png";
import ExtraHours from "../../assets/icons/ClientBookingCalendar/time-icon.png";
import Department from "../../assets/icons/ClientBookingCalendar/department-icon.png";
import SignInIcon from "../../assets/icons/ClientManageShift/check-in-icon.png";
import dayjs from "dayjs";

export const ClientCompletedShiftCalculation = [
  { heading: "Total Shift Hours", text: (item: any) => `${Math.round(item.totalHours)} Hrs` },
  { heading: "Shift Type", text: (item: any) => `${item.shift.shiftType}` },
  { heading: "Shift Rate", text: (item: any) => `${item.shiftRate}` },
  { heading: "Total Shift Amount:", text: (item: any) => `${item.shift.totalAmount}` },
  { heading: "Shift Time", text: (item: any) => `${dayjs(item.shift.startTime).format("h:mm A")} - ${dayjs(item.shift.endTime).format("h:mm A")}` },
  { heading: "Extra Hours Worked:", text: (item: any) => `${item.hoursWorked}` },
];

export const ClientCompletedShiftModification = [
  {
    heading: "Signed-off by",
    name: (item: any) => `${item.signedOffBy?.firstName} ${item.signedOffBy?.lastName}`,
    text: (item: any) => `${dayjs(item.signedOffDate).format("ddd, DD-MMM-YY - H:mm A")}`,
  },
  { heading: "Modified By", name: (item: any) => `${item.modifiedBy?.firstName} ${item.modifiedBy?.lastName}`, text: (item: any) => `${dayjs(item.modifiedDate).format("ddd, DD-MMM-YY - H:mm A")}` },
];

export const ClientCompletedShiftProfile = [
  { src: SunIcon, text: (item: any) => item.shift.shiftType },
  { src: ClockIcon, text: (item: any) => `${dayjs(item.shift.shiftDate).format("MMM DD, ddd")} - ${dayjs(item.shift.startTime).format("h:mm A")} TO ${dayjs(item.shift.endTime).format("h:mm A")}` },
  { src: PoundSign, text: (item: any) => `Shift Rate:${item.shiftRate}` },
  { src: DepartmentIcon, text: (item: any) => `Department:${item.shift.department}` },
];


//////////////////////////////
export const staffBookingCalculation = [
  { heading: "Total Shift Hours", text: (item: any) => `${Math.round(item.totalHours)} Hrs` },
  { heading: "Shift Type", text: (item: any) => `${item.shift.shiftType}` },
  { heading: "Shift Rate", text: (item: any) => `${item.shiftRate}` },
  { heading: "Total Shift Amount:", text: (item: any) => `${item.shift.totalAmount}` },
  { heading: "Shift Time", text: (item: any) => `${dayjs(item.shift.startTime).format("h:mm A")} - ${dayjs(item.shift.endTime).format("h:mm A")}` },
  { heading: "Extra Hours Worked:", text: (item: any) => `${item.hoursWorked}` },
  {heading: ``, text: () => ``}
];

export const CompletedShiftModification = [
  {
    heading: "Signed-off by",
    name: (item: any) => `${item.signedOffBy?.firstName} ${item.signedOffBy?.lastName}`,
    text: (item: any) => `${dayjs(item.signedOffDate).format("ddd, DD-MMM-YY - H:mm A")}`,
  },
  { heading: "Modified By", name: (item: any) => `${item.modifiedBy?.firstName} ${item.modifiedBy?.lastName}`, text: (item: any) => `${dayjs(item.modifiedDate).format("ddd, DD-MMM-YY - H:mm A")}` },
];

export const CompletedShiftProfile = [
  { src: SunIcon, text: (item: any) => item.shift.shiftType },
  { src: ClockIcon, text: (item: any) => `${dayjs(item.shift.shiftDate).format("MMM DD, ddd")} - ${dayjs(item.shift.startTime).format("h:mm A")} TO ${dayjs(item.shift.endTime).format("h:mm A")}` },
  { src: PoundSign, text: (item: any) => `Shift Rate:${item.shiftRate}` },
  { src: DepartmentIcon, text: (item: any) => `Department:${item.shift.department}` },
];