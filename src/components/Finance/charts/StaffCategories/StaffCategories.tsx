import { Card ,Row,Col,Layout} from 'antd'
import React from 'react'
import StaffCategoriesGraph from './StaffCategoriesGraph'
import '../ClientAverageProfit/ClientAverageProfit.scss';

const StaffCategories = () => {
  
  return (
    <Layout className="wrap-client-wise-avg-profit">
     <Card className="client-wise-avg-profit-card   border-radius-8 card card-bg-color" bordered={false} >
      <div className="attendance-summary">
        <Row>
          <Col xs={24} sm={12} lg={12} xl={12} md={12}>
          <p className="attendance-summary-text title-color fw-500 fs-20">Staff Categories</p>
          </Col>
         
        </Row>
      </div>
       <StaffCategoriesGraph/>
    </Card>
  </Layout>
  )
}

export default StaffCategories
