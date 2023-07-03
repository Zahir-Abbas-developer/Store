import { ColumnsType } from "antd/es/table";
import { NodeElement } from "rc-tree/lib/interface";

export interface IClientsPaymentsTableData {
    key: string;
    client: string;
    date: string;
    transaction_type: string;
    invoice_number: number;
    due_date: string;
    amount: number;
    open_balance: number;
}
export interface IStaffPaymentsTableData {
    key: string;
    staff_name: any;
    staff_date: string;
    staff_type: string;
    staff_category: string;
    clients_count: number;
    client_rate: number;
    staff_hours: number;
    shifts_count: number;
    salary_hours: number;
}


export const ClientsData: IClientsPaymentsTableData[] = [
    {
        key: '01',
        client: 'John Doe',
        date: '20/04/2022',
        transaction_type: 'Invoice',
        invoice_number: 1544,
        due_date: '20/05/2022',
        amount: 2035,
        open_balance: 2045
    },
    {
        key: '02',
        client: 'John Doe',
        date: '20/04/2022',
        transaction_type: 'Invoice',
        invoice_number: 1545,
        due_date: '20/05/2022',
        amount: 2080,
        open_balance: 2044
    },
    {
        key: '03',
        client: 'John Doe',
        date: '20/04/2022',
        transaction_type: 'Invoice',
        invoice_number: 1546,
        due_date: '20/05/2022',
        amount: 2035,
        open_balance: 2045
    },
    {
        key: '04',
        client: 'John Doe',
        date: '20/04/2022',
        transaction_type: 'Invoice',
        invoice_number: 1547,
        due_date: '20/05/2022',
        amount: 2035,
        open_balance: 2045
    },
    {
        key: '05',
        client: 'John Doe',
        date: '20/04/2022',
        transaction_type: 'Invoice',
        invoice_number: 1548,
        due_date: '20/05/2022',
        amount: 2035,
        open_balance: 2045
    },
    {
        key: '06',
        client: 'John Doe',
        date: '20/04/2022',
        transaction_type: 'Invoice',
        invoice_number: 1549,
        due_date: '20/05/2022',
        amount: 2035,
        open_balance: 2045
    },
    {
        key: '07',
        client: 'John Doe',
        date: '20/04/2022',
        transaction_type: 'Invoice',
        invoice_number: 1550,
        due_date: '20/05/2022',
        amount: 2035,
        open_balance: 2045
    },
];
export const StaffData: IStaffPaymentsTableData[] = [
    {
        key: '01',
        staff_name: 'Praveen Jose',
        staff_date: '18-07-2022 - 22-03-2023',
        staff_type: 'HCA',
        staff_category: 'Payroll',
        clients_count: 1,
        client_rate: 15,
        staff_hours: 24,
        shifts_count: 2,
        salary_hours: 5,
    },
    {
        key: '02',
        staff_name: 'Praveen Jose',
        staff_date: '18-07-2022 - 22-03-2023',
        staff_type: 'HCA',
        staff_category: 'Payroll',
        clients_count: 1,
        client_rate: 15,
        staff_hours: 24,
        shifts_count: 2,
        salary_hours: 5,
    },
    {
        key: '03',
        staff_name: 'Praveen Jose',
        staff_date: '18-07-2022 - 22-03-2023',
        staff_type: 'HCA',
        staff_category: 'Payroll',
        clients_count: 1,
        client_rate: 15,
        staff_hours: 24,
        shifts_count: 2,
        salary_hours: 5,
    },
    {
        key: '04',
        staff_name: 'Praveen Jose',
        staff_date: '18-07-2022 - 22-03-2023',
        staff_type: 'HCA',
        staff_category: 'Payroll',
        clients_count: 1,
        client_rate: 15,
        staff_hours: 24,
        shifts_count: 2,
        salary_hours: 5,
    },
    {
        key: '05',
        staff_name: 'Praveen Jose',
        staff_date: '18-07-2022 - 22-03-2023',
        staff_type: 'HCA',
        staff_category: 'Payroll',
        clients_count: 1,
        client_rate: 15,
        staff_hours: 24,
        shifts_count: 2,
        salary_hours: 5,
    },
    {
        key: '06',
        staff_name: 'Praveen Jose',
        staff_date: '18-07-2022 - 22-03-2023',
        staff_type: 'HCA',
        staff_category: 'Payroll',
        clients_count: 1,
        client_rate: 15,
        staff_hours: 24,
        shifts_count: 2,
        salary_hours: 5,
    },
    {
        key: '07',
        staff_name: 'Praveen Jose',
        staff_date: '18-07-2022 - 22-03-2023',
        staff_type: 'HCA',
        staff_category: 'Payroll',
        clients_count: 1,
        client_rate: 15,
        staff_hours: 24,
        shifts_count: 2,
        salary_hours: 5,
    },
    {
        key: '08',
        staff_name: 'Praveen Jose',
        staff_date: '18-07-2022 - 22-03-2023',
        staff_type: 'HCA',
        staff_category: 'Payroll',
        clients_count: 1,
        client_rate: 15,
        staff_hours: 24,
        shifts_count: 2,
        salary_hours: 5,
    },
    {
        key: '09',
        staff_name: 'Praveen Jose',
        staff_date: '18-07-2022 - 22-03-2023',
        staff_type: 'HCA',
        staff_category: 'Payroll',
        clients_count: 1,
        client_rate: 15,
        staff_hours: 24,
        shifts_count: 2,
        salary_hours: 5,
    },
];
