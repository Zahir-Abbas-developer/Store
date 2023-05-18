import { Card,Row,Col } from 'antd'
import React from 'react'
import MemoryUsageGraph from './MemoryUsageGraph'
import './SystemPerformanceMemoryUsage.scss'

const SystemPerformanceMemoryUsage = () => {
  return (
    <Row  gutter={[23,23]}>
    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
   <Card className='wrap-system-performance-memoory-usage-card border-radius-8 bg-white card-box-shadow'>
    <MemoryUsageGraph/>
   </Card>
   </Col>
   </Row>
  )
}

export default SystemPerformanceMemoryUsage