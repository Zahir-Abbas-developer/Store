export const CarerBookingCalendarResources = [
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

export const CarerBookingCalendarData = [
  {
    id: "1",
    resourceIds: ["a"],
    title: "Upcoming Shifts",
    eventType: "Unpublished Shifts",
    start: "2023-03-22T12:30:00",
    end: "2023-03-23T12:30:00",
  },
  {
    id: "2",
    resourceIds: ["b"],
    title: "Upcoming Shifts",
    eventType: "Confirmed by Staff",
    start: "2023-03-22T15:30:00",
    end: "2023-03-23T16:30:00",
  },
  {
    id: "3",
    resourceIds: ["c"],
    title: "Upcoming Shifts",
    eventType: "Completed by Staff",
    start: "2023-03-24T17:30:00",
    end: "2023-03-25T18:30:00",
  },
  {
    id: "4",
    resourceIds: ["d"],
    title: "Upcoming Shifts",
    eventType: "Directly Booked and Confirmed",
    start: "2023-03-22T17:30:00",
    end: "2023-03-23T18:30:00",
  },
  {
    id: "5",
    resourceIds: ["e"],
    title: "Upcoming Shifts",
    eventType: "Directly Booked and Awaiting",
    start: "2023-03-22T17:30:00",
    end: "2023-03-23T18:30:00",
  },
];

export const CarerBookingCalendarEventType = [
  { eventType: "Unpublished Shifts", color: "#FA9359" },
  { eventType: "Confirmed by Staff", color: "#2BC155" },
  { eventType: "Completed by Staff", color: "#969BA0" },
  { eventType: "Directly Booked and Confirmed", color: "#65CDF0" },
  { eventType: "Directly Booked and Awaiting", color: "#8D6AB1" },
  { eventType: "Open and Unconfirmed", color: "#5A8BA8" },
];
