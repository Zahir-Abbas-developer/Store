
import type { ColumnsType } from 'antd/es/table';
export const TopClientsCardsData = [
  {
    id: 1,
    clientName:"Jack Reacher",
    amountText: "Amount Received",
    amountPrice: "22.04£",
    avtarName:"JR",
    avtarBgColor: "#65CDF0",
    ratingStar:2.5,
  },
  {
    id: 2,
    clientName:"Care UK",
    amountText: "Amount Received",
    amountPrice: "22.04£",
    avtarName:"CU",
    avtarBgColor: "#EE2E7E",
    ratingStar:4,
  },{
    id: 3,
    clientName:"Marian Silviu",
    amountText: "Amount Received",
    amountPrice: "22.04£",
    avtarName:"Ms",
    avtarBgColor: "#52C41A",
    ratingStar:3.5,
  },{
    id: 4,
    clientName:"Jack Reacher",
    amountText: "Amount Received",
    amountPrice: "22.04£",
    avtarName:"JR",
    avtarBgColor: "#F7B923",
    ratingStar:2,
  },
  {
    id: 5,
    clientName:"Jack Reacher",
    amountText: "Amount Received",
    amountPrice: "22.04£",
    avtarName:"JR",
    avtarBgColor: "#65CDF0",
    ratingStar:3,
  },
  {
    id: 6,
    clientName:"Care UK",
    amountText: "Amount Received",
    amountPrice: "22.04£",
    avtarName:"CU",
    avtarBgColor: "#EE2E7E",
    ratingStar:2.5,
  },{
    id: 7,
    clientName:"Marian Silviu",
    amountText: "Amount Received",
    amountPrice: "22.04£",
    avtarName:"Ms",
    avtarBgColor: "#52C41A",
    ratingStar:4,
  },{
    id: 8,
    clientName:"Jack Reacher",
    amountText: "Amount Received",
    amountPrice: "22.04£",
    avtarName:"JR",
    avtarBgColor: "#F7B923",
    ratingStar:3.5,
  },{
    id: 9,
    clientName:"Care UK",
    amountText: "Amount Received",
    amountPrice: "22.04£",
    avtarName:"CU",
    avtarBgColor: "#EE2E7E",
    ratingStar:2.5,
  },{
    id: 10,
    clientName:"Marian Silviu",
    amountText: "Amount Received",
    amountPrice: "22.04£",
    avtarName:"Ms",
    avtarBgColor: "#52C41A",
    ratingStar:3,
  }
];

// Account Reciveable Table data
export interface IAmountData {
  key: string;
  srNo:string;
  clientName: string;
  totalInvoiceAmount?: string;
  amountReceived?: string;
  amountReceivable?: string;
  totalProfit?: string;
}
export const amountReceivableData: IAmountData[] = [
  {
    key: '1',
    srNo: '01',
    clientName:"Tall Tree",
    totalInvoiceAmount:"60,000£",
    amountReceived:"60,000£",
    amountReceivable:"10,000£",
    totalProfit:"52,100£",
    
  },
  {
    key: '2',
    srNo: '02',
    clientName:"Care Uk",
    totalInvoiceAmount:"60,000£",
    amountReceived:"60,000£",
    amountReceivable:"10,000£",
    totalProfit:"52,100£",
  
  },
  {
    key: '2',
    srNo: '03',
    clientName:"Care Uk",
    totalInvoiceAmount:"60,000£",
    amountReceived:"60,000£",
    amountReceivable:"10,000£",
    totalProfit:"52,100£",
  
  },
];

// week wise client profit data 
export const weekWiseProfitColumns: ColumnsType<any> = [
  {
    title: "<span  className='fw-600 fs-14 title-color'>Weeks</span>",
    dataIndex: 'weeks',
    key: 'weeks',
  },
  {
    title: 'January',
    dataIndex: 'january',
    key: 'january',
  },
  {
    title: 'February',
    dataIndex: 'february',
    key: 'february',
   
  },
  {
    title: 'March',
    dataIndex: 'march',
    key: 'march',
  },
  {
    title: 'April',
    dataIndex: 'april',
    key: 'april',
  },
  {
    title: 'May',
    dataIndex: 'may',
    key: 'may',
  },
  {
    title: 'June',
    dataIndex: 'june',
    key: 'june',
  },
  {
    title: 'July',
    dataIndex: 'july',
    key: 'july',
  },
  {
    title: 'August',
    dataIndex: 'august',
    key: 'august',
  },
  {
    title: 'September',
    dataIndex: 'september',
    key: 'september',
  },
  {
    title: 'October',
    dataIndex: 'october',
    key: 'october',
  },
  {
    title: 'November',
    dataIndex: 'november',
    key: 'november',
  },
  {
    title: 'December',
    dataIndex: 'december',
    key: 'december',
  },
 
];
export const weekWiseProfitTabledata = [
  {
    key: '1',
    weeks: '01',
   
    january:"1.437 £",
    february:"1.882 £",
    march:"1.882 £",
    april:"1.882 £",
    may:"1.882 £",
    june:"1.882 £",
    july:"1.882 £",
    august:"1.882 £",
    september:"1.882 £",
    october:"1.882 £",
    november:"1.882 £",
    december:"1.882 £",
    bgColor:"#FFF2F8",
    color:"#F21162",
    
    
  },
  {
    key: '2',
    weeks: '02',
    january:"1.882 £",
    february:"1.882 £",
    march:"1.882 £",
    april:"1.882 £",
    may:"1.882 £",
    june:"1.882 £",
    july:"1.882 £",
    august:"1.882 £",
    september:"1.882 £",
    october:"1.882 £",
    november:"1.882 £",
    december:"1.882 £",
    bgColor:"#FFF2F8",
    color:"#F21162",
  
  },
  {
    key: '3',
    weeks: '03',
    january:"1.882 £",
    february:"1.882 £",
    march:"1.882 £",
    april:"1.882 £",
    may:"1.882 £",
    june:"1.882 £",
    july:"1.882 £",
    august:"1.882 £",
    september:"1.882 £",
    october:"1.082 £",
    november:"1.082 £",
    december:"1.882 £",
    bgColor:"#FFF2F8",
    color:"#F21162",
  
  },
  {
    key: '4',
    weeks: '04',
    january:"1.882 £",
    february:"1.882 £",
    march:"1.882 £",
    april:"1.882 £",
    may:"1.882 £",
    june:"1.882 £",
    july:"1.882 £",
    august:"1.882 £",
    september:"284 £",
    october:"1.082 £",
    november:"284 £",
    december:"1.882 £",
    bgColor:"#FFF2F8",
    color:"#F21162",
  
  },
  { 
  key: '5',
  weeks: 'Total',
  january:"6.004 £",
  february:"6.004 £",
  march:"6.004 £",     
  april:"6.004 £",
  may:"6.004 £",
  june:"6.004 £",    
  july:"6.004 £",
  august:"6.004 £",
  september:"284 £",
  october:"1.082 £",
  november:"284 £",
  december:"1.882 £"
  

  }
];

