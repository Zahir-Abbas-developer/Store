import { Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react'
import "./AddCourse.scss"
import CreateYourContent from './CreateYourContent/CreateYourContent';
import PlanYourCourse from './PlanYourCourse/PlanYourCourse';
import PublishYourContent from './PublishYourCourse/PublishYourCourse';
import { useLocation } from 'react-router-dom';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';

const AddCourse = () => {

  const { pathname } = useLocation()
  const route = pathname.split('/')

  const [tabsValue, setTabsValue] = useState('1')
  const [responseId, setresponseId] = useState()

  const onChange = (key: string) => {
    // console.log(key);
    setTabsValue(key)
  };


  const handleTabsValueChange = (value: string) => {
    setTabsValue(value);
  }

  const handleResponseId = (value:any) => {
    setresponseId(value);
  }
  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Plan your course`,
      children: <PlanYourCourse handleTabsValueChange={handleTabsValueChange} handleResponseId={handleResponseId}/>,
    },
    {
      key: '2',
      label: `Create your content`,
      children: <CreateYourContent handleTabsValueChange={handleTabsValueChange} responseId={responseId}/>,
      disabled:  route[2] === 'edit-course' ? false : (responseId ? false : true),
    },
    {
      key: '3',
      label: `Publish your course`,
      children: <PublishYourContent responseId={responseId}/>,
      disabled: route[2] === 'edit-course' ? false : (responseId ? false : true),
    },
  ];


   //BreadCrumb Items
   const breadCrumbItems = [
    {
      title: "Add Course",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/instructor-dashboard",
    },
    {
      title: "Manage Course",
      path: "/manage-courses",
    },
  ];


  return (
    <>
    <BreadCrumb breadCrumbItems={breadCrumbItems} />
    <div className='wrapper-add-course'>
      {/* <Tabs className='tabs-wrapper-styles' defaultActiveKey={tabsValue} items={items} onChange={onChange} /> */}
      <Tabs className='tabs-wrapper-styles' activeKey={tabsValue} items={items} onChange={setTabsValue} />
    </div>
    </>
  )
}

export default AddCourse