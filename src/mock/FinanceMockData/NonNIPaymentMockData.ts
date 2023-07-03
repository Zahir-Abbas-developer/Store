import { nonNiPaymentMockDataInterface } from "../../types/FinanceInterface";
import { commonReportFiltersInterface } from "../../types/ReportsInterface";


// Filters Array 
export const NonNIPaymentReportFilters: commonReportFiltersInterface[] = [
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

export const NonNIPaymentMockData: nonNiPaymentMockDataInterface[] = [
    {
        key: "01",
        staffName: "Arsalan",
        employeeCode: "9103423",
        staffType: "HCA",
        totalHours: "540.00",
        sortCode: "540.00",
        bankAccount: "540.00",
        totalPayable:"540.00"
    },
    {
        key: "02",
        staffName: "Ali Rehman",
        employeeCode: "9103423",
        staffType: "HCA",
        totalHours: "540.00",
        sortCode: "540.00",
        bankAccount: "540.00",
        totalPayable: "540.00"
    },
    {
        key: "03",
        staffName: "Usama",
        employeeCode: "9103423",
        staffType: "HCA",
        totalHours: "540.00",
        sortCode: "540.00",
        bankAccount: "540.00",
        totalPayable: "540.00"
    },
]