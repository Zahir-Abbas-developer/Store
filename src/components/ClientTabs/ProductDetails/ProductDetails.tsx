import { Button, Col, Drawer, Row, Select, Space } from "antd"
import { useLocation } from "react-router-dom"
import './ProductDetails.scss'
import artisan from '../../../assets/icons/ProductDetails/artisan.svg'
import HandCraft from '../../../assets/icons/ProductDetails/hand-craft.svg'
import leather from '../../../assets/icons/ProductDetails/leather-svg-black.svg'
import sole from '../../../assets/icons/ProductDetails/sole-black-svg.svg'
import sizing from '../../../assets/icons/ProductDetails/sizing-icon-black.svg'
import { useState } from "react"
import type { DrawerProps } from 'antd/es/drawer';
import type { RadioChangeEvent } from 'antd/es/radio';
import { Collapse } from 'antd';
import { useDispatch } from 'react-redux';
import exportedObject from "../../../store"
import { addProduct } from "../../../store/Slices/AddToCardSlice"

 // Import the addToCart action creator


const { Panel } = Collapse;
 const ProductDetails=()=>{
  const { cartReducer,  removeFromCart, store } = exportedObject;
  const dispatch = useDispatch();
  const [sizes ,setSizes]=useState("")
    const state=useLocation()
    const categoryDetails=state?.state?.productDetails
    const handleSelectSizes=(applicationStageValue:any)=>{
      setSizes(applicationStageValue)
    }
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  
    const showDrawer = () => {
      setOpen(true);
    };
  
    const onChange = (e: RadioChangeEvent) => {
      setPlacement(e.target.value);
    };
  
    const onClose = () => {
      setOpen(false);
    };
    const customize = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;
  const contact = `
  If you wish to place an enquiry, please fill out your details accurately using the form on our contact us enquiry page, so that we can address your questions and comments appropriately.

  The more information that you provide us, the quicker we can respond to your enquiry. If you would prefer to speak to a member of our Customer Care Team, you can do so through our WhatsApp: +92 (324) 833-2704
`;
  
    return(
    <Row>
        <Col xs={24} lg={24}>
          <p>Main Collection</p>
        </Col>
        <Col xs={24} lg={12} >
    <img src= {categoryDetails?.thumbnail} style={{width:"100%"}}></img>
    <Collapse accordion>
    <Panel header="CUSTOMIZE" key="1">
      <p>{customize}</p>
    </Panel>
    <Panel header="CONTACT US" key="2">
      <p>{contact}</p>
    </Panel>
   
  </Collapse>
  </Col>
  <Col xs={24} lg={11} offset={1}>

  <h1 className="product-title"> {categoryDetails?.name}</h1>
  <p className="product-description"> {categoryDetails?.description}</p>
  <p className="product-price"> ${categoryDetails?.price}</p>
  <div>
  <img src={artisan}></img>
  <img src={HandCraft} style={{marginLeft:"10px"}}></img>
  <p>LARCH relies upon modern craftsmanship, blended with traditional methods to craft the finest quality shoes. Our highest quality leather ensures proper air circulation and prevents moisture through the surface.</p>
  </div>
  
   <Row>
   <Col xs={6} >
      <img src={leather}></img>
    </Col>
    <Col xs={6}>
    <p>Calf Leather</p>
    </Col>
   </Row>
   <Row>
   <Col xs={6}>
      <img src={sole}></img>
    </Col>
    <Col xs={6}>
    <p>Double Sole</p>
    </Col>
   </Row>
  <Row>
  <Col xs={6}>
      <img src={sizing}></img>
    </Col>
    <Col xs={6}>
    <p>FITTING GUIDE</p>
    </Col>
  </Row>
  <Row>
  <Col xs={24} lg={24}>
  <Select
          defaultValue="SELECT SIZE"
            className="SELECT SIZE"
            onChange={(value:any)=>handleSelectSizes(value)}
            style={{ width: "100%" }}
            // suffixIcon={<img src={Arrow} />}
            options={[
         
              { value: "popularity", label: "US 8" },
              { value: "from_a-z", label: "US 9" },
              { value: "from_z-a", label: "US 10" },
              { value: "from_z-a", label: "US 11" },
              { value: "from_z-a", label: "US 12" },
             
            ]}
          />
</Col>
<Col xs={24} lg={24} style={{marginTop:"10px"}}>

<Button  onClick={() => {
    const item:any = { sizes };
    dispatch(addProduct(item));
 
    showDrawer(); 
 
  }} type="primary" className="cancel-btn  fs-14 fw-600" htmlType="submit" style={{width:"100%"}} >ADD TO CART</Button>
<Drawer
         title=""
         placement={placement}
        className="drawer-details"
         autoFocus={true}
         onClose={onClose}
         open={open}
         
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>

          </Space>
        }
      >
        <Row style={{padding:"20px"}}>
          <Col xs={24} md={12}>
        <img src= {categoryDetails?.thumbnail} width={80} height={80} style={{borderRadius:"50%"}}/>

          </Col>
          <Col xs={24} md={12}>
          <p style={{color:"#ffffff"}}>{categoryDetails?.name}</p>
        <p style={{color:"#ffffff"}}> 1 × $ {categoryDetails?.price}</p>
          </Col>
          <Col xs={24} md={24} style={{textAlign:"center",marginTop: "20px"}}>
            <span style={{color:"#ffffff",}}>---------------------------</span>
          </Col>
          <Col xs={24} md={24} style={{marginTop: "20px"}}>

          <p style={{color:"#ffffff" ,textAlign:"center",border:"1px dotted",padding:"10px"}}>Subtotal $ {categoryDetails?.price}</p>
          </Col>
          <Col  xs={24} md={24}>
          <Button 
  className="view-cart"
  style={{ width: "100%", marginTop: "20px" }}
>
  VIEW CART
</Button>
          <Button style={{width:"100%",marginTop:"20px"}} >CHECKOUT</Button>
          </Col>
        </Row>
       

      </Drawer>
</Col>
  </Row>

  </Col>
 
    </Row>
    )
}
export default ProductDetails