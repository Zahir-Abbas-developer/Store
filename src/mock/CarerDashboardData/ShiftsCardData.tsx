import bookingIcon from "../../assets/icons/carerDashboard/noun-booking.png";
import bookingIcon1 from "../../assets/icons/carerDashboard/noun-booking-1.png";
import bookingIcon2 from "../../assets/icons/carerDashboard/noun-booking-2.png";
import sunIcon from "../../assets/icons/carerDashboard/sun.png";
import clockIcon from "../../assets/icons/carerDashboard/clock.png";
import clockIcon1 from "../../assets/icons/carerDashboard/clock-1.png";
import clockIcon2 from "../../assets/icons/carerDashboard/clock-2.png";
import locationIcon from "../../assets/icons/carerDashboard/location.png";
import locationIcon1 from "../../assets/icons/carerDashboard/location-1.png";

export const shiftCardData: any = [
  {
    title: "Upcoming Shifts",
    color: "blue",
    heading: "Tall Tree Care Home",
    details: [
      { icon: bookingIcon, text: "May 18, Tue - 20:00 pm",cursor:"" },
      { icon: sunIcon, text: "Longday",cursor:"" },
      {
        icon: clockIcon,
        text: (
          <div>
            Shift Rate: <span>£275.00</span>
          </div>
        ),
        cursor:""
      },
      { icon: locationIcon, text: "1, 1 Webb's RoadLondon, S...",cursor:"cursor-pointer" },
    ],
  },
  {
    title: "Available Shifts",
    color: "purple",
    heading: "Tall Tree Care Home",
    details: [
      { icon: bookingIcon1, text: "May 18, Tue - 20:00 pm",cursor:"" },
      { icon: sunIcon, text: "Longday",cursor:"" },
      {
        icon: clockIcon1,
        text: (
          <div>
            Shift Rate: <span>£275.00</span>
          </div>
        ),
        cursor:""
      },
      { icon: locationIcon1, text: "1, 1 Webb's RoadLondon, S...",cursor:"cursor-pointer" },
    ],
  },
  {
    title: "Last Shift Details",
    color: "green",
    heading: "Tall Tree Care Home",
    details: [
      { icon: bookingIcon2, text: "May 18, Tue - 20:00 pm" },
      { icon: sunIcon, text: "Longday" },
      {
        icon: clockIcon2,
        text: (
          <div>
            Shift Rate: <span>£275.00</span>
          </div>
        ),
      },
    ],
    checkStatus: {
      checkIn: "11:44 pm",
      checkOut: "11:44 pm",
    },
  },
];
