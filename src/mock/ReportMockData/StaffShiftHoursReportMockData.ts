import { commonReportFiltersInterface, staffShiftHoursReportMockDataInterface } from "../../types/ReportsInterface"

// Filters Array 
export const StaffShiftHoursReportFilters: commonReportFiltersInterface[] = [
    {
        key: "01",
        labelName: "Available Options",
        placeholder: "Select options",
        optionsArray: [
            {
                value: "Staff Report",
                label: "Staff Report",
            },
            {
                value: "Client Report",
                label: "Client Report",
            },
        ]
    },
    {
        key: "02",
        labelName: "Options Name",
        placeholder: "Select option Name",
        optionsArray: [
            {
                value: "Staff Report",
                label: "Staff Report",
            },
            {
                value: "Client Report",
                label: "Client Report",
            },
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
