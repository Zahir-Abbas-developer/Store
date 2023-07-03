import bookingIcon from "../assets/icons/carerDashboard/noun-booking.png";
import bookingIcon1 from "../assets/icons/carerDashboard/noun-booking-1.png";
import bookingIcon2 from "../assets/icons/carerDashboard/noun-booking-2.png";
import sunIcon from "../assets/icons/carerDashboard/sun.png";
import clockIcon from "../assets/icons/carerDashboard/clock.png";
import clockIcon1 from "../assets/icons/carerDashboard/clock-1.png";
import clockIcon2 from "../assets/icons/carerDashboard/clock-2.png";
import ReviewsImg from "../assets/images/MockImages/user-reviews.png";
import ClockIcon3 from "../assets/icons/ClientDashboard/clock-icon.png";
import DatePickerIcon from "../assets/icons/ClientDashboard/date-picker.png";
import locationIcon from "../assets/icons/carerDashboard/location.png";
import locationIcon1 from "../assets/icons/carerDashboard/location-1.png";

export const renderClientCard: any = {
  "Upcoming Shifts": { booking: bookingIcon, color: "upxcoming", sun: sunIcon, rate: clockIcon, location:locationIcon},
  "Available Shifts": { booking: bookingIcon1, color: "ssad", sun: sunIcon, rate: clockIcon1,location:locationIcon1 },
  "Last Shift Details": { booking: bookingIcon2, color: "last", sun: sunIcon, rate: clockIcon2 },
  "Cancelled Shifts": { booking: DatePickerIcon, color: "cancel", sun: sunIcon, rate: ClockIcon3 },
};

export const ClientCardData: any = [
  {
    title: "Upcoming Shifts",
    heading: "Tall Tree Care Home",
    dateTime: "May 18, Tue - 20:00 pm",
    day: "longday",
    shiftRate: "275.00",
  },
  {
    title: "Available Shifts",
    heading: "Tall Tree Care Home",
    dateTime: "May 18, Tue - 20:00 pm",
    day: "longday",
    shiftRate: "275.00",
  },
  {
    title: "Last Shift Details",
    heading: "Tall Tree Care Home",
    dateTime: "May 18, Tue - 20:00 pm",
    day: "longday",
    shiftRate: "275.00",
    checkStatus: {
      checkIn: "11:44 pm",
      checkOut: "11:44 pm",
    },
  },
  {
    title: "Canceled Shifts",
    heading: "Tall Tree Care Home",
    dateTime: "May 18, Tue - 20:00 pm",
    day: "longday",
    shiftRate: "275.00",
  },
];

export const recentReviewsData = [
  {
    id: "1",
    img: ReviewsImg,
    title: "There are many variations available...",
    timeZone: "02 April, 2021 | 02:00 PM",
  },
  {
    id: "2",
    img: ReviewsImg,
    title: "Contrary to popular belief...",
    timeZone: "01 April, 2021 | 03:00 PM",
  },
  {
    id: "3",
    img: ReviewsImg,
    title: "There are many variations available...",
    timeZone: "04 April, 2021 | 04:00 PM",
  },
  {
    id: "4",
    img: ReviewsImg,
    title: "Contrary to popular belief...",
    timeZone: "03 April, 2021 | 02:00 PM",
  },
];

export const clientDashboardCalendarData = [
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

export const clientDashboardEventsData = [
  {
    id: "1",
    resourceIds: ["a"],
    title: "Morning",
    start: "2023-03-22T06:00:00",
    end: "2023-03-23T12:40:00",
    totalShift: "9",
    totalCarers: "9",
  },
  {
    id: "2",
    resourceIds: ["b"],
    title: "Morning",
    start: "2023-03-21T09:00:00",
    end: "2023-03-22T10:20:00",
    totalShift: "9",
    totalCarers: "9",
  },
  {
    id: "3",
    resourceIds: ["c"],
    title: "Morning",
    start: "2023-03-23T09:00:00",
    end: "2023-03-24T10:20:00",
    totalShift: "9",
    totalCarers: "9",
  },
];
