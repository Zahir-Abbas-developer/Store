import { limitedMockDataInterface } from "../../types/FinanceInterface";
import { commonReportFiltersInterface } from "../../types/ReportsInterface";


// Filters Array 
export const LimitedReportFilters: commonReportFiltersInterface[] = [
    {
        key: "01",
        labelName: "Staff Name",
        placeholder: "Select Staff Name",
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
        labelName: "Staff Type",
        placeholder: "Select Staff Type",
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
        placeholder: "Select Time Frame",
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

export const LimitedReportMockData: limitedMockDataInterface[] = [
    {
        key: "01",
        staffName: "Arsalan",
        accountTitle:"Arsalan",
        staffType: "HCA",
        sortCode: "540.00",
        bankAccount: "540.00",
        totalPayable:"540.00"
    },
    {
        key: "02",
        staffName: "Ali Rehman",
        accountTitle:"Ali Rehman",
        staffType: "HCA",
        sortCode: "540.00",
        bankAccount: "540.00",
        totalPayable: "540.00"
    },
    {
        key: "03",
        staffName: "Usama",
        accountTitle:"Usama",
        staffType: "HCA",
        sortCode: "540.00",
        bankAccount: "540.00",
        totalPayable: "540.00"
    },
]