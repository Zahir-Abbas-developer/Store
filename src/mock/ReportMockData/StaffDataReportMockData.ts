import { commonReportFiltersInterface, staffDataReportMockDataInterface } from "../../types/ReportsInterface"


// Filters Array 
export const StaffDataReportFilters: commonReportFiltersInterface[] = [
    {
        key: "01",
        labelName: "User Type",
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
        key: "02",
        labelName: "Staff Type",
        placeholder: "Select staff type",
        optionsArray: [
            {
                value: "HCA",
                label: "HCA",
            },
        ]
    },
    {
        key: "03",
        labelName: "User Status",
        placeholder: "Select user status",
        optionsArray: [
            {
                value: "Active State",
                label: "Active State",
            },
            {
                value: "Inactive State",
                label: "Inactive State",
            },
        ]
    },
]
