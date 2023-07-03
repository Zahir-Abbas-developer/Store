import { Layout, Row, Col, Card, Select, Form ,Space} from 'antd'
import React ,{useState}from 'react'
import './SystemPerformance.scss'
import SystemPerformanceMemoryUsage from './SystemPerformanceCharts/MemoryUsage/SystemPerformanceMemoryUsage';
import ServerDownTime from './SystemPerformanceCharts/ServerDownTime/ServerDownTime';
import UpTimeChanges from './SystemPerformanceCharts/UptimeChanges/UpTimeChanges';
import Used from './SystemPerformanceCharts/Used/Used';
import BreadCrumb from '../../layout/BreadCrumb/BreadCrumb';


const SystemPerformance = () => {
   const [IsShown,seIsShown]=useState(false)
   const [IsShownMemory,seIShownMemory]=useState(true)
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
const handleMemoryUtilization= ()=>{
   seIShownMemory(true);
   seIsShown(false);

}
const handleServerDown= ()=>{
   seIsShown(true);
   seIShownMemory(false);
  
}

const breadCrumbItems = [
  {
    title: "System Performance",
    path: "",
  },
  {
    title: "Dashboard",
    path: "/dashboard",
  },
];

    return (
      <>
            <BreadCrumb breadCrumbItems={breadCrumbItems} />

 <Layout className='wrap-main-system-performance'>
    <Row  gutter={[23,23]}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
           <Card className='wrap-system-performance-top-card border-radius-8 bg-white card-box-shadow d-flex align-items-center'>
            <div className='d-flex  align-items-center wrap-system-performance-select-field' >
              <Form layout='vertical'  style={{padding:"14px 0px"}}>
                 <Form.Item name="usageTime" label={<span className='fs-14 fw-600 line-height-17 title-color'>Usage Time </span>}>
                   <Select className='completed-shift-select-input border-radius-4'
                        defaultValue="Last 30 mins"
                         style={{ width: 120 }}
                         onChange={handleChange}
                           options={[
                            { value: 'LastOneHours', label: 'Last 1 hours' },
                            { value: 'LastTwoHours', label: 'Last 2 hours' },
                             { value: 'LastThreeHours', label: 'Last 3 hours' },
                              ]}
/>
     </Form.Item>
        </Form>
        <div><span className='fs-14 fw-600 line-height-12 system-performance-top-card-title' style={{color:"#4E132C"}}>Memory Usage :</span> <span className='fs-14 fw-400 line-height-12'>92.31%</span></div>
        <div><span className='fs-14 fw-600 line-height-12 system-performance-top-card-title' style={{color:"#4E132C"}}>Used :</span> <span className='fs-14 fw-400 line-height-12'>21.21%</span></div>
        </div>
            </Card>
            </Col>
            </Row>

            <Row  gutter={[23,23]}>
               <Col  xs={24} sm={24} md={24} lg={9} xl={6}>
                  <Card className='wrap-system-performance-left-side-card border-radius-8 bg-white card-box-shadow '> 
                   <Row gutter={[10,10]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className='system-performance-inner-card-one d-flex align-items-center cursor-pointer' onClick={handleMemoryUtilization} style={{backgroundColor:IsShownMemory?"#FFF6E1":"#F5F5F5"}}> 
                          <span className='fw-600 fs-14 line-height-17 title-color system-performance-inner-card-title'>Memory Utilization</span>
                        </div>
                    </Col>
                   </Row>
                   <Row gutter={[10,10]}>
                    <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className='system-performance-inner-card-two d-flex align-items-center cursor-pointer' onClick={handleServerDown} style={{backgroundColor:IsShown?"#FFF6E1":"#F5F5F5"}}>
                           <span className='fw-600 fs-14 line-height-17  title-color system-performance-inner-card-title'>Server Downtime</span>
                     </div>
                    </Col>
                   </Row>
                  </Card>
               </Col>
              
            <Col  xs={24} sm={24} md={24} lg={15} xl={18}>
                  <Card className='wrap-system-performance-left-side-card border-radius-8 bg-white card-box-shadow '> 
                  {IsShownMemory? (
                  <span className='fw-600 fs-16 line-height 24 form-heading-color'>
                  Memory Usage
                  </span>
                  ):
                  (
                  <span className='fw-600 fs-16 line-height 24 form-heading-color'>
                  Server Downtime
                  </span>
                  )
}
                 {IsShownMemory?(<><SystemPerformanceMemoryUsage/> 
                  <Used/></>):""}
                  
                  {IsShown ? ( <>
                  <ServerDownTime/>
                  <UpTimeChanges/>
                  </>
                  ):""
}
                  </Card>
                  </Col>
            </Row>


        </Layout>
        </>   
    )
}

export default SystemPerformance