import { Card, Col,  Row } from "antd"
import { ProgressGraph } from "./ProgressGraph"
import { TrafficMonitoringGraph } from "./TrafficMonitoringGraph"
import "../../../sass/common.scss"
import "./TrafficMonitoring.scss"

//Main
const TrafficMonitorng=()=>{
    return(
          <Card style={{minHeight:"400px"}} className="traffic-monitoring-card">
                <p className="fw-500 fs-16 m-0" style={{color:"#4E4B66"}}>Traffic Monitoring</p>
            
        <Row style={{display:"flex",alignItems:"center",justifyContent:"space-around",marginTop:"40px"}}>
            <Col xl={18} lg={24} md={24} sm={24} xs={24}>
          <TrafficMonitoringGraph/>
          
         
            </Col>
            
            <Col xl={{span:4,offset: 2}} lg={24} md={24} sm={24} xs={24} >
                <ProgressGraph/>
                <p>Visitor Traffic</p>
          
            </Col>
        </Row>
            </Card>
    )
}

export default TrafficMonitorng