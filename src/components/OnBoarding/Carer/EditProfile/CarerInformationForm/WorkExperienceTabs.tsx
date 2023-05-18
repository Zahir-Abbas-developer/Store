
import React from 'react';
import { Card, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import WorkExperience from './WorkExperience';
import UnemployementPeriod from './UnemployementPeriod';
import { useLocation } from 'react-router-dom';
import { useGetWorkExperienceRequestByIdQuery } from '../../../../../store/Slices/WorkExperience';
// import "./ManageUserTabs.scss";

const onChange = (key: string) => {
    console.log(key);
};



const WorkExperienceTabs = (props: any) => {
    const { handleSelectedStepValue, auditCheck } = props;
    
  
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Work Experience',
            children: <WorkExperience handleSelectedStepValue={handleSelectedStepValue} auditCheck={auditCheck} />,
        },
        {
            key: '2',
            label: "Unemployement Period",
            children: <UnemployementPeriod handleSelectedStepValue={handleSelectedStepValue} auditCheck={auditCheck} />,
        },
    ];
    return (
        <div><Tabs className='manage-users-tabs' defaultActiveKey="1" items={items} onChange={onChange} /></div>
    )
}

export default WorkExperienceTabs