
export interface DataType {
    key: React.ReactNode;
    SNo: string;
    MenuName: string;
    actoin: string;
    children?: DataType[];
}

export const EmailNotificationData: DataType[] = [
    {
        key: 1,
        SNo: '01',
        MenuName: "David",
        actoin: '',
      
    },
    {
        key: 2,
        SNo: '02',
        MenuName: "Ashley",
        actoin: '',
      
    },
    {
        key: 3,
        SNo: '03',
        MenuName: "Thomas",
        actoin: '',
      
    },
    {
        key: 4,
        SNo: '04',
        MenuName: "Jithin",
        actoin: '',
      
    },
    {
        key: 5,
        SNo: '05',
        MenuName: "Vishnu",
        actoin: '',
      
    },
 
  
];
