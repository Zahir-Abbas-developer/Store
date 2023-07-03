import UserMock from "../../assets/BookingCalander/icons/calander-user.svg";
import FirstUser from "../../assets/BookingCalander/images/first-user.png";
import SecondUser from "../../assets/BookingCalander/images/second-user.png";
import ThirdUser from "../../assets/BookingCalander/images/third-user.png";
import FourthUser from "../../assets/BookingCalander/images/fourth-user.png";



export const clientsData = [
  {
    id: "a",
    title: "Jane Cooper",
    userImg: FirstUser,
  },
  {
    id: "b",
    title: "Jane Cooper",
    userImg: UserMock,
  },
  {
    id: "c",
    title: "Jane Cooper",
    userImg: SecondUser,
  },
  {
    id: "d",
    title: "Jane Cooper",
    userImg: ThirdUser,
  },
  {
    id: "e",
    title: "Jane Cooper",
    userImg: FourthUser,
  },
  {
    id: "f",
    title: "Jane Cooper1",
    userImg: UserMock,
  },
  {
    id: "g",
    title: "Jane Cooper2",
    userImg: UserMock,
  },
  {
    id: "h",
    title: "Jane Cooper2",
    userImg: UserMock,
  },
  {
    id: "i",
    title: "Jane Cooper",
    userImg: UserMock,
  },
];


export const timeAndAttendance = [
  {
    id: "a",
    clientName: "Jane Cooper",
    title: "Annette Black",
    staffImg: UserMock,
    clientImg: UserMock,
  },
  {
    id: "b",
    clientName: "Jane Cooper1",
    title: "Annette Black",
    staffImg: UserMock,
    clientImg: UserMock,
  },
  {
    id: "c",
    clientName: "Jane Cooper2",
    title: "Annette Black",
    staffImg: UserMock,
    clientImg: UserMock,
  },
  {
    id: "d",
    clientName: "Jane Cooper3",
    title: "Annette Black",
    staffImg: UserMock,
    clientImg: UserMock,
  },
  {
    id: "e",
    clientName: "Jane Coopers4",
    title: "Annette Black",
    staffImg: UserMock,
    clientImg: UserMock,
  },
  {
    id: "f",
    clientName: "Jane Coopers5",
    title: "Annette Black",
    staffImg: UserMock,
    clientImg: UserMock,
  },
  {
    id: "g",
    clientName: "Jane Coopers6",
    title: "Annette Black",
    staffImg: UserMock,
    clientImg: UserMock,
  },
  {
    id: "h",
    clientName: "Jane Coopers7",
    title: "Annette Black",
    staffImg: UserMock,
    clientImg: UserMock,
  },
  {
    id: "i",
    clientName: "Jane Cooper8",
    title: "Annette Black",
    staffImg: UserMock,
    clientImg: UserMock,
  },
  {
    id: "j",
    clientName: "Jane Cooper9",
    title: "Annette Black",
    staffImg: UserMock,
    clientImg: UserMock,
  },
];
export const timeSheetData = [
  {
    id: "a",
    clientName: "Jane Cooper",
    title: "Theresa Webb",
    staffImg: UserMock,
    clientImg: UserMock,
  },
  {
    id: "b",
    clientName: "Jane Cooper",
    title: "Floyd Miles",
    staffImg: UserMock,
    clientImg: UserMock,
  },
  {
    id: "c",
    clientName: "Jane Coopers",
    title: "Theresa Webb",
    staffImg: UserMock,
    clientImg: UserMock,
  },
  {
    id: "d",
    clientName: "Jane Coopers",
    title: "Floyd Miles",
    staffImg: UserMock,
    clientImg: UserMock,
  },
  {
    id: "e",
    clientName: "Jane Coopers1",
    title: "Theresa Webb",
    staffImg: UserMock,
    clientImg: UserMock,
  },
  {
    id: "f",
    clientName: "Jane Coopers1",
    title: "Floyd Miles",
    staffImg: UserMock,
    clientImg: UserMock,
  },
  {
    id: "g",
    clientName: "Jane Coopers2",
    title: "Theresa Webb",
    staffImg: UserMock,
    clientImg: UserMock,
  },
  {
    id: "h",
    clientName: "Jane Coopers2",
    title: "Floyd Miles",
    staffImg: UserMock,
    clientImg: UserMock,
  },
  {
    id: "i",
    clientName: "Jane Cooper3",
    title: "Theresa Webb",
    staffImg: UserMock,
    clientImg: UserMock,
  },
  {
    id: "j",
    clientName: "Jane Cooper3",
    title: "Floyd Miles",
    staffImg: UserMock,
    clientImg: UserMock,
  },
];

export const calanderEvents = [
  {
    id: "1",
    resourceIds: ["a"],
    title: "HCA",
    status: "Unpublished Shifts",
    start: "2023-03-30T02:00:00",
    end: "2023-03-30T03:00:00",
    borderColor: "#FF4D4F",
  },
  {
    id: "2",
    resourceIds: ["a"],
    title: "HCA",
    status: "Confirmed by Staff",
    start: "2023-03-30T02:00:00",
    end: "2023-03-30T03:00:00",
    borderColor: "#2A9D8F",
  },
  {
    id: "3",
    resourceIds: ["a"],
    title: "HCA",
    status: "Completed by Staff",
    start: "2023-03-21T02:00:00",
    end: "2023-03-21T00:00:00",
  },
  {
    id: "4",
    resourceIds: ["d"],
    title: "HCA",
    status: "Directly Booked and Confirmed",
    start: "2023-03-22T02:00:00",
    end: "2023-03-22T08:20:00",
  },
  {
    id: "5",
    resourceIds: ["e"],
    title: "HCA",
    status: "Directly Booked and Awaiting",
    start: "2023-03-23T02:00:00",
    end: "2023-03-23T08:20:00",
  },
  {
    id: "6",
    resourceIds: ["f"],
    title: "HCA",
    status: "Directly Booked",
    start: "2023-03-24T02:00:00",
    end: "2023-03-24T08:20:00",
  },
  {
    id: "7",
    resourceIds: ["g"],
    title: "HCA",
    status: "Open and Unconfirmed",
    start: "2023-03-25T02:00:00",
    end: "2023-03-25T08:20:00",
  },
];
export const timeSheetCalanderEvents = [
  {
    id: "1",
    resourceIds: ["a"],
    title: "HCA",
    status: "Signed Off",
    start: "2023-03-19T02:00:00",
    end: "2023-03-19T08:00:00",
    borderColor: "#FF4D4F",
  },
  {
    id: "2",
    resourceIds: ["b"],
    title: "HCA",
    status: "Verification Pending",
    start: "2023-03-20T02:00:00",
    end: "2023-03-20T08:20:00",
    borderColor: "#2A9D8F",
  },
  {
    id: "3",
    resourceIds: ["c"],
    title: "HCA",
    status: "Submitted for Sign Off",
    start: "2023-03-21T02:00:00",
    end: "2023-03-21T08:20:00",
  },
  {
    id: "4",
    resourceIds: ["d"],
    title: "HCA",
    status: "Pending Sign Off request or On going",
    start: "2023-03-22T02:00:00",
    end: "2023-03-22T08:20:00",
  },
  {
    id: "5",
    resourceIds: ["e"],
    title: "HCA",
    status: "Warning",
    start: "2023-03-23T02:00:00",
    end: "2023-03-23T08:20:00",
  },
];
export const timeAttendanceCalanderEvents = [
  {
    id: "1",
    resourceIds: ["a"],
    title: "HCA",
    status: "Not Token",
    start: "2023-03-19T02:00:00",
    end: "2023-03-19T08:00:00",
    borderColor: "#FF4D4F",
  },
  {
    id: "2",
    resourceIds: ["b"],
    title: "HCA",
    status: "Early",
    start: "2023-03-20T02:00:00",
    end: "2023-03-20T08:20:00",
    borderColor: "#2A9D8F",
  },
  {
    id: "3",
    resourceIds: ["c"],
    title: "HCA",
    status: "On Time",
    start: "2023-03-21T02:00:00",
    end: "2023-03-21T08:20:00",
  },
  {
    id: "4",
    resourceIds: ["d"],
    title: "HCA",
    status: "Late",
    start: "2023-03-22T02:00:00",
    end: "2023-03-22T08:20:00",
  },
];
