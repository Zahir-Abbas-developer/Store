import { useState } from 'react';
import { Card, Col, Row, Tabs } from 'antd'
import type { TabsProps } from 'antd';
import PendingPaymentDetails from '../PendingPaymentDetails/PendingPaymentDetails';
import PaymentHistory from '../PaymentHistory/PaymentHistory';
import './ClientPaymentDetails.scss';
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb';

const ClientPaymentDetails = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const onChange = (key: string) => {
    console.log(key);
  };
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Pending Payment Details`,
      children: <PendingPaymentDetails PaymentDetailsType="Client" selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} />,
    },
    {
      key: '2',
      label: `Payment History`,
      children: <PaymentHistory PaymentDetailsType="Client" selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} />,
    },
  ];

  const breadCrumbItems = [
    {
      title: "Client Payment Details",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Finance",
      path: "/finance",
    },
  ];
  return (
    <>
      <BreadCrumb breadCrumbItems={breadCrumbItems} />

      <div className='client-payments-wrapper'>
        <Card>
          <Row className='payment-details-tabs-wrapper'>
            <Col span={24}>
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </Col>
          </Row>
        </Card>
      </div>
    </>
  )
}

export default ClientPaymentDetails