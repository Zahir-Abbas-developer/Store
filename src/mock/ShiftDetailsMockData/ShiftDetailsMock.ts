import HomeIcon from "../../assets/icons/ShiftDetails/HomeIcon.svg";
import LocationIcon from "../../assets/icons/ShiftDetails/LocationIcon.svg";
import DateIcon from "../../assets/icons/ShiftDetails/DateIcon.svg";
import TimeIcon from "../../assets/icons/ShiftDetails/TimeIcon.svg";
import ShiftTypeIcon from "../../assets/icons/ShiftDetails/ShiftTypeIcon.svg";
import EuroIcon from "../../assets/icons/ShiftDetails/EuroIcon.svg";
import DepartmentIcon from "../../assets/icons/ShiftDetails/DepartmentIcon.svg";


export const availableShiftCardData = [
  {
    id: 1,
    title: "Tall Tree Care Home",
    address: "1, 1 Webb's RoadLondon, S...",
    date: "May 18, Tuesday ",
    time: "8:00 PM  TO  4:00 AM",
    weather: "Longday",
    shiftRate: "Shift Rate: <strong>£275.00</strong>",
    homeIcon: HomeIcon,
    locationIcon: LocationIcon,
    dateIcon: DateIcon,
    timeIcon: TimeIcon,
    shiftTypeIcon:ShiftTypeIcon,
    euroIcon: EuroIcon,
    rateStar:4,
  },
  {
    id: 2,
    title: "Tall Tree Care Home",
    address: "1, 1 Webb's RoadLondon, S...",
    date: "May 18, Tuesday ",
    time: "8:00 PM  TO  4:00 AM",
    weather: "Longday",
    shiftRate: "Shift Rate: <strong>£275.00</strong>",
    homeIcon: HomeIcon,
    locationIcon: LocationIcon,
    dateIcon: DateIcon,
    timeIcon: TimeIcon,
    ShiftTypeIcon: ShiftTypeIcon,
    euroIcon: EuroIcon,
    rateStar:4,
  },
  {
    id: 3,
    title: "Tall Tree Care Home",
    address: "1, 1 Webb's RoadLondon, S...",
    date: "May 18, Tuesday ",
    time: "8:00 PM  TO  4:00 AM",
    weather: "Longday",
    shiftRate: "Shift Rate: <strong>£275.00</strong>",
    homeIcon: HomeIcon,
    locationIcon: LocationIcon,
    dateIcon: DateIcon,
    timeIcon: TimeIcon,
    ShiftTypeIcon: ShiftTypeIcon,
    euroIcon: EuroIcon,
    rateStar:4,
  },
  {
    id: 4,
    title: "Tall Tree Care Home",
    address: "1, 1 Webb's RoadLondon, S...",
    date: "May 18, Tuesday ",
    time: "8:00 PM  TO  4:00 AM",
    weather: "Longday",
    shiftRate: "Shift Rate: <strong>£275.00</strong>",
    homeIcon: HomeIcon,
    locationIcon: LocationIcon,
    dateIcon: DateIcon,
    timeIcon: TimeIcon,
    ShiftTypeIcon: ShiftTypeIcon,
    euroIcon: EuroIcon,
    rateStar:4,
  },
];

// Modal Mock data
export const modalInfodata=[
  {
    id:1,
    title:"Tall Tree Care Home",
    address:"Tho Grip, Linton, Cambridge, England, Cambridgeshire, CB21 4XN",
    totalShiftHours:"9.00 Hrs.",
    date:"May 22,Sun - 2022",
    shiftTiming:"07:30 - 17:00",
    totalShiftPay:'£275.00',
    department:"DEP-1",
    distance:"",
    homeIcon: HomeIcon,
  }
]
// cancel shift mock data
export const cancelShiftData=[
  { id:1,
    titleImg:HomeIcon,
    weatherImg:ShiftTypeIcon,
    dateImg:DateIcon,
    shiftRateImg:EuroIcon,
    title:"Tall Tree Care Home",
    weather:"Longday",
    date:"May 18, Tue - 8:00 PM  TO  4:00 AM",
    shiftRate:"Shift Rate: <strong>£275.00</strong>",
    shiftCanceledBy:"Care Coordinator",
    dateDetail:"May 18, Tue ",
    timeDate:"8:00 PM",
    shiftCancelationReason:"This shift was canceled due to some resource reallocation that happened in the care home"

  },
  { id:2,
    titleImg:HomeIcon,
    weatherImg:ShiftTypeIcon,
    dateImg:DateIcon,
    shiftRateImg:EuroIcon,
    title:"Tall Tree Care Home",
    weather:"Longday",
    date:"May 18, Tue - 8:00 PM  TO  4:00 AM",
    shiftRate:"Shift Rate: <strong>£275.00</strong>",
    shiftCanceledBy:"Care Coordinator",
    dateDetail:"May 18, Tue ",
    timeDate:"8:00 PM",
    shiftCancelationReason:"This shift was canceled due to some resource reallocation that happened in the care home"

  },
  { id:3,
    titleImg:HomeIcon,
    weatherImg:ShiftTypeIcon,
    dateImg:DateIcon,
    shiftRateImg:EuroIcon,
    title:"Tall Tree Care Home",
    weather:"Longday",
    date:"May 18, Tue - 8:00 PM  TO  4:00 AM",
    shiftRate:"Shift Rate: <strong>£275.00</strong>",
    shiftCanceledBy:"Care Coordinator",
    dateDetail:"May 18, Tue ",
    timeDate:"8:00 PM",
    shiftCancelationReason:"This shift was canceled due to some resource reallocation that happened in the care home"

  },
]

// Completed shift Detail mock data

export const completedShiftData=[
  { id:1,
    titleImg:HomeIcon,
    weatherImg:ShiftTypeIcon,
    dateImg:DateIcon,
    shiftRateImg:EuroIcon,
    departmentImg:DepartmentIcon,
    title:"Tall Tree Care Home",
    weather:"Long day",
    date:"May 18, Tue - 8:00 PM  TO  4:00 AM",
    rate:"Shift Rate: <strong>£275.00</strong>",
    department:"Department <strong>Old Age Care</strong>",
    // 
    totalShiftHours:"15 Hrs",
    shiftTime:"8:00 PM - 4:00 AM ",
    shiftRate:"<strong>£275.00</strong>",
    totalShiftAmount:"<strong>£283.00</strong>",
    shiftType:"<strong>Long Day</strong>",
    extraHoursWorked:"<strong>0 Hrs</strong>",
    endShiftRate:"<strong>£25.00</strong>",
    signedOff:"Signed Off",
    // 
    signedOffBy:"Malcolm Y",
    signedOffDateTime:"Sun, 03 Apr 22 - 8:00 PM",
    modifiedBy:"Ben Franklin",
    modifiedByDateTime:"Sun, 03 Apr 22 - 8:00 PM",
    modificationReason:"The shift timings were modified as the carer arrived later to the care home, than the time that was mentioned in the timesheet"
  

  },
  { id:2,
    titleImg:HomeIcon,
    weatherImg:ShiftTypeIcon,
    dateImg:DateIcon,
    shiftRateImg:EuroIcon,
    departmentImg:DepartmentIcon,
    title:"Tall Tree Care Home",
    weather:"Long day",
    date:"May 18, Tue - 8:00 PM  TO  4:00 AM",
    rate:"Shift Rate: <strong>£275.00</strong>",
    department:"Department <strong>Old Age Care</strong>",
    // 
    totalShiftHours:"15 Hrs",
    shiftTime:"8:00 PM - 4:00 AM ",
    shiftRate:"<strong>£275.00</strong>",
    totalShiftAmount:"<strong>£283.00</strong>",
    shiftType:"<strong>Long Day</strong>",
    extraHoursWorked:"<strong>0 Hrs</strong>",
    endShiftRate:"<strong>£25.00</strong>",
    signedOff:"Signed Off",
    // 
    signedOffBy:"Malcolm Y",
    signedOffDateTime:"Sun, 03 Apr 22 - 8:00 PM",
    // modifiedBy:"Ben Franklin",
    // modifiedByDateTime:"Sun, 03 Apr 22 - 8:00 PM",
    // modificationReason:"The shift timings were modified as the carer arived later to the care home, than the time that was mentioned in the timesheet"

  },
  { id:3,
    titleImg:HomeIcon,
    weatherImg:ShiftTypeIcon,
    dateImg:DateIcon,
    shiftRateImg:EuroIcon,
    departmentImg:DepartmentIcon,
    title:"Tall Tree Care Home",
    weather:"Longday",
    date:"May 18, Tue - 8:00 PM  TO  4:00 AM",
    rate:"Shift Rate: <strong>£275.00</strong>",
    department:"Department <strong>Old Age Care</strong>",
    // 
    totalShiftHours:"15 Hrs",
    shiftTime:"8:00 PM - 4:00 AM ",
    shiftRate:"<strong>£275.00</strong>",
    totalShiftAmount:"<strong>£283.00</strong>",
    shiftType:"<strong>Long Day</strong>",
    extraHoursWorked:"<strong>0 Hrs</strong>",
    endShiftRate:"<strong>£25.00</strong>",
    signedOff:"Signed Off",
    // 
    signedOffBy:"Malcolm Y",
    signedOffDateTime:"Sun, 03 Apr 22 - 8:00 PM",
    // modifiedBy:"Ben Franklin",
    // modifiedByDateTime:"Sun, 03 Apr 22 - 8:00 PM",
    // modificationReason:"The shift timings were modified as the carer arived later to the care home, than the time that was mentioned in the timesheet"

  },
]