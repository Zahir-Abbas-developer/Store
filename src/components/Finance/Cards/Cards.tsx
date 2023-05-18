import React from 'react'
import {Card ,Row,Col,} from 'antd';
import { financeCardsData } from './Cards.utils'
import "./Cards.scss"

const Cards = () => {
 
  
    return (
      <div className='wrap-finance-cards'>
      <Row  gutter={[12,12]} justify="space-between">
     {financeCardsData.map((cardData: any, id) => {
         return (
           <Col xxl={4} xl={8} lg={12} md={12} sm={24} xs={24} >
             <Card
             className='border-radius-10 finance-card-style'
             key={id} 
             style={{ borderLeft: `9px solid ${cardData.borderLeftbgColor}`, borderTop: "none", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.13)" }}
           >
             <div className='d-flex  justify-between' >
              <div> <span className='fw-600 fs-14 finance-card-text'>{cardData.cardLabel}</span></div>
            <div>
            <img src={cardData.cardImg} className="finance-card-img"  style={{ background: cardData.borderLeftbgColor, borderRadius: '50%', }} alt="CardIcon" />
            </div>
             </div>
             <div className='wrapper-finance-card-text-price'><span className='fw-600 fs-32 finance-card-text-price'>{cardData.cardPrice}</span></div>
           </Card>
      </Col>
     
  )
     })}
       
     </Row>
  
 </div>
       
    )
}

export default Cards