import {  commonReportFiltersInterface } from "../../types/ReportsInterface"



// Filters Array 
export const CarerRequestReportFilters: commonReportFiltersInterface[] = [
    {
        key: "01",
        labelName: "Care Home",
        placeholder: "Select care home",
        optionsArray: [
            {
                value: "Care Home",
                label: "Care Home",
            },
        ]
    },
    {
        key: "02",
        labelName: "Request Type",
        placeholder: "Select request type",
        optionsArray: [
            {
                value: "Out of Office",
                label: "Out of Office",
            },
            {
                value: "Emergency Shift Off",
                label: "Emergency Shift Off",
            },
            {
                value: "Change Check-In Time",
                label: "Change Check-In Time",
            },
            {
                value: "Other",
                label: "Other",
            },
        ]
    },
    {
        key: "03",
        labelName: "Status",
        placeholder: "Select status",
        optionsArray: [
            {
                value: "Pending",
                label: "Pending",
            },
            {
                value: "Approved",
                label: "Approved",
            },
            {
                value: "Rejected",
                label: "Rejected",
            }
        ]
    },
    {
        key: "04",
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

