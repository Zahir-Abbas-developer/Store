import React from 'react'
import { Card, Row, Col, Space, Layout } from 'antd'
import WeekWiseSummaryGraph from './WeekWiseSummaryGraph'
import '../../../../sass/common.scss'
import ClientAvgBlueCircle from "../../../../assets/icons/finance/ClientAvgBlueCircle.svg"
import ClientAvgRedCircle from "../../../../assets/icons/finance/ClientAvgRedCircle.svg"


import './WeekWiseSummary.scss'
const WeekWiseSummary = () => {
  return (
    <Layout className='finance-week-wise-summary'>
      <Card className=" border-radius-8 card card-bg-color finance-week-wise-summary-card" bordered={false} >
       
          <Row className="d-flex align-items-center justify-between" gutter={[23,23]}>
            <Col xs={24} sm={24} lg={24} xl={10} xxl={16} md={24}>
              <p className=" title-color fw-500 fs-20" style={{paddingBottom:"10px"}}>Week wise shift hours summary</p>
            </Col>
            <Col xs={24} sm={24} lg={24} xl={8} xxl={5} md={24}>
                
                {/* <div className="d-flex align-items-center week-wise-summary-left-text end title-color fw-400 fs-13 text-nowrap"> */}
                  <div className='week-wise-summary-left-text  d-flex align-items-center justify-between'>
                    <div className='week-wise-summary-left-text  d-flex align-items-center'>
                  <img src={ClientAvgBlueCircle} alt="circle" className='d-flex align-center' />  <span className='fw-400 fs-13 text-no-wrap' style={{marginLeft:"6px"}}>  Week 01</span></div>
                  <div className='week-wise-summary-left-text  d-flex align-items-center'  >
                  <img src={ClientAvgRedCircle} alt="circle" className='d-flex align-center' />    <span className='fw-400 fs-13 text-no-wrap'   style={{marginLeft:"6px"}}>    Week 02 </span> </div>
                  <div className='week-wise-summary-left-text  d-flex align-items-center'>
                  <div style={{width:"17px" , height:"17px", backgroundColor:"#F7B923", borderRadius:"50%",border:'none'}} > </div>  <span  className='title-color fw-400 fs-13 text-no-wrap'  style={{marginLeft:"6px"}}> Week 03</span>
                  </div>
                  </div>
               
                  </Col>
                  <Col xs={24} sm={24} lg={24} xl={3} xxl={2} md={24}>
                    <span className='fw-400 fs-13 ' style={{paddingBottom:"20px"}}>  <a className='week-wise-summary-link fw-400 fs-13 text-no-wrap' >View Details</a></span>
                
            
                  </Col>
          </Row>
        <WeekWiseSummaryGraph />
      </Card>

    </Layout>
  )
}

export default WeekWiseSummary
