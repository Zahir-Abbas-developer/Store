
import { Button, Card,  Col, Row, Space, Table,Form, Input, Select } from 'antd'
import './BillingDetails.scss'
import deleteIcon from "../../../assets/icons/delete-icon-outlined.svg";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../../../store/Slices/AddToCardSlice';
import { text } from 'stream/consumers';
import AppSnackbar from '../../../utils/AppSnackbar';
import { useEffect } from 'react';
import { useAppSelector } from '../../../store';
const BillingDetails=()=>{
  
    const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { products }: any = useAppSelector((state) => state.products);
  const handleDeleteCart=(id:any)=>{
    dispatch(removeProduct(id))
    AppSnackbar({ type: "success", messageHeading: "Success!", message: "Successful Deleted!" });
  }
  useEffect(()=>{

  },[])
  const onFinishFailed = (errorInfo: any) => console.log('Failed:', errorInfo);
  const onFinish=(values:any)=>{
    console.log(values)
  }
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
              <span className="fs-14 fw-400 title-color" onClick={()=>{ handleDeleteCart(text?.id)}} style={{cursor:"pointer"}}> <img src={deleteIcon}/>  </span>
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
                <span className="fs-14 fw-400 title-color">1</span>
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
    <h1 className="image-heading-title">CHECKOUT</h1>
    <p className="image-heading-subheading">We accept Visa, Mastercard,Anex,PayPal and more.</p>
   
  </div>
</div>
 
   <Row style={{background:"#181818",padding:"40px"}}>
  
    <Col xs={24} lg={12}>
    <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
          onFinishFailed={onFinishFailed}
          // autoComplete="off"
          layout="vertical"
        >
          <Row gutter={[30, 5]} align="bottom">



            <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
              <Form.Item
                label="First Name"
                name="firstName"

                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
              <Form.Item
                label="Last Name"
                name="lastName"

                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
              <Form.Item
                label="EMAIL ADDRESS"
                name="email"

                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
              <Form.Item
                label="PHONE"
                name="phone"

                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
              <Form.Item
                label="COUNTRY"
                name="country"

                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
              <Form.Item
                label="TOWN / CITY"
                name="town"

                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
              <Form.Item
                label="POSTCODE / ZIP"
                name="postcode"

                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} className='onBoarding-input'>
              <Form.Item
                label="STREET ADDRESS"
                name="address"

                rules={[{ required: true, message: 'Required field' }]}
              >
                <Input placeholder="Type here" />
              </Form.Item>
            </Col>
           
           

{/*           
            <Col span={24}>
              <Space size={12} className='modal-buttons'>

                <Button  className="modal-button btn-cancel ">Cancel</Button>
                <Button type="primary"
                  htmlType="submit"  className="modal-button btn-secondary ">Save</Button>
              </Space>
            </Col> */}


          </Row>
        </Form>
    </Col>
    <Col xs={24} lg={12} style={{textAlign:"center",margin:"10px" }}>
    <Card style={{ width: "100%", background: "#313131" }}>
  <p style={{ color: "#ffffff" }}>Cart totals</p>
  <Row>
    <Col xs={12}>
      <p style={{ color: "#ffffff" }}>SUBTOTAL</p>
    </Col>
    <Col xs={12}>
      <p style={{ color: "#ffffff" }}>$ {totalPrice}</p>
    </Col>
    <Col xs={12}>
      <p style={{ color: "#ffffff" }}>SHIPPING</p>
    </Col>
    <Col xs={12}>
      <p style={{ color: "#ffffff" }}>Flat rate: $10</p>
      <p style={{ color: "#ffffff" }}>Shipping to WA.</p>
    </Col>
    <Col xs={12}>
      <p style={{ color: "#ffffff" }}>TOTAL</p>
    </Col>
    <Col xs={12}>
      <p style={{ color: "#ffffff" }}>$ {totalPrice + 10}</p>
    </Col>
    <Col xs={12}>
      {/* <PayPalButton
        amount="0.01"
        onSuccess={(details: any, data: any) => {
          alert("Transaction completed by " + details.payer.name.given_name);

          // OPTIONAL: Call your server to save the transaction
          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderID: data.orderID
            })
          });
        }}
      /> */}
    </Col>
  </Row>
</Card>

    </Col>
   </Row>
   
    </>)
}
export default BillingDetails