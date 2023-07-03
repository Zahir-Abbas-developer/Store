import { commonReportFiltersInterface, shiftRateSettingMockDataInterface } from "../../types/ReportsInterface"

// Filters Array 
export const ShiftRateSettingFilters: commonReportFiltersInterface[] = [
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
        labelName: "Payment Type",
        placeholder: "Select payment type",
        optionsArray: [
            {
                value: "Hourly",
                label: "Hourly",
            },
            {
                value: "Weekly",
                label: "Weekly",
            },
            {
                value: "Monthly",
                label: "Monthly",
            }
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

// // Table Mock Data
// export const ShiftRateSettingMockData: shiftRateSettingMockDataInterface[] = [
//     {
//         key: "01",
//         shiftName: 'Early Shift',
//         startTime: "07 : 15 : 00 AM",
//         endTime: "13 : 30 : 00 PM",
//         date: "18 / 05 / 2022",
//         clientShiftBreakPayStatus: "Shift Break without payment",
//         clientShiftBreakTime: "No break allowed",
//         staffShiftBreakTimePayStatus: "Shift Break without payment",
//         staffShiftBreakTime: "No break allowed",
//         paymentType: "Hourly",
//         splitRateApplicable: "Yes",
//         taxVatApplicable: "No",
//         department: "Dep - 1",
//         transportApplicable: "No",
//         transportType: "Self",
//         transportClientRate: "3£ per hour",
//         transportStaffRate: "5£ per hour",
//         shiftBreakStaffInfo: "Shift Break without payment",
//     },
//     {
//         key: "02",
//         shiftName: 'Early Shift',
//         startTime: "07 : 15 : 00 AM",
//         endTime: "13 : 30 : 00 PM",
//         date: "18 / 05 / 2022",
//         clientShiftBreakPayStatus: "Shift Break without payment",
//         clientShiftBreakTime: "No break allowed",
//         staffShiftBreakTimePayStatus: "Shift Break without payment",
//         staffShiftBreakTime: "No break allowed",
//         paymentType: "Hourly",
//         splitRateApplicable: "Yes",
//         taxVatApplicable: "No",
//         department: "Dep - 1",
//         transportApplicable: "No",
//         transportType: "Self",
//         transportClientRate: "3£ per hour",
//         transportStaffRate: "5£ per hour",
//         shiftBreakStaffInfo: "Shift Break without payment",
//     },
//     {
//         key: "03",
//         shiftName: 'Early Shift',
//         startTime: "07 : 15 : 00 AM",
//         endTime: "13 : 30 : 00 PM",
//         date: "18 / 05 / 2022",
//         clientShiftBreakPayStatus: "Shift Break without payment",
//         clientShiftBreakTime: "No break allowed",
//         staffShiftBreakTimePayStatus: "Shift Break without payment",
//         staffShiftBreakTime: "No break allowed",
//         paymentType: "Hourly",
//         splitRateApplicable: "Yes",
//         taxVatApplicable: "No",
//         department: "Dep - 1",
//         transportApplicable: "No",
//         transportType: "Self",
//         transportClientRate: "3£ per hour",
//         transportStaffRate: "5£ per hour",
//         shiftBreakStaffInfo: "Shift Break without payment",
//     },
//     {
//         key: "04",
//         shiftName: 'Early Shift',
//         startTime: "07 : 15 : 00 AM",
//         endTime: "13 : 30 : 00 PM",
//         date: "18 / 05 / 2022",
//         clientShiftBreakPayStatus: "Shift Break without payment",
//         clientShiftBreakTime: "No break allowed",
//         staffShiftBreakTimePayStatus: "Shift Break without payment",
//         staffShiftBreakTime: "No break allowed",
//         paymentType: "Hourly",
//         splitRateApplicable: "Yes",
//         taxVatApplicable: "No",
//         department: "Dep - 1",
//         transportApplicable: "No",
//         transportType: "Self",
//         transportClientRate: "3£ per hour",
//         transportStaffRate: "5£ per hour",
//         shiftBreakStaffInfo: "Shift Break without payment",
//     },
//     {
//         key: "05",
//         shiftName: 'Early Shift',
//         startTime: "07 : 15 : 00 AM",
//         endTime: "13 : 30 : 00 PM",
//         date: "18 / 05 / 2022",
//         clientShiftBreakPayStatus: "Shift Break without payment",
//         clientShiftBreakTime: "No break allowed",
//         staffShiftBreakTimePayStatus: "Shift Break without payment",
//         staffShiftBreakTime: "No break allowed",
//         paymentType: "Hourly",
//         splitRateApplicable: "Yes",
//         taxVatApplicable: "No",
//         department: "Dep - 1",
//         transportApplicable: "No",
//         transportType: "Self",
//         transportClientRate: "3£ per hour",
//         transportStaffRate: "5£ per hour",
//         shiftBreakStaffInfo: "Shift Break without payment",
//     },
// ]