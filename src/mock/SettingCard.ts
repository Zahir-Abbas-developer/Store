import { ROLES } from "../constants/Roles";

export interface DataType {
    key: string;
    name: string;
    borderColor: string;
    cardClass: String;
    path:string;
    role:any;

}
export const getSettingCard = (role:any) => {
 const SettingCardData: DataType[] = [
    {
        key: '1',
        name: 'Key Info',
        path:"Key-info",
        borderColor: "#65CDF0",
        cardClass: "Key-info-card",
        role:[""],
    },
    {
        key: '2',
        name: 'Job Role',
        path:"job-role",
        borderColor: "#EE2E7E",
        cardClass: "job-role-card",
        role:[ROLES.admin,ROLES.coordinator,ROLES.client],
    },
    {
        key: '3',
        name: 'Shift Time Settings',
        path:"shift-time-settings",
        borderColor: "#F7B923",
        cardClass: "shift-time-card",
        role:[ROLES.admin,ROLES.client],
    },
    {
        key: '4',
        name: 'Staff Settings',
        path:"staff-settings",
        borderColor: "#52C41A",
        cardClass: "staff-settings-card",
        role:[ROLES.admin],
    },
    {
        key: '5',
        name: 'Bank Holidays',
        path:"bank-holidays",
        borderColor: "#EE2E7E",
        cardClass: "bank-holidays-card",
        role:[ROLES.admin,ROLES.client],
    },
    {
        key: '15',
        name: 'Electronic Attendance Monitoring',
        path:"electronic-attendance-monitoring",
        borderColor: "#EE2E7E",
        cardClass: "job-role-card",
        role:[ROLES.client],
    },
    {
        key: '6',
        name: 'DBS Configuration',
        path:"dbs-configuration",
        borderColor: "#F7B923",
        cardClass: "dbs-configuration-card",
        role:[ROLES.admin],
    },
    {
        key: '7',
        name: 'Email Notification',
        path:"email-notification",
        borderColor: "#52C41A",
        cardClass: "email-notification-card",
        role:[ROLES.admin]
    },
    {
        key: '8',
        name: 'Client / Satff Terms and Conditions',
        path:"client-terms-condition",
        borderColor: "#65CDF0",
        cardClass: "satff-terms-conditions-card",
        role:[ROLES.admin,ROLES.coordinator],
    },
    {
        key: '9',
        name: 'Agency Terms and conditions',
      path:"agency-terms-condition",
        borderColor: "#F7B923",
        cardClass: "agency-terms-conditions-card",
        role:[ROLES.admin],
    },
    {
        key: '10',
        name: 'Set Email and Phone',
        path:"set-email-Phone",
        borderColor: "#52C41A",
        cardClass: "set-mail-Phone-card",
        role:["carer_coordinator","client"],
    },
    {
        key: '11',
        name: 'Week Start Day',
        path:"week-start-day",
        borderColor: "#65CDF0",
        cardClass: "week-start-day-card",
         role:[ROLES.coordinator,ROLES.client],
    },
    {
        key: '12',
        name: 'Festival Day Greeting',
        path:"festival-day-greeting",
        borderColor: "#EE2E7E",
        cardClass: "festival-day-greeting-card",
         role:[ROLES.admin,ROLES.client],
    },
    {
        key: '13',
        name: 'Break Time Settings',
        path:"break-time-settings",
        borderColor: "#65CDF0",
        cardClass: "break-time-settings-card",
        role:[ROLES.admin,ROLES.coordinator,ROLES.client],
    },
    {
        key: '14',
        name: 'Change Password',
        path:"change-password",
        borderColor: "#FB3449",
        cardClass: "change-password-settings-card",
        role:[ROLES.coordinator],
    },
   

];
return SettingCardData.filter((ele) => ele.role.includes(role));
}