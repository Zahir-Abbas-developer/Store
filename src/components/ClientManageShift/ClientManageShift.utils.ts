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

export const clientShiftConfirmData = [
  { label: "Date", value: (item: any) =>  `${dayjs(item?.shift?.shiftDate).format('MMM DD, dddd - YYYY')}`, icon: DateIcon },
  { label: "Shift Timing", value: (item: any) => `${dayjs(item?.shift?.startTime).format('hh:mm')} - ${dayjs(item?.shift?.endTime).format('hh:mm')}`, icon: ShiftIcon },
  { label: "Check In/Check Out Time:", value: (item: any) => `${dayjs(item?.shift?.startTime).format('hh:mm')} - ${dayjs(item?.shift?.endTime).format('hh:mm')}`, icon: SignInIcon },
  { label: "Total Shift Hours", value: (item: any) => `${item?.totalHours} Hrs`, icon: TotalShiftHoursIcon },
  { label: "Total Shift Pay", value: (item: any) => `£${item.totalAmount}.00`, icon: TotalShiftPayIcon },
  { label: "Extra Hours Worked", value: (item: any) => ``, icon: ExtraHours },
  { label: "Department", value:  (item: any) => `${item?.shift?.department}`, icon: Department },
];

export const clientShiftSignOffData = [
  { label: "Check in Sign off", value: (item: any) => ``, icon: Department },
  { label: "Date", value: (item: any) => `${dayjs(item?.shift?.shiftDate).format('MMM DD, dddd - YYYY')}`, icon: DateIcon },
  { label: "Check In", value: (item: any) => ``, icon: SignInIcon },
  { label: "Check Out", value: (item: any) => ``, icon: SignInIcon },
  { label: "Shift Timing", value: (item: any) => `${dayjs(item?.shift?.startTime).format('hh:mm')} - ${dayjs(item?.shift?.endTime).format('hh:mm')}`, icon: ShiftIcon },
  { label: "Total Shift Hours", value: (item: any) => `${item?.totalHours} Hrs`, icon: TotalShiftHoursIcon },
  { label: "Total Shift Pay", value: (item: any) => ``, icon: TotalShiftPayIcon },
  { label: "Extra Hours Worked", value: (item: any) => ``, icon: ExtraHours },
  { label: "Department", value: (item: any) => `${item?.shift?.department}`, icon: Department },
];

export const ClientUpcomingShiftData = [
  { src: HomeIcon, text: (item: any) => `${item.carer.firstName} ${item.carer.lastName}` },
  { src: Calander, text: (item: any) => dayjs(item.shift.shiftDate).format("ddd, MMMM DD YYYY") },
  { src: ClockIcon, text: (item: any) => `${dayjs(item.shift.startTime).format("h:mm A")} TO ${dayjs(item.shift.endTime).format("h:mm A")}` },
  { src: SunIcon, text: (item: any) => item.shift.shiftType },
  { src: PoundSign, text: (item: any) => `Shift Rate:£${item.shiftRate}` },
];

export const ClientCompletedShiftProfile = [
  { src: SunIcon, text: (item: any) => item.shift.shiftType },
  { src: ClockIcon, text: (item: any) => `${dayjs(item.shift.shiftDate).format("MMM DD, ddd")} - ${dayjs(item.shift.startTime).format("h:mm A")} TO ${dayjs(item.shift.endTime).format("h:mm A")}` }, 
  { src: PoundSign, text: (item: any) => `Shift Rate: ${item.shiftRate ? item.shiftRate :""}` },
  { src: DepartmentIcon, text: (item: any) => `Department: ${item.shift.department?.name ? item.shift.department?.name : ""}` },
];

export const ClientCompletedShiftCalculation = [
  {heading: "Total Shift Hours", text: (item: any) => `${Number(item.totalHours).toFixed(2)} Hrs`},
  {heading: "Shift Type", text: (item: any) => `${item.shift.shiftType}`},
  {heading: "Shift Rate", text: (item: any) => `${item.shiftRate}`},
  {heading: "Total Shift Amount:", text: (item: any) => `${item?.clientAmount ? Number(item?.clientAmount).toFixed(2) : ""}`},
  {heading: "Shift Time", text: (item: any) => `${dayjs(item.shift.startTime).format("h:mm A")} - ${dayjs(item.shift.endTime).format("h:mm A")}`},
  {heading: "Extra Hours Worked:", text: (item: any) => `${item?.extraHours ? Number(item?.extraHours).toFixed(2) : 0} Hrs`},
]

export const ClientCompletedShiftModification = [
  {heading: "Signed-off by", name: (item: any) => `${item.signedOffBy?.firstName} ${item.signedOffBy?.lastName}`, text: (item: any) => `${dayjs(item.signedOffDate).format('ddd, DD-MMM-YY - H:mm A')}`},
  {heading: "Modified By", name: (item: any) => `${item.modifiedBy?.firstName} ${item.modifiedBy?.lastName}`, text: (item: any) => `${dayjs(item.modifiedDate).format('ddd, DD-MMM-YY - H:mm A')}`}
]

export const ClientSignOffShiftData = [
  { src: HomeIcon, text: (item: any) => item.careHome?.clientName },
  { src: Calander, text: (item: any) => dayjs(item.shift?.shiftDate).format("ddd, MMMM DD YYYY") },
  { src: ClockIcon, text: (item: any) => `${dayjs(item.shift?.startTime).format("h:mm A")} TO ${dayjs(item.shift?.endTime).format("h:mm A")}` },
  { src: SunIcon, text: (item: any) => item.shift?.shiftType },
  { src: PoundSign, text: (item: any) => `Shift Rate:£${item.shiftRate}` },
];