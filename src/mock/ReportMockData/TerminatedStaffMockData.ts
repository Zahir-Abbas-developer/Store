import { commonReportFiltersInterface, terminatedStaffMockDataInterface } from "../../types/ReportsInterface"

// Filters Array 
export const TerminatedStaffReportFilters: commonReportFiltersInterface[] = [
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
        labelName: "User Role",
        placeholder: "Select user role",
        optionsArray: [
            {
                value: "Super Admin",
                label: "Super Admin",
            },
            {
                value: "Admin",
                label: "Admin",
            },
            {
                value: "User",
                label: "User",
            }
        ]
    },
    {
        key: "03",
        labelName: "Terminated By",
        placeholder: "Select terminated by",
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
