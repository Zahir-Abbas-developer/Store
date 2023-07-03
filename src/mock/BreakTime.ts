export interface DataType {
    key: React.Key;
    Srno: string;
    BreakTime: string;
    action: string;
    CareHome: string;
}

export const BreakTimeData: DataType[] = [
    { key: 1, Srno: "01", BreakTime: 'Shift time range from 1 to 8 hours will have a 45 min break ', CareHome: 'Tall Tree Care Home',action: '...' },
    { key: 2, Srno: "02", BreakTime: 'Shift time range from 8 to 12 hours will have a 60 min break ', CareHome: 'Tall Tree Care Home', action: '...' },
];
