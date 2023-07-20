import { Col, Row } from "antd"
import './Footer.scss'
import FreeShipping from '../../assets/icons/Footer/free-shipping.svg'
import FreeRepairs from '../../assets/icons/Footer/Free-repairs.svg'
import SecureCheckout from '../../assets/icons/Footer/Secure-Checkout.svg'
import LogoWhite from '../../assets/icons/Footer/Logo-White.svg'
import paypal from '../../assets/icons/Footer/Paypal-badge.svg'
import visa from '../../assets/icons/Footer/visa-badge.svg'
import mastercard from '../../assets/icons/Footer/mastercard-badge.svg'
import fb from '../../assets/icons/Footer/fb.svg'
import instasvg from '../../assets/icons/Footer/instasvg.svg'
import Twitter from '../../assets/icons/Footer/Twitter.svg'
import { Link } from "react-router-dom"
const FooterDetails=()=>{
  return (
    <section >
      <Row className="footer-main">
       <Col xs={24} md={8}>
        <div style={{textAlign:"center",padding:"40px"}}>
          <img src={FreeShipping}></img>
          <p className="widget-text">Shipping Nationwide</p>
        </div>
       </Col>
       <Col  xs={24} md={8}>
        <div style={{textAlign:"center",padding:"40px"}}>
          <img src={FreeRepairs}></img>
          <p className="widget-text" >Hand-crafted Shoes</p>
        </div>
       </Col>
       <Col  xs={24} md={8}>
        <div style={{textAlign:"center",padding:"40px"}}>
          <img src={SecureCheckout}></img>
          <p className="widget-text">Secure Checkout</p>
        </div>
       </Col>
      </Row>
      <Row className="footer-main">
        <Col xs={24} md={8}>
       <div style={{textAlign:"center"}}>
         <p style={{color:"#fff" ,fontWeight:"700",marginBottom:"0px"}} >Address </p>
         <p style={{color:"#fff" ,marginTop:"0px"}}>Saddar ,Rawalpindi </p>
         <p style={{color:"#fff" ,fontWeight:"700",marginBottom:"0px"}}>Phone</p>
         <p style={{color:"#fff" ,marginTop:"0px"}}>+923075209625</p>
         <p style={{color:"#fff" ,fontWeight:"700",marginBottom:"0px"}}>Email </p>
         <p style={{color:"#fff" ,marginTop:"0px"}}>SolaceLeather@gmail.com</p>
       </div>
        </Col>
        <Col xs={24} md={8}>
      <div style={{textAlign:"center"}}>
      <p>  <Link  to="/contact-details" style={{color:"#fff"}}>Contact</Link></p>
          <p> <Link  to="" style={{color:"#fff"}}>Privacy Policy</Link></p>
          <p> <Link  to="/login" style={{color:"#fff"}}>My Account</Link></p>
          <p>
          <Link  to="" style={{color:"#fff"}}>Delivery & Returns</Link>
          </p>
       
    
<p>         <Link  to="" style={{color:"#fff"}}>Terms & Conditions</Link></p>
      </div>

        </Col>
        <Col xs={24} md={8}>
         <div style={{textAlign:"center"}}>
         <p>  <img src={mastercard}></img></p>
         <p>   <img src={paypal}></img></p>
        <p> <img src={visa}></img></p>
         </div>
       
        </Col>
      </Row>
      <Row className="footer-main">
        <Col xs={24} md={8}>
        {/* <p style={{color:"#fff"}}>  © SOLACE LEATHER </p> */}
        </Col>
        <Col xs={24} md={8}>
      <div style={{textAlign:"center"}}>
      <p style={{color:"#fff" ,fontWeight:"700"}}>  © SOLACE LEATHER </p>
      </div>

        </Col>
       
      </Row>
    </section>
      
  )
}
export default FooterDetails