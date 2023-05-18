import { Card, Col, Row } from "antd"
import { BulletLines } from "./BulletLinesGraph"
import { DemoRingProgress } from "./CircleProgressGraph"
import { MemoryUsageGraph } from "./MemoryUsageGraph"
import { DemoVerticalLines } from "./VerticalLines"
import "./MemoryUsage.scss"
import "../../../sass/common.scss"
//Main
export const MemoryUsage = () => {
    return (
        <Card className="memory-usage-card">
                <p className="fw-500 fs-16 m-0" style={{ color: "#4E4B66" }}>Memory Usage</p>
            <Row style={{marginTop:"3px"}}>
                <Col xl={4} lg={24} md={24} sm={24} xs={24}>
                <p className="fw-400 fs-12 " style={{color:"#6C757D"}}>Memory Usage</p>
                </Col>
                <Col  xl={20} lg={22} md={24} sm={24} xs={24} >
                <Row gutter={[8, 8]}>

                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                
                   <Card  className="border-radius-8" style={{  boxShadow: '-7.07129px 7.07129px 10.6069px rgba(131, 164, 249, 0.15)' }}> <MemoryUsageGraph /></Card>
                </Col>
                <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                <Card  className="border-radius-8" style={{  boxShadow: '-7.07129px 7.07129px 10.6069px rgba(131, 164, 249, 0.15)' }}>
                        <DemoVerticalLines />
                    </Card>
                    
                </Col>
                <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                <Card className="bullet-lines border-radius-8" style={{  boxShadow: '-7.07129px 7.07129px 10.6069px rgba(131, 164, 249, 0.15)' }}>
                       <BulletLines />
                   </Card>
                </Col>
                <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                    <Card  className="border-radius-8" style={{  boxShadow: '-7.07129px 7.07129px 10.6069px rgba(131, 164, 249, 0.15)' }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <DemoRingProgress />
                            <div style={{ marginLeft: "15px" }}> <DemoRingProgress /></div>
                        </div>
                    </Card>
                </Col>
               
            </Row>
                </Col>
            </Row>
            
        </Card>


    )
}