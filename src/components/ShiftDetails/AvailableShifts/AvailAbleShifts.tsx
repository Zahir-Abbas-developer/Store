import React from 'react'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import AvailableShiftsTab from './AvailableShiftsTab/AvailableShiftsTab.';
import ConfirmationTab from './ConfirmationTab/ConfirmationTab';

import './AvailableShift.scss'
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';
const items: TabsProps['items'] = [
  {
    key: 'available-shifts',
    label: `Available Shifts`,
    children: <AvailableShiftsTab />,
  },
  {
    key: 'confirmations',
    label: `Confirmations`,
    children: <ConfirmationTab />,
  },

];
 //BreadCrumb Items
 const breadCrumbItems = [
  {
    title: "Available Shifts",
    path: "",
  },
  {
    title: "Dashboard",
    path: "/dashboard",
  },
];
const AvailAbleShifts = () => {
  return (
    <> <BreadCrumb breadCrumbItems={breadCrumbItems} />
    <div className='wrap-shifts-tabs'>
      <Tabs defaultActiveKey="available-shifts" items={items} />
    </div>
    </>
  )
}

export default AvailAbleShifts
