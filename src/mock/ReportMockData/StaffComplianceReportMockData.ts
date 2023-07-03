import { commonReportFiltersInterface, staffComplianceReportMockDataInterface } from "../../types/ReportsInterface"

// Filters Array 
export const StaffComplianceReportFilters: commonReportFiltersInterface[] = [
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
        labelName: "Certificates",
        placeholder: "Select certificates",
        optionsArray: [
            {
                value: "Expiry Certificates",
                label: "Expiry Certificates",
            },
            {
                value: "Due Certificates",
                label: "Due Certificates",
            },
        ]
    },
]
