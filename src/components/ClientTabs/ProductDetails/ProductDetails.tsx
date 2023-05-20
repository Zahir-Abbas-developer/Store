import { Col, Row } from "antd"
import { useLocation } from "react-router-dom"
import './ProductDetails.scss'
 const ProductDetails=()=>{
    const state=useLocation()
    const categoryDetails=state?.state?.productDetails

    return(
    <Row>
        <Col xs={24} lg={24}>
          <p>Main Collection</p>
        </Col>
        <Col xs={24} lg={12}>
    <img src= {categoryDetails?.thumbnail}></img>
  </Col>
  <Col xs={24} lg={12}>

  <h1 className="product-title"> {categoryDetails?.name}</h1>
  <p className="product-description"> {categoryDetails?.description}</p>
  <p className="product-price"> ${categoryDetails?.price}</p>
  </Col>
    </Row>
    )
}
export default ProductDetails