import { Table } from 'antd';
import React from 'react'
import { WeekAvailabliyiyData } from '../../../../../../../mock/StaffManagerMock';
import './WeekAvailability.scss';


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
    {
        title: <div className='d-flex flex-column'>Tuesday<span className='fs-12 fw-400'>17/05/2022</span></div>,
        dataIndex: 'tuesday',
        key: 'tuesday',
    },
    {
        title: <div className='d-flex flex-column'>Wednesday<span className='fs-12 fw-400'>18/05/2022</span></div>,
        dataIndex: 'wednesday',
        key: 'wednesday',
    },
    {
        title: <div className='d-flex flex-column'>Thursday<span className='fs-12 fw-400'>19/05/2022</span></div>,
        dataIndex: 'thursday',
        key: 'thursday',
    },
    {
        title: <div className='d-flex flex-column'>Friday<span className='fs-12 fw-400'>20/05/2022</span></div>,
        dataIndex: 'friday',
        key: 'friday',
    },
    {
        title: <div className='d-flex flex-column'>Saturday<span className='fs-12 fw-400'>21/05/2022</span></div>,
        dataIndex: 'saturday',
        key: 'saturday',
    },
    {
        title: <div className='d-flex flex-column'>Sunday<span className='fs-12 fw-400'>22/02/2022</span></div>,
        dataIndex: 'sunday',
        key: 'sunday',
    },
]


const WeekAvailabilityTable = () => {
    return (
        <>
            <div className='week-availabilit-table-wrapper'>
                <Table columns={columns} dataSource={WeekAvailabliyiyData} pagination={false} className="" scroll={{ x: "max-content" }} />
            </div>
        </>
    )
}

export default WeekAvailabilityTable