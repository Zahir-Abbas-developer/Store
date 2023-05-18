import { commonReportFiltersInterface } from "../../types/ReportsInterface";

// Filters Array 
export const StaffWorkHistoryReportFilters: commonReportFiltersInterface[] = [
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
        key: "03",
        labelName: "Shift Status",
        placeholder: "Select shift status",
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

// // Table Mock Data
// export const StaffWorkHistoryReportMockData: staffWorkHistoryReportMockDataInterface[] = [
//     {
//         key: "01",
//         shiftName: "Long Day",
//         clientName: "Maaz Khan",
//         shiftDate: "Monday May 12 2022",
//         shiftHours: "11 : 25",
//         hourlyRate: "15 : 50",
//         shiftAmount: "174.38",
//         invoiceNumber: "174.38",
//         shiftStatus: "Confirmed Shift",
//         paymentDate: "Not Paid",
//     },
//     {
//         key: "02",
//         shiftName: "Long Day",
//         clientName: "Ali Rehman",
//         shiftDate: "Monday May 12 2022",
//         shiftHours: "11 : 25",
//         hourlyRate: "15 : 50",
//         shiftAmount: "174.38",
//         invoiceNumber: "174.38",
//         shiftStatus: "Confirmed Shift",
//         paymentDate: "Not Paid",
//     },
//     {
//         key: "03",
//         shiftName: "Long Day",
//         clientName: "Aesa Khan",
//         shiftDate: "Tuesday May 13 2022",
//         shiftHours: "11 : 25",
//         hourlyRate: "15 : 50",
//         shiftAmount: "174.38",
//         invoiceNumber: "174.38",
//         shiftStatus: "Confirmed Shift",
//         paymentDate: "Not Paid",
//     },
//     {
//         key: "04",
//         shiftName: "Long Day",
//         clientName: "Usama",
//         shiftDate: "Wednesday May 14 2022",
//         shiftHours: "11 : 25",
//         hourlyRate: "15 : 50",
//         shiftAmount: "174.38",
//         invoiceNumber: "174.38",
//         shiftStatus: "Confirmed Shift",
//         paymentDate: "Not Paid",
//     },
//     {
//         key: "05",
//         shiftName: "Long Day",
//         clientName: "Maaz Khan",
//         shiftDate: "Tuesday May 13 2022",
//         shiftHours: "11 : 25",
//         hourlyRate: "15 : 50",
//         shiftAmount: "174.38",
//         invoiceNumber: "174.38",
//         shiftStatus: "Confirmed Shift",
//         paymentDate: "Not Paid",
//     },
//     {
//         key: "06",
//         shiftName: "Long Day",
//         clientName: "Aesa Khan",
//         shiftDate: "Tuesday May 13 2022",
//         shiftHours: "11 : 25",
//         hourlyRate: "15 : 50",
//         shiftAmount: "174.38",
//         invoiceNumber: "174.38",
//         shiftStatus: "Confirmed Shift",
//         paymentDate: "Not Paid",
//     },
// ]