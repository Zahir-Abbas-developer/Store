import activityClock from "../../assets/icons/training/activity-clock.png";
import activityNote from "../../assets/icons/training/activity-note.png";

export type RecentActivityDataType = {
  bgColor: string;
  color: string;
  icon: string;
  title: string;
  desc: string;
  date: string;
};

export const recentActivityData:RecentActivityDataType[] = [
  {
    bgColor: "bg-blue",
    color: "blue",
    icon: activityClock,
    title: "Course Updated",
    desc: "It is a long established fact that a reader will bedistracted by the readable...",
    date: "29-09-2022",
  },
  {
    bgColor: "bg-yellow",
    color: "yellow",
    icon: activityNote,
    title: "Course Updated",
    desc: "It is a long established fact that a reader will bedistracted by the readable...",
    date: "29-09-2022",
  },
  {
    bgColor: "bg-blue",
    color: "blue",
    icon: activityClock,
    title: "Course Updated",
    desc: "It is a long established fact that a reader will bedistracted by the readable...",
    date: "29-09-2022",
  },
];