import React, { useState } from 'react';
import { Button, Carousel } from 'antd';
import shoesImage from "../../../assets/images/MicrosoftTeams-image (7).png"
import shoesImage1 from "../../../assets/images/MicrosoftTeams-image (8).png"
import shoesImage2 from "../../../assets/images/MicrosoftTeams-image (9).png"
import shoesImage3 from "../../../assets/images/MicrosoftTeams-image (10).png"
import { Link } from 'react-router-dom';
import './SelectServices.scss'
const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const SelectServices = () => {
  const [viewAllProductsBackground ,setViewAllProductsBackground]=useState("white")
  const [viewAllProductsText ,setViewAllProductsText]=useState("black")
  return((
  <Carousel autoplay>
    <div style={{position:"relative"}}>

      <img src={shoesImage} style={{width:"100%",height:"90vh"}} />
      <div style={{position:"absolute",  top: "30%" ,marginLeft:"50px"}} className='custom-product-carousel'>
      <p style={{fontSize:"40px",fontWeight:"400",color:"white",marginBottom:"0px"}}>LEATHER</p>
  <h1 style={{fontSize:"70px",fontWeight:"600",color:"white",marginBottom:"18px",marginTop:"0PX"}}>SHOES</h1>
  <Link to="/dashboard" style={{ background: viewAllProductsBackground, padding: "14px", color: viewAllProductsText ,border:"1px solid black" }} onMouseLeave={()=>{setViewAllProductsBackground("white");setViewAllProductsText("black")}} onMouseOver={()=>{setViewAllProductsBackground("black");setViewAllProductsText("white")}} >LATEST PRODUCTS</Link>

      </div>
    
    </div>

    <div style={{position:"relative"}}>

<img src={shoesImage2} style={{width:"100%",height:"90vh"}} />
<div style={{position:"absolute",  top: "30%" ,marginLeft:"50px"}} className='custom-product-carousel'>
<p style={{fontSize:"40px",fontWeight:"400",color:"white",marginBottom:"0px"}}>CUSTOM</p>
  <h1 style={{fontSize:"70px",fontWeight:"600",color:"white",marginBottom:"18px",marginTop:"0PX"}}>JACKETS</h1>
  <Link to="/jacket-details" style={{ background: viewAllProductsBackground, padding: "14px", color: viewAllProductsText ,border:"1px solid black" }} onMouseLeave={()=>{setViewAllProductsBackground("white");setViewAllProductsText("black")}} onMouseOver={()=>{setViewAllProductsBackground("black");setViewAllProductsText("white")}} >LATEST PRODUCTS</Link>

</div>

</div>
  </Carousel>
))}

export default SelectServices;