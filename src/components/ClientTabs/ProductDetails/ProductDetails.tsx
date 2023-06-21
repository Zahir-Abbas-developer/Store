import { Button, Col, Drawer, Row, Select, Space } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
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
import exportedObject, { useAppSelector } from "../../../store"
import { addProduct } from "../../../store/Slices/AddToCardSlice"
import AppSnackbar from "../../../utils/AppSnackbar"
import { closeDrawer, openDrawer } from "../../../store/Slices/OpenDrawerSlice"
import DrawerComponent from "./Drawer"
import Arrow from '../../../assets/images/OnBoarding/arrow.svg'


// Import the addToCart action creator


const { Panel } = Collapse;
const ProductDetails = () => {

  const dispatch = useDispatch();
  const [sizes, setSizes] = useState("")
  const { products }: any = useAppSelector((state) => state.products);

  const isOpen = useAppSelector((state) => state.drawer.isOpen);

  const state = useLocation()
  const navigate=useNavigate()
  const categoryDetails = state?.state?.productDetails
  const handleSelectSizes = (applicationStageValue: any) => {
    setSizes(applicationStageValue)
  }

  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');

 

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };
  console.log(categoryDetails)
  const handleAddToCart=(item:any)=>{
    if(sizes){
      dispatch(addProduct({ ...item, size: sizes })); 
    AppSnackbar({ type: "success", messageHeading: "Success!", message: "Successful!" });
    dispatch(openDrawer());
    }
    else{
      AppSnackbar({ type: "error", messageHeading: "Error!", message: "Please Select Size Before You Want To Proceed Further!" });
    }
  }

  const onClose = () => {
    dispatch(closeDrawer());
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
const selectSizeOptions=categoryDetails?.shoeSizes?.map((shoeSizes:any)=>{return {value:`US ${shoeSizes?.us},EU ${shoeSizes?.eu}`,label:`US ${shoeSizes?.us},EU ${shoeSizes?.eu}`}})
console.log(selectSizeOptions)
// Using reduce to calculate the total price
const totalPrice = products?.products?.reduce((accumulator:any, currentValue:any) => {
  // Adding the price of the current object to the accumulator
  return accumulator + currentValue.price;
}, 0); // 0 is the initial value of the accumulator
  return (
    <Row gutter={[10,10]} style={{padding:"30px"}}>
      <Col xs={24} lg={24}>
        <p style={{color:"white",fontSize:"large" ,marginTop:"0px"}}>Main Collection</p>
      </Col>
      <Col xs={24} lg={12} >
        <img src={categoryDetails?.thumbnail} style={{ width: "80%",display:"block",margin:"0 auto" }}></img>
        <Collapse className="collapse-shoe" accordion style={{width:"80%",margin:"auto",marginTop:"10px",border:"0px solid transparent"}}>
          <Panel header="CUSTOMIZE"  key="1" style={{  border:"0px solid transparent",background:"linear-gradient(135deg, rgba(68,68,68,1) 6%, rgba(0,0,0,1) 95%)",borderRadius:"27px"}} >
            <p>{customize}</p>
          </Panel>
          <Panel header="CONTACT US" key="2" style={{border:"0px solid transparent",background:"linear-gradient(135deg, rgba(68,68,68,1) 6%, rgba(0,0,0,1) 95%)",borderRadius:"27px",marginTop:"10px"}}>
            <p >{contact}</p>
          </Panel>

        </Collapse>
      </Col>
      <Col xs={24} lg={11} offset={1}>

        <h1 className="product-title" style={{color:"white"}}> {categoryDetails?.name}</h1>
        <p className="product-description" style={{color:"white"}}> {categoryDetails?.description}</p>
        <p className="product-price" style={{color:"white"}}> ${categoryDetails?.price}</p>
        <div>
          <img src={artisan}></img>
          <img src={HandCraft} style={{ marginLeft: "10px" }}></img>
          <p style={{color:"white"}}>LARCH relies upon modern craftsmanship, blended with traditional methods to craft the finest quality shoes. Our highest quality leather ensures proper air circulation and prevents moisture through the surface.</p>
        </div>

        <Row >
          <Col xs={6} >
            <img src={leather}></img>
          </Col>
          <Col xs={6}>
            <p style={{color:"white"}}>Calf Leather</p>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <img src={sole}></img>
          </Col>
          <Col xs={6}>
            <p style={{color:"white"}}>Double Sole</p>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <img src={sizing}></img>
          </Col>
          <Col xs={6}>
            <p style={{color:"white"}}>FITTING GUIDE</p>
          </Col>
        </Row>
        <Row>
          <Col xs={24} lg={24}>
            <Select
              defaultValue="SELECT SIZE"
              className="select-size"
              onChange={(value: any) => handleSelectSizes(value)}
              style={{ width: "100%" }}
              suffixIcon={<img src={Arrow} />}
              options={selectSizeOptions}
            />
          </Col>
          <Col xs={24} lg={24} style={{ marginTop: "10px" }}>

            <Button onClick={() => {
              const item: any = { id: categoryDetails?._id, categoryName: categoryDetails?.name, thumbnail: categoryDetails?.thumbnail, price: categoryDetails?.price, size: sizes };
              handleAddToCart(item)
             

            }} type="primary" className="add-to-cart  fs-14 fw-600" htmlType="submit" style={{ width: "100%" }} >ADD TO CART</Button>
            <DrawerComponent/>
            
          </Col>
        </Row>

      </Col>

    </Row>
  )
}
export default ProductDetails