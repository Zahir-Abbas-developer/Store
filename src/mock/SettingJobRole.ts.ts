export interface DataType {
  key: React.Key;
  Srno: string;
  PositionName: string;
  action: string;
  ShortForm: string;
  Role: String;
}

export const data: DataType[] = [
  { key: 1, Srno: "01", PositionName: 'Registered General Carer', ShortForm: 'RGN', Role: 'Medical Staff ', action: '...' },
  { key: 2, Srno: "02", PositionName: 'Health Care Assistant', ShortForm: 'HCA', Role: 'Medical Staff ', action: '...' },
];

export interface DataTypeCrossAllocation {
  key: React.Key;
  Srno: string;
  JobRoles: string;
  crossAllocation?: boolean
}

export const dataCrossAllocation: DataTypeCrossAllocation[] = [
  { key: 1, Srno: "01", JobRoles: 'Health Care Assistant' },
  { key: 2, Srno: "02", JobRoles: 'Registered Nurse' },
  { key: 3, Srno: "03", JobRoles: 'Senior Health Care Assistant' },
  { key: 4, Srno: "04", JobRoles: 'Domestic' },
];