import React from 'react'
import { useNavigate } from 'react-router-dom';

// Ant Components
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';

// Components
import AvailabilitySheet from './AvailabilitySheet/AvailabilitySheet';
import DayAvailability from './DayAvailability/DayAvailability';
import WeekAvailability from './WeekAvailability/WeekAvailability';

// SCSS
import "./StaffAvailabilitySheet.scss";

const StaffAvailabilitySheet = () => {
    const navigate = useNavigate();
    const currentPathArray = window.location.pathname.split('/'); // get the current path in a array

    const StaffAvailabilityTabItems: TabsProps['items'] = [
        {
            key: 'staff-availability-sheet',
            label: `Availability Sheet`,
            children: <AvailabilitySheet />,
        },
        {
            key: 'weekly-availability-sheet',
            label: `Week Availability Sheet Download`,
            children: <WeekAvailability />
        },
        {
            key: 'daily-availability-sheet',
            label: `Day Availability Sheet Download`,
            children: <DayAvailability />
        },
    ];

    // Upon Changing the Tab, I'm changing the URL, so temporary I've called the component directly in the above StaffAvailabilityTabItems array

    const handleChange = (key: any) => {
        navigate(`/reports/${key}`);
    }

    return (
        <div className='staff-availability-sheet-wrapper'>
            {/* giving the current url in the default key, so that if user refreshes the page, that tab will be active for the given url  */}
            <Tabs onTabClick={handleChange} defaultActiveKey={currentPathArray[currentPathArray.length - 1]} items={StaffAvailabilityTabItems} />
        </div>
    )
}

export default StaffAvailabilitySheet