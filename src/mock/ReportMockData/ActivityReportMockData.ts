import {  commonReportFiltersInterface } from "../../types/ReportsInterface";

// Filters Array 
export const ActivityReportFilters: commonReportFiltersInterface[] = [
    {
        key: "01",
        labelName: "Activity By",
        placeholder: "Select name",
        optionsArray: [
            {
                value: "Timesheet",
                label: "Timesheet",
            },
            {
                value: "Staff Direct Booking",
                label: "Staff Direct Booking",
            },
            {
                value: "Shift Direct Booking",
                label: "Shift Direct Booking",
            },
        ]
    },
    {
        key: "02",
        labelName: "Activity Type",
        placeholder: "Select activity type",
        optionsArray: [
            {
                value: "Shift Direct Booking",
                label: "Shift Direct Booking",
            },
            {
                value: "Shift Direct Staff",
                label: "Shift Direct Staff",
            },
            {
                value: "Shift Allocated Staff",
                label: "Shift Allocated Staff",
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
