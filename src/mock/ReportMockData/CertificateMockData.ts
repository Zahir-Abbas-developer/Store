import {  commonReportFiltersInterface } from "../../types/ReportsInterface";

// Filters Array 
export const CertificateReportFilters: commonReportFiltersInterface[] = [
    {
        key: "01",
        labelName: "Course Name",
        placeholder: "All",
        optionsArray: [
            {
                value: "Timesheet",
                label: "Timesheet",
            },
            {
                value: "Staff Direct Booking",
                label: "Staff Direct Booking",
            },
            {
                value: "Shift Direct Booking",
                label: "Shift Direct Booking",
            },
        ]
    },
    {
        key: "02",
        labelName: "Course Status",
        placeholder: "All",
        optionsArray: [
            {
                value: "Shift Direct Booking",
                label: "Shift Direct Booking",
            },
            {
                value: "Shift Direct Staff",
                label: "Shift Direct Staff",
            },
            {
                value: "Shift Allocated Staff",
                label: "Shift Allocated Staff",
            }
        ]
    },
]


// table data start here
export interface CertificateReportTable {
  key: React.Key;
  srNo: string;
  TraineeName: string;
  CourseName: string;
  CourseStatus : string;
  Certificate: string;
}