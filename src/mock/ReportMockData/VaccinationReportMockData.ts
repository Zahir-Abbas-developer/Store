import { commonReportFiltersInterface, vaccinationReportTableMockDataInterface } from "../../types/ReportsInterface"

// Filters Array 
export const VaccinationReportFilters: commonReportFiltersInterface[] = [
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
        labelName: "User Status",
        placeholder: "Select user status",
        optionsArray: [
            {
                value: "Active",
                label: "Active",
            },
            {
                value: "In - Active",
                label: "In - Active",
            },
        ]
    },
    {
        key: "03",
        labelName: "User Type",
        placeholder: "Select user type",
        optionsArray: [
            {
                value: "Sr. Health Care Assistant",
                label: "Sr. Health Care Assistant",
            },
            {
                value: "Health Care Assistant",
                label: "Health Care Assistant",
            },
            {
                value: "Mid. Health Care Assistant",
                label: "Mid. Health Care Assistant",
            },
            {
                value: "Support Staff",
                label: "Support Staff",
            },
        ]
    },
]

