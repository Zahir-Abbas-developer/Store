import React from 'react'
import { TabsProps ,Tabs, Row, Col} from 'antd';
import './RatingReportTabs.scss'
import BreadCrumb from '../../../../layout/BreadCrumb/BreadCrumb';
import ClientRating from '../ClientRating/ClientRating';
import CarerRating from '../CarerRating/CarerRating';

const items: TabsProps['items'] = [
  {
    key: 'client-rating',
    label: `Client Rating`,
    children: <ClientRating/>
  },
  {
    key: 'carer-rating',
    label: `Carer Rating`,
    children: <CarerRating/>,
  },

];
 //BreadCrumb Items
 const breadCrumbItems = [
  {
    title: "Ratings Report",
    path: "",
  },
  {
    title: "Carer Coordinator Reports",
    path: "/reports",
  },
];
const RatingReportTabs = () => {
  return (
    <> <BreadCrumb breadCrumbItems={breadCrumbItems} />
    <Row className='wrap-ratings-report-tabs'>
      <Col xs={24}>
      <Tabs defaultActiveKey="client-rating" items={items} />
      </Col>
    </Row>
    </>
  )
}

export default RatingReportTabs
