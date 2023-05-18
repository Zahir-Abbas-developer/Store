import { commonReportFiltersInterface, shiftBookedReportMockDataInterface } from "../../types/ReportsInterface"

// Filters Array 
export const ShiftBookedReportFilters: commonReportFiltersInterface[] = [
    {
        key: "01",
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
        key: "02",
        labelName: "Staff User Type",
        placeholder: "Select user type",
        optionsArray: [
            {
                value: "Admin",
                label: "Admin",
            },
            {
                value: "Super Admin",
                label: "Super Admin",
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

