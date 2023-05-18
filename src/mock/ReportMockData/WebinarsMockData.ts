import {  commonReportFiltersInterface } from "../../types/ReportsInterface";

// Filters Array 
export const WebinarsReportFilters: commonReportFiltersInterface[] = [
    {
        key: "01",
        labelName: "Webinar Name",
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
        labelName: "Venue",
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
    {
        key: "03",
        labelName: "Status",
        placeholder: "All",
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


// table data start here
export interface WebinarsReportTable {
  key: React.Key;
  srNo: string;
  WebinarTitle: string;
  Date: string;
  Venue : string;
  NoOfAttendees: string;
  status: string;
}
