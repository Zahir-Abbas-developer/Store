import React from 'react';
import { Tabs,Card,Col,Row } from 'antd';
import type { TabsProps } from 'antd';
import CurrentTab from './CurrentTab';
import DueTab from './DueTab';
import OverDueTab from './OverDueTab';
import '../AccountRecieveable/AccountReceivable.scss';

const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Current`,
      children: <CurrentTab/>,
    },
    {
      key: '2',
      label: `Due`,
      children: <DueTab/>,
    },
    {
      key: '3',
      label: `Overdue`,
      children: <OverDueTab/>,
    },
  ];
const AccountReceivable = () => {
    const onChange = (key: string) => {
        console.log(key);
      }
  return (
    <div className='wrap-account-tabs'>
     <Card className="  border-radius-8 card wrap-finance-current-due-tabs card-bg-color" bordered={false} >
      <div className="attendance-summary">
        <Row>
          <Col xs={24} sm={12} lg={12} xl={12} md={12}>
          <p className=" title-color fw-500 fs-20">Account Receivable</p>
          </Col>
         
        </Row>
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="account-receivable-graph"/>  
    </Card>
      
    </div>
  )
}

export default AccountReceivable