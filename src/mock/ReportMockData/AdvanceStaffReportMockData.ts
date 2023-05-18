// Interfaces
import { advanceStaffCardDataInterface, advanceStaffReportOptionsDataInterface } from "../../types/ReportsInterface";

// Assets
import ProfileImg from "../../assets/images/MockImages/child-avatar.png"

// OPtions Data
export const AdvanceStaffReportOptionsData: advanceStaffReportOptionsDataInterface[] = [
    {
        key: "1",
        label: "Domestic - (DOM)",
        value: "Domestic - (DOM)",
        disabled: true
    },
    {
        key: "2",
        label: "Health Care Assistant - (HCA)",
        value: "Health Care Assistant - (HCA)"
    },
    {
        key: "3",
        label: "Registered General Nurse - (RGN",
        value: "Registered General Nurse - (RGN)"
    },
    {
        key: "4",
        label: "Senior Health Care Assistant - (SHCA)",
        value: "Senior Health Care Assistant - (SHCA)"
    },
    {
        key: "5",
        label: "Support Worker - (SW)",
        value: "Support Worker - (SW)"
    },
];

// Advance staff card Mock Data
export const advanceStaffCardData: advanceStaffCardDataInterface[] = [
    {
        key: '1',
        profileImg: ProfileImg,
        rating: "95",
        title: "John Doe",
        tag: "HCA",
        location: "CB21 4XN",
        gmail: "staffiyhca@gmail.com",
        phoneNumber: "05825896853"
    },
    {
        key: '2',
        profileImg: ProfileImg,
        rating: "83",
        title: "Jessie Clarcson",
        tag: "HCA",
        location: "CB21 4XN",
        gmail: "staffiyhca@gmail.com",
        phoneNumber: "05825896853"
    },
    {
        key: '3',
        profileImg: ProfileImg,
        rating: "83",
        title: "Jessie Clarcson",
        tag: "HCA",
        location: "CB21 4XN",
        gmail: "staffiyhca@gmail.com",
        phoneNumber: "05825896853"
    },
    {
        key: '4',
        profileImg: ProfileImg,
        rating: "83",
        title: "Jessie Clarcson",
        tag: "HCA",
        location: "CB21 4XN",
        gmail: "staffiyhca@gmail.com",
        phoneNumber: "05825896853"
    }
]