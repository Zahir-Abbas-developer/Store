import Profile from "../../assets/icons/unpublishedShift/profile.png";
import Tick from "../../assets/icons/unpublishedShift/tick.png";
import Cross from "../../assets/icons/unpublishedShift/cross.png";

export type TagsType = {
  title: string;
  icon: string;
};
export type CardDataType = {
  userImg: string;
  name: string;
  role: string;
  totalShifts: string;
  tags: TagsType[];
};

export const cardData: CardDataType[] = [
  {
    userImg: Profile,
    name: "Jane Cooper",
    role: "HCA",
    totalShifts: "00",
    tags: [
      { title: "Long Day", icon: Tick },
      { title: "Morning", icon: Cross },
      { title: "Afternoon", icon: Cross },
      { title: "Night", icon: Cross },
    ],
  },
  {
    userImg: Profile,
    name: "Jane Cooper",
    role: "HCA",
    totalShifts: "00",
    tags: [
      { title: "Long Day", icon: Tick },
      { title: "Morning", icon: Cross },
      { title: "Afternoon", icon: Cross },
      { title: "Night", icon: Cross },
    ],
  },
  {
    userImg: Profile,
    name: "Jane Cooper",
    role: "HCA",
    totalShifts: "00",
    tags: [
      { title: "Long Day", icon: Tick },
      { title: "Morning", icon: Cross },
      { title: "Afternoon", icon: Cross },
      { title: "Night", icon: Cross },
    ],
  },
  {
    userImg: Profile,
    name: "Jane Cooper",
    role: "HCA",
    totalShifts: "00",
    tags: [
      { title: "Long Day", icon: Tick },
      { title: "Morning", icon: Cross },
      { title: "Afternoon", icon: Cross },
      { title: "Night", icon: Cross },
    ],
  },
  {
    userImg: Profile,
    name: "Jane Cooper",
    role: "HCA",
    totalShifts: "00",
    tags: [
      { title: "Long Day", icon: Tick },
      { title: "Morning", icon: Cross },
      { title: "Afternoon", icon: Cross },
      { title: "Night", icon: Cross },
    ],
  },
];