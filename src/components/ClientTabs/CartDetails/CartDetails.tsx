
import { Button, Card,  Col, Row, Space, Table } from 'antd'
import './CartDetails.scss'
import deleteIcon from "../../../assets/icons/delete-icon-outlined.svg";
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {  removeProduct } from '../../../store/Slices/AddToCardSlice';

import AppSnackbar from '../../../utils/AppSnackbar';
import { useEffect } from 'react';
import { useAppSelector } from '../../../store';
const CartDetails=()=>{
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const { products }: any = useAppSelector((state) => state.products);
  const handleDeleteCart=(id:any,size:any)=>{
    const allProducts=JSON.parse(JSON.stringify(products.products));   
    const updatedProductIndex = allProducts.findIndex((product:any) => product.id === id && product.size === size);    
    allProducts.splice(updatedProductIndex,1)    
    dispatch(removeProduct(allProducts));
    AppSnackbar({ type: "success", messageHeading: "Success!", message: "Successful Deleted!" });
  }
  useEffect(()=>{

  },[])
 // Using reduce to calculate the total price
const totalPrice = products?.products?.reduce((accumulator:any, currentValue:any) => {
  // Adding the price of the current object to the accumulator
  return accumulator + currentValue.price;
}, 0); // 0 is the initial value of the accumulator
    const columns: any = [
       
        {
          title: <span>REMOVE </span>,
          dataIndex: "categoryName",
          key: "categoryName",
          width: 300,
          render: (_:any, text:any) => (
            <Space>
              <span className="fs-14 fw-400 title-color" onClick={()=>{ handleDeleteCart(text?.id,text?.size)}} style={{cursor:"pointer"}}> <img src={deleteIcon}/>  </span>
            </Space>
          ),
        },
        {
            title: <span>THUMBNAIL </span>,
            dataIndex: "thumbnail",
            key: "thumbnail",
            width: 300,
            render: (_:any, text:any) => (
              <Space>
                <span className="fs-14 fw-400 title-color" style={{cursor:"pointer"}}>  <img src={text?.thumbnail} width={40} height={40}/></span>
              </Space>
            ),
          },
        {
            title: <span>PRODUCT </span>,
            dataIndex: "categoryName",
            key: "categoryName",
            width: 300,
            render: (_:any, text:any) => (
              <Space>
                <span className="fs-14 fw-400 title-color">{text?.categoryName}</span>
              </Space>
            ),
          },
          {
            title: <span>QUANTITY </span>,
            dataIndex: "categoryName",
            key: "categoryName",
            width: 300,
            render: (_:any, text:any) => (
              <Space>
                <span className="fs-14 fw-400 title-color">{text?.quantity}</span>
              </Space>
            ),
          },
          {
            title: <span>PRICE </span>,
            dataIndex: "price",
            key: "price",
            width: 300,
            render: (_:any, text:any) => (
              <Space>
                <span className="fs-14 fw-400 title-color">$ {text?.price}</span>
              </Space>
            ),
          },
        
    
       
    
       
        
      ];
    
    return(
    <>
    
    <div className="header-image">
  <div className="image-content">
    <h1 className="image-heading-title">CART</h1>
    <p className="image-heading-subheading">Confirm your order and proceed to checkout below</p>
   
  </div>
</div>
  <Row style={{background:"#000000",marginTop:"40px 0px"}}>
    <Col span={24}>
    <Table
              className="wrapper-table"
              columns={columns}
              dataSource={products?.products}
              scroll={{ x: "max-content" }}
             
             
            />
    </Col>
  </Row>

   <Row style={{background:"#181818",padding:"40px"}}>
    
    <Col xs={24} lg={12} style={{textAlign:"center" }}>
    <Card style={{ width: "100%" ,background:"#313131"}} >
    <p style={{color:"#ffffff"}}>Cart totals</p>
     <Row>
      <Col xs={12}>
      <p style={{color:"#ffffff"}}>SUBTOTAL</p>
      </Col>
      <Col xs={12}>
      <p style={{color:"#ffffff"}}>$ {totalPrice}</p>
      </Col>
      <Col xs={12}>
      <p style={{color:"#ffffff"}}>SHIPPING</p>
      </Col>
      <Col xs={12}>
      <p style={{color:"#ffffff"}}>Flat rate: $10</p>
      <p style={{color:"#ffffff"}}>Shipping to WA.</p>
      </Col>
      <Col xs={12}>
      <p style={{color:"#ffffff"}}>TOTAL</p>
      </Col>
      <Col xs={12}>
      <p style={{color:"#ffffff"}}>$ {totalPrice + 10}</p>
      </Col>
      <Col span={24}>
      <Button  block onClick={()=>navigate("/productDetails/cart-details/checkout-details")}>
      PROCEED TO CHECKOUT
    </Button>
      </Col>
     </Row>
  </Card>
    </Col>
   </Row>
    </>)
}
export default CartDetails