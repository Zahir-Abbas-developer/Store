
import ProfileImg from "../assets/images/MockImages/child-avatar.png"

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

export const ShiftBookingBtn = [
  { id: "1", btnText: "Post New Shift", color: "#65CDF0" },
  { id: "2", btnText: "Book Staff Direct", color: "#1890FF" },
  { id: "3", btnText: "Confirmed Shift", color: "#52C41A" },
  { id: "4", btnText: "Unfilled Shifts", color: "#F7B923" },
  { id: "5", btnText: "UnPublished Shift", color: "#EE2E7E" },
  { id: "6", btnText: "Shift Calendar", color: "#4E4B66" },
];

export const ShiftBookingTableData = [
  {
    id: "01",
    shiftDate: "Fri, July 22 2022",
    shiftType: "Night Shift",
    staffType: "HCA",
    requestedBy: "ANA MIHAI",
    staffRequired: "3",
    shiftStatus: "Booking Awaiting",
  },
  {
    id: "02",
    shiftDate: "Fri, July 22 2022",
    shiftType: "Night Shift",
    staffType: "HCA",
    requestedBy: "ANA MIHAI",
    staffRequired: "3",
    shiftStatus: "Partially Booked",
  },
  {
    id: "03",
    shiftDate: "Fri, July 22 2022",
    shiftType: "Night Shift",
    staffType: "HCA",
    requestedBy: "ANA MIHAI",
    staffRequired: "3",
    shiftStatus: "Booking Completed",
  },
];

export const ConfirmedShiftBookingTableData = [
  {
    id: "01",
    staffName: "Faisal Naeem",
    staffPhoto: "HC",
    shiftDate: "10-05-2022",
    shiftType: "HCA",
    shiftName: "Night Shift",
    bookedBy: "Faisal Naeem",
    shiftRate: "250",
  },
  {
    id: "02",
    staffName: "Faisal Naeem",
    staffPhoto: "PH",
    shiftDate: "10-05-2022",
    shiftType: "HCA",
    shiftName: "Night Shift",
    bookedBy: "Faisal Naeem",
    shiftRate: "250",
  },
  {
    id: "03",
    staffName: "Faisal Naeem",
    staffPhoto: "AC",
    shiftDate: "10-05-2022",
    shiftType: "HCA",
    shiftName: "Night Shift",
    bookedBy: "Faisal Naeem",
    shiftRate: "250",
  },
];

export const advanceSearchUserType = [
  { id: "1", label: "Domestic - (DOM)", value: "Domestic - (DOM)", disabled: true },
  { id: "2", label: "Health Care Assistant - (HCA)", value: "Health Care Assistant - (HCA)" },
  { id: "3", label: "Registered General Nurse - (RGN", value: "Registered General Nurse - (RGN)" },
  { id: "4", label: "Senior Health Care Assistant - (SHCA)", value: "Senior Health Care Assistant - (SHCA)" },
  { id: "5", label: "Support Worker - (SW)", value: "Support Worker - (SW)" },
];

export const UnfilledShiftBookingTableData = [
  {
    id: "01",
    jobDate: "10-05-2022",
    clientName: "Novel",
    shiftName: "Night",
    bookedBy: "Novel",
    staffRequired: "1",
    staffBooked: "1",
    staffBookedAt: "22-05-2022",
    timeDiff: "06:05:00"
  },
  {
    id: "02",
    jobDate: "10-05-2022",
    clientName: "Novel",
    shiftName: "Night",
    bookedBy: "Novel",
    staffRequired: "1",
    staffBooked: "1",
    staffBookedAt: "22-05-2022",
    timeDiff: "06:05:00"
  },
  {
    id: "03",
    jobDate: "10-05-2022",
    clientName: "Novel",
    shiftName: "Night",
    bookedBy: "Novel",
    staffRequired: "1",
    staffBooked: "1",
    staffBookedAt: "22-05-2022",
    timeDiff: "06:05:00"
  },
];

// advance staff card
export const advanceStaffCardData = [
  {
    id: '1',
    profileImg: ProfileImg,
    rating: "95",
    title: "John Doe",
    tag: "HCA",
    location: "CB21 4XN",
    gmail: "staffiyhca@gmail.com",
    phoneNumber: "05825896853"
  },
  {
    id: '2',
    profileImg: ProfileImg,
    rating: "83",
    title: "Jessie Clarcson",
    tag: "HCA",
    location: "CB21 4XN",
    gmail: "staffiyhca@gmail.com",
    phoneNumber: "05825896853"
  },
  // {
  //   id: '3',
  //   profileImg: ProfileImg,
  //   rating: "83",
  //   title: "Jessie Clarcson",
  //   tag: "HCA",
  //   location: "CB21 4XN",
  //   gmail: "staffiyhca@gmail.com",
  //   phoneNumber: "05825896853"
  // },
  // {
  //   id: '4',
  //   profileImg: ProfileImg,
  //   rating: "83",
  //   title: "Jessie Clarcson",
  //   tag: "HCA",
  //   location: "CB21 4XN",
  //   gmail: "staffiyhca@gmail.com",
  //   phoneNumber: "05825896853"
  // }
]