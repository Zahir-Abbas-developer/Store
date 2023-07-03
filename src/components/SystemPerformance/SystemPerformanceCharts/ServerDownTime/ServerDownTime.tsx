import { Row ,Col,Card} from 'antd'
import React from 'react'
import ServerDownTimeGraph from './ServerDownTimeGraph'
import '../ServerDownTime/ServerDownTime.scss'

const ServerDownTime = () => {
  return (
    <Row  gutter={[23,23]}>
    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
   <Card className='wrap-system-performance-server-down-time-card border-radius-8 bg-white card-box-shadow'>
    <ServerDownTimeGraph/>
   </Card>
   </Col>
   </Row>
  )
}

export default ServerDownTime