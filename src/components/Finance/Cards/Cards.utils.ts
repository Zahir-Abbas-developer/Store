import InvoiceIcon from "../../../assets/icons/InvoiceIcon.svg"
import ReceivableIcon from "../../../assets/icons/ReceivableIcon.svg"
import StaffPaidIcon from "../../../assets/icons/StaffPaidIcon.svg"
import ReceivedIcon from "../../../assets/icons/ReceivedIcon.svg"
import RevenueIcon from "../../../assets/icons/RevenueIcon.svg"

export const financeCardsData =[
  {
    id:1,
    cardLabel:"Total Invoiced Amount",
    cardPrice:"104.088£",
    cardImg:InvoiceIcon,
    borderLeftbgColor:"#65CDF0",
  },
  {
      id:2,
      cardLabel:"Amount Receivable",
      cardPrice:"110.20£",
      cardImg:ReceivableIcon,
      borderLeftbgColor:"#F7B923",
    },
    {
      id:3,
      cardLabel:"Staff Paid Amount",
      cardPrice:"48.250£",
      cardImg:StaffPaidIcon,
      borderLeftbgColor:"#EE2E7E",
    },
    {
      id:4,
      cardLabel:"Received Amount ",
      cardPrice:"110.981£",
      cardImg:ReceivedIcon,
      borderLeftbgColor:"#65CDF0",
    },
    {
      id:5,
      cardLabel:"Net Revenue",
      cardPrice:"98.210£",
      cardImg:RevenueIcon,
      borderLeftbgColor:"#52C41A",
    },
]