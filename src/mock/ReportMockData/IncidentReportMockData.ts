import { commonReportFiltersInterface, incidentReportMockDataInterface } from "../../types/ReportsInterface";
import Attachment from '../../assets/icons/Report/Attachment.svg'
// Filters Array 
export const ClientWorkHistoryReportFilters: commonReportFiltersInterface[] = [
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

// Table Mock Data
export const IncidentReportMockData: incidentReportMockDataInterface[] = [
    {
        key: "01",
        natureOfIncident: "Accident",
        dateOfIncident: "06/06/2022",
        userRole: "Carer",
        reportedBy: "John",
        Attachment: Attachment,
        status:"NEW",
        btnBackground:"#FF4D4F",
    
    },
    {
      key: "02",
      natureOfIncident: "Accident",
      dateOfIncident: "06/06/2022",
      userRole: "Carer",
      reportedBy: "John",
      Attachment: Attachment,
      status:"NEW",
      btnBackground:"#1890FF",
     

  },
  {
    key: "03",
    natureOfIncident: "Accident",
    dateOfIncident: "06/06/2022",
    userRole: "Carer",
    reportedBy: "John",
    Attachment: Attachment,
    status:"Resolved",
    btnBackground:"#52C41A",
   
},

{
  key: "04",
  natureOfIncident: "Accident",
  dateOfIncident: "06/06/2022",
  userRole: "Carer",
  reportedBy: "John",
  Attachment: Attachment,
  status:"Resolved",
  btnBackground:"#52C41A",
  

},{
  key: "06",
  natureOfIncident: "Accident",
  dateOfIncident: "06/06/2022",
  userRole: "Carer",
  reportedBy: "John",
  Attachment: Attachment,
  status:"Resolved",
  btnBackground:"#52C41A",
 

},
{
  key: "07",
  natureOfIncident: "Accident",
  dateOfIncident: "06/06/2022",
  userRole: "Carer",
  reportedBy: "John",
  Attachment: Attachment,
  status:"Resolved",
  btnBackground:"#52C41A",
  
},
{
  key: "08",
  natureOfIncident: "Accident",
  dateOfIncident: "06/06/2022",
  userRole: "Carer",
  reportedBy: "John",
  Attachment: Attachment,
  status:"New",
  btnBackground:"#FF4D4F",
  
}, 
]
