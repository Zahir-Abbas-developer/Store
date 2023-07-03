import Avatar from '../assets/images/clientManager/vector.svg';
import Avatar2 from '../assets/images/clientManager/vector2.svg';


export const staffBookingData = [
  {
    key: "1",
    avatar: Avatar,
    userName: "David Williams",
    email: "abhigyanpatra@gmail.com",
    phone: "+44 8500 287507",
    gender: "Male",
    userType: "RGN",
    timeToCall: "Any time ",
  },
  {
    key: "2",
    avatar: Avatar2,
    userName: "Bella Watson",
    email: "abhigyanpatra@gmail.com",
    phone: "+44 8500 287507",
    gender: "Female",
    userType: "HCA",
    timeToCall: "Any time ",
  },
  {
    key: "3",
    avatar: Avatar,
    userName: "Charles Darwin ",
    email: "abhigyanpatra@gmail.com",
    phone: "+44 8500 287507",
    gender: "Male",
    userType: "RGN",
    timeToCall: "10 am to 06 pm",
  },
  {
    key: "4",
    avatar: Avatar2,
    userName: "George Orwell ",
    email: "abhigyanpatra@gmail.com",
    phone: "+44 8500 287507",
    gender: "Male",
    userType: "HCA",
    timeToCall: "Any time",
  },
  {
    key: "5",
    avatar: Avatar,
    userName: "abhigyanpatra@gmail.com",
    email: "abhigyanpatra@gmail.com",
    phone: "+44 8500 287507",
    gender: "Male",
    userType: "RGN",
    timeToCall: "10 am to 06 pm",
  },
];

interface DataType {
  key: string;
  sno: string;
  shiftName: string;
  clientName: string;
  shiftDate: string;
  shiftHours: string;
  shiftRate: string;
  shiftAmount: string;
  invoiceNumber: string;
  shiftStatus: string;
  paymentStatus: string;
  paymentDate: string;
}

export const staffWorkHistoryData: DataType[] = [
  {
    key: "1",
    sno: "1",
    shiftName: "Night Shift",
    clientName: "Bondcare Care Home",
    shiftDate: "15/08/2022",
    shiftHours: "11:00",
    shiftRate: "27:00",
    shiftAmount: "297:00",
    invoiceNumber: "-",
    shiftStatus: "Confirmed Shift",
    paymentStatus: "Not Paid",
    paymentDate: "-",
  },
  {
    key: "2",
    sno: "2",
    shiftName: "Long Day",
    clientName: "Bondcare Care Home",
    shiftDate: "10/08/2022 ",
    shiftHours: "11:00",
    shiftRate: "27:00",
    shiftAmount: "297:00",
    invoiceNumber: "2021-004",
    shiftStatus: "Signed Off",
    paymentStatus: "Paid",
    paymentDate: "10/04/2022 ",
  },
  {
    key: "3",
    sno: "3",
    shiftName: "Night Shift",
    clientName: "Laurel Dene Care Home",
    shiftDate: "26/03/2022 ",
    shiftHours: "11:00",
    shiftRate: "25:00",
    shiftAmount: "275:00",
    invoiceNumber: "-",
    shiftStatus: "Confirmed Shift",
    paymentStatus: "Not Paid",
    paymentDate: "-",
  },
  {
    key: "4",
    sno: "4",
    shiftName: "Long Day",
    clientName: "Bondcare Care Home",
    shiftDate: "15/08/2022",
    shiftHours: "11:00",
    shiftRate: "27:00",
    shiftAmount: "297:00",
    invoiceNumber: "2021-004",
    shiftStatus: "Confirmed Shift",
    paymentStatus: "Not Paid",
    paymentDate: "11/02/2022 ",
  },
];

