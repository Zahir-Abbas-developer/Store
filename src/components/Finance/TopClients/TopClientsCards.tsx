import React, { useState } from 'react'
import { TopClientsCardsData } from "../../../mock/FinanceDashboard"
import { Rate, Avatar, Row, Col, Layout, Card,  } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import '../../.../../../sass/common.scss'
import './TopClientsCrads.scss'
const TopClientsCards = () => {
  const [selectedShiftComprehension, setSelectedShiftComprehension] = useState("Months")
  return (
    <Layout className=''>
      <Card className="border-radius-10 card-bg-color wrapper-finance-top-client-cards finance-dashboard-client-card" >
        <div className=" d-flex justify-between align-items-center finance-top-client-top-text" >
         
          <div>
            <p className=" title-color fw-500 fs-20" >Top Clients</p>
          </div>
         
          <div className="finance-card-week-month" >
            <Row >
              <span  >
                <span className="title-color   fw-400 fs-16 cursor-pointer" onClick={() => { setSelectedShiftComprehension("Months"); }} style={{ borderRight: "1px solid #a0acbb", }}>Months &nbsp;</span>

              </span>

              <span className="title-color fw-400 fs-16 cursor-pointer" onClick={() => { setSelectedShiftComprehension("Week"); }} style={{}}>&nbsp;Week</span>

            </Row>

          </div>
        
        </div>
        <Row gutter={[14, 14]} >

          {selectedShiftComprehension === "Months" &&
            TopClientsCardsData.slice(0, 10)?.map((card, index) => {
              return (
                <Col md={24} lg={24} xl={24} sm={24} xs={24}>
                  <div
                    className='border-radius-10 finance-top-clients-cards d-flex align-center justify-between'
                    key={index}
                  >

                    <div className='d-flex align-center finance-top-client-cards-styling'>
                      <div>
                        <Avatar style={{ background: card.avtarBgColor, borderRadius: '50%', }} >
                          {card.avtarName}
                        </Avatar>
                      </div>
                      <div>
                        <p className='fw-400 fs-14 m-0' style={{ paddingLeft: "5px" }}>{card.clientName}

                        </p>
                        <Rate disabled allowHalf defaultValue={card.ratingStar} style={{ fontSize: "12px", marginLeft: "6px" }} />
                      </div>

                    </div>
                    <div className='d-flex align-center justify-between flex-column' >
                      <span className='fw-400 fs-14 top-candidates-button d-flex justify-end text-end'>{card.amountText}</span>
                      <span className='fw-400 fs-14 top-candidates-button d-flex align-center ' style={{ color: '#52C41A' }}>{card.amountPrice}<ArrowDownOutlined style={{ marginTop: "-2px" }} /> </span>
                    </div>


                  </div>
                </Col>

              );
            })}
        </Row>
        <Row gutter={[14, 14]}>

          {selectedShiftComprehension === "Week" &&
            TopClientsCardsData.slice(0, 10)?.map((card, index) => {
              return (
                <Col md={24} lg={24} xl={24} sm={24} xs={24}>
                  <div
                    className='border-radius-10 finance-top-clients-cards d-flex align-center justify-between'
                    key={index}>
                  
                    <div className='d-flex align-center'>
                      <div>
                        <Avatar style={{ background: card.avtarBgColor, borderRadius: '50%', }} >
                          {card.avtarName}
                        </Avatar>
                      </div>
                      <div>
                        <p className='fw-400 fs-14 m-0' style={{ paddingLeft: "5px" }}>{card.clientName}

                        </p>
                        <Rate disabled allowHalf defaultValue={card.ratingStar} style={{ fontSize: "12px", marginLeft: "6px" }} />
                      </div>
                      
                    </div>
                    <div className='d-flex align-center justify-between flex-column' >
                      <span className='fw-400 fs-14 top-candidates-button d-flex justify-end text-end'>{card.amountText}</span>
                      <span className='fw-400 fs-14 top-candidates-button d-flex align-center ' style={{ color: '#52C41A' }}>{card.amountPrice}<ArrowDownOutlined style={{ marginTop: "-2px" }} /> </span>
                    </div>
                   

                  </div>
                </Col>

              );
            })}
        </Row>

      </Card>


    </Layout>
  )
}

export default TopClientsCards