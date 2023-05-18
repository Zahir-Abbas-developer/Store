import React from 'react'
import { Card ,Row,Col,Layout} from 'antd'
import ClientAverageProfitGraph from './ClientAverageProfitGraph'
import ClientAvgBlueCircle from "../../../../assets/icons/finance/ClientAvgBlueCircle.svg"
import ClientAvgRedCircle from "../../../../assets/icons/finance/ClientAvgRedCircle.svg"
import '../ClientAverageProfit/ClientAverageProfit.scss';

const ClientAverageProfit = () => {
;
  return (
    <Layout className="wrap-client-wise-avg-profit">
     <Card className="client-wise-avg-profit-card  border-radius-8 card card-bg-color" bordered={false}>
      <div className="">
        <Row className="d-flex align-items-center justify-between">
          <Col xs={24} sm={12} lg={12} xl={12} md={12}>
          <p className=" title-color fw-500 fs-20">Clients Wise Avg Profit</p>
          </Col>
          <Col xs={24} sm={12} lg={12} xl={12} md={12}>
            <div  className="d-flex align-items-center justify-end title-color fw-400 fs-13">
           <img src={ClientAvgBlueCircle} alt="circle"/> &nbsp; Total Revenue   &nbsp;
           <img src={ClientAvgRedCircle} alt="circle"/>  &nbsp;Avg Profit
           </div>
          </Col>
        </Row>
      </div>
       <ClientAverageProfitGraph/>
    </Card>

    </Layout>
  )
}

export default ClientAverageProfit
