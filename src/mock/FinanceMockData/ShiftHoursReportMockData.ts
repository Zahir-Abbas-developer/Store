import { shiftHoursReportMocKDataInterface } from "../../types/FinanceInterface";
import { commonReportFiltersInterface } from "../../types/ReportsInterface";


// Filters Array 
export const ShiftHoursReportFilters: commonReportFiltersInterface[] = [
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

export const ShiftHoursReportMockData: shiftHoursReportMocKDataInterface[] = [
    {
        key: "01",
        staffName: "Arsalan",
        staffType: "HCA",
        staffCategory: "Payroll",
        noOfClients: "1",
        clientRate:"16.5",
        staffHours: "24",
        noOfShift: "4",
        salaryHours: "4",
        niHours: "20",
        nonNiHours: "0",
        millageAllowanceHours: "4",
        payRate: "10.00",
        niPayable: "4",
        nonNiPayable: "4",
        totalPayable:"240.00",
        paymentStatus: "Pending",
    },
    {
        key: "02",
        staffName: "Usama",
        staffType: "HCA",
        staffCategory: "Payroll",
        noOfClients: "1",
        clientRate:"16.5",
        staffHours: "24",
        noOfShift: "2",
        salaryHours: "4",
        niHours: "20",
        nonNiHours: "6",
        millageAllowanceHours: "4",
        payRate: "10.00",
        niPayable: "4",
        nonNiPayable: "4",
        totalPayable:"110.00",
        paymentStatus: "Paid",
    },
    {
        key: "03",
        staffName: "Ali Rehman",
        staffType: "HCA",
        staffCategory: "Payroll",
        noOfClients: "1",
        clientRate:"16.5",
        staffHours: "24",
        noOfShift: "2",
        salaryHours: "4",
        niHours: "20",
        nonNiHours: "6",
        millageAllowanceHours: "4",
        payRate: "10.00",
        niPayable: "4",
        nonNiPayable: "4",
        totalPayable:"110.00",
        paymentStatus: "Paid",
    },
    {
        key: "04",
        staffName: "Maaz Khan",
        staffType: "HCA",
        staffCategory: "Payroll",
        noOfClients: "1",
        clientRate:"16.5",
        staffHours: "24",
        noOfShift: "2",
        salaryHours: "4",
        niHours: "20",
        nonNiHours: "6",
        millageAllowanceHours: "4",
        payRate: "10.00",
        niPayable: "4",
        nonNiPayable: "4",
        totalPayable:"110.00",
        paymentStatus: "Pending",
    },
]


// Staff Details Report Mock Data
export const ShiftDetailsHoursReportMockData = [
    {
        key: "01",
        clientName: "Bondcare Care Home",
        careCoordinator: "Bondcare Care Home",
        shiftType: "HCA",
        shiftDate: "Tuesday Mar 21, 2023",
        shiftHours: "16",
        checkIn: "14:13",
        checkOut: "14:13",
        payRate: "12.00",
        totalPayable: "240.00",
    },
    {
        key: "02",
        clientName: "Bondcare Care Home",
        careCoordinator: "Bondcare Care Home",
        shiftType: "HCA",
        shiftDate: "Tuesday Mar 21, 2023",
        shiftHours: "16",
        checkIn: "14:13",
        checkOut: "14:13",
        payRate: "12.00",
        totalPayable: "240.00",
    },
    {
        key: "03",
        clientName: "Bondcare Care Home",
        careCoordinator: "Bondcare Care Home",
        shiftType: "HCA",
        shiftDate: "Tuesday Mar 21, 2023",
        shiftHours: "16",
        checkIn: "14:13",
        checkOut: "14:13",
        payRate: "12.00",
        totalPayable: "240.00",
    },
    {
        key: "04",
        clientName: "Bondcare Care Home",
        careCoordinator: "Bondcare Care Home",
        shiftType: "HCA",
        shiftDate: "Tuesday Mar 21, 2023",
        shiftHours: "16",
        checkIn: "14:13",
        checkOut: "14:13",
        payRate: "12.00",
        totalPayable: "240.00",
    },
]