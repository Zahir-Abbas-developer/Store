
// Interface
import { attendanceReportDetailsMockDataInterface, commonReportFiltersInterface, staffAttendanceReportMockDataInterface } from "../../types/ReportsInterface";

// Assets
import harryJoseph2Img from "../../assets/images/MockImages/harry-joseph-2.png";
import harryJosephImg from "../../assets/images/MockImages/harry-joseph.png";
import jittuJoseph2Img from "../../assets/images/MockImages/jittu-joseph-2.png";
import jittuJosephImg from "../../assets/images/MockImages/jittu-joseph.png";
import sallyBreayImg from "../../assets/images/MockImages/sally-breay.png";
import abidMustafaImg from "../../assets/images/MockImages/abid-mustafa.png";
import abidMustafa2Img from "../../assets/images/MockImages/abid-mustafa-2.png";



// Filters Array 
export const StaffAttendanceReportFilters: commonReportFiltersInterface[] = [
    {
        key: "01",
        labelName: "Staff Name",
        placeholder: "Select staff name",
        optionsArray: [
            {
                value: "Maaz Khan",
                label: "Maaz Khan",
            },
            {
                value: "Aesa Khan",
                label: "Aesa Khan",
            },
            {
                value: "Ali Rehman",
                label: "Ali Rehman",
            }
        ]
    },
    {
        key: "02",
        labelName: "Client Name",
        placeholder: "Select client name",
        optionsArray: [
            {
                value: "Maaz Khan",
                label: "Maaz Khan",
            },
            {
                value: "Aesa Khan",
                label: "Aesa Khan",
            },
            {
                value: "Ali Rehman",
                label: "Ali Rehman",
            }
        ]
    },
    {
        key: "03",
        labelName: "Time Frame",
        placeholder: "Select time frame",
        optionsArray: [
            {
                value: "Morning",
                label: "Morning",
            },
            {
                value: "Afternoon",
                label: "Afternoon",
            },
            {
                value: "Evening",
                label: "Evening",
            }
        ]
    },

]


// Attendance Report Details Mock Data
export const AttendanceReportDetailsMockData: attendanceReportDetailsMockDataInterface[] = [
    {
        key: "01",
        date: "05 / 02 / 2021",
        day: "Monday",
        time: "12 : 42 : 48",
        checkInOut: "In",
        actualHours: "05: 03: 46",
        salaryHours: "05: 03: 46",
    },
    {
        key: "02",
        date: "05 / 03 / 2021",
        day: "Tuesday",
        time: "17 : 46 : 34",
        checkInOut: "Out",
        actualHours: "",
        salaryHours: "00: 00: 00",
    },
    {
        key: "03",
        date: "05 / 02 / 2021",
        day: "Monday",
        time: "18 : 19 : 52",
        checkInOut: "In",
        actualHours: "02 : 02: 49",
        salaryHours: "00 : 00: 00",
    },
]