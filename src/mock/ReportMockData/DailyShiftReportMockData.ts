import { commonReportFiltersInterface, dailyShiftReportMockDataInterface, detailsShiftReportMockDataInterface } from "../../types/ReportsInterface"

// Filters Array 
export const DailyShiftReportFilters: commonReportFiltersInterface[] = [
    {
        key: "01",
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

// Table Mock Data
// export const DailyShiftReportMockData: dailyShiftReportMockDataInterface[] = [
//     {
//         key: "01",
//         clientName: "Arsalan Khan",
   
//         acceptedShifts: "2",
//         bookingPending: "0",
//     },
//     {
//         key: "02",
//         clientName: "Kashif",

//         acceptedShifts: "4",
//         bookingPending: "2",
//     },
//     {
//         key: "03",
//         clientName: "Aesa Khan",
//         bookedShifts: "1",
//         acceptedShifts: "2",
//         bookingPending: "3",
//     },
//     {
//         key: "04",
//         clientName: "Maaz Khan",
//         bookedShifts: "3",
//         acceptedShifts: "5",
//         bookingPending: "1",
//     },
//     {
//         key: "05",
//         clientName: "Ali Rehman",
//         bookedShifts: "3",
//         acceptedShifts: "2",
//         bookingPending: "4",
//     },
//     {
//         key: "06",
//         clientName: "Arif",
//         bookedShifts: "5",
//         acceptedShifts: "2",
//         bookingPending: "3",
//     }
// ]

// Details Modal Table Mock Data
// export const DetailsReportModalMockData: detailsShiftReportMockDataInterface[] = [
//     {
//         key: "01",
//         staffName: "Arsalan Khan",
//         shiftName: "Day Shift",
//         shiftStartTime: '20/05/2022 07:15',
//     },
//     {
//         key: "02",
//         staffName: "Arsalan Khan",
//         shiftName: "Day Shift",
//         shiftStartTime: '20/05/2022 07:15',
//     },
//     {
//         key: "03",
//         staffName: "Arsalan Khan",
//         shiftName: "Day Shift",
//         shiftStartTime: '20/05/2022 07:15',
//     },
//     {
//         key: "04",
//         staffName: "Arsalan Khan",
//         shiftName: "Day Shift",
//         shiftStartTime: '20/05/2022 07:15',
//     },
//     {
//         key: "05",
//         staffName: "Arsalan Khan",
//         shiftName: "Day Shift",
//         shiftStartTime: '20/05/2022 07:15',
//     },
//     {
//         key: "06",
//         staffName: "Arsalan Khan",
//         shiftName: "Day Shift",
//         shiftStartTime: '20/05/2022 07:15',
//     }
// ]