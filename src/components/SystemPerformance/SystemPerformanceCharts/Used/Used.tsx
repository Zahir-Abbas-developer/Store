import { Row ,Col,Card} from 'antd'
import React from 'react'
import UsedGraph from './UsedGraph'
// import '../../SystemPerformance.scss'
import '../MemoryUsage/SystemPerformanceMemoryUsage.scss'
import {usedData} from '../../../../mock/SystemPerformance/SystemPerformanceData'

const Used = () => {
  return (
    <Row  gutter={[23,23]}>
    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
   <Card className='wrap-system-performance-used-card border-radius-8 bg-white card-box-shadow'>
    <span className='fw-600 fs-16 line-height-24 title-color form-heading-color'>Used%</span>
    <Row gutter={[23,23]}>
    <Col xl={15} lg={24} md={24}>
      <div className='system-performance-used-graph'>
    <UsedGraph/>
    </div>
    </Col>
    <Col xl={8} lg={24} md={24}>
    <Row gutter={[16,16]} style={{marginTop:"26px"}}>
      {usedData.map((item:any,id)=>{
        return (
 <Col xs={24} sm={24} md={24} lg={24} xl={23} >
 <div className='system-performance-inner-used-card d-flex align-items-center justify-between cursor-pointer'> 
   <span className='fw-400 fs-14 line-height-22 card-text system-performance-inner-card-title'>{item.title}</span>
   <span className='fw-400 fs-14 line-height-22 card-text system-performance-inner-card-title'>{item.used}</span>
 </div>
</Col>
        )
      })}
                   
   
    </Row>
  
    </Col>
    </Row>
  
   </Card>
   </Col>
   </Row>
  )
}

export default Used
