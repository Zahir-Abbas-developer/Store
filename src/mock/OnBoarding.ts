import Avatar from "../assets/images/OnBoarding/avatar.svg";
import Avatar2 from "../assets/images/OnBoarding/avatar2.svg";
import Pdf from "../assets/images/OnBoarding/pdf.svg";
import AdditionalDocs from "../assets/icons/OnBoarding/additional-docs.svg";
import { V } from "@fullcalendar/resource/internal-common";

export interface ICarerDetails {
  key: string;
  id: number;
  firstName: string;
  lastName:string;
  applicationStage:string;
  time: string;
  percentageComplete: number;
  email: string;
  days: number;
  profilePhoto: any;
}
export interface ICarerCordinatorDetails {
  key: string;
  firstName: string;
  lastName:string;
  id: number;
  time: string;
  email: string;
  percentageComplete: number;
  contact: string;
  courses: number;
  profilePhoto: any;
  status: string;
  allocatedCareHomes:string
}

export const CarerDetails = [
  {
    key: "1",
    id: 1,
    name: "Google",
    time: "30h 10m",
    percentage: 40,
    contact: "abhigyanpatra@gmail.com",
    days: 63,
    avatar: Avatar,
  },
  {
    key: "2",
    id: 2,
    name: "Youtube",
    time: "30h 10m",
    percentage: 20,
    contact: "abhigyanpatra@gmail.com",
    days: 23,
    avatar: Avatar2,
  },
  {
    key: "3",
    id: 3,
    name: "Yahoo",
    time: "20h 10m",
    percentage: 50,
    contact: "abhigra@gmail.com",
    days: 22,
    avatar: Avatar,
  },
  {
    key: "4",
    id: 4,
    name: "Youtube",
    time: "30h 10m",
    percentage: 70,
    contact: "abhigyanpatra@gmail.com",
    days: 63,
    avatar: Avatar2,
  },
  {
    key: "5",
    id: 5,
    name: "Jira",
    time: "30h 10m",
    percentage: 30,
    contact: "abhigyanpatra@gmail.com",
    days: 63,
    avatar: Avatar,
  },
  {
    key: "6",
    id: 6,
    name: "Instragram",
    time: "30h 10m",
    percentage: 20,
    contact: "abhigyanpatra@gmail.com",
    days: 63,
    avatar: Avatar2,
  },
];

export const CarerCordinatorDetails = [
  {
    key: "1",
    id: 1,
    name: "Google",
    time: "30h 10m",
    percentage: 40,
    contact: "abhigyanpatra@gmail.com",
    courses: 3,
    avatar: Avatar,
    availability: "Active",
  },
  {
    key: "2",
    id: 2,
    name: "Youtube",
    time: "30h 10m",
    percentage: 20,
    contact: "abhigyanpatra@gmail.com",
    courses: 2,
    avatar: Avatar2,
    availability: "Active",
  },
  {
    key: "3",
    id: 3,
    name: "Jira",
    time: "30h 10m",
    percentage: 30,
    contact: "abhigyanpatra@gmail.com",
    courses: 5,
    avatar: Avatar,
    availability: "Active",
  },
  {
    key: "4",
    id: 4,
    name: "BitBucket",
    time: "20h 10m",
    percentage: 70,
    contact: "abhigyanpatra@gmail.com",
    courses: 1,
    avatar: Avatar2,
    availability: "Active",
  },
  {
    key: "5",
    id: 5,
    name: "Facebook",
    time: "20h 10m",
    percentage: 30,
    contact: "abhigyanpatra@gmail.com",
    courses: 2,
    avatar: Avatar,
    availability: "Active",
  },
  {
    key: "6",
    id: 6,
    name: "Instragram",
    time: "10h 10m",
    percentage: 40,
    contact: "abhigyanpatra@gmail.com",
    courses: 3,
    avatar: Avatar,
    availability: "Active",
  },
];

//carer

export const CarerProfilePanel = [
  {
    id: 1,
    title: "About the Candidate",
    panelData: [
      {
        id: 1,
        panelChilds: "Personal Info",
      },
      {
        id: 2,
        panelChilds: "Address Details",
      },
      {
        id: 3,
        panelChilds: "Photo for ID Badge",
      },
      {
        id: 4,
        panelChilds: "ID Upload (Passport/DL)",
      },
    ],
  },

  {
    id: 2,
    title: "References",
    panelData: [
      {
        id: 5,
        panelChilds: "Add References",
      },
    ],
  },
  {
    id: 3,
    title: "Training & Work History",
    panelData: [
      {
        id: 6,
        panelChilds: "Training Certificate",
      },
      {
        id: 7,
        panelChilds: "Addtional Training Details",
      },
      {
        id: 3,
        panelChilds: "Work Experience",
      },
      {
        id: 4,
        panelChilds: "Specialities",
      },
    ],
  },
  {
    id: 4,
    title: "Background Checks",
    panelData: [
      {
        id: 1,
        panelChilds: "DBS",
      },
      {
        id: 2,
        panelChilds: "Right to Work",
      },
    ],
  },
  {
    id: 5,
    title: "Other Information",
    panelData: [
      {
        id: 1,
        panelChilds: "Next Of Kin",
      },
      {
        id: 2,
        panelChilds: "Contact Prefrence",
      },
      {
        id: 3,
        panelChilds: "Employment Status",
      },
      {
        id: 4,
        panelChilds: "Equal Opportunity Declaration",
      },
      {
        id: 5,
        panelChilds: "Additional Docs",
      },
      {
        id: 6,
        panelChilds: "Bank Details",
      },
    ],
  },
  {
    id: 6,
    title: "Medical History",
    panelData: [
      {
        id: 1,
        panelChilds: "Immunisation",
      },
      {
        id: 2,
        panelChilds: "Medical Questionnaire",
      },
    ],
  },
  {
    id: 7,
    title: "Declaration",
    panelData: [
      {
        id: 1,
        panelChilds: "Declaration",
      },
    ],
  },
];

export const TrainingInstructorPanel = [
  {
    id: 1,
    title: "About the Candidate",
    panelData: [
      {
        id: 1,
        panelChilds: "Personal Info",
      },
      {
        id: 2,
        panelChilds: "Address Details",
      },
      {
        id: 3,
        panelChilds: "Photo for ID Badge",
      },
      {
        id: 4,
        panelChilds: "ID Upload (Passport/DL)",
      },
    ],
  },

  {
    id: 2,
    title: "References",
    panelData: [
      {
        id: 5,
        panelChilds: "Add References",
      },
    ],
  },
  {
    id: 3,
    title: "Training & Work History",
    panelData: [
      {
        id: 6,
        panelChilds: "Training Certificate",
      },
      {
        id: 7,
        panelChilds: "Addtional Training Details",
      },
      {
        id: 3,
        panelChilds: "Work Experience",
      },
      {
        id: 4,
        panelChilds: "Specialities",
      },
    ],
  },
  {
    id: 4,
    title: "Background Checks",
    panelData: [
      {
        id: 1,
        panelChilds: "DBS",
      },
      {
        id: 2,
        panelChilds: "Right to Work",
      },
    ],
  },
  {
    id: 5,
    title: "Other Information",
    panelData: [
      {
        id: 1,
        panelChilds: "Employment Status",
      },
      {
        id: 2,
        panelChilds: "Additional Docs",
      },
      {
        id: 3,
        panelChilds: "Bank Details",
      },
    ],
  },

  {
    id: 7,
    title: "Declaration",
    panelData: [
      {
        id: 1,
        panelChilds: "Declaration",
      },
    ],
  },
];

//ProfileViewModal

export const ProfileDetails = [
  {
    title: "Full Name",
    detail: "Emily Smith",
  },
  {
    title: "Full Name",
    detail: "Emily Smith",
  },
  {
    title: "Daily Of Birth ",
    detail: "dd/mm/yyyy",
  },
  {
    title: "Gender",
    detail: "000 0000 0000",
  },
  {
    title: "Phone Number",
    detail: "000 0000 0000",
  },
  {
    title: "Email",
    detail: "EmilySmith@.com",
  },
  {
    title: "Nationality",
    detail: "mars",
  },
  {
    title: "Designation",
    detail: "evil",
  },
  {
    title: "Valid Driving License",
    detail: "Car",
  },
  {
    title: "LinkedIn ID",
    detail: "You can't find",
  },
];

export const AddressDetails = [
  {
    title: "Address First Line",
    detail: "Emily Smith",
  },
  {
    title: "Address Second Line",
    detail: "Emily Smith",
  },
  {
    title: "Country ",
    detail: "USA",
  },
  {
    title: "County",
    detail: "000 0000 0000",
  },
  {
    title: "Town/City",
    detail: "Rawalpindi",
  },
  {
    title: "Post Code",
    detail: "32424",
  },
 
];

export const TraingingSpecialities=[
  {
    id: 1,
    title: "Able to follow instructions & procedures",
  },
  {
    id: 2,
    title: "Able to work in a team but use Reference",
  },
  {
    id: 3,
    title: "Caring and kind",
  },
  {
    id: 4,
    title: "Observational skills",
  },
]

export const DbsDetails = [
  {
    title: "Does the candidate have a valid Enhanced DBS?",
    detail: "   yes",
  },
  {
    title: "DBS (PVG) Certificate Number",
    detail: " 155345645345 ",
  },
  {
    title: "DBS (PVG) Issue Date",
    detail: "09/04/2007 ",
  },
  {
    title: "Is DBS (PVG) online ?",
    detail: "Yes ",
  },
  {
    title: "DBS (PVG) Update Service No. ",
    detail: "123453158236",
  },
  {
    title: "Document",
    detail: " doc.pdf ",
    image: Pdf,
  },
];

export const RightToWork = [
  {
    title: "Does the candidate have the right to work in UK?",
    detail: "yes",
  },
  {
    title: "  Visa RefType ",
    detail: "   British Passport",
  },
  {
    title: " Visa / BRP Number",
    detail: "        153125485643",
  },
  {
    title: " VISA / BRP Expiry Date",
    detail: "        09/04/2023",
  },
  {
    title: "Share Code",
    detail: "  153154223",
  },
  {
    title: "Document",
    detail: " doc.pdf ",
    image: Pdf,
  },
];

export const cordinatorClientDetails = [
  {
    careHome: 'Tall Tree Care Home',
    carers: '06 Carers',
    image: Avatar,
    location: 'Care UK, Oaks Pl, Mile End Rd, Colchester CO4 5XR, United Kingdom',
    number: '+44 20 8202 2277',
    date: '05/01/2020'
  },
  {
    careHome: 'Ivy Grove Care Home',
    carers: '06 Carers',
    image: Avatar2,
    location: 'Care UK, 71 Hatch Ln, London E4 6LP, United Kingdom',
    number: '+44 20 8102 2277',
    date: '05/01/2022'
  }
  ,
  {
    careHome: 'Tall Tree Care Home',
    carers: '06 Carers',
    image: Avatar,
    location: 'Care UK, Oaks Pl, Mile End Rd, Colchester CO4 5XR, United Kingdom',
    number: '+44 20 8202 1277',
    date: '05/01/2021'
  },
  {
    careHome: 'Tall Tree Home',
    carers: '06 Carers',
    image: Avatar2,
    location: 'Care UK, Oaks Pl, Mile End Rd, Colchester CO4 5XR, United Kingdom',
    number: '+44 20 8202 2277',
    date: '05/01/2013'
  },
  {
    careHome: 'Tree Care Home',
    carers: '03 Carers',
    image: Avatar,
    location: 'Care UK, Oaks Pl, Mile End Rd, Colchester CO4 5XR, United Kingdom',
    number: '+44 20 8202 2277',
    date: '05/01/2020'
  },
  {
    careHome: 'Ivy Grove  Home',
    carers: '06 Carers',
    image: Avatar2,
    location: 'Care UK, Oaks Pl, Mile End Rd, Colchester CO4 5XR, United Kingdom',
    number: '+44 20 8202 2277',
    date: '05/01/2020'
  },
]

export const OtherInformationDetails = [
  {
    title: " Select Candidate’s employment status",
    detail: "yes",
  },
  {
    title: " Pay Tax Code",
    detail: "   British Passport",
  },
  {
    title:
      " Do you have a P45 from a previous employer within the current tax year?",
    detail: " 153125485643",
  },
  {
    title: "  National Insurance No.",
    detail: "        09/04/2023",
  },
  {
    title: "        Do you  have one of the student loans?",
    detail: "  153154223",
  },
  {
    title: "Document",
    detail: " doc.pdf ",
    image: Pdf,
  },
];

export const UserInformation = [
  {
    name: "John Snow",
    bank: "Socail Carer",
    code: "435435",
    account: "34935944543575",
    reftype: "Personal",
    image: Pdf,
  },
  {
    name: "John Snow",
    bank: "Socail Carer",
    code: "4322335",
    account: "33223433575",
    reftype: "Company",
    image: Pdf,
  },
];

export const ReferenceDetails = [
  {
    reftype: "Character",
    name: "John Snow",
    contactNo: "+4497441495",
    email: "John123@test.co",
    status: "Pending",
    refViewed: "09/04/2007",
    refComplete: "09/04/2007",
  },
  {
    reftype: "Character",
    name: "John Snow",
    contactNo: "+4497441495",
    email: "John123@test.co",
    status: "Pending",
    refViewed: "09/04/2007",
    refComplete: "09/04/2007",
  },
];

export const TraingHistory = [
  {
    title: "Certificate Expiry Date",
    detail: " 27/6/2023   ",
  },
  {
    title: "Certificate Issued",
    detail: "27/6/2022",
  },
  {
    title: "Physically Audited And No Document Uploaded",
    detail: "Yes",
  },
  {
    title: "Document",
    detail: "doc.pdf",
    image: Pdf,
  },
];

export const TrainingDetails = [
  {
    name: "Character ",
    issued: "09/04/2007",
    expiry: "04/04/2008",
    image: Pdf,
  },
  {
    name: "Employment",
    issued: "09/04/2007",
    expiry: "04/04/2008",
    image: Pdf,
  },
];

export const WorkDetails = [
  {
    name: "John Snow",
    position: "Nurse",
    experience: "two-year of associate practice ...",
    reason: "willing to learn more",
    startDate: "05/05/2007",
    endDate: "03/04/2008",
  },
  {
    name: "John Alpha",
    position: "Doctor",
    experience: "three-year of associate practice ...",
    reason: "willing to learn more",
    startDate: "05/05/2007",
    endDate: "03/04/2008",
  },
];

//additionalTrainging

export const additionalTraining = [
  {
    name: "Character",
    certificateIssued: "07/04/2007",
    certificateExpiry: "07/04/2008",
    image: AdditionalDocs,
  },
  {
    name: "Employment",
    certificateIssued: "07/04/2004",
    certificateExpiry: "07/04/2005",
    image: AdditionalDocs,
  },
];

export const OtherBankDetails = [
  {
    name: "John Snow",
    bankName: "HBL",
    sortCode: "45435",
    accountNumber: "44324432443",
    accountPreference: "Primary",
  },
  {
    name: "John Snow",
    bankName: "UBL",
    sortCode: "4543905",
    accountNumber: "223324432443",
    accountPreference: "Main",
  },
];

//addreference

export interface ICandidateReference {
  refType: string;
  refFullName: string;
  refContact: string;
  refEmail: string;
  createdAt: string;
}

export const applicationStage=[
  {
    value:'',
    label:'All'
  },
  {
    value:'new_application',
    label:'New Application'
  },
  {
    value:'intro_call_done',
    label:'Intro Call Done'
  },
   {
    value:'application_in_progress',
    label:'Application in Progress'
  },
   {
    value:'vetting_in_progress',
    label:'Vetting in Progress'
  },
   {
    value:'awaiting_reference',
    label:'Awaiting Prefrence'
  },
   {
    value:'interview_booked',
    label:'Interview Booked'
  },
   {
    value:'interview_done',
    label:'Interview Done'
  }, {
    value:'training_to_be_completed',
    label:'Training to be completed'
  },
  {
    value:'training_completed',
    label:'Training Completed'
  },
  {
    value:'incomplete_documents',
    label:'Incomplete Documents'
  },
  {
    value:'dbs_to_be_completed',
    label:'DBS to be completed'
  },
  {
    value:'no_experience',
    label:'No experience'
  },
  {
    value:'not_interested',
    label:'Not Interested'
  },
]