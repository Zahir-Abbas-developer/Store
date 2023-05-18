import ShiftIcon from "../assets/icons/ClientBookingCalendar/shift-timing-icon.png";
import DateIcon from "../assets/icons/ClientBookingCalendar/date-icon.png";
import TotalShiftHoursIcon from "../assets/icons/ClientBookingCalendar/hours-icon.png";
import TotalShiftPayIcon from "../assets/icons/ClientBookingCalendar/pay-icon.png";
import ExtraHours from "../assets/icons/ClientBookingCalendar/time-icon.png";
import Department from "../assets/icons/ClientBookingCalendar/department-icon.png";
import dayjs from "dayjs";

export const clientBookingCalendarData = [
  {
    id: "a",
    title: "Monday",
  },
  {
    id: "b",
    title: "Tuesday",
  },
  {
    id: "c",
    title: "Wednesday",
  },
  {
    id: "d",
    title: "Thursday",
  },
  {
    id: "e",
    title: "Friday",
  },
  {
    id: "f",
    title: "Saturday",
  },
  {
    id: "g",
    title: "Sunday",
  },
];

export const event = [
  {
    _id: "6433e1666e7621b9a5b4c3f9",
    shiftDate: "2023-04-24T10:13:36.356Z",
    carerType: {
      shortForm: "Position Name",
    },
    start: "2023-04-10T08:04:00.638Z",
    end: "2023-04-10T12:04:00.392Z",
  },
];

export const clientBookingEventsData = [
  {
    id: "1",
    resourceIds: ["b"],
    title: "Morning",
    start: "2023-04-11T06:00:00",
    end: "2023-04-12T12:40:00",
    totalShift: "9",
    totalCarers: "9",
  },
  {
    id: "2",
    resourceIds: ["b"],
    title: "Morning",
    start: "2023-04-11T05:00:00",
    end: "2023-04-13T07:20:00",
    totalShift: "9",
    totalCarers: "9",
  },
  {
    id: "3",
    resourceIds: ["c"],
    title: "Morning",
    start: "2023-03-28T09:00:00",
    end: "2023-03-29T10:20:00",
    totalShift: "9",
    totalCarers: "9",
  },
];

export const ClientBookingShiftDetails = [
  {
    id: "01",
    carer: "Mallesh",
    jobRole: "Nurse",
    shiftTime: "Morning",
    shiftDuration: "8:00 am - 3:00 pm",
    department: "Dementia",
  },
  {
    id: "02",
    carer: "Mallesh",
    jobRole: "Nurse",
    shiftTime: "Morning",
    shiftDuration: "8:00 am - 3:00 pm",
    department: "Dementia",
  },
  {
    id: "03",
    carer: "Mallesh",
    jobRole: "Nurse",
    shiftTime: "Morning",
    shiftDuration: "8:00 am - 3:00 pm",
    department: "Dementia",
  },
];

export const clientViewShiftDetailsData = [
  { id: "1", label: "Shift Timing", value: (item: any) => `${dayjs(item?.shift?.startTime).format('hh:mm a')} - ${dayjs(item?.shift?.endTime).format('hh:mm a')}`, icon: ShiftIcon },
  { id: "2", label: "Date", value: (item: any) => `${dayjs(item?.shift?.shiftDate).format('MMM DD, dddd - YYYY')}`, icon: DateIcon },
  { id: "3", label: "Total Shift Hours", value: (item: any) => `${Number(item?.totalHours)?.toFixed(2)} Hrs`, icon: TotalShiftHoursIcon },
  { id: "4", label: "Total Shift Pay", value: (item: any) => `${item?.shift?.totalAmount}`, icon: TotalShiftPayIcon },
  { id: "5", label: "Extra Hours Worked", value: (item: any) => `${Number(item?.hoursWorked).toFixed(2)} Hrs`, icon: ExtraHours },
  { id: "6", label: "Department", value: (item: any) => `${item?.shift?.department}`, icon: Department },
];
