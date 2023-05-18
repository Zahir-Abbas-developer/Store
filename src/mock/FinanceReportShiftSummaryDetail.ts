// Interfaces
// import { commonReportFiltersInterface, extraHoursReportTableMockDataInterface } from "../../../../types/ReportsInterface"

interface commonReportFiltersOptionsInterface {
  label: string;
  value: string;
  labelNameValue?:string;
}
 interface commonReportFiltersInterface {
  key: string;
  labelName: string;
  placeholder: string;
  optionsArray?: commonReportFiltersOptionsInterface[];
}

// Filters Array 
export const FinanceReportShiftSummaryDetail: commonReportFiltersInterface[] = [
    {
        key: "01",
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
        key: "02",
        labelName: "Client Name",
        placeholder: "Select Client Name",
        optionsArray: [
            {
                value: "Yes",
                label: "Yes",
            },
            {
                value: "No",
                label: "No",
            },
        ]
    },
    {
        key: "03",
        labelName: "Staff Category",
        placeholder: "Select Staff Category",
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

