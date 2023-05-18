// Interfaces
import { commonReportFiltersInterface, extraHoursReportTableMockDataInterface } from "../../types/ReportsInterface"

// Filters Array 
export const ExtraHoursReportFilters: commonReportFiltersInterface[] = [
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
        labelName: "Approval Status",
        placeholder: "Select approval status",
        optionsArray: [
            {
                value: "Yes",
                label: "Yes",
            },
            {
                value: "No",
                label: "No",
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
    {
        key: "04",
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
]

