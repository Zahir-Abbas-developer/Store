import React from 'react';
import { Tabs } from 'antd';
import type { App, TabsProps } from 'antd';
import OurCollectionTabDetails from '../OurCollectionTabDetails/OurCollectionTabDetails';
import OurCustomOrderDetails from '../CustomOrderTabDetails/CustomOrderTabDetails';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `OUR COLLECTION`,
    children: <OurCollectionTabDetails/>,
  },
  {
    key: '2',
    label: `CUSTOM ORDER`,
    children: <OurCustomOrderDetails/>,
  },
  {
    key: '3',
    label: `FITING GUIDE`,
    children: `Content of Tab Pane 3`,
  },
];

const OurCollectionTab = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} style={{backgroundColor:"transparent !important"}}/>;

export default OurCollectionTab;