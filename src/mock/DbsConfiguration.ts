export interface DataType {
    key: React.Key;
    Srno: string;
    WebsiteName: string;
    action: string;
    WebsiteLink:String;
}

export const data: DataType[] = [
    { key: 1, Srno: "01", WebsiteName: 'Check My DBS',WebsiteLink:'https://checkmydbs.co.uk', action: '...' },
    { key: 2, Srno: "02", WebsiteName: 'CRB Direct',WebsiteLink:'https://crbdirect.org.uk/', action: '...' },
];
