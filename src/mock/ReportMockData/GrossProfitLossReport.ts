import { commonReportFiltersInterface } from "../../types/ReportsInterface"


// Filters Array 
export const GrossProfitLossReportFilters: commonReportFiltersInterface[] = [
    {
        key: "01",
        labelName: "Client Name",
        placeholder: "Select Client Name",
        optionsArray: [
            {
                value: "5",
                label: "5",
            },
            {
                value: "10",
                label: "10",
            },
            {
                value: "15",
                label: "15",
            }
        ]
    },
    {
        key: "02",
        labelName: "Time Frame",
        placeholder: "Time Frame",
        optionsArray: [
            {
                value: "5",
                label: "5",
            },
            {
                value: "10",
                label: "10",
            },
        ]
    },
   
]

