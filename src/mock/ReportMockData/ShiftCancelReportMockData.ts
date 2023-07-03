import { commonReportFiltersInterface } from "../../types/ReportsInterface"

// Filters Array 
export const ShiftCancelReportFilters: commonReportFiltersInterface[] = [
    {
        key: "01",
        labelName: "Client Name",
        placeholder: "Select client name",
        optionsArray: [
            {
                value: "john doi",
                label: "john doi",
                labelNameValue:"Client Name"
                
            },
            {
                value: "john Doi",
                label: "john Doi",
                labelNameValue:"Client Name"
            },
            {
                value: "Ali Rehman",
                label: "Ali Rehman",
                labelNameValue:"Client Name"
            }
        ]
    },
    {
        key: "02",
        labelName: "User Type",
        placeholder: "Select user type",
        optionsArray: [
            {
                value: "HCN",
                label: "HCN",
                labelNameValue:"User Type"
            },
            {
                value: "HCN",
                label: "HCN",
                labelNameValue:"User Type"
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
                labelNameValue:"Time Frame"
            },
            {
                value: "Afternoon",
                label: "Afternoon",
                labelNameValue:"Time Frame"
            },
            {
                value: "Evening",
                label: "Evening",
                labelNameValue:"Time Frame"
            }
        ]
    },
]

