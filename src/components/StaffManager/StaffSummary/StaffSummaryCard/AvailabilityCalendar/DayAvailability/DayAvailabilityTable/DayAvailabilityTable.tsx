import { Table } from 'antd'
import React from 'react'
import { dayAvailabliyiyData } from '../../../../../../../mock/StaffManagerMock'
import './DayAvailabilityTable.scss';


const columns = [
    {
        title: 'Display Name',
        dataIndex: 'displayName',
        key: 'displayName',
    },
    {
        title: 'Designation',
        dataIndex: 'designation',
        key: 'designation',
    },
    {
        title: 'Mobile Number',
        dataIndex: 'mobileNumber',
        key: 'mobileNumber',
    },
    {
        title: <div className='d-flex flex-column'>Monday<span className='fs-12 fw-400'>16/05/2022</span></div>,
        dataIndex: 'monday',
        key: 'monday',
    },   
]

const DayAvailabilityTable = () => {
    return (
        <>
            <div className='day-Availability-Table-wrapper'>
                <Table columns={columns} dataSource={dayAvailabliyiyData} pagination={false} className="" scroll={{ x: "max-content" }} />
            </div>
        </>
    )
}

export default DayAvailabilityTable