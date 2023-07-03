import clockIcon from "../../assets/icons/carerDashboard/clock.png";
import clockIcon1 from "../../assets/icons/training/clock.png";
import clockIcon2 from "../../assets/icons/training/clock-1.png";
import bookingIcon from "../../assets/icons/carerDashboard/noun-booking.png";
import bookingIcon1 from "../../assets/icons/training/noun-booking.png";
import bookingIcon2 from "../../assets/icons/training/noun-booking-1.png";
import trainingGroupIcon from "../../assets/icons/training/training-group.png";
import trainingNoteIcon from "../../assets/icons/training/training-note.png";
import mandatoryIcon from "../../assets/icons/training/mandatory.png";
import popularIcon from "../../assets/icons/training/popular.png";
import optionalIcon from "../../assets/icons/training/optional.png";
import trainingIcon from "../../assets/icons/training/carer-training.png";

export const coursesInfoData: any = [
  {
    color: "blue",
    title: "Mandatory",
    btnTitle: "View Courses",
    link: '/training',
    details: [
      { icon: clockIcon, title: "Total Courses", count: "14" },
      { icon: bookingIcon, title: "Total Courses", count: "02" },
    ],
    img: mandatoryIcon,
  },
  {
    color: "yellow",
    title: "Most Popular",
    btnTitle: "View Courses",
    link: '/training',
    details: [
      { icon: clockIcon2, title: "Total Courses", count: "14" },
      { icon: bookingIcon2, title: "Total Courses", count: "02" },
    ],
    img: popularIcon,
  },
  {
    color: "pink",
    title: "Optionals",
    btnTitle: "View Courses",
    link: '/training/all-courses',
    details: [
      { icon: clockIcon1, title: "Total Courses", count: "14" },
      { icon: bookingIcon1, title: "Total Courses", count: "02" },
    ],
    img: optionalIcon,
  },
  {
    color: "green",
    title: "Carer Training",
    btnTitle: "View Details",
    link: '/training/carer-training',
    details: [
      { icon: trainingGroupIcon, title: "Total Courses", count: "14" },
      { icon: trainingNoteIcon, title: "Total Courses", count: "02" },
    ],
    img: trainingIcon,
  },
];
