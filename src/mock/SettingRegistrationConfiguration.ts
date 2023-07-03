import { ColumnsType } from "antd/es/table";

export interface DataType {
    key: React.ReactNode;
    SNo: string;
    MenuName: string;
    action: boolean;
    children?: DataType[];
}


export const RegistrationConfigurationData: DataType[] = [
    {
        key: 1,
        SNo: '01',
        MenuName: "About The Candidate",
        action: true,
        children: [
            {
                key: 11,
                SNo: '',
                MenuName: "Personal Info",
                action: true,
            },
            {
                key: 12,
                SNo: '',
                MenuName: "Address Details",
                action: true,
            },
            {
                key: 13,
                SNo: '',
                MenuName: "Photo for ID Badge",
                action: true,
            },
            {
                key: 14,
                SNo: '',
                MenuName: "ID Upload (Passport/DL)",
                action: true,
            },
        ],
    },
    {
        key: 2,
        SNo: '02',
        MenuName: "References",
        action: true,
        children: [
            {
                key: 21,
                SNo: '',
                MenuName: "First",
                action: true,
            },
            {
                key: 22,
                SNo: '',
                MenuName: "Second",
                action: true,
            },
            {
                key: 23,
                SNo: '',
                MenuName: "Third",
                action: true,
            },
            {
                key: 24,
                SNo: '',
                MenuName: "Four",
                action: true,
            },
        ],
    },
  
];

export const CareHomeData: DataType[] = [
    {
        key: 1,
        SNo: '01',
        MenuName: "Client Profile Information",
       action: true,
      
    },
    {
        key: 2,
        SNo: '02',
        MenuName: "Client Address",
       action: true,
      
    },
    {
        key: 3,
        SNo: '03',
        MenuName: "Client Public Inormation",
       action: true,
      
    },
    {
        key: 4,
        SNo: '04',
        MenuName: "Manage DEpartments",
       action: true,
      
    },
    {
        key: 5,
        SNo: '05',
        MenuName: "Clent Admin Users",
       action: true,
      
    },
    {
        key: 6,
        SNo: '06',
        MenuName: "Update Primary Email & Phone",
       action: true,
      
    },
  
];

export const TrainingInstructorData: DataType[] = [
    {
        key: 1,
        SNo: '01',
        MenuName: "About The Candidate",
       action: true,
        children: [
            {
                key: 11,
                SNo: '',
                MenuName: "Personal Info",
               action: true,
            },
            {
                key: 12,
                SNo: '',
                MenuName: "Address Details",
               action: true,
            },
            {
                key: 13,
                SNo: '',
                MenuName: "Photo for ID Badge",
               action: true,
            },
            {
                key: 14,
                SNo: '',
                MenuName: "ID Upload (Passport/DL)",
               action: true,
            },
        ],
    },
    {
        key: 2,
        SNo: '02',
        MenuName: "References",
       action: true,
        children: [
            {
                key: 21,
                SNo: '',
                MenuName: "Personal Info",
               action: true,
            },
            {
                key: 22,
                SNo: '',
                MenuName: "Address Details",
               action: true,
            },
            {
                key: 23,
                SNo: '',
                MenuName: "Photo for ID Badge",
               action: true,
            },
            {
                key: 24,
                SNo: '',
                MenuName: "ID Upload (Passport/DL)",
               action: true,
            },
        ],
    },
  
];

export const CareCoordinatorData: DataType[] = [
    {
        key: 1,
        SNo: '01',
        MenuName: "About The Candidate",
       action: true,
        children: [
            {
                key: 11,
                SNo: '',
                MenuName: "Personal Info",
               action: true,
            },
            {
                key: 12,
                SNo: '',
                MenuName: "Address Details",
               action: true,
            },
            {
                key: 13,
                SNo: '',
                MenuName: "Photo for ID Badge",
               action: true,
            },
            {
                key: 14,
                SNo: '',
                MenuName: "ID Upload (Passport/DL)",
               action: true,
            },
        ],
    },
    {
        key: 2,
        SNo: '02',
        MenuName: "References",
       action: true,
        children: [
            {
                key: 21,
                SNo: '',
                MenuName: "Personal Info",
               action: true,
            },
            {
                key: 22,
                SNo: '',
                MenuName: "Address Details",
               action: true,
            },
            {
                key: 23,
                SNo: '',
                MenuName: "Photo for ID Badge",
               action: true,
            },
            {
                key: 24,
                SNo: '',
                MenuName: "ID Upload (Passport/DL)",
               action: true,
            },
        ],
    },
    {
        key: 3,
        SNo: '03',
        MenuName: "Training & Work History",
       action: true,
        children: [
            {
                key: 31,
                SNo: '',
                MenuName: "Personal Info",
               action: true,
            },
            {
                key: 32,
                SNo: '',
                MenuName: "Address Details",
               action: true,
            },
            {
                key: 33,
                SNo: '',
                MenuName: "Photo for ID Badge",
               action: true,
            },
            {
                key: 34,
                SNo: '',
                MenuName: "ID Upload (Passport/DL)",
               action: true,
            },
        ],
    },
    {
        key: 4,
        SNo: '04',
        MenuName: "Background Checks",
       action: true,
        children: [
            {
                key: 41,
                SNo: '',
                MenuName: "Personal Info",
               action: true,
            },
            {
                key: 42,
                SNo: '',
                MenuName: "Address Details",
               action: true,
            },
            {
                key: 43,
                SNo: '',
                MenuName: "Photo for ID Badge",
               action: true,
            },
            {
                key: 44,
                SNo: '',
                MenuName: "ID Upload (Passport/DL)",
               action: true,
            },
        ],
    },
    
  
];