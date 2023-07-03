import { Tabs } from 'antd'
import type { TabsProps } from 'antd';
import React from 'react'
import AvailabilitySheet from './AvailabilitySheet/AvailabilitySheet';
import WeekAvailability from './WeekAvailability/WeekAvailability';
import DayAvailability from './DayAvailability/DayAvailability';
import './AvailabilityCalendar.scss';
import BreadCrumb from '../../../../../layout/BreadCrumb/BreadCrumb';
import { useLocation, useParams } from 'react-router-dom';

const AvailabilityCalendar = () => {

  const onChange = (key: string) => {
    console.log(key);
  };

  const {id} = useParams()

  const {state} = useLocation();

  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Availability Sheet`,
      children: <AvailabilitySheet />,
    },
  ];

  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "Availability Sheet",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Staff Manager",
      path: "/staff-manager",
    },
    {
      title: "Staff Summary",
      path: `/staff-manager/${id}/staff-summary`,
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <div className='AvailabilityCalendar-tab-wrapper'>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </>

  )
}

export default AvailabilityCalendar