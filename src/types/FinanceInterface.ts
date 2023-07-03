// Finance Main Cards Interface
export interface financeReportsDataInterface {
    id: string;
    icon: string;
    title: string;
    desc: string;
    allowdedRoles: string[];
    navigateTo: string;
}


// Shift Hours page Interface
export interface shiftHoursReportMocKDataInterface {
    key: React.Key,
    staffName: string,
    staffType: string,
    staffCategory: string,
    noOfClients: string,
    clientRate: string,
    staffHours: string,
    noOfShift: string,
    salaryHours: string,
    niHours: string,
    nonNiHours: string,
    millageAllowanceHours: string,
    payRate: string,
    niPayable: string,
    nonNiPayable: string,
    totalPayable: string,
    paymentStatus: string,
}

// NI page Interface
export interface niPaymentMockDataInterface {
    key: React.Key,
    staffName: string,
    employeeCode: string,
    staffType: string,
    rate: string,
    sortCode: string,
    bankAccount: string,
    totalPayable: string
}

// Non NI Page Table Interface
export interface nonNiPaymentMockDataInterface {
    key: React.Key,
    staffName: string,
    employeeCode: string,
    staffType: string,
    totalHours: string,
    sortCode: string,
    bankAccount: string,
    totalPayable: string
}

// Limied Page Table Interface
export interface limitedMockDataInterface {
    key: React.Key,
    staffName: string,
    accountTitle: string,
    staffType: string,
    sortCode: string,
    bankAccount: string,
    totalPayable: string
}

export interface contractorPaymentMockDataInterface {
    key: React.Key,
    staffName: string,
    employeeCode: string,
    staffType: string,
    totalHours: string,
    sortCode: string,
    bankAccount: string,
    totalPayable: string
}