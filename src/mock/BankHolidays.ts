export interface DataType {
    key: React.Key;
    Srno: string;
    HolidayName: string;
    action: string;
    HolidayDate:String;
}

export const data: DataType[] = [
    { key: 1, Srno: "01", HolidayName: 'Bank Holiday',HolidayDate:'13/06/2022', action: '...' },
    { key: 2, Srno: "02", HolidayName: 'Bank Holiday',HolidayDate:'18/06/2022', action: '...' },
];
