import { financeReportsDataInterface } from "../../types/FinanceInterface";

// Assets
import staffImg from "../../assets/icons/Report/white-staff-work.png";


export const financeReportsCardsMockData: financeReportsDataInterface[] = [
    {
        id: "01",
        icon: staffImg,
        title: "Staff Hours Report",
        desc: "Staff Hour Report",
        allowdedRoles: ["admin", "coordinator"],
        navigateTo: "/finance/reports/staff-hours-report",
    },
    {
        id: "02",
        icon: staffImg,
        title: "NI Payment",
        desc: "NI Payment Report",
        allowdedRoles: ["admin", "coordinator"],
        navigateTo: "/finance/reports/ni-payment",
    },
    {
        id: "03",
        icon: staffImg,
        title: "NON NI Payment",
        desc: "NON NI Payment Report",
        allowdedRoles: ["admin"],
        navigateTo: "/finance/reports/non-ni-payment",
    },
    {
        id: "04",
        icon: staffImg,
        title: "Limited",
        desc: "Limited Report",
        allowdedRoles: ["admin", "coordinator"],
        navigateTo: "/finance/reports/limited",
    },
    {
        id: "05",
        icon: staffImg,
        title: "Week Wise Report",
        desc: "Week Wise Shift Hours Report",
        allowdedRoles: ["admin", "coordinator"],
        navigateTo: "/finance/reports/shift-summary",
    },
    {
        id: "06",
        icon: staffImg,
        title: "Contractor Payment",
        desc: "Contractor Payment Report",
        allowdedRoles: ["carer"],
        navigateTo: "/finance/reports/contractor-payment",
    },
]